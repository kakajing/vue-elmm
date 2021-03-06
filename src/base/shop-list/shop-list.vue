<template>
  <div class="shoplist_container">
    <ul v-load-more="loaderMore" v-if="shopListArr.length" type="square">
      <router-link v-for="item in shopListArr" :to="{path: 'shop', query: {geohash, id: item.id}}"  tag="li"
                   :key="item.id" class="shop_li">
        <section>
          <img :src="imgBaseUrl + subImgUrl(item.image_path)" class="shop_img">
        </section>
        <hgroup class="shop_right">
          <header class="shop_detail_header">
            <h4 class="shop_title ellipsis" :class="item.is_premium ? 'premium' : ''">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li class="supports" v-for="child in item.supports" :key="child.id">{{child.icon_name}}</li>
            </ul>
          </header>
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <section class="rating_section">
                <rating-star :rating="item.rating"></rating-star>
                <span class="rating_num">{{item.rating}}</span>
              </section>
              <section class="order_section">月售{{item.recent_order_num}}单</section>
            </section>
            <section class="rating_order_num_right">
              <!--{{item.delivery_mode.text}}-->
              <span class="delivery_style delivery_left"></span>
              <span class="delivery_style delivery_right">准时达</span>
            </section>
          </h5>
          <h5 class="fee_distance">
            <section class="fee">
              ¥{{item.float_minimum_order_amount}}起送
              <span class="segmentation">/</span>
              {{item.piecewise_agent_fee.tips}}
            </section>
            <section class="distance_time">
              <span>
                {{item.distance > 1000 ? (item.distance / 1000).toFixed(2) + 'km' : item.distance + 'm'}}
                <span class="segmentation">/</span>
              </span>
              <span class="order_time">{{item.order_lead_time}}分钟</span>
            </section>
          </h5>
        </hgroup>
      </router-link>
    </ul>
    <p v-else class="empty_data">没有更多了</p>
    <aside class="return_top" v-if="showBackStatus" @click="backTop">
      <svg class="back_top_svg">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
      </svg>
    </aside>
    <footer class="loader_more" v-show="preventRepeatRequest">正在加载更多商家...</footer>
    <div ref="abc" style="background-color: red"></div>
    <div class="loading-container" v-show="!shopListArr.length">
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import { showBack, animate } from 'common/js/mUtils'
  import { loadMore } from 'common/js/mixin'
  import {imgBaseUrl} from 'common/js/config'
  import {mapState} from 'vuex'
  import Loading from 'base/loading/loading'
  import RatingStar from 'base/rating-star/rating-star'

  export default{
    mixins: [loadMore],
    props: ['restaurantCategoryId', 'geohash', 'shopListArr', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect'],
    data () {
      return {
        imgBaseUrl: imgBaseUrl,
        preventRepeatRequest: false, // 到达底部加载数据，防止重复加载
        showBackStatus: false              // 显示返回顶部按钮
      }
    },
    computed: {
      ...mapState([
        'latitude',
        'longitude'
      ])
    },
    mounted () {
      // 开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
      showBack(status => {
        this.showBackStatus = status
      })
    },
    methods: {
      loaderMore () {
        // 防止重复请求
        if (this.preventRepeatRequest) {
          return
        }
        this.preventRepeatRequest = true
        this.offset += 20
        // 当获取数据小于20，说明没有更多数据，不需要再次请求数据
        if (this.shopListArr.length < 10) {
          return
        }
        this.preventRepeatRequest = false
      },
      // 返回顶部
      backTop () {
        animate(document.body, {scrollTop: '0'}, 400, 'ease-out')
      },
      // 传递过来的图片地址需要处理后才能正常使用
      subImgUrl (path) {
        let suffix
      //  console.log(path)
        if (path.indexOf('jpeg') !== -1) {
          suffix = '.jpeg'
        } else {
          suffix = '.png'
        }
        let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix
        return url
      }
    },
    watch: {
      shopListArr () {
//        console.log('bbbbbbbbbbbbbbbb')
//        console.log(this.shopListArr)
      },
      // 监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
      restaurantCategoryIds (value) {
      //  this.shopListArr()
      },
      // 监听父级传来的排序方式
      sortByType (value) {
      //  this.shopListArr()
      }
    },
    components: {
      Loading,
      RatingStar
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/scss/mixin";

  .shoplist_container{
    background-color: #fff;
    margin-bottom: 2rem;
  }
  .shop_li {
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: 0.7rem 0.4rem;
  }

  .shop_img {
    @include wh(2.7rem, 2.7rem);
    display: block;
    margin-right: 0.4rem;
  }

  .shop_right {
    flex: auto;
    .shop_detail_header {
      @include fj;
      align-items: center;
      .shop_title {
        width: 8.5rem;
        color: #333;
        @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
        font-weight: 700;
      }
      .premium::before {
        content: '品牌';
        display: inline-block;
        font-size: 0.5rem;
        background-color: #ffd930;
        padding: 0 0.1rem;
        border-radius: 0.1rem;
        margin-right: 0.2rem;
        vertical-align: top;
      }
      .shop_detail_ul {
        display: flex;
        .supports {
          @include sc(0.5rem, #999);
          border: 0.025rem solid #f1f1f1;
          padding: 0.04rem;
          border-radius: 0.08rem;
          margin-left: 0.05rem;
        }
      }
    }
    .rating_order_num {
      @include fj(space-between);
      height: 0.6rem;
      margin-top: 0.52rem;
      .rating_order_num_left {
        @include fj(flex-start);
        .rating_section {
          display: flex;
          .rating_container {
            position: relative;
            width: 2rem;
            .star_overflow {
              overflow: hidden;
              position: relative;
              height: 100%;
            }
            .star_container {
              position: absolute;
              display: flex;
              width: 2rem;
              height: 0.4rem;
              top: -0.02rem;
              .grey_fill {
                fill: #d1d1d1;
              }
              .orange_fill {
                fill: #ff9a0d;
              }
            }
          }
          .rating_num {
            @include sc(0.4rem, #ff6000);
            margin: 0 0.2rem;
          }
        }
        .order_section {
          @include sc(0.4rem, #666);
        }
      }
      .rating_order_num_right {
        display: flex;
        align-items: center;
        transform: scale(.7);
        min-width: 5rem;
        justify-content: flex-end;
        margin-right: -0.8rem;
        .delivery_style {
          font-size: 0.4rem;
          padding: 0.04rem 0.08rem 0;
          border-radius: 0.08rem;
          margin-left: 0.08rem;
          border: 1px;
        }
        .delivery_left {
          color: #fff;
          background-color: $blue;
          border: 0.025rem solid $blue;
        }
        .delivery_right {
          color: $blue;
          border: 0.025rem solid $blue;
        }
      }
    }
    .fee_distance {
      margin-top: 0.52rem;
      @include fj;
      @include sc(0.5rem, #666);
      .distance_time {
        .order_time {
          color: $blue;
        }
      }
      .segmentation {
        color: #ccc;
      }
    }
  }

  .loader_more {
    @include font(0.6rem, 3);
    text-align: center;
    color: #999;
  }

  .return_top {
    position: fixed;
    bottom: 3rem;
    right: 1rem;
    .back_top_svg {
      @include wh(2rem, 2rem);
    }
  }
  /*.loading-enter-active, .loading-leave-active {
    transition: opacity 1s;
  }
  .loading-enter, .loading-leave-active {
    opacity: 0;
  }*/

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
