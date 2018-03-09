/**
 * Created by user on 2018/2/24.
 */
import axios from 'axios'

export function getFoodCategory (latitude, longitude) {
  const url = '/api/foodCategory'

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

export function getFoodRestaurants (latitude, longitude, extras, restaurantCategoryIds) {
  const url = '/api/restaurants'

  const data = Object.assign({}, {
    latitude,
    longitude,
    keyword: '',
    offset: 0,
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

export function getFoodDelivery (latitude, longitude) {
  const url = '/api/foodDelivery'

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

export function getFoodFilter (latitude, longitude, extras, supportIds, deliveryMode, restaurantCategoryId) {
  const url = '/api/foodFilter'

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

export function getFoodSort (latitude, longitude, extras, sortByType, restaurantCategoryId) {
  const url = '/api/foodSort'

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
