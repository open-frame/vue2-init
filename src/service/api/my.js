// 我的
import http from '../index'

export default {
  // 我的待办
  myTask: (params, config) => {
    return http.get("/service/demo/myTask.json", params, config)
  },

  // 任务委托
  taskEntrust: (params, config) => {
    return http.post("/service/demo/setTaskAssignee", params, config)
  },

  // 我的已办
  myFinished: (params, config) => {
    return http.get("/service/demo/myFinished.json", params, config)
  },
}