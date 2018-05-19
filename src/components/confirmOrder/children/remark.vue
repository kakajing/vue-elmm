<template>
  <div class="rating_page">
    <section>
      <e-header :head-title="headTitle" :go-back="goBack"></e-header>
      <section class="quick_remark">
        <header class="header_style">快速备注</header>
        <ul class="remark_arr_list_ul">
          <li class="remark_arr_list_li">
            <span></span>
          </li>
        </ul>
      </section>
      <section class="input_remark quick_remark">
        <header class="header_style">其他备注</header>
        <textarea class="input_text" v-model="inputText" placeholder="请输入备注内容(可不填)"></textarea>
      </section>
      <div class="determine">确定</div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import {remarks} from 'api/order'

  export default {
    data () {
      return {
        headTitle: '订单备注',
        goBack: true,
        inputText: null
      }
    },
    components: {
      EHeader
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../../common/scss/mixin";

  .rating_page{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 204;
    padding-top: 1.95rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .header_style{
    @include sc(.65rem, #333);
    line-height: 2rem;
  }
  .quick_remark{
    background-color: #fff;
    margin-top: .4rem;
    padding: 0 .6rem 1rem;
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        margin-right: .6rem;
        margin-bottom: .6rem;
        span{
          @include sc(.6rem, #333);
          padding: .3rem .6rem;
          border: 0.025rem solid #3190e8;
          border-left: 0;
        }
        .first{
          border-left: 0.025rem solid #3190e8;
          border-top-left-radius: .2rem;
          border-bottom-left-radius: .2rem;
        }
        .last{
          border-top-right-radius: .2rem;
          border-bottom-right-radius: .2rem;
        }
        .choosed{
          color: #fff;
          background-color: #3190e8;
        }
      }
    }
  }
  .input_remark{
    background-color: #fff;
    .input_text{
      width: 100%;
      background-color: #f9f9f9;
      border: 0.025rem solid #eee;
      resize: none;
      min-height: 4.5rem;
      border-radius: .2rem;
      @include sc(.6rem, #666);
      padding: .5rem;
    }
  }
  .determine{
    background-color: #4cd964;
    @include sc(.7rem, #fff);
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
  }

</style>
