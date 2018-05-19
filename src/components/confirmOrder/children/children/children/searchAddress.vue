<template>
  <div class="search_address_page">
    <section>
      <e-header :head-title="headTitle" :go-back="goBack"></e-header>
      <form class="search_form">
        <input type="search" name="search" placeholder="请输入小区/写字楼/学校等" v-model="searchValue">
        <button @click.prevent="searchPlace()">搜索</button>
      </form>
      <ul class="address_list">
        <li>
          <h4></h4>
          <p></p>
        </li>
      </ul>
      <div class="empty_tips">
        <p>找不到地址？</p>
        <p>尝试输入小区、写字楼或学校名</p>
        <p>详细地址（如门牌号等）可稍后输入哦</p>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'

  export default {
    data () {
      return {
        headTitle: '搜索',
        goBack: true,
        searchValue: null,
        searchData: null
      }
    },
    methods: {
      searchPlace () {
      }
    },
    components: {
      EHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../../common/scss/mixin';

  .search_address_page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 204;
    overflow-y: auto;
    padding-top: 1.95rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .search_form{
    display: flex;
    padding: .7rem;
    input{
      @include sc(.65rem, #999);
      flex: 4;
      background-color: #f1f1f1;
      margin-right: .6rem;
      height: 1.5rem;
      border-radius: 0.15rem;
      padding: 0 .4rem;
    }
    button{
      flex: 1;
      @include sc(.65rem, #fff);
      background-color: $blue;
      border-radius: 0.15rem;
    }
  }
  .address_list{
    padding: .7rem;
    li{
      padding: .7rem 0;
      border-bottom: 0.025rem solid #f5f5f5;
      line-height: 1rem;
      h4{
        @include sc(.75rem, #555);
      }
      p{
        @include sc(.65rem, #999);
      }
    }
  }
  .empty_tips{
    @include center;
    width: 100%;
    p{
      @include sc(.5rem, #aaa);
      line-height: .7rem;
      text-align: center;
    }
  }
</style>
