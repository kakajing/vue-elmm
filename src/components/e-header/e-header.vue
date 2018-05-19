<template>
  <header id="head_top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <section class="head_goBack" v-if="goBack" @click="back">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </section>
    <router-link :to="userInfo? '/profile':'login'" v-if="signinUp" class="head_login">
      <svg class="user_avatar" v-if="userInfo">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
      </svg>
      <span class="login_span" v-else>登陆|注册</span>
    </router-link>
    <section class="title_head ellipsis" v-if="headTitle">
      <span class="title_text">{{headTitle}}</span>
    </section>
    <slot name="msite-title"></slot>
    <slot name="changCity"></slot>
    <slot name="changeLogin"></slot>
  </header>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'

  export default{
    props: {
      // 显示登录注册
      signinUp: {
        type: String,
        default: ''
      },
      headTitle: {
        type: String,
        default: ''
      },
      goBack: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    methods: {
      back () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/mixin.scss";

  #head_top{
    background-color: $blue;
    position: fixed;
    z-index: 999999999999;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem)
  }
  .head_goBack{
    left: 0.4rem;
    @include wh(0.6rem,0.8rem);
    @include ct;
  }
  .head_login{
    right: 0.55rem;
    @include sc(0.65rem, #fff);
    @include ct;
    .login_span{
      color: #fff;
    }
    .user_avatar{
      fill: #fff;
      @include wh(.8rem, .8rem)
    }
  }
  .title_head{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text{
      @include sc(0.8rem, #fff);
      text-align: center;
      font-weight: bold;
    }
  }
</style>
