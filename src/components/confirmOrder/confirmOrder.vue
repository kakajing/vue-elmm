<template>
  <div>
    <e-header :head-title="headTitle" :go-back="goBack"></e-header>
    <div class="confirmOderContainer">确认订单页</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'

  export default {
    data () {
      return {
        headTitle: '确认订单',
        goBack: true
      }
    },
    components: {
      EHeader
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/scss/mixin";

  .confirmOrderContainer{
    padding-top: 1.95rem;
  }
</style>
