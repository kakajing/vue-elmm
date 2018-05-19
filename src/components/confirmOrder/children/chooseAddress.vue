<template>
  <div class="rating_page">
    <e-header :head-title="headTitle" :go-back="goBack"></e-header>
    <router-link to="/confirmOrder/chooseAddress/addAddress" class="add_icon_footer" >
      <img src="../../../common/imgs/add_address.png" height="24" width="24">
      <span>新增收货地址</span>
    </router-link>
    <ul class="deliverable_address">
      <li>
        <svg class="choosed_address" :class="{default_address: defaultIndex == index}">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
        </svg>
        <div>
          <header>
            <span></span>
            <span></span>
            <span></span>
          </header>
          <div class="address_detail ellipsis">
            <span :style="{backgroundColor: iconColor()}"></span>
            <p></p>
          </div>
        </div>
      </li>
    </ul>
    <section class="out_delivery">
      <header class="out_header">以下地址超出配送范围</header>
      <ul class="deliverable_address">
        <li>
          <svg class="choosed_address">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
          </svg>
          <div>
            <header>
              <span></span>
              <span></span>
              <span></span>
            </header>
            <div class="address_detail ellipsis">
              <span :style="{backgroundColor: '#ccc'}"></span>
              <p></p>
            </div>
          </div>
        </li>
      </ul>
    </section>
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
        headTitle: '选择地址',
        goBack: true,
        showAlert: false,
        alertText: null
      }
    },
    computed: {
      defaultIndex (){}
    },
    methods: {
      iconColor (name) {
        switch (name) {
          case '公司': return '#4cd964'
          case '学校': return '#3190e8'
        }
      }
    },
    components: {
      EHeader,
      AlertTip
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../common/scss/mixin';

  .rating_page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 204;
    padding-top: 1.95rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .add_icon_footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 204;
    span{
      @include sc(.7rem, $blue);
      margin-left: .3rem;
    }
  }
  .deliverable_address{
    background-color: #fff;
    li{
      display: flex;
      align-items: center;
      border-bottom: 0.025rem solid #f5f5f5;
      padding: .7rem;
      line-height: 1rem;
      .choosed_address{
        @include wh(.8rem, .8rem);
        fill: #4cd964;
        margin-right: .4rem;
        opacity: 0;
      }
      .default_address{
        opacity: 1;
      }
      header{
        @include sc(.75rem, #333);
        span:nth-of-type(1){
          font-size: .85rem;
          font-weight: bold;
        }
      }
      .address_detail{
        width: 100%;
        display: flex;
        align-items: center;
        span{
          @include sc(.5rem, #fff);
          border-radius: .15rem;
          background-color: #ff5722;
          height: .65rem;
          line-height: .65rem;
          padding: 0 .3rem;
          margin-right: .3rem;
        }
        p{
          @include sc(.65rem, #777);
        }
      }
    }
  }
  #out_delivery{
    .out_header{
      @include sc(.6rem, #666);
      line-height: 1.5rem;
      padding-left: .5rem;
    }
    *{
      color: #ccc;
    }
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translateX(100%);
  }
</style>
