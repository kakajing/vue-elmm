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
  [types.SET_CART_LIST] (state, list) {
    state.cartList = list
  },
  // 添加购物车
  [types.ADD_CART] (state, {shopId, category_id, item_id, food_id, name, price, specs}) {
    let cart = state.cartList
    if (cart[shopId]&&cart[shopId][category_id]&&cart[shopId][category_id][item_id]&&cart[shopId][category_id][item_id][food_id]) {
      cart[shopId][category_id][item_id][food_id]['num'] ++
    }else if(cart[shopId]&&cart[shopId][category_id]&&cart[shopId][category_id][item_id]){
      cart[shopId][category_id][item_id][food_id] = {}
      cart[shopId][category_id][item_id][food_id]['num'] = 1
      cart[shopId][category_id][item_id][food_id]['name'] = name
      cart[shopId][category_id][item_id][food_id]['price'] = price
      cart[shopId][category_id][item_id][food_id]['specs'] = specs
    }else if(cart[shopId]&&cart[shopId][category_id]){
      cart[shopId][category_id][item_id] = {}
      cart[shopId][category_id][item_id][food_id] = {}
      cart[shopId][category_id][item_id][food_id]['num'] = 1
      cart[shopId][category_id][item_id][food_id]['name'] = name
      cart[shopId][category_id][item_id][food_id]['price'] = price
      cart[shopId][category_id][item_id][food_id]['specs'] = specs
    }else if(cart[shopId]){
      cart[shopId][category_id] = {}
      cart[shopId][category_id][item_id] = {}
      cart[shopId][category_id][item_id][food_id] = {}
      cart[shopId][category_id][item_id][food_id]['num'] = 1
      cart[shopId][category_id][item_id][food_id]['name'] = name
      cart[shopId][category_id][item_id][food_id]['price'] = price
      cart[shopId][category_id][item_id][food_id]['specs'] = specs
    }else{
      cart[shopId] = {}
      cart[shopId][category_id] = {}
      cart[shopId][category_id][item_id] = {}
      cart[shopId][category_id][item_id][food_id] = {}
      cart[shopId][category_id][item_id][food_id]['num'] = 1
      cart[shopId][category_id][item_id][food_id]['name'] = name
      cart[shopId][category_id][item_id][food_id]['price'] = price
      cart[shopId][category_id][item_id][food_id]['specs'] = specs
    }
    state.cartList = Object.assign({}, cart)
    setStore('buyCart', state.cartList)
  },
  // 减少购物车
  [types.REDUCE_CART] (state, {shopId, category_id, item_id, food_id, name, price, specs}) {
    let cart = state.cartList
    if (cart[shopId]&&cart[shopId][category_id]&&cart[shopId][category_id][item_id]&&cart[shopId][category_id][item_id][food_id]) {
      if (cart[shopId][category_id][item_id][food_id]['num'] > 0) {
        cart[shopId][category_id][item_id][food_id]['num'] --
        state.cartList = Object.assign({}, cart)
        setStore('buyCart', state.cartList)
      }else{
        cart[shopId][category_id][item_id][food_id] = null
      }
    }
  },
  [types.INIT_BUYCART] (state) {
    let initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  [types.CLEAR_CART] (state, shopId) {
    state.cartList[shopId] = null
    state.cartList = Object.assign({}, state.cartList)
    setStore('buyCart', state.cartList)
  },
  [types.RECORD_SHOPDETAIL] (state, info) {
    state.userInfo = info
    setStore('userInfo', info)
  },
  [types.GET_USERINFO] (state) {
    let info = getStore('userInfo')
    if (info) {
      state.userInfo = JSON.parse(info)
    }
  }
}

export default mutations
