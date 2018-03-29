import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import Checkout from 'components/checkout/checkout'
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
          path: '/checkout',
          component: Checkout  // 确认订单页
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
          component: Order  // 订单列表页
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
              component: ShopDetail
            }
          ]
        },
        //确认订单页
        {
          path: '/confirmOrder',
          component: ConfirmOrder
        },
        {
          path: '/vipcard',
          component: Vipcard  // vip卡页
        }
      ]
    }
  ]
})
