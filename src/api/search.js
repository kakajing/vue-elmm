/**
 * Created by user on 2018/2/6.
 */
import axios from 'axios'

export function searchRestaurant (searchValue, latitude, longitude, extras) {
  const url = '/restapi/shopping/v2/restaurants/search'

  const data = Object.assign({}, {
    offset: 0,
    limit: 8,
    keyword: searchValue,
    latitude,
    longitude,
    search_item_type: 3,
    is_rewrite: 1,
    extras,
    terminal: 'h5'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
