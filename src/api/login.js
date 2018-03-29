/**
 * Created by user on 2018/3/27.
 */
import axios from 'axios'
import qs from 'qs'

// 获取短信验证码
export function getMobileCode (mobile) {
  return axios.post('/api/MUrl', qs.stringify(mobile), {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })
}

export function captchas (captcha_str) {
   return axios.post('/api/captchas', qs.stringify(captcha_str))
}

export function login (username, password) {
  return axios.post('/api/login', qs.stringify(username, password))
}
