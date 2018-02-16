<template>
  <div>
    <a id="top"></a>
    <ul>
      <router-link v-for="item in shopListArr" :to="{path: 'food', query: {}}"  tag="li"
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
          <h5></h5>
          <h5></h5>
        </hgroup>
      </router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

  export default{
    props: {
      geohash: {
        type: String,
        default: ''
      },
      shopListArr: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        imgBaseUrl: 'https://fuss10.elemecdn.com/'
      }
    },
    mounted () {
    },
    watch: {
      shopListArr () {
        console.log(this.shopListArr)
      }
    },
    methods: {
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
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/scss/mixin";

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
        .delivery_style {
          font-size: 0.4rem;
          padding: 0.04rem 0.08rem 0;
          border-radius: 0.08rem;
          margin-left: 0.08rem;
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

</style>
