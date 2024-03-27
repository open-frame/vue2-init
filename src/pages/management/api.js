// 管理中心
import {axios} from '@/service/index'



// 运营用户
export function operationUsers(params, config) {
  return axios.get("/service/demo/operation-users.json", params, config)
}

