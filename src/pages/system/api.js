// 系统管理的接口
import {axios} from '@/service/index.js'


// 路由资源列表
export function menuResource(params, config) {
  return axios.get("/service/demo/menus.json", params, config)
}



// 角色
export function roleList(params, config) {
  return axios.get("/service/demo/role-list.json", params, config)
}



// 数据字典列表
export function dictionaries(params, config) {
  return axios.get("/service/demo/dictionaries.json", params, config)
}




// 数据字典具体值列表
export function dictionarieValues(params, config) {
  return axios.get("/service/demo/dictionarie-values.json", params, config)
}



