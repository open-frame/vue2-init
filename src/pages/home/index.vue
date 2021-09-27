<template>
  <div class="home">
    <el-button-group
      class="animate__animated animate__backInDown edit-layout-btns"
      v-show="$store.state.editLayout"
    >
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-check"
        @click="okLayout"
        >确认调整</el-button
      >
      <el-button size="mini" icon="el-icon-close" @click="closeLayout"
        >关闭调整</el-button
      >
    </el-button-group>
    <div class="panel">
      <template v-for="(card, index) in myCards">
        <vdr
          :key="index"
          :w="card.w"
          :h="card.h"
          :x="card.x"
          :y="card.y"
          :class-name="$store.state.editLayout ? 'vdr-body-action' : 'vdr-body'"
          :min-width="vdrConfig.minWidth"
          :enable-native-drag="true"
          :draggable="$store.state.editLayout"
          :resizable="$store.state.editLayout"
          @activated="changeCardItem(card)"
          @resizestop="onResizstop"
          @dragstop="onDragstop"
        >
          <!-- <div class="panel-body"> -->
          <el-dropdown
            v-show="$store.state.editLayout"
            size="small"
            @command="settings($event, card, index)"
            class="handle-btns"
          >
            <el-button plain type="primary" size="mini">操作</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">删除</el-dropdown-item>
              <el-dropdown-item command="2">修改</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-card
            :body-style="{
              height: card.h - 39 + 'px',
              overflow: 'auto',
              padding: 0,
            }"
          >
            <div slot="header">
              <h5 class="title" @click="$router.push(card.url)" style="">
                {{ card.name }}
              </h5>
              <!-- <el-tag type="danger" size="mini">123</el-tag> -->
            </div>
            <component :is="card.component" :ref="card.component" />
          </el-card>
          <!-- </div> -->
        </vdr>
      </template>
    </div>
    <el-dialog
      class="module-management"
      title="模块管理"
      width="500px"
      append-to-body
      :close-on-click-modal="false"
      :visible="$store.state.addLayout"
      :before-close="closeAddPanel"
    >
      <el-form :model="editPanelForm">
        <el-form-item>
          <el-select
            multiple
            filterable
            v-model="editPanelForm.components"
            placeholder="请选组件"
          >
            <template v-for="(cmp, index) in allComponent">
              <el-option
                :key="index"
                :label="cmp.name"
                :value="cmp.component"
              />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddPanel">关 闭</el-button>
        <el-button type="primary" @click="okEditPanel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
/**
 * @author        全易
 * @time          2021-01-11 11:12:22  星期一
 * @description   首页
 */
import vdr from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import NewUsers from "./panels/new-users";
import Withdraw from "./panels/withdraw";
import Refunds from "./panels/refund";
import Orders from "./panels/orders";
// import api from "@/service/api/home";

export default {
  name: "Page-Home",
  components: {
    vdr,
    NewUsers,
    Withdraw,
    Refunds,
    Orders,
  },
  data() {
    return {
      // 用户的全部组件
      allComponent: [
        {
          component: "NewUsers",
          url: "/management/use-electric",
          h: 280,
          id: "1",
          name: "今日新增用户",
          w: 450,
          x: 0,
          y: 0,
          remark: 1123,
        },
        {
          component: "Withdraw",
          url: "/settlement/user-account?panel=withdraw",
          h: 280,
          id: "2",
          name: "用户提现",
          w: 631,
          x: 472,
          y: -278,
          remark: 1222,
        },
        {
          component: "Refunds",
          url: "/settlement/user-account?panel=refund",
          h: 280,
          id: "3",
          name: "订单退款",
          w: 565,
          x: 1119,
          y: -560,
          remark: 144,
        },
        {
          component: "Orders",
          url: "/orders/order-manage",
          h: 400,
          id: "4",
          name: "未付款订单",
          w: 1678,
          x: 0,
          y: -543,
          remark: 1654,
        },
      ],
      vdrConfig: {
        editActive: false,
        minWidth: 300,
        tolerance: 10,
        changeCard: {},
      },
      myCards: [],
      editPanelForm: {
        components: [], //已选中的
      },
    };
  },
  created() {
    this.hasLayout();
  },
  methods: {
    // 布局记忆
    hasLayout() {
      /* api.homeLayout().then((res) => {
        console.log(res);
        if (res.code === 0 && res.data.length !== 0) {
          this.myCards = JSON.parse(res.data[0].homeJson);
          this.editPanelForm.components = this.myCards.map((item) => {
            return item.component;
          });
        }
      }); */
    },
    // 选中要调整的面板时
    changeCardItem(panel) {
      if (this.$store.state.editLayout) {
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
    // 删除面板
    detelePanel(obj, index) {
      this.myCards.splice(index, 1);
    },
    // 设置面板
    settings(command, card, index) {
      // console.log(command, card, index);
      switch (command) {
        case "1":
          this.detelePanel(card, index);
          break;
        case "2":
          this.addPanelForm = card;
          this.$store.commit("addLayout", true);
          this.showAddPanel = true;
          break;
      }
    },
    // 确定调整布局
    okLayout() {
      this.$store.commit("editLayout", false);
      /* api
        .editHomeLayout({
          homeJson: JSON.stringify(this.myCards),
        })
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("调整成功");
            this.closeAddPanel();
          }
        }); */
    },
    // 关闭调整布局
    closeLayout() {
      this.$store.commit("editLayout", false);
      this.hasLayout();
    },
    // 关闭添加展示面板
    closeAddPanel(done) {
      // @param done is a function
      this.$store.commit("addLayout", false);
      this.showAddPanel = false;
      this.hasLayout();
    },
    // 确定改动功能面板
    okEditPanel() {
      console.log(this.editPanelForm);
      let params = [];
      for (let i = 0, len = this.allComponent.length; i < len; i++) {
        for (
          let l = 0, leng = this.editPanelForm.components.length;
          l < leng;
          l++
        ) {
          if (
            this.allComponent[i].component === this.editPanelForm.components[l]
          ) {
            params.push(this.allComponent[i]);
          }
        }
      }
      console.log(params);
      this.myCards = params;
      this.okLayout();
    },
  },
  // 路由离开前
  beforeRouteLeave(to, from, next) {
    // 可以访问组件实例 `this`
    // console.log(to, from);
    if (this.$store.state.editLayout) {
      this.$confirm("您在调整布局", "提示", {
        confirmButtonText: "保存配置并离开",
        cancelButtonText: "继续调整",
        type: "warning",
      })
        .then(() => {
          this.okLayout();
          next();
        })
        .catch(() => {});
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
  right: 100px;
  z-index: 99999;
}
.panel {
  height: -webkit-fill-available;
  .vdr-body {
    border: 1px dashed transparent;
  }
  .vdr-body-action {
    border: 1px dashed #b4b4b4;
    z-index: 9999999 !important;
  }
  .vdr-body,
  .vdr-body-action {
    .handle-btns {
      position: absolute;
      top: 0;
      right: 0;
    }
    /deep/.el-card__header {
      padding: 8px;
      border-bottom: none;
      .title {
        cursor: pointer;
        display: inline-block;
        &:hover {
          color: #19aa8d;
        }
      }
    }
  }
}
</style>
