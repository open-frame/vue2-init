<template>
  <div class="home">
    <el-card class="box-card" style="margin:15px 0" :body-style="{padding:0}">
      <el-button-group class="animate__animated animate__backInRight" v-show="editLayout">
        <el-button type="primary" size="mini" icon="el-icon-check" @click="okLayout">确认调整</el-button>
        <el-button size="mini" icon="el-icon-close" @click="closeLayout">关闭调整</el-button>
      </el-button-group>
      <grid-layout
        :layout.sync="elements"
        :row-height="30"
        :is-draggable="editLayout"
        :is-resizable="editLayout"
        :margin="[15,15]"
        @layout-created="layoutCreatedEvent"
        @layout-before-mount="layoutBeforeMountEvent"
        @layout-mounted="layoutMountedEvent"
        @layout-ready="layoutReadyEvent"
        @layout-updated="layoutUpdatedEvent"
      >
        <grid-item
          v-for="item in elements"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          @resize="resizeEvent"
          @move="moveEvent"
          @resized="resizedEvent"
          @moved="movedEvent"
          :style="{border:editLayout?'1px solid #dedede':'none'}"
        >
          <el-card class="box-card" v-if="item.name==='大盘'">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div>
              人的一生会遇到两个人，一个惊艳了时光，一个温柔了岁月。
              —— 苏剧 《经年》
            </div>
          </el-card>
          <el-card class="box-card" v-if="item.name==='趋势图'">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div>
              他的眼里有星辰大海，是骑士触不可及的光芒
              —— 安迷修 《凹凸世界》
            </div>
          </el-card>
          <el-card class="box-card" v-if="item.name==='登录记录'">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div>人生需要四种人：名师指路，贵人相助，亲人支持，小人刺激。</div>
          </el-card>
          <el-card class="box-card" v-if="item.name==='呀呀呀呀'">
            <div slot="header" class="clearfix">
              <span>呀呀呀呀</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div>
              <pre>
                【青石阶】青石长阶，岁月折叠；失一段人生特写；敷衍了谁的犹豫不决；
                【油纸伞】油纸薄伞，如花美眷；释一纸断线纸鸢；诉说了谁的事态万千；
                【姻缘石】三生姻缘，一念之间；梦一场人生初见；诗化了谁的似水流年；
                【桃花扇】桃花折扇，倾世容颜；醉一片弹指流年；搁浅了谁的沧海桑田；
                【朱砂泪】泪覆朱砂，红妆待嫁；诉一段海角天涯，放弃了谁的满城烟花；
                【白堤柳】断桥邀月，暗柳摇曳；说一句浮生未歇，溶解了谁的胭脂诀别；
                【彼岸花】彼岸残花，香消玉损；折一片曼珠沙华，辜负了谁的青梅竹马；
                【史书页】史书长页，落字为约，书一纸生离死别，湮没了谁的风花雪月。
              </pre>
            </div>
          </el-card>
        </grid-item>
      </grid-layout>
    </el-card>

    <el-dialog
      title="添加功能面板"
      :visible.sync="addPanel"
      width="500px"
      append-to-body
      :before-close="closeAddPanel"
    >
      <el-select v-model="addFunctions" multiple filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddPanel">取 消</el-button>
        <el-button type="primary" @click="addingPanel">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * @author        全易
 * @time          2020-10-05 16:38:30  星期一
 * @description   订单管理
 */
import api from "@/service/api";
import VueGridLayout from "vue-grid-layout";

export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  computed: {
    editLayout() {
      return this.$store.state.editLayout;
    },
    addPanel() {
      return this.$store.state.addLayout;
    },
  },
  methods: {
    addingPanel() {
      this.closeAddPanel();
    },
    closeAddPanel(done) {
      /**
       * @param done is a function
       */
      this.$store.mutations.addLayout(false);
    },
    layoutCreatedEvent: function (newLayout) {
      console.log("Created layout: ", newLayout);
    },
    layoutBeforeMountEvent: function (newLayout) {
      console.log("beforeMount layout: ", newLayout);
    },
    layoutMountedEvent: function (newLayout) {
      console.log("Mounted layout: ", newLayout);
    },
    layoutReadyEvent: function (newLayout) {
      console.log("Ready layout: ", newLayout);
    },
    layoutUpdatedEvent: function (newLayout) {
      console.log("Updated layout: ", newLayout);
    },
    moveEvent: function (i, newX, newY) {
      console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizeEvent: function (index, newH, newW, newHPx, newWPx) {
      console.log(
        "调整第" +
          index +
          "个, 宽=" +
          newH +
          "列, 高=" +
          newW +
          "行, 宽=" +
          newHPx +
          "px, 高=" +
          newWPx +
          "px"
      );
    },
    movedEvent: function (i, newX, newY) {
      console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    resizedEvent: function (index, newH, newW, newHPx, newWPx) {
      console.log(
        "调整了第" +
          index +
          "个, 宽=" +
          newH +
          "列, 高=" +
          newW +
          "行, 宽=" +
          newHPx +
          "px, 高=" +
          newWPx +
          "px"
      );
    },
    okLayout() {
      this.$store.mutations.editLayout(false);
    },
    closeLayout() {
      this.$store.mutations.editLayout(false);
    },
  },
  data() {
    return {
      calendarTimes: new Date(),
      elements: [
        { x: 0, y: 0, w: 5, h: 4, i: "0", name: "大盘" },
        { x: 5, y: 0, w: 5, h: 4, i: "1", name: "趋势图" },
        { x: 10, y: 0, w: 2, h: 4, i: "2", name: "登录记录" },
        { x: 0, y: 0, w: 12, h: 14, i: "3", name: "呀呀呀呀" },
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      addFunctions: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    next();
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from);
    next();
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    this.$store.mutations.editLayout(false);
    next();
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
  created() {
    // console.clear();
    console.log("%c接口：", "background:green", api);
  },
};
</script>

<style lang="less" scoped>
.home {
  .box-card {
    .el-button-group {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 1;
    }
  }
}
</style>
