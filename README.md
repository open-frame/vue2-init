# init-vue-project

> 基于vue的后台操作系统基本底层架构



✔ 跨域配置

✔ 生产环境移除console

✔ Gzip打包配置

✔ 接口请求统一封装

✔ 组件、指令、过滤器全局封装

✔ 非vueX的小型状态管理器

✔ 全局路由导航守卫

✔ 基本布局





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



#### 全局通用文件：

`src/common/common.js`文件：公共功能

`src/service/API.js`文件：所有接口

`src/directives/index.js`文件：全局指令封装文件

`src/filters/index.js`文件：全局过滤器封装文件

`src/components/index.js`文件：全局组件注册文件



#### 页面文件夹大纲：

- src/pages/management：管理中心
- src/pages/assets：资产中心
- src/pages/orders：订单中心
- src/pages/accounting：清算中心
- src/pages/operational：运监中心





