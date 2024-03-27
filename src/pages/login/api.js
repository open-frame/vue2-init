import {axios} from '@/service/index'


// 账号登陆
export function login(params, config) {
  return axios.get("/service/demo/login.json", params, config)
}
