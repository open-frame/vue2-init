// 全局组件
import TimeLine from "./time-line.vue"
import Amap from "./aMap.vue"
import TableColumnIncDec from "./table-column-IncDec.vue"
import TableColumnDrag from "./table-column-drag";
import CustomTable from "./custom-table.vue"



const components = {
  TimeLine,
  Amap,
  TableColumnIncDec,
  TableColumnDrag,
  CustomTable
}

export default {
  install(Vue) {
    Object.keys(components).forEach(item => {
      Vue.component(components[item].name, components[item])
    })
  }
}
