<template>
  <div>
    <e-header signin-up='home'>
      <span slot="logo" class="head_logo" @click="reload">clm.me</span>
    </e-header>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityId" class="guess_city">
        <span>{{guessCity}}</span>
        <!--<span></span>-->
      </router-link>
    </nav>
    <section class="group_city_container">
      <ul class="letter_classify">
        <li v-for="(value, key, index) in sortGroupCity" :key="key" class="letter_classify_li">
          <h4 class="city_title">{{key}}
            <span v-if="index == 0">(按字母排序)</span>
          </h4>
          <ul class="groupCity_name_container cityList clear">
            <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
              {{item.name}}
            </router-link>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getCities, getGuess } from 'api/home'
  import EHeader from 'components/e-header/e-header'

  export default{
    data () {
      return {
        guessCity: '',    // 当前城市
        guessCityId: '',  // 当前城市id
        groupCity: {}     // 所有城市列表
      }
    },
    computed: {
      // 将获取的数据按照A-Z字母开头排序
      sortGroupCity () {
        let sortObj = {}
        for (let i = 65; i <= 90; i++) {
          if (this.groupCity[String.fromCharCode(i)]) {
            sortObj[String.fromCharCode(i)] = this.groupCity[String.fromCharCode(i)]
          }
        }
        return sortObj
      }
    },
    created () {
      this.getCities()
      this.getGuess()
    },
    methods: {
      getCities () {
        getCities().then((res) => {
          this.groupCity = res
        })
      },
      getGuess () {
        getGuess().then((res) => {
          this.guessCity = res.name
          this.guessCityId = res.id
        })
      },
      reload () {
        // 点击图标刷新页面
        window.location.reload()
      }
    },
    components: {
      EHeader
    }
  }
</script>

<style scoped lang="scss">
  @import '../../common/scss/mixin.scss';

  .head_logo {
    left: 0.4rem;
    font-weight: 400;
    @include sc(0.7rem, #fff);
    @include wh(2.3rem, 0.7rem);
    @include ct;
  }

  .city_nav {
    margin-top: 2.35rem;
    border-top: 1px solid $bc;
    background-color: #fff;
    margin-bottom: 0.4rem;
    .city_tip {
      @include fj;
      line-height: 1.45rem;
      padding: 0 0.45rem;
      span:nth-of-type(1){  // 表示其父元素的第1个span元素的每个span
        @include sc(0.55rem,#666);
      }
      span:nth-of-type(2){
        font-weight: 900;
        @include sc(0.475rem, #9f9f9f);
      }
    }
    .guess_city{
      @include fj;
      height: 1.8rem;
      align-items: center;
      text-decoration: none;
      padding: 0 0.45rem;
      border-top: 1px solid $bc;
      border-bottom: 2px solid $bc;
      @include font(0.75rem, 1.8rem);
      span:nth-of-type(1){
        color: $blue;
      }
    }
  }
  #hot_city_container{
    background-color: #fff;
    margin-bottom: 0.4rem;
  }
  .city_title{
    color: #666;
    font-weight: 400;   // 设置文本的粗细
    text-indent: 0.45rem;  // 文本块中首行文本的缩进
    border-top: 2px solid $bc;
    border-bottom: 1px solid $bc;
    @include font(0.55rem, 1.45rem, "Helvetica Neue");
    span{
      @include sc(0.475rem, #999);
    }
  }
  .cityList{
    li{
      float: left;
      text-align: center;
      color: $blue;
      border-bottom: 0.025rem solid $bc;
      border-right: 0.025rem solid $bc;
      @include wh(25%,1.75rem);
      @include font(0.6rem, 1.75rem);
    }
    li:nth-of-type(4n){
      border-right: none;
    }
  }
  .letter_classify_li{
    margin-bottom: 0.4rem;
    background-color: #fff;
    border-bottom: 1px solid $bc;
    list-style-type: none;
    .groupCity_name_container{
      li{
        color: #666;
      }
    }
  }

</style>
