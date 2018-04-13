import axios from 'axios'

/**
 * 搜索数据
 */
export function query (keyword, geohash) {
  const url = '/restapi/v2/pois'
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
