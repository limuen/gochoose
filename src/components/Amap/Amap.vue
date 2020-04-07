<template>
  <div class="gdmap" :class="{ 'active': isActive }">
    <el-autocomplete
      class="location-search"
      valueKey="name"
      v-model="searchAddress"
      id="location"
      clearable
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
    <div id="container"></div>
    <!-- <div v-else id="container1"></div> -->
    <div class="action-area-map-action">
      <ul>
        <li @click="clickmap">
          <svg-icon :icon-class="isFullscreenmap ?'exit-fullscreen':'fullscreen'" />
        </li>
        <li>
          <i class="el-icon-question"></i>
          <span>帮助</span>
        </li>
        <li @click="previousActual">
          <i class="el-icon-question"></i>
          <span>上一步</span>
        </li>
        <li @click="redo">
          <i class="el-icon-refresh-right"></i>
          <span>重做</span>
        </li>
        <li @click="markerfn">
          <i class="el-icon-check"></i>
          <span>完成</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  props: {
    Tabsactive: {
      type: Boolean,
      required: true
    }
    // strokeColor: {
    //   type: String,
    //   required: true
    // }
  },
  name: "Aamp",
  data() {
    return {
      searchAddress: "",
      location: "", //地图搜索定位
      isFullscreenmap: false, // 地图放大
      isActive: false, // 全屏
      map: null,
      // 数据
      marker: null,
      polyline: null,
      polygonActual: null,
      drawData: [],
      strokeColor: "", // 线颜色
      fillColor: "", // 区域颜色
      // 用户可见区域
      Mapobject: {
        seeingRegion: {
          marker: null, //marker
          polyline: null,
          polygon: null,
          //折线坐标,所有的点位都存在这 利于上一步删除pop的时候用
          markerarr: [],
          markers: [],
          polylines: [],
          seeingRegionModelList: [] //用户区域的经纬度列表
        }, //用户可见区域的经纬度列表
        actualRegion: {
          marker: null, //marker
          polyline: null,
          polygon: null,
          //折线坐标,所有的点位都存在这 利于上一步删除pop的时候用
          markerarr: [],
          markers: [],
          polylines: [],
          seeingRegionModelList: [] //实际区域的经纬度列表
        } //实际区域的经纬度列表
      }
    };
  },
  watch: {
    Tabsactive: {
      handler(newValue, oldValue) {
        console.log(this.Tabsactive, "地图离里面的Tabsactive");
        if (this.map) {
          this.map.clearMap();
        }
        if (this.Tabsactive == true) {
          console.log(
            "切换到了实际区域重新拿用户可见区域绘制地图",
            this.Mapobject.seeingRegion
          );
          this.drawMap(this.Mapobject.seeingRegion);
          this.drawMap(this.Mapobject.actualRegion, true);
        } else {
          console.log(this.Mapobject.seeingRegion.polygon);
          this.drawMap(this.Mapobject.seeingRegion, true);
        }
      },
      immediate: true
    }
  },
  mounted() {
    // 加载地图
    // this.$nextTick(() =>{
    //   this.initMap();
    // })
    this.init();

    // console.log(this.Tabsactive, "Tabsactive");
  },
  methods: {
    // 拿到数据绘制地图
    drawMap(region, isMarker) {
      console.log(region.markerarr);
      if (region.markerarr.length == 0) {
        return false;
      }
      if (isMarker) {
        // 创建点覆盖物
        region.markerarr.forEach(item => {
          if (Array.isArray(item)) {
            this.marker = new AMap.Marker({
              position: [item[0], item[1]],
              offset: new AMap.Pixel(-13, -30)
            });
            this.map.add(this.marker);
          } else {
            this.marker = new AMap.Marker({
              position: [item.lng, item.lat],
              offset: new AMap.Pixel(-13, -30)
            });
            this.map.add(this.marker);
          }
        });
      }
      console.log(region.seeingRegionModelList, "region.seeingRegionModelList");
      if (region.seeingRegionModelList) {
        // 绘制折线
        region.polyline = new AMap.Polyline({
          path: region.markerarr,
          isOutline: false,
          borderWeight: 1,
          strokeColor: "#67c23a",
          strokeOpacity: 1,
          strokeWeight: 3,
          strokeStyle: "solid",
          // strokeStyle是dashed时有效
          // strokeDasharray: [10, 5],
          lineJoin: "round",
          lineCap: "round",
          zIndex: 50
        });
        region.polyline.setMap(this.map);
        region.polygon = new AMap.Polygon({
          path: region.markerarr,
          fillColor: "#67c23a",
          fillOpacity: 0.4,
          strokeOpacity: 1,
          strokeColor: "#67c23a",
          strokeWeight: 3
        });
        this.map.add(region.polygon);
      }
    },
    // 加载地图
    initMap() {
      // this.init(this.Mapobject.seeingRegion,"container")
      // this.init(this.Mapobject.actualRegion,"container1")
      // this.clickTwo()
      // this.clickOn()
      // this.init()
    },
    init() {
      let that = this;
      that.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 14
      });
      // 工具条控件
      that.map.plugin(["AMap.ToolBar"], function() {
        that.map.addControl(new AMap.ToolBar());
      });
      // 地图类型切换
      that.map.plugin(["AMap.MapType"], function() {
        that.map.addControl(new AMap.MapType());
      });
      this.clickOn();
    },
    // 模糊搜索匹配
    querySearch(queryString, cb) {
      let that = this;
      AMap.plugin("AMap.Autocomplete", function() {
        // 实例化Autocomplete
        var autoOptions = {
          //city 限定城市，默认全国
          city: "全国"
        };
        var autoComplete = new AMap.Autocomplete(autoOptions);
        autoComplete.search(queryString, function(status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (result.info === "OK") {
            cb(result.tips);
          } else {
            that.$notify.error({
              title: "错误",
              message: "服务器出小差了，请重新搜索"
            });
          }
        });
      });
    },
    handleSelect(item) {
      this.searchAddress = item.name;
      this.location = item.location;
      this.Mapobject.seeingRegion.map.setCenter(item.location);
    },
    // 放大缩小地图
    clickmap() {
      if (this.isFullscreenmap === false) {
        this.isFullscreenmap = true;
        this.isActive = true;
      } else {
        this.isFullscreenmap = false;
        this.isActive = false;
      }
    },
    clickOn() {
      this.map.on("click", this.showInfoClick);
    },
    // clickTwo() {
    //   this.Mapobject.actualRegion.map.on("click", this.actualRegionFn);
    // },
    // 用户可见区域
    // seeingRegionFn(e) {
    //   this.showInfoClick(e, this.Mapobject.seeingRegion);
    // },
    // // 实际区域
    // actualRegionFn(e) {
    //   this.showInfoClick(e, this.Mapobject.actualRegion);
    // },
    showInfoClick(e) {
      console.log(
        "您在 [ " +
          e.lnglat.getLng() +
          "," +
          e.lnglat.getLat() +
          " ] 的位置单击了地图！"
      );
      let that = null;
      if (this.Tabsactive) {
        // console.log("走这里11111111");
        that = this.Mapobject.actualRegion;
        this.strokeColor = "#f56c6c";
      } else {
        this.strokeColor = "#67c23a";
        that = this.Mapobject.seeingRegion;
      }
      if (that.polygon) {
        that.polygon.setMap(null);
        that.polygon = null;
      }
      // 用户可见区域
      if (this.drawData.length == 0) {
        this.drawData = [].concat(that.markerarr);
      }
      // 创建点覆盖物
      that.marker = new AMap.Marker({
        position: [e.lnglat.getLng(), e.lnglat.getLat()],
        // position: [e.lnglat.getLat(), e.lnglat.getLng()],
        offset: new AMap.Pixel(-13, -30)
      });
      that.markers.push(that.marker);
      // that.markerarr.push([e.lnglat.getLng(), e.lnglat.getLat()]);
      this.drawData.push([e.lnglat.getLng(), e.lnglat.getLat()]);
      that.seeingRegionModelList.push({
        lng: e.lnglat.getLng(),
        lat: e.lnglat.getLat()
      });
      that.marker.setMap(this.map);
      that.polyline = new AMap.Polyline({
        path: this.drawData,
        isOutline: false,
        outlineColor: "#ffeeff",
        borderWeight: 1,
        strokeColor: this.strokeColor,
        strokeOpacity: 1,
        strokeWeight: 3,
        // 折线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        // strokeDasharray: [10, 5],
        lineJoin: "round",
        lineCap: "round",
        zIndex: 50
      });
      that.polylines.push(that.polyline);
      that.polyline.setMap(this.map);
      this.$emit("isdrawData", this.drawData || []);
    },
    redo() {
      this.map.clearMap();
      this.marker = null;
      this.polyline = null;
      this.polygonActual = null;
      this.drawData = [];
      if (!this.Tabsactive) {
        console.log("用户可见区域 + ", this.Tabsactive);
        // 用户可见区域
        this.Mapobject.seeingRegion = {
          marker: null, //marker
          polyline: null,
          polygon: null,
          //折线坐标,所有的点位都存在这 利于上一步删除pop的时候用
          markerarr: [],
          markers: [],
          polylines: [],
          seeingRegionModelList: [] //用户区域的经纬度列表
        };
      } else {
        console.log("实际区域 +", this.Tabsactive);
        // 用户可见区域
        this.drawMap(this.Mapobject.seeingRegion);
        this.Mapobject.actualRegion = {
          marker: null, //marker
          polyline: null,
          polygon: null,
          //折线坐标,所有的点位都存在这 利于上一步删除pop的时候用
          markerarr: [],
          markers: [],
          polylines: [],
          seeingRegionModelList: [] //用户区域的经纬度列表
        };
      }
    },
    markerfn() {
      let that = null;
      if (!this.Tabsactive) {
        console.log("用户可见区域 + ", this.Tabsactive);
        that = this.Mapobject.seeingRegion;
        this.fillColor = "#67c23a";
      } else {
        console.log("实际区域 +", this.Tabsactive);
        that = this.Mapobject.actualRegion;
        this.fillColor = "#f56c6c";
      }
      if (!that.polygon) {
        that.polygon = new AMap.Polygon({
          path: this.drawData,
          fillColor: this.fillColor,
          fillOpacity: 0.4,
          strokeOpacity: 1,
          strokeColor: this.strokeColor,
          strokeWeight: 3
        });
        this.map.add(that.polygon);
        that.markerarr = this.drawData;
        that.markers = this.drawData
      }
      this.$emit("markerRegion", that.seeingRegionModelList);
      this.drawData = [];
      this.$emit("isdrawData", this.drawData);
    },
    previousActual() {
      let that = null;
      if (!this.Tabsactive) {
        console.log("用户可见区域 + ", this.Tabsactive);
        that = this.Mapobject.seeingRegion;
      } else {
        console.log("实际区域 +", this.Tabsactive);
        that = this.Mapobject.actualRegion;
      }

      if (that.polygon) {
        that.polygon.setMap(null);
        that.polygon = null;
      }

      that.seeingRegionModelList.pop();
      console.log(this.drawData, "this.markerarr");
      if(this.drawData.length != 0) {
        this.drawData.pop()
        that.markers[that.drawData.length].setMap(null);
        that.markers.pop();
        that.polylines[that.drawData.length].setMap(null);
        that.polylines.pop();
      }else{

      }
      // if(that.markerarr.length != 0) {
      //   this.drawData.pop()
      //   that.markerarr.pop();
      //   that.markers[that.markerarr.length].setMap(null);
      //   that.markers.pop();
      //   that.polylines[that.markerarr.length].setMap(null);
      //   that.polylines.pop();
      // }
      // if (that.markerarr.length != 0) {
      //   this.drawData = that.markerarr;
      //   that.markerarr.pop()
      //   that.markers[that.markerarr.length].setMap(null);
      //   that.markers.pop();
      //   that.polylines[that.markerarr.length].setMap(null);
      //   that.polylines.pop();
      //   this.drawData.pop()
      // } else {
      //   that.markerarr.pop()
      //   that.markers[that.markerarr.length].setMap(null);
      //   that.markers.pop();
      //   that.polylines[that.markerarr.length].setMap(null);
      //   that.polylines.pop();
      //   this.drawData.pop();
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.gdmap {
  position: relative;
  width: 100%;
  height: 400px;
  .location-search {
    position: absolute;
    top: 20px;
    padding: 5px;
    background: #fff;
    width: 320px;
    left: 50%;
    margin-left: -160px;
    z-index: 9;
  }
  #container,
  #container1 {
    width: 100%;
    height: 100%;
  }
  .action-area-map-action {
    width: 64px;
    height: 320px;
    position: absolute;
    text-align: center;
    display: flex;
    flex-direction: column;
    right: 0;
    background: #fff;
    box-shadow: 0 0px 2px 0px rgba(0, 0, 0, 0.2);
    bottom: 0;
    padding-bottom: 16px;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        width: 100%;
        height: 65px;
        &:hover {
          background: #ccc;
        }
      }
      cursor: pointer;
      i {
        display: block;
        text-align: center;
        font-size: 30px;
        padding-top: 10px;
        margin-bottom: -10px;
      }
      span {
        display: block;
        -o-user-select: none;
        -moz-user-select: none; /*火狐 firefox*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10+*/
        -khtml-user-select: none; /*早期的浏览器*/
        user-select: none;
      }
      svg {
        font-size: 30px;
        align-items: center;
        justify-content: center;
        line-height: 65px;
        margin-top: 20px;
      }
    }
  }
}
.gdmap.active {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999;
}
.gdmap #container /deep/ .amap-maptype-list {
  display: none !important;
}
</style>