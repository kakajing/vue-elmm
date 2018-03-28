/**
 * Created by user on 2018/3/27.
 */
import axios from 'axios'
import qs from 'qs'
// import * as API from './index'

// 获取短信验证码
export function getMobileCode (mobile) {
  return axios.post('/api/mobileCode', qs.stringify(mobile), {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export function captchas (captcha_str) {
  // return axios.post('/eus/v3/captchas', captcha_str)
}
