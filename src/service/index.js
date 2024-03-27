import axios from "axios"
import { Message } from "element-ui"
import $store from '@/store'
const httpCodes = require("@/config/http-code.json") // https://blog.csdn.net/qq_42618566/article/details/132541251
const noTokenAPI = require("@/config/no-tokenAPI.json") // 不需要验证token的接口


// axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "/api" : process.env.VUE_APP_BASE_URL;
axios.defaults.headers = {
  'Content-Type': 'application/json; charset=utf-8'
}


let axiosPromise = [];
// 请求拦截
axios.interceptors.request.use(
  (request) => {
    // console.log(request)
    if (noTokenAPI.includes(request.url)) {
      return request;
    }
    
    const token = localStorage.getItem('token');
    if (token) {
      request.headers['Authorization'] = request.url === `${process.env.VUE_APP_ORIGIN}/login` ? `` : `Bearer ${token}`;
    } else {
      if (request.url !== `${process.env.VUE_APP_ORIGIN}/login`) {
        $store.commit("logout", "1");
      }
    }
    request.cancelToken = new axios.CancelToken(cancel => {
      axiosPromise.push({ ...request, cancel })
    })

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
    if (response.data.code === 2001) {
      axios.CancelToken.source().cancel();
      $store.commit("logout", "1");
      return response.data;
    }
    if (response.data.code && response.data.code !== 0) {
      Message.error(response.data.msg);
    }

    console.log(response.data);
    return response.data;
  },
  (error) => {
    // console.log(error);
    // https://www.runoob.com/tags/html-httpmessages.html
    // https://www.runoob.com/http/http-status-codes.html
    try {
      const item = httpCodes.find(item => {
        return error.response.status === item.code;
      })
      Message.error(`${item.code}：${item.message}`);
    } catch (err) { }
    return Promise.reject(error)
  }
);




export { axios, axiosPromise };
