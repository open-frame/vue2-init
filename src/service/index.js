import $store from '@/store'
// import cookie from 'js-cookie' //使用文档：https://www.toutiao.com/i6801506489014944269/?tt_from=weixin&utm_campaign=client_share&wxshare_count=1&timestamp=1592666186&app=news_article&utm_source=weixin&utm_medium=toutiao_android&req_id=20200620231626010016026082135083D6&group_id=6801506489014944269
import noTokenAPI from "./no-tokenAPI.json" // 不需要验证token的接口


// axios.defaults.baseURL = "/api"; // 处理跨域请求基地址
axios.defaults.baseURL = process.env.BASE_URL; // 请求基地址
axios.defaults.headers = {
  'Content-Type': 'application/json; charset=utf-8'
}

// 请求拦截
axios.interceptors.request.use(
  (request) => {
    console.log(request)
    if (noTokenAPI.includes(request.url)) {
      return request;
    }
    const token = localStorage.getItem('token');
    if (token) {
      request.headers['Authorization'] = "Bearer " + token;
    } else {
      $store.commit("logout");
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
    console.log(response)
    if (response.data.hasOwnProperty('code')) {
      if (response.data.code === 2001 && location.pathname !== "/logon") {
        $store.commit("logout");
      }
      if (response.data.code !== 0) {
        ELEMENT.Message.error(response.data.msg);
      }
    }
    return response.data;
  },
  (error) => {
    // https://www.runoob.com/tags/html-httpmessages.html
    switch (error.response.status) {
      case 302:
        ELEMENT.Message.error('302：重定向');
        break;
      case 400:
        ELEMENT.Message.error('400：请求错误');
        break;
      case 401:
        ELEMENT.Message.error('401：登陆过期');
        break;
      case 403:
        ELEMENT.Message.error('403：拒绝访问');
        break;
      case 404:
        ELEMENT.Message.error('404：无此接口');
        break;
      case 408:
        ELEMENT.Message.error('408：请求超时');
        break;
      case 500:
        ELEMENT.Message.error('500：服务器错误');
        break;
      case 501:
        ELEMENT.Message.error('501：服务未实现');
        break;
      case 502:
        ELEMENT.Message.error('502：网关错误');
        break;
      case 503:
        ELEMENT.Message.error('503：服务不可用');
        break;
      case 504:
        ELEMENT.Message.error('504：网关超时');
        break;
      case 505:
        ELEMENT.Message.error('505：HTTP版本不受支持');
        break;
      default:
        ELEMENT.Message.error('服务失败');
        break;
    }
    return Promise.reject(error)
  }
);




export default axios;
