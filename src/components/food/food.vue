<template>
  <div class="food_container">
    <e-header :head-title="headTitle" :go-back="goBack"></e-header>
    <section class="sort_container">
      <div class="sort_item" :class="{choose_type:sortBy == 'food'}">
        <div class="sort_item_container" @click="chooseType('food')">
          <div class="sort_item_border">
            <span :class="{category_title: sortBy == 'food'}">{{foodTitle}}</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"/>
            </svg>
          </div>
        </div>
        <transition name="showlist" v-if="category">
          <section v-show="sortBy == 'food'" class="category_container sort_detail_type">
            <section class="category_left">
              <ul>
                <li class="category_left_li"
                    v-for="(item, index) in category" :key="index"
                    :class="{category_active:restaurant_category_id == item.id}"
                    @click="selectCategoryName(item.id, index)">
                  <section>
                    <span>{{item.name}}</span>
                  </section>
                  <section>
                    <span class="category_count">{{item.count}}</span>
                    <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1"
                         class="category_arrow">
                      <path d="M0 0 L6 4 L0 8" stroke="#666" stroke-width="1.5" fill="none"/>
                    </svg>
                  </section>
                </li>
              </ul>
            </section>
            <section class="category_right">
              <ul>
                <li v-for="(detailItem, index) in categoryDetail" :key="detailItem.id"
                    v-if="index"
                    class="category_right_li"
                    @click="getCategoryIds(detailItem.id, detailItem.name)"
                    :class="{category_right_choosed: restaurant_category_ids == detailItem.id || (!restaurant_category_ids)&&index == 0}"
                >
                  <img :src="getImgPath(detailItem.image_url)" v-if="index" class="category_icon">
                  <span>{{detailItem.name}}</span>
                  <span>{{detailItem.count}}</span>
                </li>
              </ul>
            </section>
          </section>
        </transition>
      </div>
      <div class="sort_item" :class="{choose_type:sortBy == 'sort'}">
        <div class="sort_item_container" @click="chooseType('sort')">
          <div class="sort_item_border">
            <span :class="{category_title: sortBy == 'sort'}">排序</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"/>
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <section class="sort_detail_type" v-show="sortBy == 'sort'">
            <ul class="sort_list_container" @click="foodSort($event)">
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                </svg>
                <p id="0" :class="{sort_select: sortByType == 0}">
                  <span>智能排序</span>
                  <svg v-if="sortByType == 0">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
                </svg>
                <p id="5" :class="{sort_select: sortByType == 5}">
                  <span>距离最近</span>
                  <svg v-if="sortByType == 5">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                </svg>
                <p id="6" :class="{sort_select: sortByType == 6}">
                  <span>销量最高</span>
                  <svg v-if="sortByType == 6">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
                </svg>
                <p id="1" :class="{sort_select: sortByType == 1}">
                  <span>起送价最低</span>
                  <svg v-if="sortByType == 1">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                </svg>
                <p id="2" :class="{sort_select: sortByType == 2}">
                  <span>配送速度最快</span>
                  <svg v-if="sortByType == 2">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
                </svg>
                <p id="3" :class="{sort_select: sortByType == 3}">
                  <span>评分最高</span>
                  <svg v-if="sortByType == 3">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
            </ul>
          </section>
        </transition>
      </div>
      <div class="sort_item" :class="{choose_type:sortBy == 'activity'}">
        <div class="sort_item_container" @click="chooseType('activity')">
          <span :class="{category_title: sortBy == 'activity'}">筛选</span>
          <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
            <polygon points="0,3 10,3 5,8"/>
          </svg>
        </div>
        <transition name="showlist">
          <section v-show="sortBy == 'activity'" class="sort_detail_type filter_container">
            <section style="width: 100%;">
              <header class="filter_header_style">配送方式</header>
              <ul class="filter_ul">
                <!--<li v-for="item in delivery" :key="item.id" @click="selectDeliveryMode(item.id)" class="filter_li">-->
                <li class="filter_li" :key="deliveryId" @click="selectDeliveryMode(deliveryId)">
                  <svg :style="{opacity: (deliveryId == 0)&&(deliveryMode !== 0)? 0: 1}">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="deliveryMode == deliveryId? '#selected':'#fengniao'"></use>
                  </svg>
                  <span :class="{selected_filter: deliveryMode == deliveryId}">{{deliveryName}}</span>
                </li>
              </ul>
            </section>
            <section style="width: 100%">
              <header class="filter_header_style">商家属性（可以多选）</header>
              <ul class="filter_ul" style="padding-bottom: .5rem;">
                <li class="filter_li" v-for="(item,index) in supports" :key="item.id" @click="selectSupportIds(index, item.id)">
                  <svg v-show="support_ids[index].status" class="activity_svg">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                  <span class="filter_icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                  <span :class="{selected_filter: support_ids[index].status}">{{item.name}}</span>
                </li>
              </ul>
            </section>
            <footer class="confirm_filter">
              <div class="clear_all filter_button_style" @click="clearSelect">清空</div>
              <div class="confirm_select filter_button_style" @click="confirmSelectFun">
                确定
                <span v-show="filterNum">({{filterNum}})</span>
              </div>
            </footer>
          </section>
        </transition>
      </div>
    </section>
    <transition name="showcover">
      <div class="back_cover" v-show="sortBy"></div>
    </transition>
    <section class="shop_list_container">
      <shop-list :geohash="geohash" :restaurantCategoryId="restaurant_category_id"
                 :shopListArr="shopListArr" :restaurantCategoryIds="restaurant_category_ids"
                 :sortByType="sortByType" :deliveryMode="deliveryMode"
                 :supportIds="support_ids"
      >
      </shop-list>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import ShopList from 'base/shop-list/shop-list'
  import { msiteAdress } from 'api/msite'
  import { getFoodCategory, getFoodRestaurants, getFoodDelivery, getFoodFilter, getFoodSort } from 'api/food'
  import { imgBaseUrl } from 'common/js/config'
  import { mapState, mapMutations } from 'vuex'
  import {getImgPath} from 'common/js/mixin'

  export default{
    mixins: [getImgPath],
    data () {
      return {
        headTitle: '',
        goBack: true,
        geohash: '',
        foodTitle: '',
        imgBaseUrl: imgBaseUrl,
        restaurant_category_id: '',   // 食品类型id值
        restaurant_category_ids: '', // 筛选类型的id
        sortBy: '', // 筛选的条件
        category: null, // category分类左侧数据
        categoryDetail: null, // category分类右侧的详细数据
        sortByType: null, // 根据何种方式排序
        extras: ['activities', 'tags'],
        shopListArr: [],
        delivery: null,        // 配送方式数据
        supports: [],        // 商家支持活动数据
        deliveryMode: null,     // 选中的配送方式
        support_ids: [],        // 选中的商铺活动列表
        filterNum: 0,      // 所选中的所有样式的集合
        deliveryId: '',
        deliveryName: '',
      }
    },
    computed: {
      ...mapState([
        'latitude', 'longitude'
      ])
    },
    created () {
      this.SET_LATITUDE(this.latitude)
      this.SET_LONGITUDE(this.longitude)
      this.initData()
    },
    mounted () {
      this.getFoodRestaurants()
      this.getFoodCategory()
      this.getFoodDelivery()
    },
    methods: {
      initData () {
        this.geohash = this.$route.query.geohash
        this.headTitle = this.$route.query.title
        this.foodTitle = this.headTitle
        this.restaurant_category_id = this.$route.query.restaurant_category_id
        // 刷新页面时，vuex状态丢失，经度纬度需要重新获取
       if (!this.latitude) {
         msiteAdress(this.geohash).then(res => {
           this.SET_LATITUDE(res.latitude)
           this.SET_LONGITUDE(res.longitude)
         })
       }
      },
      // 获取category 种类列表
      getFoodCategory() {
        getFoodCategory(this.latitude, this.longitude).then(res => {
          this.category = res
          this.category.forEach(item => {
            if (this.restaurant_category_id === item.id) {
              this.categoryDetail = item.sub_categories
            }
          })
        })
      },
      // 获取商铺列表
      getFoodRestaurants () {
        getFoodRestaurants(this.latitude, this.longitude, this.extras, this.restaurant_category_id).then(res2 => {
          this.shopListArr = Array.from(Object.keys(res2.items).map(key => res2.items[key].restaurant))
//          console.log(res2)
        })
      },
      // 获取筛选列表的配送方式及商铺活动
      getFoodDelivery () {
        getFoodDelivery(this.latitude, this.longitude).then(res => {
          this.delivery = res.delivery_mode
          this.deliveryId = res.delivery_mode.id
          this.deliveryName = res.delivery_mode.text
          this.supports = res.supports
          this.supports.forEach((item, index) => {
            this.support_ids[index] = {status: false, id: item.id}
          })
        })

      },
      // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
      chooseType (type) {
        if (this.sortBy !== type) {
          this.sortBy = type
          // food选项中头部标题发生改变，需要特殊处理
          if (type === 'food') {
            this.foodTitle = '分类'
          } else {
            // 将foodTitle 和 headTitle 进行同步
            this.foodTitle = this.headTitle
          }
        } else {
          // 再次点击相同选项时收回列表
          this.sortBy = ''
          if (type === 'food') {
            this.foodTitle = this.headTitle
          }
        }
      },
      // 选中Category左侧列表的某个选项时，右侧渲染相应的sub_categories列表
      selectCategoryName (id, index) {
        // 第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
        if (index === 0) {
          this.restaurant_category_ids = null
          this.sortBy = ''
        } else {
          // 不是第一个选项时，右侧展示其子级sub_categories的列表
          this.restaurant_category_id = id
          this.categoryDetail = this.category[index].sub_categories
        }
      },
      // 选中Category右侧列表的某个选项时，进行筛选，重新获取数据并渲染
      getCategoryIds (id, name) {
        this.restaurant_category_ids = id
        this.sortBy = ''
        this.foodTitle = this.headTitle = name
      },
      // 筛选选项中的配送方式选择
      selectDeliveryMode (id) {
        // delivery_mode为空时，选中当前项，并且filterNum加一
        if (this.deliveryMode === null) {
          this.filterNum++
          this.deliveryMode = id
          // delivery_mode为当前已有值时，清空所选项，并且filterNum减一
        } else if (this.deliveryMode === id) {
          this.filterNum--
          this.deliveryMode = null
          // delivery_mode已有值且不等于当前选择值，则赋值delivery_mode为当前所选id
        } else {
          this.deliveryMode = id
        }
      },
      // 点击商家活动，状态取反
      selectSupportIds (index, id) {
        // 数组替换新的值
        this.support_ids.splice(index, 1, {status: !this.support_ids[index].status, id})
        // 重新计算filterNum的个数
        this.filterNum = this.delivery_mode === null ? 0 : 1
        this.support_ids.forEach(item => {
          if (item.status) {
            this.filterNum++
          }
        })
      },
      clearAll () {
        this.deliveryMode = null
      },
      // 只有点击清空按钮才清空数据，否则一直保持原有状态
      clearSelect () {
        this.support_ids.map(item => {
          item.status = false
        })
        this.filterNum = 0
      },
      // 点击确认
      confirmSelectFun () {
        getFoodFilter(this.latitude, this.longitude, this.extras, this.support_ids, this.deliveryMode, this.restaurant_category_id).then(res => {
          this.shopListArr = Array.from(Object.keys(res.items).map(key => res.items[key].restaurant))
        })
        this.sortBy = ''
      },
      // 点击某个排序方式，获取相应数据
      foodSort (event) {
        this.sortByType = event.target.getAttribute('id')
        console.log(this.sortByType)
        getFoodSort(this.latitude, this.longitude, this.extras, this.sortByType, this.restaurant_category_id).then(res => {
          this.shopListArr = Array.from(Object.keys(res.items).map(key => res.items[key].restaurant))
        })
        this.sortBy = ''
      },
      ...mapMutations([
        'SET_LATITUDE',
        'SET_LONGITUDE'
      ])
    },
    components: {
      EHeader,
      ShopList
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/scss/mixin";

  .food_container {
    padding-top: 3.6rem;
  }

  .sort_container {
    background-color: #fff;
    border-bottom: 0.025rem solid #f1f1f1;
    position: fixed;
    top: 1.95rem;
    right: 0;
    width: 100%;
    display: flex;
    z-index: 13;
    box-sizing: border-box;
    .sort_item {
      @include sc(0.55rem, #444);
      @include wh(33.3%, 1.6rem);
      text-align: center;
      line-height: 1rem;
      .sort_item_container {
        @include wh(100%, 100%);
        position: relative;
        z-index: 14;
        background-color: #fff;
        box-sizing: border-box;
        padding-top: .3rem;
        .sort_item_border {
          height: 1rem;
          border-right: 0.025rem solid $bc;
        }
      }
      .sort_icon {
        vertical-align: middle;
        transition: all .3s;
        fill: #666;
      }

    }
    .choose_type {
      .sort_item_container {

        .category_title {
          color: $blue;
        }
        .sort_icon {
          transform: rotate(180deg);
          fill: $blue;
        }
      }
    }
    .showlist-enter-active, .showlist-leave-active {
      transition: all .3s;
      transform: translateY(0);
    }
    .showlist-enter, .showlist-leave-active {
      opacity: 0;
      transform: translateY(-100%);
    }
    .sort_detail_type {
      width: 100%;
      position: absolute;
      display: flex;
      top: 1.6rem;
      left: 0;
      border-top: 0.025rem solid $bc;
      background-color: #fff;
    }
    .category_container {
      .category_left {
        flex: 1;
        background-color: #f1f1f1;
        height: 16rem;
        overflow-y: auto;
        span {
          @include sc(0.5rem, #666);
          line-height: 1.8rem;
        }
        .category_left_li {
          @include fj;
          padding: 0 0.5rem;
          .category_count {
            background-color: #ccc;
            @include sc(.4rem, #fff);
            padding: 0 .1rem;
            border: 0.025rem solid #ccc;
            border-radius: 0.8rem;
            vertical-align: middle;
            margin-right: 0.25rem;
          }
          .category_arrow {
            vertical-align: middle;
          }
        }
        .category_active {
          background-color: #fff;
        }
      }
      .category_right {
        flex: 1;
        background-color: #fff;
        padding-left: 0.5rem;
        height: 16rem;
        overflow-y: auto;
        .category_right_li {
          @include fj;
          height: 1.8rem;
          line-height: 1.8rem;
          padding-right: 0.5rem;
          border-bottom: 0 solid $bc;
          .category_icon {
            @include wh(2rem, 2rem);
            vertical-align: middle;
            margin-right: 0;
          }
          span {
            left: 1rem;
            color: #666;
          }
        }
        .category_right_choosed {
          span {
            color: $blue;
          }
        }
      }
    }
    .sort_list_container {
      width: 100%;
      .sort_list_li {
        height: 2.5rem;
        display: flex;
        align-items: center;
        svg {
          @include wh(0.7rem, 0.7rem);
          margin: 0 .3rem 0 .8rem;
        }
        p {
          line-height: 2.5rem;
          flex: auto;
          text-align: left;
          text-indent: 0.25rem;
          border-bottom: 0.025rem solid $bc;
          @include fj;
          align-items: center;
          span {
            color: #666;
          }
        }
        .sort_select {
          span {
            color: $blue;
          }
        }
      }
    }
    .filter_container {
      flex-direction: column;
      align-items: flex-start;
      min-height: 10.6rem;
      background-color: #f1f1f1;
      .filter_header_style {
        @include sc(0.4rem, #333);
        line-height: 1.5rem;
        height: 1.5rem;
        text-align: left;
        padding-left: .5rem;
        background-color: #fff;
      }
      .filter_ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 0.5rem;
        background-color: #fff;
        .filter_li {
          display: flex;
          align-items: center;
          border: 0.025rem solid #eee;
          @include wh(4.7rem, 1.4rem);
          margin-right: 0.25rem;
          border-radius: 0.125rem;
          padding: 0 0.25rem;
          margin-bottom: 0.25rem;
          svg {
            @include wh(.8rem, .8rem);
            margin-right: 0.125rem;
          }
          span {
            @include sc(0.4rem, #333);
          }
          .filter_icon {
            @include wh(.8rem, .8rem);
            font-size: 0.5rem;
            border: 0.025rem solid $bc;
            border-radius: 0.15rem;
            margin-right: 0.25rem;
            line-height: .8rem;
            text-align: center;
          }
          .activity_svg {
            margin-right: .25rem;
          }
          .selected_filter {
            color: $blue;
          }
        }
      }
      .confirm_filter {
        display: flex;
        background-color: #f1f1f1;
        width: 100%;
        padding: .3rem .2rem;
        .filter_button_style {
          @include wh(50%, 1.8rem);
          font-size: 0.8rem;
          line-height: 1.8rem;
          border-radius: 0.2rem;
        }
        .clear_all {
          background-color: #fff;
          margin-right: .5rem;
          border: 0.025rem solid #fff;
        }
        .confirm_select {
          background-color: #56d176;
          color: #fff;
          border: 0.025rem solid #56d176;
          span {
            color: #fff;
          }
        }
      }
    }
  }

  .showcover-enter-active, .showcover-leave-active {
    transition: opacity .3s
  }

  .showcover-enter, .showcover-leave-active {
    opacity: 0
  }

  .back_cover {
    position: fixed;
    @include wh(100%, 100%);
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.3);
  }
</style>
