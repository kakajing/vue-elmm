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
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style lang="scss">
  @import "common/scss/common";
  

</style>
