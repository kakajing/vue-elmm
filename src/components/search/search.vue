<template>
  <div class="paddingTop search_page">
    <e-header :head-title="headTitle" :go-back="goBack"></e-header>
    <form class="search_form">
      <input type="search" name="search" :placeholder="placeholder" v-model="searchValue" @input="checkInput"
             class="search_input">
      <input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget">
    </form>
    <section>
      <h4 class="title_restaurant">商家</h4>
      <ul class="list_container">
        <router-link :to="{path: '/shop', query: {}}" tag="li" v-for="item in restaurantFood" :key="item.id"
                     class="list_li">
          <section class="item_left">
            <img :src="imgBaseUrl + subImgUrl(item.image_path)" class="restaurant_img">
          </section>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span>{{item.name}}</span>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                  <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1"/>
                  <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>
                  <text x="3.5" y="9" style="fill:#FF6000;font-size:9px;font-weight:bold;">支付</text>
                </svg>
              </p>
              <p>月售 {{item.month_sales}} 单</p>
              <!--<p>{{item.delivery_fee}} 元起送 / 距离{{item.distance}}</p>-->
              <p>¥{{item.price}}</p>
            </div>
            <ul class="item_right_detail">
              <li v-for="activitiy in item.activities" :key="activitiy.id">
                <span :style="{backgroundColor: '#' + activitiy.icon_color}"
                      class="activities_icon">{{activitiy.icon_name}}</span>
                <span>{{activitiy.name}}</span>
                <span class="only_phone">(手机客户端专享)</span>
              </li>
            </ul>
          </section>
        </router-link>
      </ul>
    </section>
    <section class="search_history" v-if="searchHistory.length&&showHistory">
      <h4 class="title_restaurant">搜索历史</h4>
      <ul>
        <li v-for="history in searchHistory">{{history}}</li>
      </ul>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import { getStore, setStore } from 'common/js/mUtils'
  import {imgBaseUrl} from 'common/js/config'
  import {getGuess} from 'api/home'
  import { searchRestaurant } from 'api/search'
  import ShopList from 'base/shop-list/shop-list'

  export default{
    data () {
      return {
        headTitle: '搜索',
        goBack: true,
        placeholder: '请输入商家或美食名称',
        geohash: '',
        searchValue: '',
        restaurant: [],      // 搜索返回结果中的餐厅
        restaurantList: [],  // 搜索返回的结果
        restaurantFood: [],  // 搜索返回结果中的food
        searchHistory: [],
        imgBaseUrl: imgBaseUrl,
        showHistory: true,
        latitude: '',
        longitude: '',
        extras: ''
      }
    },
    mounted () {
    //  this.geohash = this.$route.params.geohash
//      if (getStore('searchHistory')) {
//        this.searchHistory = JSON.parse('searchHistory')
//      }
    },
    methods: {
      checkInput () {
        if (this.searchValue === '') {
          this.showHistory = true
          this.restaurantList = []
        }
      },
      searchTarget () {
        this.extras = ['activities', 'coupon']
        if (!this.searchValue) {
          return
        }
        this.showHistory = false
        getGuess().then((res) => {
          this.latitude = res.latitude
          this.longitude = res.longitude
          searchRestaurant(this.searchValue, this.latitude, this.longitude, this.extras).then((res) => {
            this.restaurantList = res.inside[3].restaurant_with_foods
            this.restaurantList.forEach(item => {
              this.restaurant = item.restaurant
              this.restaurantFood = item.foods
              console.log(this.restaurantFood[0].activities)
            })
          })
        })
        /**
         * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
         * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
         */
        let history = getStore('searchHistory')
        if (history) {
          let checkRepeat = false
          this.searchHistory = JSON.parse(history)
          this.searchHistory.forEach(item => {
            if (item === this.searchValue) {
              checkRepeat = true
            }
          })
          if (!checkRepeat) {
            this.searchHistory.push(this.searchValue)
          }
        } else {
          this.searchHistory.push(this.searchValue)
        }
        setStore('searchHistory', this.searchHistory)
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
    components: {
      EHeader,
      ShopList
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/scss/mixin";

  .search_page {
    margin-bottom: 2rem;
  }

  .search_form {
    background-color: #fff;
    padding: 0.5rem;
    display: flex;
    input {
      height: 1.5rem;
    }
    .search_input {
      flex: 4;
      border: 0.025rem solid $bc;
      @include sc(0.65rem, #333);
      border-radius: 0.125rem;
      background-color: #f2f2f2;
      font-weight: bold;
      padding: 0 0.25rem;
    }
    .search_submit {
      flex: 1;
      border: 0.025rem solid $blue;
      margin-left: .2rem;
      @include sc(0.65rem, #fff);
      border-radius: 0.125rem;
      background-color: $blue;
      font-weight: bold;
      padding: 0 0.25rem;
    }
  }

  .title_restaurant {
    font-size: 0.6rem;
    line-height: 2rem;
    text-indent: 0.5rem;
    font-weight: bold;
    color: #666;
  }

  .list_container {
    background-color: #fff;
  }

  .list_li {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    border-bottom: 0.025rem solid $bc;
    .item_left {
      margin-right: 0.25rem;
      .restaurant_img {
        @include wh(1.7rem, 1.7rem);
      }
    }
    .item_right {
      font-size: 0.55rem;
      flex: 1;
      .item_right_text {
        padding-bottom: 0.25rem;
        border-bottom: 0.025rem solid $bc;
        p {
          line-height: .9rem;
        }
        .pay_icon {
          margin-bottom: -0.08rem;
        }
      }
      .item_right_detail {
        margin-top: 0.25rem;
        li {
          font-size: 0;
          span {
            font-size: .5rem;
            vertical-align: middle;
            display: inline-block;
            margin-bottom: 0.2rem;
          }
          .activities_icon {
            @include sc(.5rem, #fff);
            font-weight: bold;
            padding: .04rem;
            border-radius: 0.15rem;
            margin-right: 0.125rem;
          }
          .only_phone {
            color: #FF6000;
          }
        }
      }
    }
  }

  .search_history {
    .history_list {
      background-color: #fff;
      border-bottom: 0.025rem solid $bc;
      @include font(0.7rem, 2rem);
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .history_text {
        display: inline-block;
        width: 80%;
      }
      .delete_icon {
        @include wh(1rem, 1rem);
      }
    }
    .clear_history {
      background-color: #fff;
      color: $blue;
      @include font(.7rem, 2rem);
      font-weight: bold;
      text-align: center;
    }
  }

  .search_none {
    margin: 0 auto;
    @include font(0.65rem, 1.75rem);
    color: #333;
    background-color: #fff;
    text-align: center;
    margin-top: 0.125rem;
  }
</style>
