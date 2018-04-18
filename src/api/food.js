/**
 * Created by user on 2018/2/24.
 */
import axios from 'axios'

// 获取category 种类列表
export function getFoodCategory (latitude, longitude) {
  const url = '/restapi/shopping/v2/restaurant/category'

  const data = Object.assign({}, {
    latitude,
    longitude
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取商铺列表
export function getFoodRestaurants (latitude, longitude, extras, restaurantCategoryIds) {
  const url = '/restapi/shopping/v3/restaurants'

  const data = Object.assign({}, {
    latitude,
    longitude,
    keyword: '',
    offset: 0,
    limit: 8,
    extras,
    terminal: 'h5',
    brand_ids: '',
    restaurant_category_ids: restaurantCategoryIds
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取配送方式和商家属性活动列表
export function getFoodDelivery (latitude, longitude) {
  const url = '/restapi/shopping/v1/restaurants/filter-bar/attributes'

  const data = Object.assign({}, {
    latitude,
    longitude,
    terminal: 'h5'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取筛选后的商家列表
export function getFoodFilter (latitude, longitude, extras, supportIds, deliveryMode, restaurantCategoryId) {
  const url = '/restapi/shopping/v3/restaurants'

  const data = Object.assign({}, {
    latitude,
    longitude,
    keyword: '',
    offset: 0,
    limit: 8,
    extras,
    terminal: 'h5',
    rank_id: '',
    support_ids: supportIds,
    delivery_mode: deliveryMode,
    restaurant_category_ids: restaurantCategoryId
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

//
export function getFoodSort (latitude, longitude, extras, sortByType, restaurantCategoryId) {
  const url = '/restapi/shopping/v3/restaurants'

  const data = Object.assign({}, {
    latitude,
    longitude,
    keyword: '',
    offset: 0,
    limit: 8,
    extras,
    terminal: 'h5',
    rank_id: '',
    order_by: sortByType,
    restaurant_category_ids: restaurantCategoryId
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
