<template>
  <el-dialog
    width="65%"
    :append-to-body="true"
    :modal-append-to-body="false"
    title="地图"
    :visible="show"
    :before-close="close"
  >
    <div>
      <div class="search">
        <el-form class="form" :model="searchForm">
          <el-form-item style="margin-bottom: 0">
            <el-autocomplete
              autofocus
              prefix-icon="el-icon-search"
              id="tipinput"
              v-model="searchForm.searchText"
              placeholder="输入关键字查询地址"
              :fetch-suggestions="searchTips"
              @select="selectQueryResult"
              style="width: 100%"
            >
              <template slot="append">
                <el-button @click="searching">搜 索</el-button>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-form>
      </div>
      <!-- <el-amap id="amap" class="amap-box" :vid="'amap-vue'"></el-amap> -->
      <div id="amap" class="amap-box"></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="ok">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
/**
 * @author        全易
 * @time          2020-12-20 10:18:12  星期天
 * @description   高德地图
 */

export default {
  name: "Amap",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      map: null,
      searchForm: {
        searchText: "",
        searchResult: [],
      },
      data: {
        longitude: "",
        latitude: "",
      },
    };
  },
  watch: {
    show(now, old) {
      if (now) {
        this.$nextTick(() => {
          this.amap();
        });
      }
    },
  },
  methods: {
    // 初始化地图
    amap() {
      const that = this;
      this.map = new AMap.Map("amap").on("click", function (e) {
        console.log(e);
        that
          .$confirm(
            `选中纬度${e.lnglat.lng}，经度${e.lnglat.lat}吗？`,
            "位置提示"
          )
          .then(() => {
            that.data = {
              longitude: e.lnglat.lat,
              latitude: e.lnglat.lng,
            };
            that.ok();
          })
          .catch((_) => {});
      });
    },
    // 输入联想提示
    searchTips(text, cb) {
      console.log(text.trim());
      if (text.trim()) {
        const that = this;
        // 防抖执行
        AMap.plugin("AMap.Autocomplete", function () {
          setTimeout(() => {
            new AMap.Autocomplete().search(
              text.trim(),
              function (status, result) {
                console.log(result);
                if (result.tips) {
                  let results = result.tips;
                  // 回调函数
                  cb(
                    results.map((item) => {
                      return {
                        value: `【${item.name}】：${item.district}${item.address}`,
                      };
                    })
                  );
                } else {
                  that.$message.warning("尝试换个关键字看看");
                }
              }
            );
          }, 700);
        });
      }
    },
    // 点击输入提示项
    selectQueryResult(item) {
      console.log(item);
      this.searchForm.searchText = item.value;
      this.searching();
    },
    // 搜索地址
    searching() {
      let placeSearch = new AMap.PlaceSearch({
        map: this.map,
      });
      const map = this.map;
      const that = this;
      placeSearch.search(this.searchForm.searchText, function (status, result) {
        // 查询成功时，result即对应匹配的POI信息
        console.log(result);
        let pois = result.poiList.pois;
        for (let i = 0; i < pois.length; i++) {
          let poi = pois[i];
          let marker = [];
          marker[i] = new AMap.Marker({
            position: poi.location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: poi.name,
          });
          map.add(marker[i]); // 将创建的点标记添加到已有的地图实例
        }
        map.setFitView();
      });
      // 监听标记的点击事件
      AMap.event.addListener(placeSearch, "markerClick", function (e) {
        console.log(e);
        that
          .$confirm(
            `确定选中【${e.data.name}】，纬度${e.data.location.lng}，经度${e.data.location.lat}吗？`,
            "位置提示"
          )
          .then(() => {
            that.data = {
              longitude: e.data.location.lat,
              latitude: e.data.location.lng,
            };
            that.ok();
          })
          .catch((_) => {});
      });
    },
    // 关闭地图面板
    close() {
      this.$emit("close", false);
    },
    // 确定
    ok() {
      this.$emit("ok", this.data);
      this.close();
    },
  },
};
</script>

<style lang="less" scoped>
#amap {
  width: 100%;
  height: 60vh;
}
</style>
