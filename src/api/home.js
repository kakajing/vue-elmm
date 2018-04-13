/**
 * Created by user on 2018/1/7.
 */
// import * as API from './index'
import axios from 'axios'

export function getCities () {
  const url = '/restapi/shopping/v1/cities'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getGuess () {
  const url = '/restapi/shopping/v1/cities/guess'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
