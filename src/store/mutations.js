import $router from "../router/index"
const publicPath = require("@/config/public-path.json") // 开放路径
const noAppendTabs = require("@/config/exclude-keep-alive-pages.json") // 不插入到标签条的页面

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

  // 页面布局
  changeLayout(state, code) {
    state.layout = code;
  },

  // 设置菜单栏显示数据
  setMenu(state, data) {
    // console.log("路由数据：", data);
    // 过滤不该显示在菜单栏的数据
    let filterRoute = data.filter(item => {
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
    // 只保留有url的路由
    let permissionPublic = []
    const retainURL = data.filter((item) => {
      // console.log(item);
      if (item.url !== "") {
        permissionPublic.push(item.perms)
        state.permissionPublic = permissionPublic;
        return item
      }
    });
    // console.log("路由数据：", retainURL);

    // 存储路由
    state.permissionRouters = publicPath;
    state.permissionRouters.push(...retainURL.map(item => {
      return item.url;
    }));
    state.permissionRouters = [...new Set(state.permissionRouters)]; // 去重

    // 路由结构化
    const structuringRoute = retainURL.map(item => {
      let component;
      try {
        component = () => import(`@/pages/${item.remark}.vue`)
      } catch (err) {
        component = () => import(`@/pages/404.vue`)
      }
      return {
        path: item.url,
        name: item.remark.replace(/\//g, "-"),
        component,
        meta: {
          ...item,
          title: item.menuName,
          id: item.menuIdStr,
          permissions: item.children.map(it => {
            if (it.menuType === "F") {
              return {
                ...it,
                title: it.menuName,
                id: it.menuIdStr,
              }
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
      redirect: "/home",
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

  // 重置用户登陆的所有相关存储
  logout(state, type = "0") {
    sessionStorage.clear();
    localStorage.clear();
    // 如果是手动退出
    if (type === "0") {
      state.openedPages = [state.openedPages[0]];
    }
    location.href = `/logon?previous=${type === "0" ? "" : location.pathname + location.search}`
  },

  // 显示/隐藏 页面访问记录
  changeOpenedPages(state, status) {
    state.showOpenedPages = status;
  },

  // 插入经常访问的路由
  setOpenedPages(state, data) {
    // console.log(state.openedPages, data, noAppendTabs.includes(data.path));
    // 排除没有url的页面、不需要插入页签的路由
    if (!data.path || noAppendTabs.includes(data.path)) {
      return;
    }
    // 排除已有页签
    if (state.openedPages.some(item => {
      return item.path === data.path;
    })) {
      return;
    }

    state.openedPages.push(data)
  },

  // 设置当前停留页
  setDefaultPage(state, id) {
    state.nowPage = id;
  },

  // 页签的关闭事件
  closeThisOpenedPages(state, id) {
    const tabs = state.openedPages;
    const current = $router.history.current;
    tabs.forEach((tab, index) => {
      if (tab.meta.id === id) {
        // 删除tab页
        state.openedPages.splice(index, 1);

        // 如果删除的是当前页
        const left = tabs[tabs.length - 1].path;
        if (current.meta.id === tab.meta.id) {
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
        if (current.path !== "/home") {
          $router.replace("/home");
        }
        break;
      case "1":
        if (current.path !== "/home") {
          state.openedPages = [
            state.openedPages[0],
            {
              title: current.meta.title,
              path: current.path,
              meta: current.meta
            }];
        }
        break;
    }
  }
}