<template>
  <el-dialog
    title="轨迹回放"
    width="100%"
    :close-on-click-modal="false"
    :before-close="cancelsubmitfotm"
    :visible.sync="dialogFormVisible"
    style="margin-top:0px;"
    class="trajectory"
  >
    <el-row :gutter="24">
      <el-form ref="form">
        <el-col :span="24" class="MapClass" v-loading="Maploading">
          <div id="container" :style="contentStyleObj" />
          <el-date-picker
            class="pickerDate"
            v-model="value1"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
          <div class="input-item">
            <input type="button" class="btn" value="开始动画" id="start" @click="startAnimation" />
            <input type="button" class="btn" value="暂停动画" id="pause" @click="pauseAnimation" />
          </div>
          <div class="input-item">
            <input type="button" class="btn" value="继续动画" id="resume" @click="resumeAnimation" />
            <input type="button" class="btn" value="停止动画" id="stop" @click="stopAnimation" />
          </div>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
import AMap from "AMap";
export default {
  name: "trajectory",
  data() {
    return {
      dialogFormVisible: false,
      Maploading: true,
      map: null,
      contentStyleObj: {
        height: ""
      },
      value1: "",
      marker: null,
      arrayOry: [
          [116.478935, 39.997761],
          [116.478939, 39.997825],
          [116.478912, 39.998549],
          [116.478912, 39.998549],
          [116.478998, 39.998555],
          [116.478998, 39.998555],
          [116.479282, 39.99856],
          [116.479658, 39.998100],
          [116.480151, 39.998453],
          [116.480784, 39.998302],
          [116.480784, 39.998302],
          [116.481149, 39.998184],
          [116.481573, 39.997997],
          [116.481863, 39.997846],
          [116.482072, 39.997718],
          [116.482362, 39.997718],
          [116.483633, 39.998935],
          [116.48367, 39.998968],
          [116.484648, 39.999861]
        ],
        videoUploadPercent: 0
    };
  },
  mounted() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
  },
  methods: {
    getHeight() {
      this.contentStyleObj.height = window.innerHeight - 120 + "px";
    },
    init() {
      const that = this;
      that.map = new AMap.Map("container", {
        resizeEnable: true,
        zooms: [3, 20],
        center: [116.397428, 39.90923],
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
      this.Maploading = false;
      this.marker = new AMap.Marker({
        map: that.map,
        position: [116.478935, 39.997761],
        icon: "https://webapi.amap.com/images/car.png",
        offset: new AMap.Pixel(-26, -13),
        autoRotation: true,
        angle: -90
      });
      // 绘制轨迹
      var polyline = new AMap.Polyline({
        map: that.map,
        path: this.arrayOry,
        showDir: true,
        strokeColor: "#28F", //线颜色
        strokeWeight: 6 //线宽
      });
      var passedPolyline = new AMap.Polyline({
        map: that.map,
        strokeColor: "#AF5", //线颜色
        strokeWeight: 6 //线宽
      });
      that.map.setFitView();
    },
    startAnimation() {
      this.marker.moveAlong(this.arrayOry, 200);
    },
    pauseAnimation() {
      this.marker.pauseMove();
    },
    resumeAnimation() {
      this.marker.resumeMove();
    },
    stopAnimation() {
      this.marker.stopMove();
    },
    initMap() {
      this.$nextTick(() => {
        this.init();
      });
    },
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
  height: 100%;
  position: relative;
  .pickerDate {
    position: fixed;
    left: 45%;
    top: 16%;
  }
  #container {
    width: 100%;
    height: 100%;
  }
}
#container /deep/ .amap-maptype-list {
  display: none !important;
}
.MapClass /deep/ .amap-indoormap-floorbar-control .panel-box {
  display: none !important;
}
.trajectory /deep/ .el-dialog {
  // margin-top: 0vh !important;
  margin: 0px !important;
}
</style>