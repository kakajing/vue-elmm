<!--<template>
  <div class="loading-container">
    <div class="load-img" :style="{backgroundPositionY: -(positionY%7)*2.5 + 'rem'}"></div>
    <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
    </svg>
  </div>
</template>-->
<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    /* data () {
     return {
     positionY: 0,
     timer: null
     }
    mounted () {
      this.timer = setInterval(() => {
        this.positionY++
      }, 600)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    } */
    props: {
      title: {
        type: String,
        default: '拼命加载中...'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../common/scss/mixin";

  /*@keyframes load {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes ellipse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.3);
    }
    100% {
      transform: scale(1);
    }
  }

  .loading_container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include wh(2.5rem, 2.5rem);
  }

  .load_img {
    @include wh(100%, 100%);
    background: url(loading.gif) no-repeat 0 0;
    background-size: 2.5rem auto;
    transform: translateY(0px);
    animation: load .6s infinite ease-in-out;
    position: relative;
    z-index: 11;
  }

  .load_ellipse {
    position: absolute;
    @include wh(2.6rem, 2rem);
    top: 2.2rem;
    left: 0.2rem;
    z-index: 10;
    animation: ellipse .6s infinite ease-in-out;
  }*/

  .loading {
    width: 100%;
    text-align: center;
    .desc{
      line-height: 20px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
</style>

