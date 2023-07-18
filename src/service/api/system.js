import http from '../index'
export default {
  // 数据字典列表
  dictionaries: (params, config) => {
    return http.get("/service/demo/dictionaries.json", params, config)
  },

  // 添加数据字典
  addDictionarie: (params, config) => {
    return http.post("/service/demo/addData", params, config)
  },

  // 修改数据字典
  modificationDictionarie: (params, config) => {
    return http.post("/service/demo/editData", params, config)
  },

  // 删除数据字典
  deleteDictionarie: (params, config) => {
    return http.post("/service/demo/removeData", params, config)
  },

  // 数据字典具体值列表
  dictionarieValues: (params, config) => {
    return http.get("/service/demo/dictionarie-values.json", params, config)
  },

  // 添加数据字典具体值
  addDictionarieValue: (params, config) => {
    return http.post("/service/demo/addType", params, config)
  },

  // 修改数据字典具体值
  modificationDictionarieValue: (params, config) => {
    return http.post("/service/demo/editType", params, config)
  },

  // 删除数据字典具体值
  deleteDictionarieValue: (params, config) => {
    return http.post("/service/demo/removeType", params, config)
  },
}