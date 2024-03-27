import microApp from '@micro-zoe/micro-app'
import $store from '@/store/index.js'
const microAppUrl = process.env.NODE_ENV !== "production" ? "http://localhost:2022" : process.env.VUE_APP_ORIGIN;






// https://micro-zoe.com/docs/1.x/#/zh-cn/prefetch
export function microAppStart() {
  microApp.start({
    preFetchApps: [
      { name: 'plateform-bigview', url: microAppUrl + '/bigView/' },
    ]
  });
  microApp.setGlobalData({ minAppData: $store.state })
}
