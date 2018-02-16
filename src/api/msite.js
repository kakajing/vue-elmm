/**
 * Created by user on 2018/1/22.
 */
import axios from 'axios'

export function msiteAdress () {
  const url = '/api/msiteAdress'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function msiteFoodTypes (latitude, longitude) {
  const url = '/api/msiteFoodTypes'
  const data = Object.assign({}, {
    latitude: latitude,
    longitude: longitude,
    'templates[]': 'main_template'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function shopList (latitude, longitude, extras) {
  const url = '/api/shopList'
  const data = {
    latitude: latitude,
    longitude: longitude,
    offset: 0,
    limit: 8,
    extras,
    extra_filters: 'home',
    rank_id: '',
    terminal: 'h5'
  }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
