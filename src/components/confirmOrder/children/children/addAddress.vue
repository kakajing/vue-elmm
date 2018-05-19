<template>
  <div class="address_page">
    <e-header :head-title="headTitle" :go-back="goBack"></e-header>
    <section class="page_text_container">
      <section class="section_list">
        <span class="section_left">联系人</span>
        <section class="section_right">
          <input type="text" name="name" placeholder="你的名字" v-model="name" class="input_style">
          <div class="choose_sex">
            <span class="choose_option">
              <svg class="address_empty_right" @click="chooseSex(1)" :class="{choosed: sex == 1}">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
              </svg>
              <span>先生</span>
            </span>
            <span class="choose_option">
              <svg class="address_empty_right" @click="chooseSex(2)" :class="{choosed: sex == 2}">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
              </svg>
              <span>女士</span>
            </span>
          </div>
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">联系电话</span>
        <section class="section_right">
          <div class="phone_add">
            <input type="text" name="phone" placeholder="你的手机号" v-model="phone" class="input_style">
            <img src="../../../../common/imgs/add_phone.png" height="20" width="20" @click="phone_bk = true">
          </div>
          <input v-if="phone_bk" type="text" name="antherPhoneNumber" placeholder="备选电话" v-model="antherPhoneNumber" class="input_style phone_bk">
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">送餐地址</span>
        <section class="section_right">
          <router-link to="/confirmOrder/chooseAddress/addAddress/searchAddress" tag="div" class="choose_address">'小区/写字楼/学校等'</router-link>
          <input type="text" name="address_detail" placeholder="详细地址（如门牌号等）" v-model="address_detail" class="input_style">
        </section>
      </section>
      <section class="section_list">
        <span class="section_left">标签</span>
        <section class="section_right">
          <input type="text" name="tag" placeholder="无/家/学校/公司" v-model="tag" class="input_style">
        </section>
      </section>
    </section>
    <div class="determine" @click="addAddress">确定</div>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
    <transition name="router-slid">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import AlertTip from 'base/alertTip/alertTip'

  export default {
    data () {
      return {
        headTitle: '添加地址',
        goBack: true,
        name: null,
        sex: 1,
        phone: null,
        phone_bk: false,
        antherPhoneNumber: '',
        address_detail: null,
        tag: '',
        showAlert: false,
        alertText: null
      }
    },
    methods: {
      chooseSex (sex) {
        this.sex = sex
      },
      addAddress () {}
    },
    components: {
      EHeader,
      AlertTip
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../common/scss/mixin';

  .address_page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 204;
    padding-top: 1.95rem;
    p, span, input{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .page_text_container{
    background-color: #fff;
    padding: 0 .7rem;
  }
  .section_list{
    display: flex;
    border-bottom: 0.025rem solid #f5f5f5;
    .section_left{
      @include sc(.7rem, #333);
      flex: 2;
      line-height: 2.5rem;
    }
    .section_right{
      flex: 5;
      .input_style{
        width: 100%;
        height: 2.5rem;
        @include sc(.7rem, #999);
      }
      .phone_bk{
        border-top: 0.025rem solid #f5f5f5;
      }
      .phone_add{
        @include fj;
        align-items: center;
      }
      .choose_sex{
        display: flex;
        line-height: 2.5rem;
        border-top: 0.025rem solid #f5f5f5;
        .choose_option{
          @include sc(.7rem, #333);
          display: flex;
          align-items: center;
          margin-right: .8rem;
          svg{
            margin-right: .3rem;
            @include wh(.8rem, .8rem);
            fill: #ccc;
          }
          .choosed{
            fill: #4cd964;
          }
        }
      }
      .choose_address{
        @include sc(.7rem, #999);
        line-height: 2.5rem;
        border-bottom: 0.025rem solid #f5f5f5;
      }
    }
  }
  .determine{
    background-color: #4cd964;
    @include sc(.7rem, #fff);
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    margin-top: .6rem;
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translateX(100%);
  }
</style>
