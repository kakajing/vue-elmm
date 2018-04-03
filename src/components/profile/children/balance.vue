<template>
  <div class="rating_page">
    <e-header :head-title="headTitle" :go-back="goBack"></e-header>
    <section>我的余额</section>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'

  export default {
    data () {
      return {
        headTitle: '我的余额',
        goBack: true
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 202;
    padding-top: 1.95rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }

</style>
