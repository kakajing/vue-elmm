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
 * 登录
 */
export function accountLogin (captcha_hash, captcha_value, username, password) {
  return axios.post('/restapi/eus/login/login_by_password', qs.stringify(captcha_hash, captcha_value, username, password))
}

export function sendLogin (mobile, validate_code, validate_token) {
  return axios.post('/restapi/eus/login/login_by_password', qs.stringify(mobile, validate_code, validate_token))
}
