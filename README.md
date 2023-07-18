

# 车联网运营平台

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve       // 用于启动测试环境
npm run serve:pro   // 用于启动正式环境
```

### Compiles and minifies for production

```
npm run build       // 用于打包正式环境
npm run build:test  // 用于打包测试环境
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).







#### 注意

- 业务文件的代码量基本不得超过500行，**禁止超过600行**！！！内容过多请组件化、模块化

- 样式尽量使用https://v5.bootcss.com/docs/utilities/background/的类名，减少编写css

- 插件体积超过10k的使用cdn引入，如同index.html。

- 页面的操作摁扭、展示模块等资源需要增加v-permission以权限控制，数据到平台的【资源管理】增加
- 注意有的页面文件的函数methods没有编写但使用了，那是混入的。比如分页方法







#### 命名规则

- html的标签明明class用 - 隔开，如：device-detail
- vue的ref明明以DOM结束，如：amapDOM、chartDOM
- 文件和文件夹的命名用 - 隔开，如：device-detail.vue
- 属性及函数以小驼峰命名，如：tableData: []、restData()







#### 全局自定义指令

入口文件 src/directives/index.js

| 指令名          | 说明           | 参数   | 例子                             |
| ------------ | ------------ | ---- | ------------------------------ |
| v-permission | 用于模块、按钮等显示权限 | 权限字符 | v-permission="'function_edit'" |
|              |              |      |                                |
|              |              |      |                                |



#### 全局自定义过滤器

入口文件 src/filters/index.js

| 过滤器      | 说明             | 参数                       | 使用例子                                                     | 使用结果  |
| ----------- | ---------------- | -------------------------- | ------------------------------------------------------------ | --------- |
| toThousands | 人名币千位符     | 数字                       | {{ 1000000 \| toThousands }}                                 | 1,000,000 |
|             |                  |                            |                                                              |           |





#### 全局混入

入口文件 src/mixins/index.js

| 类型           |      | 文件地址                   |
| -------------- | ---- | -------------------------- |
| 分页           |      | src/mixins/pagination.js   |
| 页面的重置摁扭 |      | src/mixins/reset-filter.js |





#### 全局小工具

src/utils/

| 文件位置              | 说明         |      |
| --------------------- | ------------ | ---- |
| src/utils/debounce.js | 防抖         |      |
| src/utils/throttle.js | 节流         |      |
| src/utils/common.js   | 各种时间处理 |      |

