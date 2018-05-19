import * as types from './mutation-types'
import {setStore, getStore} from 'common/js/mUtils'

const mutations = {
  // 记录当前经度
  [types.SET_LATITUDE] (state, latitude) {
    state.latitude = latitude
  },
  // 记录当前纬度
  [types.SET_LONGITUDE] (state, longitude) {
    state.longitude = longitude
  },
  [types.SET_GEOHASH] (state, geohash) {
    state.geohash = geohash
  },
  [types.SET_CART_LIST] (state, list) {
    state.cartList = list
  },
  // 添加购物车
 [types.ADD_CART] (state, {shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock}) {
   let cart = state.cartList
   let shop = cart[shopId] = (cart[shopId] || {})
   let category = shop[category_id] = (shop[category_id] || {})
   let item = category[item_id] = (category[item_id] || {})
   if (item[food_id]) {
     item[food_id]['num']++
   } else {
     item[food_id] = {"num": 1, "id": food_id, "name": name, "price": price, "specs": specs, "packing_fee": packing_fee, "sku_id": sku_id, "stock": stock}
   }
   state.cartList = {...cart}
   //存入localStorage
   setStore('buyCart', state.cartList)
 },
  // 减少购物车
  [types.REDUCE_CART] (state, {shopId, category_id, item_id, food_id, name, price, specs}) {
    let cart = state.cartList
    let shop = (cart[shopId] || {})
    let category = (shop[category_id] || {})
    let item = (category[item_id] || {})
    if (item && item[food_id]) {
      if (item[food_id]['num'] > 0) {
        item[food_id]['num']--
        state.cartList = {...cart}
        setStore('buyCart', state.cartList)
      } else {
        //商品数量为0，则清空当前商品的信息
        item[food_id] = null
      }
    }
  },
  //网页初始化时从本地缓存获取购物车数据
  [types.INIT_BUYCART] (state) {
    let initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  //清空当前商品的购物车信息
  [types.CLEAR_CART] (state, shopId) {
    state.cartList[shopId] = null
    state.cartList = {...state.cartList}
    setStore('buyCart', state.cartList)
  },
  [types.RECORD_SHOPDETAIL] (state, detail) {
    state.shopDetail = detail
  },
  // 记录用户信息
  [types.RECORD_USERINFO] (state, info) {
    state.userInfo = info
    setStore('userInfo', info)
  },
  //获取用户信息
  [types.GET_USERINFO] (state) {
    let info = getStore('userInfo')
    if (info) {
      state.userInfo = JSON.parse(info)
    }
  },
  //记录订单页面用户选择的备注, 传递给订单确认页面
  [types.GET_CONFIRM_REMARK] (state, {remarkText, inputText}) {
    state.remarkText = remarkText
    state.inputText = inputText
  },
  //是否开发票
  [types.CONFIRM_INVOICE] (state, invoice) {
    state.invoice = invoice
  },
  //选择搜索的地址
  [types.CHOOSE_SEARCH_ADDRESS] (state, place) {
    state.searchAddress = place
  },
  //选择的地址
  [types.CHOOSE_ADDRESS] (state, {address, index}) {
    state.chooseAddress = address
    state.addressIndex = index
  }
}

export default mutations
