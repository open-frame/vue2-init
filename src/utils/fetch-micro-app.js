import microApp from '@micro-zoe/micro-app'
const microAppUrl = process.env.NODE_ENV === "development" ? "http://192.168.1.149:2023/kid-project/" : process.env.VUE_APP_BIG_VIEW;






// https://micro-zoe.com/docs/1.x/#/zh-cn/prefetch
export function microAppStart() {
  microApp.start({
    preFetchApps: [
      { name: 'plateform-bigview', url: microAppUrl },
    ]
  });
}
