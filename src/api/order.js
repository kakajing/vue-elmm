/**
 * Created by user on 2018/4/8.
 */
import axios from 'axios'
import qs from 'qs'

export function checkOut(entities, geohash) {
  const url = '/restapi/booking/v1/carts/checkout'
  const data = Object.assign({}, {
    address_id: 0,
    come_from: 'mobile',
    deliver_time: '',
    entities,
    geohash,
    hongbao_action: 0,
    hongbao_sn: '',
    merchant_coupon_action: 1,
    merchant_coupon_id: '',
    paymethod_id: -1,
    sig: '',
    sub_channel: '',
    tying_entities: [],
    user_id: 1443333514
  })

  return axios.post(url, qs.stringify(data), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    arrayFormat: 'brackets'
  })
}

