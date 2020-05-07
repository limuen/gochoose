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
            @change="handleDipkerReaje"
          ></el-date-picker>
          <div class="input-item">
            <!-- <input type="button" class="btn" value="开始动画" id="start" @click="startAnimation" />
            <input type="button" class="btn" value="暂停动画" id="pause" @click="pauseAnimation" />
            <input type="button" class="btn" value="继续动画" id="resume" @click="resumeAnimation" />-->
            <el-button type="primary" @click="startAnimation">开始回放</el-button>
            <el-button type="warning" @click="pauseAnimation">暂停回放</el-button>
            <el-button type="danger" @click="resumeAnimation">继续回放</el-button>
          </div>
        </el-col>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
import AMap from "AMap";
import { electrombileTrack } from "@/api/car";
export default {
  name: "trajectory",
  props: {
    trajectoryId: {
      type: String
    }
  },
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
      arrayOry: [],
      videoUploadPercent: 0
    };
  },
  mounted() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    
    console.log(this.trajectoryId, "trajectoryId");
  },
  methods: {
    getHeight() {
      this.contentStyleObj.height = window.innerHeight - 120 + "px";
    },
    init() {
      this.Maploading = true;
      this.arrayOry = [];
      this.marker = null;
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
      electrombileTrack({
        deviceNo: this.trajectoryId
      })
        .then(res => {
          if (res.code == 0) {
            res.data.forEach(element => {
              this.arrayOry.push([element.lng, element.lat]);
            });
            console.log(this.arrayOry[0], "arrayOry");
            let arrayOryOne = this.arrayOry[0];
            this.marker = new AMap.Marker({
              map: this.map,
              position: arrayOryOne,
              icon: "https://webapi.amap.com/images/car.png",
              offset: new AMap.Pixel(-26, -13),
              autoRotation: true,
              angle: -90
            });
            // // 绘制轨迹
            var polyline = new AMap.Polyline({
              map: this.map,
              path: this.arrayOry,
              showDir: true,
              strokeColor: "#28F", //线颜色
              strokeWeight: 6 //线宽
            });
            var passedPolyline = new AMap.Polyline({
              map: this.map,
              strokeColor: "#AF5", //线颜色
              strokeWeight: 6 //线宽
            });
            this.marker.on("moving", function(e) {
              passedPolyline.setPath(e.passedPath);
            });
            that.map.setFitView();
            this.Maploading = false;
          }
        })
        .catch(() => {});
    },
    startAnimation() {
      this.marker.moveAlong(this.arrayOry, 3000);
    },
    pauseAnimation() {
      this.marker.pauseMove();
    },
    resumeAnimation() {
      this.marker.resumeMove();
    },
    initMap() {
      this.$nextTick(() => {
        this.init();
      });
    },
    handleDipkerReaje(value) {
      console.log(value);
      this.arrayOry = [];
      this.marker = null;
      this.map.clearMap();
      if (value != null) {
        electrombileTrack({
          deviceNo: this.trajectoryId,
          time: value
        })
          .then(res => {
            if (res.code == 0) {
              console.log(res, "handleDipkerReajeres");
              res.data.forEach(element => {
                console.log(element, "element");
                this.arrayOry.push([element.lng, element.lat]);
              });
              console.log(this.arrayOry, "arrayOry");
              let arrayOryOne = this.arrayOry[0];
              this.marker = new AMap.Marker({
                map: this.map,
                position: arrayOryOne,
                icon: "https://webapi.amap.com/images/car.png",
                offset: new AMap.Pixel(-26, -13),
                autoRotation: true,
                angle: -90
              });
              // // 绘制轨迹
              var polyline = new AMap.Polyline({
                map: this.map,
                path: this.arrayOry,
                showDir: true,
                strokeColor: "#28F", //线颜色
                strokeWeight: 6 //线宽
              });
              var passedPolyline = new AMap.Polyline({
                map: this.map,
                strokeColor: "#AF5", //线颜色
                strokeWeight: 6 //线宽
              });
              this.marker.on("moving", function(e) {
                passedPolyline.setPath(e.passedPath);
              });
              this.map.setFitView();
              console.log("111111");
              this.Maploading = false;
            }
          })
          .catch(() => {});
      } else {
        this.init();
      }
    },
    cancelsubmitfotm(trajectoryId) {
      this.activeClass = 0;
      this.dialogFormVisible = false;
      this.pauseAnimation();
      this.$emit('handleqkId',this.trajectoryId)
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
  .input-item{
    position: fixed;
    left: 42%;
    bottom: 5%;
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