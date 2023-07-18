<template>
  <div class="home">
    <el-button-group class="animate__animated animate__backInDown edit-layout-btns" v-show="editLayout">
      <el-button type="primary" size="mini" icon="el-icon-check" @click="okLayout">确认调整</el-button>
      <el-button size="mini" icon="el-icon-close" @click="editLayout = false">关闭调整</el-button>
    </el-button-group>
    <template>
      <el-empty v-if="$route.meta.permissions.length === 0" description="您没有模块权限">
        <a target="_blank" href="https://work.weixin.qq.com/kfid/kfc4fd7cae33c6448f9">咨询客服，申请模块权限</a>
      </el-empty>
      <el-empty v-if="myCards.length === 0" description="您未添加模块展示">
        <el-button type="primary" @click="addLayout = true">添 加</el-button>
      </el-empty>
    </template>
    <div class="panels">
      <template v-for="(card, index) in myCards">
        <vue-draggable-resizable v-permission="card.permission" :key="index" :w="card.w" :h="card.h" :x="card.x"
          :y="card.y" :min-width="vdrConfig.minWidth" :enable-native-drag="true" :draggable="editLayout"
          :resizable="editLayout" @activated="changeCardItem(card)" @resizestop="onResizstop" @dragstop="onDragstop">
          <el-result v-if="card.error" class="bg-white shadow-sm" icon="error" title="组件加载错误" :subTitle="card.name">
            <a slot="extra" target="_blank" href="https://work.weixin.qq.com/kfid/kfc4fd7cae33c6448f9">反馈给客服</a>
          </el-result>
          <template v-else>
            <el-dropdown v-show="editLayout" @command="settings($event, card, index)" class="handle-btns">
              <el-button plain type="primary" size="mini">操作</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="0">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="bg-white shadow-sm module" :style="{
              height: card.h - 2 + 'px',
            }">
              <router-link class="d-block h5 p-2 m-0 text-black text-decoration-none" :to="card.url">{{ card.name
              }}</router-link>
              <component :is="card.component" :ref="card.component" />
            </div>
          </template>
        </vue-draggable-resizable>
      </template>
    </div>

    <el-popover trigger="hover" v-if="myCards.length > 0">
      <ul class="list-group">
        <li class="list-group-item" @click="addLayout = true">选择模块</li>
        <li class="list-group-item" @click="editLayout = true">管理模块</li>
      </ul>
      <div slot="reference" class="el-icon-s-tools fs-3 set" title="配置首页"></div>
    </el-popover>
    <panels-manage :my-cards="myCards" :show="addLayout" @close="addLayout = false" @success="editSuccess" />
  </div>
</template>


<script>
/**
 * @author        全易
 * @time          2021-01-11 11:12:22  星期一
 * @description   首页
//  */
import api from "@/service/api/home";
import { permission } from '@/directives/index.js'
import Vue from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'


export default {
  name: "home-index",
  components: {
    VueDraggableResizable,
    "panels-manage": () => import("./components/panels-manage.vue"),
  },
  directives: {
    permission
  },
  data() {
    return {
      vdrConfig: {
        editActive: false,
        minWidth: 300,
        tolerance: 10,
        changeCard: {},
      },
      myCards: [],
      editLayout: false,
      addLayout: false
    };
  },
  mounted() {
    this.hasLayout();
  },
  methods: {
    // 用户布局
    hasLayout() {
      api.homeLayout().then((res) => {
        if (res.code === 0 && res.data.length !== 0) {
          this.myCards = JSON.parse(res.data[0].homeJson);
          for (let index in this.myCards) {
            try {
              const component = require(`./panels/${this.myCards[index].component}`);
              Vue.component(this.myCards[index].component, component.default);
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
        `调整id${this.vdrConfig.changeCard.id}面板，宽：${width}，高：${height}，X：${x}，Y：${y}`
      );
      this.myCards.filter((card) => {
        if (this.vdrConfig.changeCard.id === card.id) {
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
      console.log(`调整第${this.vdrConfig.changeCard.id}个，X：${x}，Y：${y}`);
      this.myCards.map((card) => {
        if (this.vdrConfig.changeCard.id === card.id) {
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
      api
        .editHomeLayout({
          homeJson: JSON.stringify(this.myCards),
        })
        .then((res) => {
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
  top: 0;
  right: 1px;
  z-index: 99999999999;
}

.set {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999999999;
}

.set,
.list-group .list-group-item {
  cursor: pointer;
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
    overflow: auto;
  }
}
</style>
