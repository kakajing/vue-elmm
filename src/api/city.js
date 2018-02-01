import axios from 'axios'

export function getCurrentCity () {
  const url = '/api/getGuess'
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
