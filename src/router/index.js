import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import City from 'components/city/city'
import Forget from 'components/forget/forget'
import Home from 'components/home/home'
import Login from 'components/login/login'
import Msite from 'components/msite/msite'
import Order from 'components/order/order'
import Profile from 'components/profile/profile'
import Search from 'components/search/search'
import Shop from 'components/shop/shop'
import Vipcard from 'components/vipcard/vipcard'
import Food from 'components/food/food'
import FoodDetail from 'components/shop/children/foodDetail'
import ConfirmOrder from 'components/confirmOrder/confirmOrder'
import ShopDetail from 'components/shop/children/shopDetail'
import ShopSafe from 'components/shop/children/children/shopSafe'
import OrderDetail from 'components/order/children/orderDetail'
import Remark from 'components/confirmOrder/children/remark'
import Invoice from 'components/confirmOrder/children/invoice'
import ChooseAddress from 'components/confirmOrder/children/chooseAddress'
import AddAddress from 'components/confirmOrder/children/children/addAddress'
import SearchAddress from 'components/confirmOrder/children/children/children/searchAddress'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      component: App,
      children: [
        {
          path: '/home',
          component: Home  // 首页城市列表页
        },
        {
          path: '/city/:cityId',
          component: City  // 当前选择城市页
        },
        {
          path: '/forget',
          component: Forget   // 修改密码页
        },
        {
          path: '/login',
          component: Login  // 登陆注册页
        },
        {
          path: '/msite',
          component: Msite,   // 所有商铺列表页
          meta: {keepAlive: true}   // 需要被缓存
        },
        {
          path: '/food',
          component: Food  // 特色商铺列表页
        },
        {
          path: '/order',
          component: Order,  // 订单列表页
          children: [
            {
              path: 'orderDetail',     //订单详情页
              component: OrderDetail
            }
          ]
        },
        {
          path: '/profile',
          component: Profile  // 个人信息页
        },
        {
          path: '/search/:geohash',
          component: Search  // 搜索页
        },
        {
          path: '/shop',
          component: Shop,   // 商铺详情页
          children: [
            {
              path: 'foodDetail',    // 食品详情页
              component: FoodDetail
            },
            {
              path: 'shopDetail',    //商铺详情页
              component: ShopDetail,
              children: [
                {
                  path: 'shopSafe',   //商铺安全认证页
                  component: ShopSafe
                }
              ]
            }
          ]
        },
        //确认订单页
        {
          path: '/confirmOrder',
          component: ConfirmOrder,
          children: [
            {
              path: 'remark',
              component: Remark   // 订单备注
            },
            {
              path: 'invoice',
              component: Invoice    // 发票
            },
            {
              path: 'chooseAddress',
              component: ChooseAddress,  // 选择地址
              children: [
                {
                  path: 'addAddress',
                  component: AddAddress,   // 添加地址
                  children: [
                    {
                      path: 'searchAddress',
                      component: SearchAddress  // 选择地址
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          path: '/vipcard',
          component: Vipcard  // vip卡页
        }
      ]
    }
  ]
})
