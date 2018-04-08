/**
 * Created by user on 2018/3/27.
 */
import axios from 'axios'
import qs from 'qs'

// 获取短信验证码
export function getMobileCode (captcha_hash, captcha_value, mobile) {
  return axios.post('/restapi/eus/login/mobile_send_code', qs.stringify(captcha_hash, captcha_value, mobile))
}

/**
 * 获取验证码图片
 * @param captcha_str
 * @returns {AxiosPromise<T>}
 */
export function captchas (captcha_str) {
   return axios.post('/restapi/eus/v3/captchas', qs.stringify(captcha_str))
}

/**
 * 短信登录
 */
export function sendLogin (mobile, validate_code, validate_token) {
  const url = '/restapi/eus/login/login_by_mobile'
  const o = {
    headers: {
      "content-type": "application/json; charset=utf-8"
    },
    credentials: "include"
  }
  const data = Object.assign({}, {
    mobile,
    validate_code,
    validate_token
  })
  return axios.post(url, qs.stringify(data), o).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 用户名登录
 */
export function accountLogin (captcha_hash, captcha_value, username, password) {
  const url = '/restapi/eus/login/login_by_password'
  const o = {
    headers: {
      "content-type": "application/json; charset=utf-8"
    },
    credentials: "include"
  }
  const data = Object.assign({}, {
    captcha_hash,
    captcha_value,
    username,
    password
  })
  return axios.post(url, qs.stringify(data), o).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getUserInfo (id) {
  const url = '/restapi/eus/v2/users/' + id

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
