最好使用[typora](https://www.typora.io/)打开

---



> # VUE 
>
> 基于2X的项目初始化



已配置好请求拦截、响应拦截，打包清除log，导航守卫、拦截，全局指令、组件、过滤器等文件的初始化，依赖皆采用CDN引入。封装好了权限菜单的功能、tab页、在story。



[TOC]





## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



## 全局文件说明：

| 文件地址                      | 说明                                                         |
| ----------------------------- | :----------------------------------------------------------- |
| src/utils/common.js           | 公共功能                                                     |
| src/utils/secret.js           | 加密解密函数封装                                             |
| src/service/api/              | 放所有业务接口的目录，接口文件名同`src/pages/`里的所有目录   |
| src/service/request/public.js | 公共接口                                                     |
| src/service/request/system.js | 系统级别的接口                                               |
| src/directives/index.js       | 全局注册指令                                                 |
| src/filters/index.js          | 全局注册过滤器                                               |
| src/components/index.js       | 全局注册组件，尽可能不要挂载全局                             |
| src/assets/css/public.css     | 全局样式文件，采用[bootstrap5](https://v5.bootcss.com/docs/getting-started/introduction/)，在页面直接使用其类名即可，无需赘写 |
| src/router/guards.js          | 导航守卫                                                     |







## 特别注意：

1. 尽可能遵守 [风格指南](https://cn.vuejs.org/v2/style-guide/)
2. 为了校验页面权限。非菜单栏的跳转或非开放跳转事件需给标签加上`v-if="$store.state.permissionRouters.includes('跳转路径')"`。
3. 页面文件的name属性设置规范：`Page-页面名称`

例如：

```javascript
export default {
  name: "Page-UseElectric",   // 重点
  data() {
    return {}
  }   
}
```





## 命名规范：

禁止使用拼音、中英文混合、毫无规律、没有代表意义等迷之命名

### 目录

使用连接符`billing-templates`

### 文件

使用连接符，例如`table-column`

### 变量

小驼峰命名法，例如`isPowerStationrePetition`

### 函数

小驼峰命名法，例如`powerStationrePetition`

### 引入组件

大驼峰命名法，例如`CustomTable`

### 挂载全局

以**`$`**开头，如`Vue.prototype.$secret= secret;` 任意地方使用就`this.$secret`即可



## 生命周期钩子和属性顺序：

先属性，后钩子

```html
<script>
  export default {
     /*==== 属性 ====*/
    name:"",
    watch:{

    },
    computed:{

    },
    methods:{
          
    },
    data() {
      return {
          
      }
    },
    /*==== 生命周期 ====*/
    beforeCreate() {
      
    },
    created() {
      
    },
    beforeMount() {
        
    },
    mounted() {
        
    },
    beforeUpdate() {
        
    },
    updated() {
      
    },
    beforeDestroy(){
    	
    },
    destroyed(){
    	
    }
  };
</script>

```





## 自定义组件使用说明：

### 1. 自定义表格

```html
<CustomTable
      tableKey="roleId"
      :loading="loading"
      :data="tableData"
      :dataId="tableDataId"
      :headId="tableHeadId"
      :total="total"
      :pageSize="queryForm.pageSize"
      :config="tableConfig"
      @exporting="exporting"
      @handleCurrent="handleCurrentChange"
      @dataSize="dataSizeChange"
      @cell-click=“cellClick”
    >
    <!-- <template v-slot:function>
        
    </template> -->
    <!-- <template v-slot:config>
        
    </template> -->
    <template v-slot:body="{ data }">
        <span v-if="data.column.property === '列的属性'">
            {{ data.row.列的属性 }}
        </span>
        <span v-else-if="data.column.property === '列的属性'">
            {{ data.row.列的属性 }}
        </span>
    </template>
    <!-- <template v-slot:handle>
        <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">

            </template>
        </el-table-column> -->
    </template>
</CustomTable>
```

#### props：

| 属性       | 类型    | 必传   | 默认值                                       | 说明                                                         |
| ---------- | ------- | ------ | -------------------------------------------- | ------------------------------------------------------------ |
| tableKey   | String  | **是** | 无                                           | 就是[elementUI](https://element.eleme.cn/#/zh-CN/component/table#table-attributes)的定义的`row-key` |
| loading    | Boolean | 否     | true                                         | 显示数据加载动画                                             |
| data       | Array   | 否     |                                              | 数据                                                         |
| dataId     | String  | **是** | 无                                           | 数据标识，整个程序不能重复，一般页`this.$route.path + ""`获取，tab页视情况而定，具体看其他代码 |
| headId     | String  | **是** | 无                                           | 表头标识，整个程序不能重复，一般页`this.$route.path + ""`获取，tab页视情况而定，具体看其他代码 |
| showExport | Boolean | 否     | true                                         | 显示导出表格按钮                                             |
| showSelect | Boolean | 否     | false                                        | 显示选择列                                                   |
| total      | Number  | 否     | 0                                            | 表格总数居条数                                               |
| pageSize   | Number  | 否     | 15                                           | 表格每页几条数据                                             |
| config     | Object  | **是** | `{show: false, nowColumn: [], allColumn:[]}` | 增减表格列的配置。nowColumn为当前显示的列，allColumn为表格所有列 |

#### events：

| 事件             | 说明         | 返回值                   | 值类型 | 值说明                                                       |
| ---------------- | ------------ | ------------------------ | ------ | ------------------------------------------------------------ |
| exporting        | 导出动作     | 导出类型                 | String | 1：本页         2全部                                        |
| handleCurrent    | 翻页         | 当前页                   | Number | 当前第几页                                                   |
| dataSize         | 设置每页几条 | 页量                     | Number | 每页几条                                                     |
| cell-click       | 点击单元格   | row, column, cell, event | Object | 同[elementUI](https://element.eleme.cn/#/zh-CN/component/table#table-events)的cell-click事件 |
| selection-change | 选择列       | 选择的列数据             | Array  |                                                              |

#### slots：

| 名称     | 说明                       |
| -------- | -------------------------- |
| function | 自定义表头上左侧功能按钮组 |
| config   | 自定义表头上右侧功能按钮组 |
| body     | 表体容器                   |
| handle   | 自定义表格操作列           |

其余参考其他页面配置





### 2.

其他组件看运用处