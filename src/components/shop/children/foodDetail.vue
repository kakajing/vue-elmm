<template>
  <div class="rating_page" >
    <e-header :head-title="name" :go-back="goBack"></e-header>
    <section class="header_img">
      <img :src="getImgPath(image_path)" class="food_img">
      <div class="cover"></div>
      <p class="description">{{description}}</p>
    </section>
    <section class="detail_container">
      <section class="detail_left">
        <p>{{name}}</p>
        <div class="rating_sale">
          <span>评分</span>
          <rating-star :rating="rating"></rating-star>
          <span>{{rating.toFixed(1)}}</span>
        </div>
        <p>
          <span>月售{{month_sales}}单</span>
          <span>售价 ¥{{food.specfoods[0].price}}</span>
          <span v-if="food.specfoods.length">起</span>
        </p>
        <p>
          <span>评论数 {{rating_count}}</span>
          <span>好评率 {{satisfy_rate}}%</span>
        </p>
      </section>
      <!--<section class="cart_list_control">-->
        <!--<svg @click="removeOutCart(food.category_id, food.item_id, food.food_id, food.name, food.price, food.specs)">-->
          <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>-->
        <!--</svg>-->
        <!--<span class="cart_num"></span>-->
        <!--<svg class="cart_add" @click="addToCart(food.category_id, food.item_id, food.food_id, food.name, food.price, food.specs)">-->
          <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>-->
        <!--</svg>-->
      <!--</section>-->
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import {getImgPath} from 'common/js/mixin'
  import RatingStar from 'base/rating-star/rating-star'

  export default {
    mixins: [getImgPath],
    data () {
      return {
        goBack: true,
        image_path: null,
        description: null,
        month_sales: null,
        name: null,
        rating: null,
        rating_count: null,
        satisfy_rate: null,
        food: null,
        shopId: null
      }
    },
    created () {
      this.image_path = this.$route.query.image_path
      this.description = this.$route.query.description
      this.month_sales = this.$route.query.month_sales
      this.name = this.$route.query.name
      this.rating = this.$route.query.rating
      this.rating_count = this.$route.query.rating_count
      this.satisfy_rate = this.$route.query.satisfy_rate
      this.food = this.$route.query.food
      this.shopId = this.$route.query.shopId
    },
    methods: {
    },
    components: {
      EHeader,
      RatingStar
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../../common/scss/mixin";

  .rating_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 10;
    padding-top: 1.95rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .header_img{
    position: relative;
    .food_img{
      width: 100%;
      display: block;
    }
    .cover{
      box-shadow: 0px -74px 100px #ddd inset;
      position: absolute;
      @include wh(100%, 100%);
      top: 0;
      left: 0;
    }
    .description{
      position: absolute;
      @include sc(.6rem, #666);
      line-height: .8rem;
      bottom: .2rem;
      padding: 0 .4rem;
    }
  }
  .detail_container{
    padding: .5rem;
    @include fj;
    align-items: center;
    .detail_left{
      p:nth-of-type(1){
        @include sc(.7rem, #333);
        margin-bottom: .2rem;
      }
      .rating_sale{
        display: flex;
        align-items: center;
        span:nth-of-type(1){
          @include sc(.6rem, #666);
          margin-right: .2rem;
        }
        span:nth-of-type(2){
          @include sc(.55rem, #f60);
          margin-left: .2rem;
        }
        span:nth-of-type(3){
          @include sc(.6rem, #666);
          margin-left: .4rem;
        }
      }
      p:nth-of-type(2){
        font-size: 0;
        margin-top: .3rem;
        span:nth-of-type(1){
          @include sc(.6rem, #666);
          margin-right: .4rem;
        }
        span:nth-of-type(2),span:nth-of-type(3){
          @include sc(.6rem, #f60);
          margin-right: .2rem;
        }
      }
      p:nth-of-type(3){
        span{
          @include sc(.6rem, #666);
        }
      }
    }
    .cart_list_control{
      display: flex;
      align-items: center;
      svg{
        @include wh(.8rem, .8rem);
        fill: #3190e8;
      }
      .specs_reduce_icon{
        fill: #999;
      }
      .cart_num{
        @include sc(.6rem, #666);
        min-width: 1rem;
        text-align: center;
        font-family: Helvetica Neue,Tahoma;
      }
    }
  }
</style>
