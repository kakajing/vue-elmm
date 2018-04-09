<template>
  <div class="container">
    <e-header :head-title="headTitle" :go-back="goBack"></e-header>
    <form class="restForm">
      <section class="input_container">
        <input type="text" placeholder="手机号/邮箱" v-model="userAccount">
      </section>
      <section class="input_container">
        <input type="text" placeholder="请输入旧密码" name="oldPassWord" v-model="oldPassWord">
      </section>
      <section class="input_container">
        <input type="text" placeholder="请输入新密码" name="newPassWord" v-model="newPassWord">
      </section>
      <section class="input_container">
        <input type="text" placeholder="请确认密码" name="confirmPassWord" v-model="confirmPassWord">
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        <div class="img_change_img">
          <!--<img src="" alt="">-->
          <div class="change_img">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <div class="login_container" @click="resetButton">确认修改</div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import AlertTip from 'base/alertTip/alertTip'
  import {mapState, mapMutations} from 'vuex'

  export default {
    data () {
      return {
        headTitle: '重置密码',
        goBack: true,
        userAccount: null,       //帐号
        oldPassWord: null,
        newPassWord: null,
        confirmPassWord: null,  //确认密码
        captchaCodeImg: null, //验证码地址
        codeNumber: null,      //验证码
        showAlert: false, //显示提示组件
        alertText: null,  //提示的内容
        accountType: null   //注册方式
      }
    },
    methods: {
      resetButton () {
        if (!this.userAccount) {
          this.showAlert = true
          this.alertText = '请输入您的帐号'
          return
        } else if (!this.oldPassWord) {
          this.showAlert = true
          this.alertText = '请输入旧密码'
          return
        } else if (!this.newPassWord) {
          this.showAlert = true
          this.alertText = '请输入新密码'
          return
        } else if (!this.confirmPassWord) {
          this.showAlert = true
          this.alertText = '请确认密码'
          return
        } else if (!this.codeNumber) {
          this.showAlert = true
          this.alertText = '请输入验证码'
          return
        } else if (/^1\d{10}$/gi.test(this.userAccount)) {
          this.accountType = 'mobile'

        }
      },
      closeTip () {
        this.showAlert = false
      },
      ...mapMutations([
        'RECORD_USERINFO',
      ])
    },
    components: {
      EHeader,
      AlertTip
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/scss/mixin";
  .container{
    padding-top: 1.95rem;
  }
  .restForm{
    background-color: #fff;
    margin-bottom: .6rem;
    .input_container{
      display: flex;
      justify-content: space-between;
      padding: .6rem .8rem;
      border-bottom: 1px solid #f1f1f1;
      input{
        @include sc(.7rem, #666);
        flex: 1;
      }
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
  .login_container{
    margin: 1rem .5rem;
    @include sc(.7rem, #fff);
    background-color: #4cd964;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
  }
</style>
