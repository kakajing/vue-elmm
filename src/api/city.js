import axios from 'axios'

export function getCurrentCity () {
  const url = '/api/getGuess'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function search (keyword, latitude, longitude) {
  const url = '/api/search'
  const data = Object.assign({}, {
    keyword: keyword,
    offset: 0,
    limit: 20,
    latitude: latitude,
    longitude: longitude
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function query (keyword, geohash) {
  const url = '/api/query'
  const data = Object.assign({}, {
    keyword: keyword,
    geohash: geohash,
    limit: 20,
    type: 'nearby',
    'extras[]': 'count'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
