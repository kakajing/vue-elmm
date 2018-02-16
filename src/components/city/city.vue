<template>
  <div class="city_container">
    <e-header :head-title="cityName" :go-back="goBack">
      <router-link to="/home" slot="changCity" class="chang_city">切换城市</router-link>
    </e-header>
    <form class="city_form" @submit.prevent>
      <div>
        <input type="search" ref="search" name="city" v-model="query" :placeholder="placeholder"
               class="city_input input_style" required/>
      </div>
      <div>
        <input type="submit" name="submit" class="city_submit input_style" @click="postPois"/>
      </div>
    </form>
    <div v-if="historyTitle" class="pois_search_history">搜索历史</div>
    <ul class="getpois_ul">
      <li v-for="(item, index) in placeList" :key="index" @click="nextPage(index, item.geohash)">
        <h4 class="pois_name ellipsis">{{item.name}}</h4>
        <p class="pois_address ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import { getCurrentCity, query } from 'api/city'
  import { getStore, setStore } from 'common/js/mUtils'

  export default{
    data () {
      return {
        placeholder: '输入学校、商务楼、地址',
        goBack: true,
        geohash: '',
        cityId: '',       // 当前城市id
        cityName: '',     // 当前城市名字
        placeList: [],     // 搜索城市列表
        placeHistory: [],   // 历史搜索记录
        historyTitle: true,  // 默认显示搜索历史头部，点击搜索后隐藏
        placeNone: false,     // 搜索无结果，显示提示信息
        query: ''             // 搜索地址
      }
    },
    mounted () {
      this.getCurrentCity()
      if (getStore('placeHistory')) {
        this.placeList = JSON.parse(getStore('placeHistory'))
      }
    },
    methods: {
      getCurrentCity () {
        getCurrentCity().then((res) => {
          this.cityName = res.name
          this.cityId = res.city_id
        })
      },
      postPois () {
        if (this.query) {
          query(this.query, this.geohash).then((res) => {
            this.historyTitle = false
            this.placeList = res
            if (res.length > 0) {
              this.placeNone = false
            }
          })
        }
      },
      /**
       * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
       * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
       */
      nextPage (index, geohash) {
        let history = getStore('placeHistory')
        let choosePlace = this.placeList[index]
        if (history) {
          let checkRepeat = false
          this.placeHistory = JSON.parse(history)
          this.placeHistory.forEach(item => {
            if (item.geohash === geohash) {
              checkRepeat = true
            }
          })
          if (!checkRepeat) {
            this.placeHistory.push(choosePlace)
          }
        } else {
          this.placeHistory.push(choosePlace)
        }
        // 保存数据
        setStore('placeHistory', this.placeHistory)
        this.$router.push({path: '/msite', query: {geohash}})
      }
    },
    components: {
      EHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/scss/mixin";

  .city_container {
    padding-top: 2.35rem;
  }

  .chang_city {
    right: 0.4rem;
    @include sc(0.6rem, #fff);
    @include ct
  }

  .city_form {
    background-color: #fff;
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-top: 0.4rem;
    div {
      width: 90%;
      margin: 0 auto;
      text-align: center;
      .input_style {
        border-radius: 0.1rem;
        margin-bottom: 0.4rem;
        @include wh(100%, 1.4rem)
      }
      .city_input {
        border: 1px solid $bc;
        padding: 0 0.3rem;
        @include sc(0.65rem, #333)
      }
      .city_submit {
        background-color: $blue;
        @include sc(0.65rem, #fff)
      }
    }
  }

  .pois_search_history {
    border-top: 1px solid $bc;
    border-bottom: 1px solid $bc;
    padding-left: 0.5rem;
    @include sc(0.7rem, #333)
  }

  .getpois_ul {
    background-color: #fff;
    border-top: 1px solid $bc;
    li {
      margin: 0 auto;
      padding-top: 0.65rem;
      border-bottom: 1px solid $bc;
      .pois_name {
        margin: 0 auto 0.35rem;
        width: 90%;
        @include sc(0.65rem, #333);
      }
      .pois_address {
        width: 90%;
        margin: 0 auto 0.55rem;
        @include sc(0.45rem, #999)
      }
    }
  }

  .search_none_place {
    margin: 0 auto;
    @include font(0.65rem, 1.75rem);
    color: #333;
    background-color: #fff;
    text-indent: 0.5rem;
  }

</style>
