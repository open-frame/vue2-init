import $router from "../router/index"
import publicPath from "../router/path"
import excludeKeepAlivePages from "../router/exclude-keep-alive-pages.json" // 不缓存的页面
import noAppendTabs from "../router/no-append-tabs.json" // 不插入到标签条的页面

export default {
  // 设置当前网络状态
  setIsOnline(state, net) {
    console.log(net);
    state.onLine = net;
  },
  // 设置当前网络状况
  setNetNow(state, net) {
    console.log(net);
    state.nowNet = net;
  },
  // 存储用户信息
  setUserInfo(state, data) {
    state.userInfo = data;
  },

  // 设置权限菜单
  setMenu(state, data) {
    state.permissionMenu = data;
  },

  // 设置权限路由
  setRouters(state, data) {
    // console.log("接口返回路由信息：", data);
    // 5/1. 扁平化路由数据封装
    let flatRoute = [];
    function flattening(menu) {
      menu.map((item) => {
        // console.log(item);
        if (item.children) {
          flattening(item.children); // 递归执行
        }
        flatRoute.push(item);
      });
    }
    flattening(data); // 调用执行扁平化路由数据
    // console.log("扁平化路由：",flatRoute);

    // 5/2. 去除目录
    let noDirectoryRoute = flatRoute.filter((item) => {
      // console.log(item);
      if (item.url !== "") {
        return item
      }
    });
    // console.log("路由数据：", noDirectoryRoute);
    state.permissionRouters = publicPath;
    // 存储路由
    state.permissionRouters.push(...noDirectoryRoute.map(item => {
      return item.url;
    }));

    // 5/3. 路由结构化
    let structuringRoute = noDirectoryRoute.map(item => {
      const component = require(`@/pages${item.url}/index`);
      return {
        path: item.url,
        name: component.default.name,
        component: component.default,
        meta: {
          title: item.menuName,
          id: item.menuIdStr
        }
      }
    });
    // console.log("结构化的路由：", structuringRoute);

    // 5/4. 合并路由
    let routers = {
      path: '/',
      name: 'Main',
      component: () => import("@/pages/main.vue"),
      redirect: "/home",
      children: structuringRoute
    };
    $router.addRoutes([routers]);
    $router.options.routes.push(routers);
  },

  //菜单栏展开/折叠切换
  menUnfold(state, status) {
    state.isCollapse = status;
    if (status) {
      delete state.width['min-width'];
      delete state.width['max-width'];
      state.width.width = "auto";
    } else {
      delete state.width.width;
      state.width['max-width'] = "12vw";
      state.width['min-width'] = "210px";
    }
  },

  // 首页布局调整
  editLayout(state, status) {
    state.editLayout = status;
  },

  // 首页添加模块
  addLayout(state, status) {
    state.addLayout = status;
  },

  // 切换菜单栏停留id
  changeMenuid(state, id) {
    state.menuId = id;
  },

  // 显示隐藏系统条
  hidingNav(state, params) {
    let display, height, margin;
    if (params.status) {
      display = "none";
      margin = "0px";
      height = "auto";
    } else {
      display = "block";
      // margin = params.position === "bigview" ? "0" : "15px";
      height = window.innerHeight - 99 + "px";
    }
    state.hideNav = params.status;
    document.querySelector(".nav").style.display = display;
    document.querySelector(".pages").style.height = height;
    document.querySelector(".pages").style.margin = margin;
  },

  // 显示隐藏菜单栏
  hidingMenu(state, status) {
    let display;
    if (status) {
      display = "none";
    } else {
      display = "block";
    }
    state.hideMenu = status;
    document.querySelector(".menus").style.display = display;
  },

  // 重置用户登陆的所有相关存储
  logout(state) {
    state.userInfo = {};
    state.permissionMenu = [];
    state.openedPages = [];
    state.keepAlivePages = [];
    state.menuId = "";
    sessionStorage.clear();
    localStorage.removeItem("token");
    state.permissionRouters = publicPath;
    $router.replace("/logon");
  },

  // 显示/隐藏 页面访问记录
  changeOpenedPages(state, status) {
    state.showOpenedPages = status;
  },

  // 插入经常访问的路由
  setOpenedPages(state, data) {
    // console.log(state.openedPages, data);
    if (noAppendTabs.includes(data.url) || !state.showOpenedPages) {
      return;
    }
    if (state.permissionRouters.includes(data.url)) {
      state.openedPages.push(data);
    }
  },

  // 设置当前停留页
  setDefaultPage(state, id) {
    state.defaultPage = id;
  },

  // 关闭tab页
  closeThisOpenedPages(state, id) {
    let tabs = state.openedPages;
    let path = "";
    tabs.forEach((tab, index) => {
      if (tab.meta.id === id) {
        // 删除keep-alive缓存
        state.keepAlivePages.splice(index, 1);
        path = state.openedPages[index].url;
        // setTimeout(() => {
        // 删除tab页
        state.openedPages.splice(index, 1);
        // 如果删除的是当前页，修改停留页id
        if ($router.history.current.path !== path) {
          state.defaultPage = $router.history.current.meta.id;
          return false;
        }
        // 如果删除的是当前页，跳转左侧页
        const a = tabs[tabs.length - 1].url
        if ($router.history.current.path !== a) {
          $router.push(a);
        }
        // }, 450);
        return false;
      }
    });
  },

  // 关闭全部tab路由
  closeAllOpenedPages(state) {
    state.keepAlivePages = ["Page-Home"];
    state.openedPages = [{
      title: "看盘",
      url: "/home",
      meta: {
        id: "Page-Home"
      }
    }];
    $router.push("/home");
  },

  // 关闭其他tab路由
  closeOtherOpenedPages(state) {
    let now = $router.history.current;
    state.openedPages = [{
      title: "看盘",
      url: "/home",
      meta: {
        id: "Page-Home"
      }
    },
    {
      title: now.meta.title,
      url: now.path,
      meta: now.meta
    }];
    state.keepAlivePages = ["Page-Home", now.name];
  },

  // 设置页面缓存
  setKeepAlivePage(state, page) {
    if (excludeKeepAlivePages.includes(page) || !page) {
      return;
    }
    state.keepAlivePages = state.openedPages.map(item => {
      return item.meta.name;
    })
    console.log(state.openedPages);
    // 30分钟清除页面缓存
    if (state.keepAlivePages.length > 0) {
      setTimeout(() => {
        state.keepAlivePages = ["Page-Home"];
      }, 1800000);
    }
  }
}