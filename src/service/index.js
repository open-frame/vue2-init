import axios from "axios"
import { Message } from "element-ui"
import $store from '@/store'
const noTokenAPI = require("@/config/no-tokenAPI.json") // 不需要验证token的接口


// axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : process.env.VUE_APP_BASE_URL;
axios.defaults.headers = {
  'Content-Type': 'application/json; charset=utf-8'
}

// 请求拦截
axios.interceptors.request.use(
  (request) => {
    // console.log(request)
    if (noTokenAPI.includes(request.url)) {
      return request;
    }
    const token = localStorage.getItem('token');
    if (token) {
      request.headers['Authorization'] = "Bearer " + token;
    } else {
      $store.commit("logout", "1");
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    // console.log(response)
    if (response.data.hasOwnProperty('code')) {
      if (response.data.code === 2001 && location.pathname !== "/logon") {
        $store.commit("logout", "1");
      }
      if (response.data.code !== 0) {
        Message.error(response.data.msg);
      }
    }
    return response.data;
  },
  (error) => {
    // https://www.runoob.com/tags/html-httpmessages.html
    switch (error.response.status) {
      case 302:
        Message.error('302：重定向');
        break;
      case 400:
        Message.error('400：请求错误');
        break;
      case 401:
        Message.error('401：登陆过期');
        break;
      case 403:
        Message.error('403：拒绝访问');
        break;
      case 404:
        Message.error('404：无此接口');
        break;
      case 408:
        Message.error('408：请求超时');
        break;
      case 500:
        Message.error('500：服务器错误');
        break;
      case 501:
        Message.error('501：服务未实现');
        break;
      case 502:
        Message.error('502：网关错误');
        break;
      case 503:
        Message.error('503：服务不可用');
        break;
      case 504:
        Message.error('504：网关超时');
        break;
      case 505:
        Message.error('505：HTTP版本不受支持');
        break;
      default:
        Message.error('服务失败');
        break;
    }
    return Promise.reject(error)
  }
);




export default axios;
