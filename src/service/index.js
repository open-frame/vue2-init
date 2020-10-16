/* ------------------------------------- 请求全局封装 ------------------------------------- */
import axios from 'axios'
import qs from 'qs'
// import cookie from 'js-cookie' //使用文档：https://www.toutiao.com/i6801506489014944269/?tt_from=weixin&utm_campaign=client_share&wxshare_count=1&timestamp=1592666186&app=news_article&utm_source=weixin&utm_medium=toutiao_android&req_id=20200620231626010016026082135083D6&group_id=6801506489014944269

axios.defaults.baseURL = "/api"; // 请求基地址
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded; application/json; charset=utf-8'
}

// 请求拦截
axios.interceptors.request.use(
  (request) => {
    // console.log(request)
    if (request.method === 'post' || request.method === 'put') {
      request.data = qs.stringify(request.data, {
        indices: false
      });
    }
    if (location.pathname != '/login') {
      if (sessionStorage.getItem('token')) {
        request.headers.token = sessionStorage.getItem('token');
      } else {
        alert("未登录，请先登录！");
        this.$router.push("/login");
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  });

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    // console.log(response)
    return response.data;
  },
  (error) => {
    switch (error.response.status) {
      case 400:
        console.clear();
        console.error('请求错误');
        break;
      case 401:
        console.clear();
        console.error('未授权，请登录');
        break;
      case 403:
        console.clear();
        console.error('拒绝访问');
        break;
      case 404:
        console.clear();
        console.error('服务器找不到请求的资源');
        break;
      case 408:
        console.clear();
        console.error('请求超时');
        break;
      case 500:
        console.clear();
        console.error('服务器内部错误');
        break;
      case 501:
        console.clear();
        console.error('服务未实现');
        break;
      case 502:
        console.clear();
        console.error('网关错误');
        break;
      case 503:
        console.clear();
        console.error('服务不可用');
        break;
      case 504:
        console.clear();
        console.error('网关超时');
        break;
      case 505:
        console.clear();
        console.error('HTTP版本不受支持');
        break;
      default:
    }
    return Promise.reject(error) // 返回接口返回的错误信息
  });




export default axios;
