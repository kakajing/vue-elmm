<template>
  <div class="confirmOrderContainer">
    <section>
      <e-header :head-title="headTitle" :go-back="goBack" signin-up='confirmOrder'></e-header>
      <section class="address_container">
        <div class="address_empty_left">
          <svg class="location_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
          </svg>
          <span class="add_address">请添加一个收获地址</span>
        </div>
        <svg class="address_empty_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </section>
      <section class="delivery_model container_style">
        <p class="deliver_text">送达时间</p>
        <section class="deliver_time">
          <p>尽快送达 | 预计</p>
          <p >蜂鸟专送</p>
        </section>
      </section>
      <section class="pay_way container_style">
        <header class="header_style">
          <span>支付方式</span>
          <div class="more_type">
            <span>在线支付</span>
            <svg class="address_empty_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </header>
        <section class="hongbo">
          <span>红包</span>
          <span>暂时只在饿了么 APP 中支持</span>
        </section>
      </section>
      <section class="food_list">
        <header>
          <!--<img :src="">-->
          <span></span>
        </header>
        <ul class="food_list_ul">
          <li class="food_item_style">
            <p class="food_name ellipsis"></p>
            <div class="num_price">
              <span>x </span>
              <span>¥</span>
            </div>
          </li>
        </ul>
        <div class="food_item_style">
          <p class="food_name ellipsis"></p>
          <div class="num_price">
            <span></span>
            <span>¥ </span>
          </div>
        </div>
        <div class="food_item_style total_price">
          <p class="food_name ellipsis">订单 ¥</p>
          <div class="num_price">
            <span></span>
            <span>待支付 ¥</span>
          </div>
        </div>
      </section>
      <section class="pay_way container_style">
        <header class="header_style">
          <span>订单备注</span>
          <div class="more_type">
            <span>口味偏、好等</span>
            <svg class="address_empty_right">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </div>
        </header>
        <section class="hongbo">
          <span>发票抬头</span>
          <span>商家不支持开发票</span>
        </section>
      </section>
      <section class="confrim_order">
        <p>待支付 ¥</p>
        <p>确认下单</p>
      </section>
      <transition name="fade">
        <div></div>
      </transition>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import {imgBaseUrl} from 'common/js/config'
  import {mapState, mapMutations} from 'vuex'
  import {checkOut} from 'api/order'

  export default {
    data () {
      return {
        headTitle: '确认订单',
        goBack: true,
        geohash: '',
        shopId: null,
        showLoading: true,
        checkoutData: null,
        shopCart: null,
        imgBaseUrl
      }
    },
    created () {
      this.geohash = this.$route.query.geohash
      this.shopId = this.$route.query.shopId
      this.INIT_BUYCART()
      this.shopCart = this.cartList[this.shopId]
    },
    computed: {
      ...mapState([
        'cartList'
      ]),
    },
    mounted(){
      this.initData()
    },
    methods: {
      initData () {
        let newArr = new Array
        Object.values(this.shopCart).forEach(categoryItem => {
          Object.values(categoryItem).forEach(itemValue => {
            Object.values(itemValue).forEach(item => {
              newArr.push({
                attrs: [],
                extra: {},
                id: item.id,
                item_id: item.item_id,
                name: item.name,
                packing_fee: item.packing_fee,
                price: item.price,
                quantity: item.num,
                sku_id: item.sku_id,
                specs: item.specs,
                stock: item.stock,
                view_discount_price: item.view_discount_price,
                view_original_price: item.view_original_price,
                weight: item.weight
              })
            })
          })
        })
        let newArr2 = JSON.stringify(newArr)
        checkOut([newArr2], this.geohash).then(res => {
          console.log(res)
//          this.checkoutData = res
        })
      },
      ...mapMutations([
        'INIT_BUYCART'
      ])
    },
    components: {
      EHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/scss/mixin";

  .confirmOrderContainer{
    padding-top: 1.95rem;
    padding-bottom: 3rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .container_style{
    background-color: #fff;
    margin-top: .4rem;
    padding: 0 .7rem;
  }
  .address_container{
    min-height: 3.5rem;
    @include fj;
    align-items: center;
    padding: 0 0.6rem;
    background: url(../../common/imgs/address_bottom.png) left bottom repeat-x;
    background-color: #fff;
    background-size: auto .12rem;
    .address_empty_left{
      display: flex;
      align-items: center;
      .location_icon{
        @include wh(.8rem, .8rem);
        fill: $blue;
        margin-right: .2rem;
      }
      .add_address{
        @include sc(.7rem, #333);
      }
      .address_detail_container{
        margin-left: .2rem;
        header{
          @include sc(.65rem, #333);
          span:nth-of-type(1){
            font-size: .8rem;
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
            height: .6rem;
            line-height: .6rem;
            padding: 0 .2rem;
            margin-right: .3rem;
          }
          p{
            @include sc(.55rem, #777);
          }
        }
      }
    }
  }
  .address_empty_right{
    @include wh(.6rem, .6rem);
    fill: #999;
  }
  .delivery_model{
    border-left: .2rem solid $blue;
    min-height: 4rem;
    @include fj;
    align-items: center;
    .deliver_text{
      @include sc(.8rem, #333);
      font-weight: bold;
      padding-left: .3rem;
    }
    .deliver_time{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      p:nth-of-type(1){
        @include sc(.7rem, $blue);
      }
      p:nth-of-type(2){
        @include sc(.5rem, #fff);
        background-color: $blue;
        width: 2.4rem;
        margin-top: .5rem;
        text-align: center;
        border-radius: 0.12rem;
        padding: .1rem;
      }
    }
  }
  .pay_way{
    .header_style{
      @include fj;
      line-height: 2rem;
      span:nth-of-type(1){
        @include sc(.7rem, #666);
      }
      .more_type{
        span:nth-of-type(1){
          @include sc(.6rem, #aaa);
          width: 10rem;
          display: inline-block;
          text-align: right;
          vertical-align: middle;
        }
        svg{
          @include wh(.5rem, .5rem);
          fill: #ccc;
        }
      }
    }
    .hongbo{
      @include fj;
      border-top: 0.025rem solid #f5f5f5;
      span{
        @include sc(.6rem, #aaa);
        line-height: 2rem;
        svg{
          @include wh(.5rem, .5rem);
          vertical-align: middle;
          fill: #ccc;
        }
      }
      span:nth-of-type(2){
        color: #aaa;
      }
    }
    .support_is_available{
      span{
        color: #666;
      }
    }
  }
  .food_list{
    background-color: #fff;
    margin-top: .4rem;
    header{
      padding: .7rem;
      border-bottom: 0.025rem solid #f5f5f5;
      img{
        @include wh(1.2rem, 1.2rem);
        vertical-align: middle;
      }
      span{
        @include sc(.8rem, #333);
      }
    }
    .food_list_ul{
      padding-top: .5rem;
    }
    .food_item_style{
      @include fj;
      line-height: 1.8rem;
      padding: 0 .7rem;
      span,p{
        @include sc(.65rem, #666);
      }
      .food_name{
        width: 11rem;
      }
      .num_price{
        flex: 1;
        @include fj;
        align-items: center;
        span:nth-of-type(1){
          color: #f60;
        }
      }
    }
    .total_price{
      border-top: 0.025rem solid #f5f5f5;
    }
  }
  .confrim_order{
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 2rem;
    p{
      line-height: 2rem;
      @include sc(.75rem, #fff);
    }
    p:nth-of-type(1){
      background-color: #3c3c3c;
      flex: 5;
      padding-left: .7rem;
    }
    p:nth-of-type(2){
      flex: 2;
      background-color: #56d176;
      text-align: center;
    }
  }
  .cover{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.3);
    z-index: 203;
  }
  .choose_type_Container{
    min-height: 10rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 204;
    header{
      background-color: #fafafa;
      @include sc(.7rem, #333);
      text-align: center;
      line-height: 2rem;
    }
    ul{
      li{
        @include fj;
        padding: 0 .7rem;
        line-height: 2.5rem;
        align-items: center;
        span{
          @include sc(.7rem, #ccc);
        }
        svg{
          @include wh(.8rem, .8rem);
          fill: #eee;
        }
      }
      .choose{
        span{
          color: #333;
        }
        svg{
          fill: #4cd964;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .slid_up-enter-active, .slid_up-leave-active {
    transition: all .3s;
  }
  .slid_up-enter, .slid_up-leave-active {
    transform: translate3d(0,10rem,0)
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>

