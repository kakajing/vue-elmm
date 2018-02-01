<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <svg-icon></svg-icon>
  </div>
</template>

<script type="text/ecmascript-6">
  import SvgIcon from 'base/svg/svg'

  export default {
    components: {
      SvgIcon
    }
  }
</script>

<style lang="scss">
  @import "common/scss/common";

  .router-fade-enter-active, .router-fade-leave-active{
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active{
    opacity: 0;
  }

</style>
