// 首页的接口
import {axios} from '@/service/index.js'


// 首页布局
export function homeLayout(params, config) {
  return axios.get("/service/demo/loadHomeConfig.json", params, config)
}


// 今日新增用户
export function todyNewUsers(params, config) {
  return axios.get("/service/demo/newElecUser.json", params, config)
}
