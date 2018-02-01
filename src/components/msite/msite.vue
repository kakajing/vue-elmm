<template>
  <div>
    <e-header signin-up='msite'>
      <router-link to="/search" class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="9" cy="9" r="8" stroke="rgb(255,255,255)" stroke-width="2" fill="none"/>
          <line x1="15" y1="15" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text">{{msiteTitle}}</span>
      </router-link>
    </e-header>
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper_wrapper">
          <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
            <router-link :to="{path: '/food', query: {geohash}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_hash + '.jpeg'"/>
                <figcaption>{{foodItem.name}}</figcaption>
              </figure>
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop_header_title">附近商家</span>
      </header>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import { msiteAdress, msiteFoodTypes } from 'api/msite'
  import Swiper from 'swiper'

  export default{
    data () {
      return {
        geohash: '',   // city页面传递过来的地址geohash
        msiteTitle: '获取地址中...',   // msiet页面头部标题
        foodTypes: [],   // 食品分类列表
        hasGetData: false,   // 是否已经获取数据
        imgBaseUrl: 'https://fuss10.elemecdn.com/',   // 图片域名地址
        latitude: '',
        longitude: ''
      }
    },
    mounted () {
      this.getMsiteAdress()
      this.getMsiteFoodTypes()
      setTimeout(() => {
        this.initSwiper()
      }, 20)
    },
    methods: {
      getMsiteAdress () {
        var self = this
        msiteAdress().then((res) => {
          self.msiteTitle = res.name
          self.latitude = res.latitude
          self.longitude = res.longitude
          self.geohash = res.geohash
        })
      },
      getMsiteFoodTypes () {
        msiteFoodTypes(this.latitude, this.longitude).then((res) => {
          let resLength = res[0].entries.length
          let resArr = res[0].entries.concat([])
          let foodArr = []
          for (let i = 0, j = 0; i < resLength; i += 8, j++) {
            foodArr[j] = resArr.splice(0, 8)
          }
          this.foodTypes = foodArr
        }).then(() => {
          this.initSwiper()
        })
      },
      initSwiper () {
        this.swiper = new Swiper('.swiper-container', {
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets'
          },
          loop: true
        })
      },
    },
    components: {
      EHeader
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/mixin";

  .link_search{
    left: .8rem;
    @include wh(.8rem, .9rem);
    @include ct;
  }
  .msite_title{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
    .title_text{
      @include sc(0.8rem, #fff);
      text-align: center;
      display: block;
    }
  }
  .msite_nav{
    padding-top: 2.1rem;
    background-color: #fff;
    border-bottom: 0.025rem solid $bc;
    height: 10.6rem;
    .swiper-container{
      @include wh(100%, auto);
      padding-bottom: 0.6rem;
      .swiper-pagination{
        bottom: 0.2rem;
      }
    }
  }
  .food_types_container{
    display: flex;
    flex-wrap: wrap;
    .link_to_food{
      width: 25%;
      padding: 0.3rem 0rem;
      @include fj(center);
      figure{
        img{
          margin-bottom: 0.3rem;
          @include wh(1.8rem, 1.8rem);
        }
        figcaption{
          text-align: center;
          @include sc(0.55rem, #666);
        }
      }
    }
  }
  .shop_list_container{
    margin-top: .4rem;
    border-top: 0.025rem solid $bc;
    background-color: #fff;
    .shop_header{
      .shop_icon{
        fill: #999;
        margin-left: 0.6rem;
        vertical-align: middle;  // 垂直对齐方式
        @include wh(0.6rem, 0.6rem)
      }
      .shop_header_title{
        color: #999;
        @include font(0.5rem, 1.6rem);
      }
    }
  }
</style>
