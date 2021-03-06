import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
// import JSONbig from 'json-bigint'

// create an axios instance
const service = axios.create({
  baseURL:process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // request timeout
  // transformResponse: [function (data) {
  //   try {
  //       return JSONbig.parse(data)
  //   } catch (err) {
  //       return {
  //           data
  //       }
  //   }
  // }]
})
// request interceptor
service.interceptors.request.use(
  config => {
    if(config.method==='post' || config.method==='POST'){
      config.data= config.noQS?config.data:qs.stringify(config.data)
      console.log(config.data);
    }
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== '200') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 1 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }
      return res
      // return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      // Message({
      //   message: res.msg || 'success',
      //   type: 'success',
      //   duration: 1 * 1000
      // })
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
