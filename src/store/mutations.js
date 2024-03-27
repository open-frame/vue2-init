import $router from "../router/index"
const noAppendTabs = require("@/config/no-append-tabs.json") // 不插入到标签条的页面
const publicPath = require("@/config/public-path.json");

export default {
  // 存储用户信息
  setUserInfo(state, data) {
    state.userInfo = data;
  },

  // 页面布局
  changeLayout(state, code) {
    state.layout = code;
  },

  // 改变页面全覆盖还是左右结构型的页面
  changeFullPage(state, status) {
    state.fullPage = status;
  },

  // 设置菜单栏显示数据
  setMenu(state, data) {
    // console.log("路由数据：", data);
    // 3/1. 扁平化路由数据封装
    let flatRoute = [];
    (function flattening(menu) {
      menu.map((item) => {
        // console.log(item);
        if (item.children) {
          flattening(item.children); // 递归执行
        }
        flatRoute.push({
          ...item,
          icon: item.icon.replace('fa fa-', 'i-fa:'),
        });
      });
    })(data);
    // console.log("扁平化路由：", flatRoute);

    // 过滤不该显示在菜单栏的数据
    let filterRoute = flatRoute.filter(item => {
      return !["F", "1"].includes(item.menuType) // 排除掉摁钮和全局菜单
    })
    // console.log("过滤后的路由：", filterRoute);

    // 格式化层级关系
    function formatData(source) {
      const data = [...source];
      return data.filter((father) => {
        let branch = data.filter(
          (child) => father.menuId === child.parentId
        );
        father.children = branch.length > 0 ? branch : [];
        return father.parentId === 0;
      });
    }

    state.permissionMenu = formatData(filterRoute);
  },

  // 处理权限路由数据
  setRouters(state, data) {
    // console.log("路由信息：", data);
    // 3/1. 扁平化路由数据封装
    let flatRoute = [];
    (function flattening(menu) {
      menu.map((item) => {
        // console.log(item);
        if (item.children) {
          flattening(item.children); // 递归执行
        }
        flatRoute.push(item);
      });
    })(data);
    // console.log("扁平化路由：", flatRoute);

    // 过滤平台的路由
    const retainURL = flatRoute.filter((item) => {
      // console.log(item);
      if (item.url !== "") {
        return item
      }
    });
    // console.log("路由数据：", retainURL);

    // 存储路由
    state.permissionRouters = [...publicPath]; // 开放路径
    state.permissionRouters.push(...retainURL.map(item => {
      return item.url;
    }));

    // 路由结构化
    const structuringRoute = retainURL.map(item => {
      return {
        path: item.url,
        name: item.remark.replace(/\//g, "-"),
        component() {
          let component;
          try {
            component = import(`@/pages/${item.remark}.vue`);
          } catch (err) {
            component = import('@/pages/error/building.vue');
          }
          return component;
        },
        meta: {
          ...item,
          icon: item.icon.replace('fa fa-', 'i-fa:'),
          permissions: item.children.map(it => {
            if (it.menuType === "F") {
              return it
            }
          })
        }
      }
    });
    // console.log("结构化的路由：", JSON.stringify(structuringRoute));

    // 合并路由
    $router.addRoute({
      path: '/',
      name: 'main-file',
      component: () => import("@/pages/main.vue"),
      children: structuringRoute
    });
  },

  // 设置页面按钮的权限
  setPermissionButtons(state, permission) {
    // console.log(permission);
    if (permission) {
      let flatRoute = [];
      (function flattening(data) {
        data.map((item) => {
          // console.log(item);
          if (item.children) {
            flattening(item.children); // 递归执行
          }
          flatRoute.push(item.perms);
        });
      })(permission);
      state.permissionButtons = flatRoute;
      // console.log(state.permissionButtons);
    }
  },

  //菜单栏展开/折叠切换
  menUnfold(state, status) {
    state.isCollapse = status;
  },

  // 设置全局查看的商户/机构
  setNowDept(state, code) {
    state.nowDept = code;
  },

  openLoginDialog(state, status) {
    state.loginDialog = status;
  },

  // 重置用户登陆的所有相关存储
  logout(state, type = "0") {
    // if (localStorage.getItem("token")) {
    //   this.commit("openLoginDialog", true);
    // } else {
    $router.replace("/logon");
    sessionStorage.clear();
    localStorage.clear();
    // }
  },

  // 显示/隐藏 页面访问记录
  changeOpenedPages(state, status) {
    state.showOpenedPages = status;
  },

  // 插入经常访问的路由
  setOpenedPages(state, data) {
    const exist = state.openedPages.some(item => {
      return item.path === data.path;
    });

    // 排除存在的页签、没有url的页面、全屏的页面、不需要插入页签的路由
    if (exist || !data.name || !data.path || ["0", "2"].includes(data.meta.menuType) || noAppendTabs.includes(data.path)) {
      return;
    }

    state.openedPages.push(data)
  },

  // 设置当前停留页
  setDefaultPage(state, menuIdStr) {
    state.nowPage = menuIdStr;
  },

  // 页签的关闭事件
  closeThisOpenedPages(state, menuIdStr) {
    const tabs = state.openedPages;
    const current = $router.history.current;
    tabs.forEach((tab, index) => {
      if (tab.meta.menuIdStr === menuIdStr) {
        // 删除tab页
        state.openedPages.splice(index, 1);

        // 如果删除的是当前页
        const left = tabs[tabs.length - 1].path;
        if (current.meta.menuIdStr === tab.meta.menuIdStr) {
          $router.push(left); // 跳转左侧页
        }
        return;
      }
    });
  },
  // 关闭tab页签
  closePageTab(state, type) {
    const current = $router.history.current;
    state.openedPages = [state.openedPages[0]];
    switch (type) {
      case "0":
        if (current.path !== "/") {
          $router.replace("/");
        }
        break;
      case "1":
        if (current.path !== "/") {
          state.openedPages = [
            state.openedPages[0],
            {
              path: current.path,
              meta: current.meta
            }];
        }
        break;
    }
  }
}