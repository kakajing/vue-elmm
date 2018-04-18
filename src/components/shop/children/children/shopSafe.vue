<template>
  <div class="safe_shop">
    <e-header :head-title="headTitle" :go-back="goBack"></e-header>
    <section class="scroll_container" id="scroll_section">
      <section>
        <section class="shop_status_container">
          <header>食品监督安全公示</header>
          <section class="shop_status_detail">
            <div>
              <svg class="shop_status" v-if="shopDetail.status == 1">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-well"></use>
              </svg>
              <svg class="res-well" v-else>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-bad"></use>
              </svg>
            </div>
            <div class="check_date">
              <p>
                <span>监督检查结果：</span>
                <span class="shop_status_well" v-if="shopDetail.status == 1">良好</span>
                <span class="shop_status_bad" v-else>差</span>
              </p>
            </div>
          </section>
        </section>
        <section class="shop_status_container">
          <header>
            <span>工商登记信息</span>
          </header>
          <ul>
            <li>
              <p>单位名称：{{qualificationData.corp_name}}</p>
            </li>
            <li>
              <p>经营地址：{{qualificationData.license_location}}</p>
            </li>
            <li>
              <p>法定代表人：{{qualificationData.license_legal_person}}</p>
            </li>
            <li>

            <li>
              <p>经营范围</p>
              <!--<p>{{shopDetail.identification.operation_period}}</p>-->
            </li>
          </ul>
        </section>
        <section class="shop_status_container">
          <header>餐饮许可证</header>
          <ul>
            <li>
              <p>经营范围： {{qualificationData.service_license_business_scope}}</p>
            </li>
            <li>
              <p>有效期：{{qualificationData.service_license_expire_date}}</p>
            </li>
            <li>
              <p>许可证号：{{qualificationData.restaurant_service_licence_no}}</p>
            </li>
            <li>
              <p>发证时间</p>
              <!--<p>{{shopDetail.identification.licenses_scope}}</p>-->
            </li>
          </ul>
        </section>
        <section class="license_img shop_status_container">
          <header>许可证书</header>
          <div class="img_container">
            <img :src="getImgPath(qualificationData.images)">
          </div>
        </section>
      </section>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import EHeader from 'components/e-header/e-header'
  import {mapState} from 'vuex'
  import {qualification} from 'api/shop'
  import {getImgPath} from 'common/js/mixin'

  export default {
    mixins: [getImgPath],
    data () {
      return {
        headTitle: '食品监督安全公示',
        goBack: true,
        restaurant_id: '',
        qualificationData: null
      }
    },
    computed: {
      ...mapState([
        'shopDetail', 'latitude', 'longitude'
      ]),
    },
    mounted () {
      this.restaurant_id = this.$route.query.restaurant_id
      this.getQualification()
    },
    methods: {
      getQualification () {
        qualification(this.restaurant_id, this.latitude, this.longitude).then(res => {
          this.qualificationData = res
        })
      }
    },
    components: {
      EHeader
    }
  }

</script>

<style lang="scss" scoped>
  @import "../../../../common/scss/mixin";

  .safe_shop{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 1.95rem;
    overflow-y: auto;
    background-color: #ebebeb;
    z-index: 102;
  }
  .scroll_container{
    @include wh(100%, 100%);
  }
  ul{
    margin-left: 1rem;
    padding: .4rem 0;
    li{
      margin-bottom: .4rem;
      p{
        line-height: 1rem;
      }
      p:nth-of-type(1){
        @include sc(.55rem, #333);
      }
      p:nth-of-type(2){
        @include sc(.5rem, #999);
      }
    }
  }
  .shop_status_container{
    background-color: #fff;
    margin-bottom: .4rem;
    header{
      line-height: 1.8rem;
      padding: 0 .6rem;
      border-bottom: 0.025rem solid #f1f1f1;
      @include sc(.75rem, #333);
    }
    .shop_status_detail{
      display: flex;
      padding: .6rem;
      svg{
        @include wh(2rem, 2rem);
        margin-right: .6rem;
      }
      .check_date{
        span{
          @include sc(.55rem, #666);
        }
        .shop_status_well{
          color: rgb(126, 211, 33);
        }
        .shop_status_bad{
          color: red;
        }
      }
    }
  }
  .license_img{
    padding: .6rem;
    background-color: #fff;
    padding-bottom: 8rem;
    .img_container{
      background-color: #ebebeb;
      img{
        width: 40%;
        height: auto;
        margin: .4rem;
        vertical-align: middle;
      }
    }
  }

</style>

