<template>
  <el-dialog
    title="车辆位置"
    width="40%"
    class="opearteform"
    :close-on-click-modal="false"
    :before-close="cancelsubmitfotm"
    :visible.sync="dialogFormVisible"
    
  >
    <el-row :gutter="24">
      <el-form ref="form">
        <el-col :span="24" class="MapClass" v-loading="Maploading">
          <div id="container"  />
          <div class="BtnMapActive">
            <el-button
              v-for="(val,key) in BtnList"
              :key="key"
              @click="changes(key)"
              :class="activeClass == key ? 'active' : '' "
            >{{val}}</el-button>
          </div>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
import { electrombileLocation } from "@/api/car";
import AMap from "AMap";
export default {
  name: "Location",
  props: {
    LocationId: {
      type: Number
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      Maploading: true,
      BtnList: ["车", "运维"],
      activeClass: 0,
      map: null,
      marker: null,
      markerAyyryCar: [], //车存的marker
      markerArrayYw: [] //运维的marker
    };
  },
  mounted() {
    this.getLocation();
    this.$nextTick(() => {
      this.activeClass = 0;
      console.log(this.activeClass, "11111");
    });
  },
  methods: {
    init() {
      const that = this;
      that.map = new AMap.Map("container", {
        resizeEnable: true,
        zooms: [3, 20],
        zoom: 16
      });
      // 工具条控件
      that.map.plugin(["AMap.ToolBar"], function() {
        that.map.addControl(new AMap.ToolBar());
      });
      // 地图类型切换
      that.map.plugin(["AMap.MapType"], function() {
        that.map.addControl(new AMap.MapType());
      });
      electrombileLocation({
        electrombileId: this.LocationId
      })
        .then(res => {
          this.marker = null;
          this.markerAyyryCar = [];
          if (res.code == 0) {
            this.markerAyyryCar = [res.data.longitude, res.data.latitude];
            this.marker = new AMap.Marker({
              position: [res.data.longitude, res.data.latitude],
              icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
              offset: new AMap.Pixel(-13, -30)
            });
            this.map.add(this.marker);
            this.map.setFitView();
            this.Maploading = false;
          }
        })
        .catch(() => {});
    },
    initMap() {
      this.$nextTick(() => {
        
        this.init();
      });
    },
    changes(key) {
      this.activeClass = key;
      console.log(key, "111111111111");
    },
    // 获取数据
    getLocation() {},
    cancelsubmitfotm() {
      this.activeClass = 0;
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.MapClass {
  width: 100%;
  height: 400px;
  position: relative;
  .BtnMapActive {
    position: absolute;
    right: 35px;
    bottom: 20px;
  }
  #container {
    width: 100%;
    height: 100%;
  }
}
.active {
  color: #fff;
  background-color: #f56c6c;
}
#container /deep/ .amap-maptype-list {
  display: none !important;
}
.MapClass /deep/ .amap-indoormap-floorbar-control .panel-box {
  display: none !important;
}
</style>