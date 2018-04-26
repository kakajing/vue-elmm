<template>
  <div>
    <e-header :head-title="profileTitle" :go-back="goBack"></e-header>
    <section class="profile_number">
      <router-link to="/profile/info" class="profile_link">
        <img :src="getImgPath(this.avatar)" class="privateImage" v-if="this.avatar">
        <span class="privateImage" v-else>
          <svg class="privateImage_svg">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar_default"></use>
          </svg>
        </span>
        <div class="user_info">
          <p>{{userName}}</p>
          <p>
            <span class="user_icon">
              <svg class="icon_mobile" fill="#fff">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
              </svg>
            </span>
            <span class="icon_mobile_number">{{mobile}}</span>
          </p>
        </div>
        <span class="arrow">
          <svg class="arrow_svg" fill="#fff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>
          </svg>
        </span>
      </router-link>
    </section>
    <section class="info_data">
      <ul class="clear">
        <router-link to="/profile/balance" tag="li" class="info_data_link">
          <span class="info_data_top"><b>{{balance}}</b>元</span>
          <span class="info_data_bottom">我的余额</span>
        </router-link>
        <router-link to="/profile/benefit" tag="li" class="info_data_link">
          <span class="info_data_top"><b>{{count}}</b>个</span>
          <span class="info_data_bottom">我的优惠</span>
        </router-link>
        <router-link to="/profile/points" tag="li" class="info_data_link">
          <span class="info_data_top"><b>{{pointNumber}}</b>分</span>
          <span class="info_data_bottom">我的积分</span>
        </router-link>
      </ul>
    </section>
    <section class="profile_1reTe">
      <!--我的订单-->
      <router-link to="/order" class="myOrder">
        <aside>
          <svg fill="#4aa5f0">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
          </svg>
        </aside>
        <div class="myOrder_div">
          <span>我的订单</span>
          <span class="myOrder_divSvg">
            <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>
            </svg>
          </span>
        </div>
      </router-link>
      <!--积分商城-->
      <router-link to='/order' class="myOrder">
        <aside>
          <svg fill="#fc7b53">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
          </svg>
        </aside>
        <div class="myOrder_div">
          <span>积分商城</span>
          <span class="myOrder_divSvg">
            <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>
            </svg>
          </span>
        </div>
      </router-link>
      <!-- 饿了么会员卡 -->
      <router-link to='/vipcard' class="myOrder">
        <aside>
          <svg fill="#ffc636">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
          </svg>
        </aside>
        <div class="myOrder_div">
          <span>饿了么会员卡</span>
          <span class="myOrder_divSvg">
            <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>
            </svg>
          </span>
        </div>
      </router-link>
    </section>
    <section class="profile_1reTe">
      <!-- 服务中心 -->
      <router-link to='/service' class="myOrder">
        <aside>
          <svg fill="#4aa5f0">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
          </svg>
        </aside>
        <div class="myOrder_div">
          <span>服务中心</span>
          <span class="myOrder_divSvg">
            <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>
            </svg>
          </span>
        </div>
      </router-link>
      <!-- 下载饿了么APP -->
      <router-link to='/profile/service' class="myOrder">
        <aside>
          <svg fill="#3cabff">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
          </svg>
        </aside>
        <div class="myOrder_div" style="border-bottom:0;">
          <span>下载饿了么APP</span>
          <span class="myOrder_divSvg">
            <svg fill="#bbb">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow_right"></use>
            </svg>
          </span>
        </div>
      </router-link>
    </section>
    <foot-guide></foot-guide>
    <transition name="router_slid">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import {mapState} from 'vuex'
  import {getImgPath} from 'common/js/mixin'
  import FootGuide from 'base/footer/footGuide'

  export default {
    mixins: [getImgPath],
    data () {
      return {
        profileTitle: '我的',
        goBack: true,
        getUserInfo: {},   //得到数据
        userName: '',      //用户名
        mobile:'',        //电话号码
        balance: '',      //我的余额
        count: '',        //优惠券个数
        pointNumber: '',   //积分数
        avatar: ''        //头像地址
      }
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    mounted () {
      this.getUserInfo = this.userInfo
      this.avatar = this.getUserInfo.avatar
      this.userName = this.getUserInfo.username
      this.mobile = this.getUserInfo.mobile
      this.balance = this.getUserInfo.balance
      this.count = this.getUserInfo.gift_amount
      this.pointNumber = this.getUserInfo.point
    },
    components: {
      EHeader,
      FootGuide
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../common/scss/mixin";

  .profile_page{
    p, span{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
  }
  .profile_number{
    padding-top:1.95rem;
    .profile_link{
      display:block;
      display:flex;
      box-align: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background:$blue;
      padding: .666667rem .6rem;
      .privateImage{
        display:inline-block;
        @include wh(2.5rem,2.5rem);
        border-radius:50%;
        vertical-align:middle;
        .privateImage_svg{
          background:$fc;
          border-radius:50%;
          @include wh(2.5rem,2.5rem);
        }
      }
      .user_info{
        margin-left:.48rem;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        p{
          font-weight:700;
          @include sc(.8rem,$fc);
          .user_icon{
            @include wh(0.5rem,0.75rem);
            display:inline-block;
            vertical-align:middle;
            line-height:0.75rem;
            .icon_mobile{
              @include wh(100%,100%);
            }
          }
          .icon_mobile_number{
            display:inline-block;
            @include sc(.57333rem,$fc);

          }
        }

      }
      .arrow{
        @include wh(.46667rem,.98rem);
        display:inline-block;
        svg{
          @include wh(100%,100%);
        }
      }
    }
  }
  .info_data{
    width:100%;
    background:$fc;
    box-sizing: border-box;
    ul{
      .info_data_link{
        float:left;
        width:33.33%;
        display:inline-block;
        border-right:1px solid #f1f1f1;
        span{
          display:block;
          width:100%;
          text-align:center;
        }
        .info_data_top{
          @include sc(.55rem,#333);
          padding: .853333rem 0 .453333rem;
          b{
            display:inline-block;
            @include sc(1.2rem,#f90);
            font-weight:700;
            line-height:1rem;
            font-family: Helvetica Neue,Tahoma;
          }
        }
        .info_data_bottom{
          @include sc(.57333rem,#666);
          font-weight:400;
          padding-bottom:.453333rem;

        }
      }
      .info_data_link:nth-of-type(2){
        .info_data_top{
          b{
            color:#ff5f3e;
          }
        }

      }
      .info_data_link:nth-of-type(3){
        border:0;
        .info_data_top{
          b{
            color:#6ac20b;
          }
        }
      }
    }
  }
  .profile_1reTe{
    margin-top:.4rem;
    background:$fc;
    .myOrder{
      padding-left:1.6rem;
      display:flex;
      align-items: center;
      aside{
        @include wh(.7rem,.7rem);
        margin-left:-.866667rem;
        margin-right:.266667rem;
        display:flex;
        align-items: center;
        svg{
          @include wh(100%,100%);
        }
      }
      .myOrder_div{
        width:100%;
        border-bottom:1px solid #f1f1f1;
        padding:.433333rem .266667rem .433333rem 0;
        @include sc(.7rem,#333);
        display:flex;
        justify-content:space-between;
        span{
          display:block;
        }
        .myOrder_divSvg{
          @include wh(.46667rem,.466667rem);
          svg{
            @include wh(100%,100%);
          }
        }
      }
    }
    .myOrder:nth-of-type(3) .myOrder_div{
      border:0;
    }
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
