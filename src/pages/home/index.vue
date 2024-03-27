<template>
  <div class="position-relative home">
    <el-button-group class="animate-bounce-in animate-duration-0.5s position-absolute edit-layout-btns"
      v-if="$route.meta.permissions.length > 0 && myCards.length > 0" v-show="editLayout">
      <el-button type="primary" size="mini" icon="el-icon-check" @click="okLayout">确认调整</el-button>
      <el-button size="mini" icon="el-icon-close" @click="editLayout = false">关闭调整</el-button>
    </el-button-group>
    <el-empty v-if="$route.meta.permissions.length === 0" description="您没有模块权限">
      <a target="_blank" :href="VUE_APP_CLW_SERVICE">咨询客服，申请模块权限</a>
    </el-empty>
    <el-empty v-if="$route.meta.permissions.length > 0 && myCards.length === 0" description="您未添加模块展示">
      <el-button type="primary" @click="addLayout = true">添 加</el-button>
    </el-empty>
    <div v-if="$route.meta.permissions.length > 0 && myCards.length > 0" class="panels">
      <template v-for="(card, index) in myCards">
        <vue-draggable-resizable v-permission="card.permission" :key="index" :w="card.w" :h="card.h" :x="card.x"
          :y="card.y" :min-width="vdrConfig.minWidth" :enable-native-drag="true" :draggable="editLayout"
          :resizable="editLayout" @activated="changeCardItem(card)" @resizestop="onResizstop" @dragstop="onDragstop">
          <el-result v-if="card.error" class="bg-white shadow-sm" icon="error" title="组件加载错误" :subTitle="card.name">
            <a slot="extra" target="_blank" :href="VUE_APP_CLW_SERVICE">反馈给客服</a>
          </el-result>
          <div v-else class="bg-white shadow-sm module">
            <el-dropdown v-show="editLayout" @command="settings($event, card, index)" class="handle-btns">
              <el-button plain type="primary" size="mini">操作</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <router-link class="h5 p-2 m-0 text-black " :to="card.url" style="display: inline-block;">
              {{ card.name
              }}
            </router-link>
            <component :is="card.component" :ref="card.component" />
          </div>
        </vue-draggable-resizable>
      </template>
    </div>

    <el-dropdown @command="layoutSetting" trigger="click">
      <span class="el-icon-s-tools text-2xl"></span>
      <el-dropdown-menu slot="dropdown" :append-to-body="false">
        <el-dropdown-item command="addLayout">选择模块</el-dropdown-item>
        <el-dropdown-item command="editLayout">模块布局</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <panels-manage :my-cards="myCards" :show="addLayout" @close="addLayout = false" @success="editSuccess" />
  </div>
</template>


<script>
/**
 * @author        全易
 * @time          2021-01-11 11:12:22  星期一
 * @description   首页
 */
import { homeLayout, editHomeLayout } from "./api.js";
import { permission } from "@/directives/index.js";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

export default {
  name: "home-index",
  directives: {
    permission,
  },
  components: {
    VueDraggableResizable,
    "panels-manage": () => import("./components/panels-manage.vue"),
  },
  data() {
    return {
      VUE_APP_CLW_SERVICE: "",
      vdrConfig: {
        editActive: false,
        minWidth: 300,
        tolerance: 10,
        changeCard: {},
      },
      myCards: [],
      editLayout: false,
      addLayout: false,
    };
  },
  created() {
    this.VUE_APP_CLW_SERVICE = process.env.VUE_APP_CLW_SERVICE;
  },
  mounted() {
    this.hasLayout();
  },
  methods: {
    // 用户布局
    hasLayout() {
      homeLayout().then((res) => {
        if (res.code === 0 && res.data.length !== 0) {
          this.myCards = JSON.parse(res.data[0].homeJson);
          console.log("我的模块：", this.myCards);
          for (let index in this.myCards) {
            try {
              const component = this.myCards[index].component;
              this.$options.components[component] = () => import(`./panels/${component}`);
            } catch (err) {
              this.myCards[index].error = true;
            }
          }
        }
      });
    },
    // 选中要调整的面板时
    changeCardItem(panel) {
      if (this.editLayout) {
        console.log(panel);
        this.vdrConfig.changeCard = panel;
      }
    },
    // 停止改变面板尺寸时
    onResizstop(x, y, width, height) {
      console.log(
        `${this.vdrConfig.changeCard.permission}：宽：${width}，高：${height}，X：${x}，Y：${y}`
      );
      this.myCards.filter((card) => {
        if (this.vdrConfig.changeCard.permission === card.permission) {
          card.w = width;
          card.h = height;
          card.x = x;
          card.y = y;
        }
        return true;
      });
    },
    // 停止移动面板时
    onDragstop(x, y) {
      console.log(`${this.vdrConfig.changeCard.permission}：X：${x}，Y：${y}`);
      this.myCards.map((card) => {
        if (this.vdrConfig.changeCard.permission === card.permission) {
          console.log(card);
          card.x = x;
          card.y = y;
        }
      });
    },
    // 设置面板
    settings(command, card, index) {
      // console.log(command, card, index);
      switch (command) {
        case "0":
          this.detelePanel(card, index);
          break;
        case "2":
          // this.$store.commit("addLayout", true);
          break;
      }
    },
    // 删除面板
    detelePanel(obj, index) {
      this.myCards.splice(index, 1);
    },
    // 确定调整布局
    okLayout() {
      editHomeLayout({
        homeJson: JSON.stringify(this.myCards),
      }).then((res) => {
        if (res.code === 0) {
          this.hasLayout();
          this.editLayout = false;
          this.$message.success("调整成功");
        }
      });
    },
    editSuccess(components) {
      this.myCards = components;
      this.hasLayout();
    },
    // 管理模块
    layoutSetting(command) {
      this[command] = true;
    }
  },
  // 路由离开前
  beforeRouteLeave(to, from, next) {
    // 可以访问组件实例 `this`
    // console.log(to, from);
    if (this.editLayout) {
      this.$confirm("您在调整布局结构", {
        confirmButtonText: "保存并离开",
        cancelButtonText: "继续调整",
        type: "warning",
      })
        .then(() => {
          this.okLayout();
          next();
        })
        .catch(() => { });
    } else {
      next();
    }
  },
};
</script>

<style lang="less" scoped>
.edit-layout-btns {
  position: fixed;
  top: 72px;
  right: 12px;
  z-index: 99999999999;
}

::v-deep .el-dropdown {
   position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 9999999999;
}

.panels {
  .vdr {
    border: 1px dashed transparent;
  }

  .active.draggable.resizable {
    border: 1px dashed #000000;
    z-index: 1 !important;
  }

  .handle-btns {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }

  .module {
    height: inherit;
    overflow: auto;
  }
}
</style>
