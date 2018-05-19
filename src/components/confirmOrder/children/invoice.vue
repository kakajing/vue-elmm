<template>
  <div class="rating_page">
    <e-header :head-title="headTitle" :go-back="goBack"></e-header>
    <section class="choose_invoice">
      <span>不需要开发票</span>
      <svg @click="chooseInvoice" :class="{choosed: invoice}">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
      </svg>
    </section>
    <div class="determine" @click="confirmInvoice">确定</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'

  export default {
    data () {
      return {
        headTitle: '选择发票',
        goBack: true,
        invoice: false   //是否需要发票
      }
    },
    methods: {
      chooseInvoice () {
        this.invoice = !this.invoice
      },
      confirmInvoice () {}
    },
    components: {
      EHeader
    }
  }

</script>

<style lang="scss" scoped>
  @import '../../../common/scss/mixin';

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
  .choose_invoice{
    @include fj;
    align-items: center;
    background-color: #fff;
    line-height: 2.5rem;
    margin-top: 0.5rem;
    padding: 0 .7rem;
    span{
      @include sc(.75rem, #333);
    }
    svg{
      @include wh(.8rem, .8rem);
      fill: #999;
    }
    .choosed{
      fill: #4cd964;
    }
  }
  .determine{
    background-color: #4cd964;
    @include sc(.7rem, #fff);
    text-align: center;
    margin: 0 .7rem;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    margin-top: 0.5rem;
  }

</style>
