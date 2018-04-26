<template>
  <div class="order_page">
    <e-header :head-title="title" :go-back="goBack"></e-header>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'

  export default {
    data () {
      return {
        title: '订单列表',
        goBack: true
      }
    },
    components: {
      EHeader
    }
  }

</script>

<style>

</style>
