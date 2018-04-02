<template>
  <div class="loginContainer">
    <e-header :head-title="loginWay? '登录':'密码登录'" :go-back="goBack">
      <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay ? "密码登陆" : "短信登陆"}}</div>
    </e-header>
    <form class="loginForm" v-if="loginWay">
      <section class="input_container phone_number">
        <input type="text" placeholder="手机号" name="phone" maxlength="11" v-model="phoneNumber" @input="inputPhone">
        <button :class="{right_phone_number: rightPhoneNumber}" @click.prevent="getVerifyCode" v-show="!computedTime">
          获取验证码
        </button>
        <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
      </section>
    </form>
    <form class="loginForm" v-else>
      <section class="input_container">
        <input type="text" placeholder="手机号/邮箱/用户名" v-model.lazy="userAccount">
      </section>
      <section class="input_container">
        <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
        <input v-else type="text" placeholder="密码" v-model="passWord">
        <div class="button_switch" :class="{change_to_text: showPassword}">
          <div class="circel_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="密码" maxlength="4" v-model="codeNumber">
        <div class="img_change_img">
          <img :src="captchaCodeImg" v-show="captchaCodeImg">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <p class="login_tips">
      温馨提示：未注册饿了么账号的手机号，登陆时将自动注册，且代表您已同意
      <a href="https://h5.ele.me/service/agreement/">《用户服务协议》</a>
    </p>
    <div class="login_container" @click="mobileLogin">登陆</div>
    <router-link to="/forget" class="to_forget" v-if="!loginWay">忘记密码？</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import { getMobileCode, captchas, accountLogin, sendLogin } from 'api/login'
  import {mapMutations} from 'vuex'
  import axios from 'axios'
  import qs from 'qs'
  import {base64ToBlob} from 'common/js/config'

  export default {
    data () {
      return {
        goBack: true,
        loginWay: true,        //登录方式，默认短信登录
        phoneNumber: null,     //电话号码
        captcha_hash: '',
        captcha_value: '',
        showPassword: false,
        rightPhoneNumber: false,   //输入的手机号码是否符合要求
        computedTime: 0,       //倒数记时
        mobileCode: null,      //短信验证码
        validate_token: null,    //获取短信时返回的验证值，登陆时需要
        userInfo: null,          //获取到的用户信息
        userAccount: null,
        passWord: null,
        captchaCodeImg: null,
        codeNumber: null,     //验证码
        showAlert: false,   //显示提示组件
        alertText: null     //提示的内容
      }
    },
    created () {
      this.getCaptchaCode()
    },
    methods: {
      changeLoginWay () {
        this.loginWay = !this.loginWay
      },
      changePassWordType () {
        this.showPassword = !this.showPassword
      },
      inputPhone () {
        if (/^1\d{10}$/gi.test(this.phoneNumber)) {
          this.rightPhoneNumber = true
        } else {
          this.rightPhoneNumber = false
        }
      },
      getVerifyCode () {
        let value = base64ToBlob(this.captchaCodeImg)
        let data = {
          captcha_hash: this.captcha_hash,
          captcha_value: '',
          mobile: this.phoneNumber
        }
        if (this.rightPhoneNumber) {
          this.computedTime = 30
          this.timer = setInterval(() => {
            this.computedTime--
            if (this.computedTime === 0) {
              clearInterval(this.timer)
            }
          }, 1000)
          getMobileCode(data).then((res) => {
         //   console.log(res)
            this.validate_token = res.validate_token
          })
        }
      },
      mobileLogin () {
        let accountData = {
          captcha_hash: this.captcha_hash,
          captcha_value: this.captcha_value,
          username: this.userAccount,
          password: this.passWord
        }
        let sendData = {
          mobile: this.phoneNumber,
          validate_code: this.mobileCode,
          validate_token: this.validate_token
        }
        if (this.loginWay) {
          if (!this.rightPhoneNumber) {
            this.showAlert = true
            this.alertText = '手机号码不正确'
            return
          } else if (!(/^\d{6}$/gi.test(this.mobileCode))) {
            this.showAlert = true
            this.alertText = '短信验证码不正确'
            return
          }
          sendLogin(sendData).then(res => {
            console.log(res)
          })
        } else {
          if (!this.userAccount) {
            this.showAlert = true
            this.alertText = '请输入手机号/邮箱/用户名'
            return
          } else if (!this.passWord) {
            this.showAlert = true
            this.alertText = '请输入密码'
            return
          } else if (!this.codeNumber) {
            this.showAlert = true
            this.alertText = '请输入验证码'
            return
          }
          accountLogin(accountData).then(res => {
            this.userInfo = res
            console.log(res)
          })
        }
        if (this.userInfo.user_id) {
          this.showAlert = true
          this.alertText = this.userInfo.message
          if (!this.loginWay) this.getCaptchaCode()
        }else{
          this.RECORD_USERINFO(this.userInfo)
          this.$router.go(-1)

        }
      },
      getCaptchaCode () {
        let captcha_str = this.phoneNumber
        captchas(captcha_str).then(res => {
        //  console.log(res.data.captcha_image)
          this.captchaCodeImg = res.data.captcha_image
          this.captcha_hash = res.data.captcha_hash
        })
      },
      ...mapMutations([
        'RECORD_USERINFO',
      ])
    },
    components: {
      EHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/scss/mixin";

  .loginContainer {
    padding-top: 1.95rem;
  }

  .change_login {
    position: absolute;
    @include ct;
    right: 0.75rem;
    @include sc(.7rem, #fff);
  }

  .loginForm {
    background-color: #fff;
    margin-top: .6rem;
    .input_container {
      display: flex;
      justify-content: space-between;
      padding: .6rem .8rem;
      border-bottom: 1px solid #f1f1f1;
      input {
        @include sc(.7rem, #666);
      }
      button {
        @include sc(.65rem, #fff);
        font-family: Helvetica Neue, Tahoma, Arial;
        padding: .28rem .4rem;
        border: 1px;
        border-radius: 0.15rem;
      }
      .right_phone_number {
        background-color: #4cd964;
      }
    }
    .phone_number {
      padding: .3rem .8rem;
    }
    .captcha_code_container{
      height: 2.2rem;
      .img_change_img{
        display: flex;
        align-items: center;
        img{
          @include wh(3.5rem, 1.5rem);
          margin-right: .2rem;
        }
        .change_img{
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          width: 2rem;
          justify-content: center;
          p{
            @include sc(.55rem, #666);
          }
          p:nth-of-type(2){
            color: #3b95e9;
            margin-top: .2rem;
          }
        }
      }
    }
  }

  .login_tips {
    @include sc(.5rem, #999);
    padding: .4rem .6rem;
    line-height: .7rem;
    a {
      color: #3b95e9;
    }
  }

  .login_container {
    margin: 0 .5rem 1rem;
    @include sc(.7rem, #fff);
    background-color: #4cd964;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
  }

  .button_switch {
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include wh(2rem, .7rem);
    padding: 0 .2rem;
    border: 1px;
    border-radius: 0.5rem;
    position: relative;
    transition: all .3s;
    .circel_button {
      transition: all .3s;
      position: absolute;
      z-index: 1;
      @include wh(1.2rem, 1.2rem);
      left: -.1rem;
      box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0, 0, 0, .1);
      background-color: #f1f1f1;
      border-radius: 50%;
    }
    .trans_to_right {
      transform: translateX(1.3rem);
    }
    span {
      @include sc(.45rem, #fff);
      transform: translateY(.05rem);
      line-height: .6rem;
    }
    span:nth-of-type(2) {
      transform: translateY(-.08rem);
    }
  }

  .change_to_text {
    background-color: #4cd964;
  }

  .to_forget {
    float: right;
    @include sc(.6rem, #3b95e9);
    margin-right: .3rem;
  }
</style>
