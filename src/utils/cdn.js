// cdn地址
const scripts = require("@/config/cdn-scripts.json");
const css = require("@/config/cdn-css.json");






// 执行全部cdn
export function initAll() {
  for (let url of scripts) {
    loadScript(url)
  }
  for (let url of css) {
    loadStyle(url)
  }
}





// 封装 & 抛出加载依赖的方法
export function loadScript(url = "") {
  return new Promise((resolve, reject) => {
    const scripts = document.querySelectorAll("script");
    let isHas = false;// 是否已经存在了
    for (let item of scripts) {
      if (item.src === url) {
        isHas = true;
      }
    }

    // 没存在就创建
    if (!isHas) {
      // 创建script标签，引入外部文件
      let script = document.createElement("script");
      script.setAttribute("defer", "");
      script.type = "module";
      script.src = url;
      document.body.appendChild(script);

      script.onload = () => {
        console.log(url + " 引入成功");
        resolve();
      };
      script.onerror = () => {
        loadScript(url); // 再次引入
        console.error(url + " 引入失败");
        reject();
      };
    }


    // 不用这种方法
    // fetch(url).then(res => res.blob().then(blob => {
    //   console.log(blob);
    //   let reader = new FileReader();
    //   reader.readAsBinaryString(blob);
    //   reader.onload = function (result) {
    //     console.log(result);
    //     new Function(result.currentTarget.result)();
    //     // eval(result.currentTarget.result);
    //     resolve();
    //   }
    //     reader.onerror = function (result) {
    //     reject();
    //   }
    // })).catch(err=>{
    //   reject();
    // })
  })
}
// 封装 & 抛出加载样式文件的方法
export function loadStyle(url = "") {
  return new Promise((resolve, reject) => {
    const links = document.querySelectorAll("link");
    let isHas = false; // 是否已经存在了
    for (let item of links) {
      if (item.href === url) {
        isHas = true;
      }
    }

    // 没存在就创建
    if (!isHas) {
      // 创建script标签，引入外部文件
      let link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);

      link.onload = () => {
        console.log(url + " 加载成功");
        resolve();
      };
      link.onerror = () => {
        loadStyle(url); // 再次加载
        console.error(url + " 加载失败");
        reject();
      };
    }
  })
}