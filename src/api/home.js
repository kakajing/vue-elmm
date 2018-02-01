/**
 * Created by user on 2018/1/7.
 */
// import * as API from './index'
import axios from 'axios'

export function getCities () {
  const url = '/api/getCities'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getGuess () {
  const url = '/api/getGuess'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
