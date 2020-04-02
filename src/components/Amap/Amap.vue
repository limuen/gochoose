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
    <div v-if="!this.Tabsactive"  id="container"></div>
    <div v-else id="container1"></div>
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
    },
    strokeColor: {
      type: String,
      required: true
    }
  },
  name: "Aamp",
  data() {
    return {
      searchAddress: "",
      location: "", //地图搜索定位
      isFullscreenmap: false, // 地图放大
      isActive: false, // 全屏
      // 用户可见区域
      Mapobject: {
        seeingRegion: {
          map: null,
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
          map: null,
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
    Tabsactive: function() {
      console.log(this.Tabsactive, "地图离里面的Tabsactive");
    }
  },
  mounted() {
    // 加载地图
    this.$nextTick(() =>{
      this.initMap();
    })
    
    console.log(this.Tabsactive, "Tabsactive");
  },
  methods: {
    // 加载地图
    initMap() {
      this.init(this.Mapobject.seeingRegion,"container")
      this.init(this.Mapobject.actualRegion,"container1")
      this.clickTwo()
      this.clickOn()
    },
    init(thatmap,Mapid) {
      thatmap.map = new AMap.Map(Mapid, {
        resizeEnable: true,
        zoom: 14
      });
      // 工具条控件
      thatmap.map.plugin(["AMap.ToolBar"], function() {
        thatmap.map.addControl(new AMap.ToolBar());
      });
      // 地图类型切换
      thatmap.map.plugin(["AMap.MapType"], function() {
        thatmap.map.addControl(new AMap.MapType());
      });
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
        this.Mapobject.seeingRegion.map.on("click", this.seeingRegionFn);
    },
    clickTwo() {
        this.Mapobject.actualRegion.map.on("click", this.actualRegionFn);
    },
    // 用户可见区域
    seeingRegionFn(e) {
      this.showInfoClick(e, this.Mapobject.seeingRegion);
    },
    // 实际区域
    actualRegionFn(e) {
      this.showInfoClick(e, this.Mapobject.actualRegion);
    },
    showInfoClick(e, region) {
      console.log(region,'region')
      console.log(
        "您在 [ " +
          e.lnglat.getLng() +
          "," +
          e.lnglat.getLat() +
          " ] 的位置单击了地图！"
      );
      if (region.polygon) {
        region.polygon.setMap(null);
        region.polygon = null;
      }
      // 创建点覆盖物
      region.marker = new AMap.Marker({
        position: [e.lnglat.getLng(), e.lnglat.getLat()],
        // position: [e.lnglat.getLat(), e.lnglat.getLng()],
        offset: new AMap.Pixel(-13, -30)
      });
      region.markers.push(region.marker);
      region.markerarr.push([e.lnglat.getLng(), e.lnglat.getLat()]);
      region.seeingRegionModelList.push({
        lng: e.lnglat.getLng(),
        lat: e.lnglat.getLat()
      });
      region.marker.setMap(region.map);
      region.polyline = new AMap.Polyline({
        path: region.markerarr,
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
      region.polylines.push(region.polyline);
      region.polyline.setMap(region.map);
    },
    redo() {},
    markerfn() {
      if (!this.Tabsactive) {
        console.log("用户可见区域 + ", this.Tabsactive);
        if (!this.Mapobject.seeingRegion.polygon) {
          this.Mapobject.seeingRegion.polygon = new AMap.Polygon({
            path: this.Mapobject.seeingRegion.markerarr,
            fillColor: "#67c23a",
            fillOpacity: 0.4,
            strokeOpacity: 1,
            strokeColor: "#67c23a",
            strokeWeight: 3
          });
          this.Mapobject.seeingRegion.map.add(
            this.Mapobject.seeingRegion.polygon
          );
        }
        this.$emit("markerRegion",this.Mapobject.seeingRegion.seeingRegionModelList)
      } else {
        console.log("实际区域 +", this.Tabsactive);
      }
    },
    previousActual() {}
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
  #container,#container1 {
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