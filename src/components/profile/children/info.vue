<template>
  <div class="rating_page">
    <e-header :head-title="headTitle" :go-back="goBack"></e-header>
    <section class="profile_info">
      <section class="headPortrait">
        <input type="file" class="profileInfoPanel_upload">
        <h2>头像</h2>
        <div class="headPortrait_div">
          <span class="headPortrait_div_top">
            <svg class="">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar_default"></use>
            </svg>
          </span>
          <span class="headPortrait_div_bottom">
            <svg fill="#d8d8d8">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>
            </svg>
          </span>
        </div>
      </section>
      <router-link to="" class="info_router">
        <section class="headPortrait headPortraitWo">
          <h2>用户名</h2>
          <div class="headPortrait_div">
            <p>fhsdfhdj</p>
            <span class="headPortrait_div_bottom">
              <svg fill="#d8d8d8">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>
              </svg>
            </span>
          </div>
        </section>
      </router-link>
      <router-link to="" class="info_router">
        <section class="headPortrait headPortraitWo headPortraitThree">
          <h2>收货地址</h2>
          <div class="headPortrait_div">
            <span class="headPortrait_div_bottom">
                <svg fill="#d8d8d8">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>
                </svg>
            </span>
          </div>
        </section>
      </router-link>
      <section class="bind_phone">
        账号绑定
      </section>
      <router-link to="" class="info_router">
        <section class="headPortrait headPortraitWo headPortraitThree">
          <h2><img src="../common/imgs/bindphone.png" style="display:inline-block;margin-right:.4rem;" alt="">手机</h2>
          <div class="headPortrait_div">
            <p>15800319949</p>
            <span class="headPortrait_div_bottom">
              <svg fill="#d8d8d8">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>
              </svg>
            </span>
          </div>
        </section>
      </router-link>
      <section class="bind_phone">
        安全设置
      </section>
      <router-link to="" class="info_router">
        <section class="headPortrait headPortraitWo headPortraitThree">
          <h2>登录密码</h2>
          <div class="headPortrait_div">
            <p>修改</p>
            <span class="headPortrait_div_bottom">
              <svg fill="#d8d8d8">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>
              </svg>
            </span>
          </div>
        </section>
      </router-link>
      <section class="exitLogin">退出登录</section>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'

  export default {
    data () {
      return {
        headTitle: '帐户信息',
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

  .info_page{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f2f2f2;
    z-index: 202;
    padding-top: 1.95rem;
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .profile_info{
    @include wh(100%,3.1rem);
    .profileInfoPanel_upload{
      display: block;
      position: absolute;
      opacity: 0;
      top: 2.35rem;
      left: 0;
      @include wh(100%,3.1rem);
    }
    .headPortrait{
      margin-top:.4rem;
      padding:.5rem .4rem;
      @include fj(space-between);
      align-items:center;
      border-top:1px solid #ddd;
      background:#fff;
      h2{
        @include sc(.6rem,#333);
        font-weight:500;
        display:flex;
        align-items:center;
      }
      .headPortrait_div{
        span{
          display:inline-block;

          svg{
            @include wh(100%,100%);
          }
        }
        .headPortrait_div-top{
          @include wh(2rem,2rem);
          vertical-align:middle;
        }
        .headPortrait_div_bottom{
          @include wh(.66667rem,1.4rem);
          position:relative;
          top:0.44rem;
        }
      }
    }
    .headPortraitWo{
      margin-top:0;
      padding:.3rem .4rem;
      .headPortrait_div{
        @include fj(left);
        p{
          text-align:left;
          line-height:1.39rem;
          @include sc(.7rem,#999);
          margin-right:.2rem;
          font-weight:100;
          font-family:Arial;
        }
        .headPortrait_div_bottom{
          top:0;
        }
      }
    }
    .headPortraitThree{
      border-bottom:1px solid #ddd;
    }
    .bind_phone{
      padding:.4rem .4rem;
      @include sc(.5rem,#666);
    }
    .exitLogin{
      width:96%;
      margin:1.3rem auto 0;
      line-height:1.5rem;
      border-radius:5px;
      text-align:center;
      background:#d8584a;
      @include sc(.6rem,#fff);
    }
    .exitLogin:active{
      opacity:.8;
    }
  }
  .info_router{
    display:block;
  }
</style>
