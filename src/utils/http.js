import axios from 'axios'
import { Toast } from 'antd-mobile'

// request 拦截
axios.interceptors.request.use(
  config => {
    Toast.loading('Loading...')
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// response 拦截
axios.interceptors.response.use(
  response => {
    Toast.hide()
    // 成功则直接返回数据
    return response
  },
  error => {
    Toast.hide()
    return Promise.reject(error)
  }
)

export default {
  get (url, data) {
    return axios({
      url,
      data,
    }).then(
      response => {
        if (response && (response.status === 200)) {
          return response.data
        }
      }
    ).catch(
      err => {
        return err
      }
    )
  }
}
