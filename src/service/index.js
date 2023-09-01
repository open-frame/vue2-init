import axios from "axios"
import { Message } from "element-ui"
import $store from '@/store'
const httpCodes = require("@/config/http-code.json") // https://blog.csdn.net/qq_42618566/article/details/132541251
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
    // https://www.runoob.com/http/http-status-codes.html
    const item = httpCodes.find(item => {
      return error.response.status === item.code;
    })
    Message.error(`${item.code}：${item.message}`);
    return Promise.reject(error)
  }
);




export default axios;
