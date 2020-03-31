<template>
  <div class="operateDialog">
    <el-dialog :title="dialogtitle" width="40%" class="opearteform" :visible.sync="dialogFormVisible">
      <el-row :gutter="24">
        <el-form :model="form">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="大区" :label-width="formLabelWidth">
                <el-select
                  v-model="form.largeAreaId"
                  clearable
                  @change="allianValue"
                  placeholder="请选择大区"
                  @clear="clearValue"
                >
                  <el-option
                    v-for="item in AllianOptions"
                    :key="item.regionId"
                    :label="item.regionName"
                    :value="item.regionId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="加盟商" :label-width="formLabelWidth">
                <el-select v-model="form.franchiseeId" clearable placeholder="请选择加盟商">
                  <el-option
                    v-for="item in allianceOptions"
                    :key="item.allianceId"
                    :label="item.allianceName"
                    :value="item.allianceId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="区域名称" :label-width="formLabelWidth">
                <el-input v-model="form.regionName" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="调度费" :label-width="formLabelWidth">
                <el-input v-model="form.dispatchFee" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="区域配置说明：" class="bg-size-color" :label-width="formLabelWidth">
                设备是否出区域，以实际区域为准。
                <span>用户可见区域</span>请比实际区域稍小一点。必须先画完用户可见区域才能画
                <span>实际区域</span>。
                <div>
                  注意: 在地图中画完区域后，必须点击
                  <span>完成</span>按钮。
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item :label-width="formLabelWidth">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="用户可见区域" name="Visible">
                    <div class="gdmap" :class="{ 'active': isActive }">
                      <el-autocomplete
                        class="location-search"
                        valueKey="name"
                        v-model="searchAddress"
                        id="locationsearch"
                        clearable
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                      ></el-autocomplete>
                      <div id="container" v-loading="maplading"></div>
                      <div class="action-area-map-action">
                        <ul>
                          <li @click="clickmap">
                            <svg-icon
                              :icon-class="isFullscreenmap ?'exit-fullscreen':'fullscreen'"
                            />
                          </li>
                          <li>
                            <i class="el-icon-question"></i>
                            <span>帮助</span>
                          </li>
                          <li @click="previous">
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
                  </el-tab-pane>
                  <el-tab-pane label="实际区域" name="Actual">
                    <div class="gdmapActual" :class="{ 'active': isActiveActual }">
                      <el-autocomplete
                        class="location-search"
                        v-model="searchAddress"
                        id="locationsearch"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                        v-if="this.viewok"
                      ></el-autocomplete>
                      <div id="container1" v-loading="mapActuallading"></div>
                      <div v-if="this.viewok" class="action-area-map-action">
                        <ul>
                          <li @click="clickActualmap">
                            <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" />
                          </li>
                          <li>
                            <i class="el-icon-question"></i>
                            <span>帮助</span>
                          </li>
                          <li @click="previousActual">
                            <i class="el-icon-question"></i>
                            <span>上一步</span>
                          </li>
                          <li @click="redoActual">
                            <i class="el-icon-refresh-right"></i>
                            <span>重做</span>
                          </li>
                          <li @click="markerfnActual">
                            <i class="el-icon-check"></i>
                            <span>完成</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </el-form-item>
            </div>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
        align="left"
        style="margin-top:20px;padding:0px 15px;"
      >
        说明:
        运营区域，是指把一个加盟商的车辆限制在多个区域内进行借还，用户在区域外还车会产生区域外调度费，一个加盟商可以设置多个运营区域。
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AMap from "AMap";
import { allRegion, allianceListByRegionId } from "@/api/region";
export default {
  name: "operateDialog",
  props: {
    dialogtitle: {
      type: String
    }
  },
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      isFullscreen: false,
      isFullscreenmap: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      activeName: "Visible",
      form: {
        largeAreaId: "",
        franchiseeId: "",
        regionName: "",
        dispatchFee: "",
        actualRegionModelList: [], //实际区域的经纬度列表
        seeingRegionModelList: [] //用户区域的经纬度列表
      },
      maplading: true,
      mapActuallading: true,
      searchAddress: "", // 地址
      location: "", //地图搜索定位
      // 地图1
      map: null,
      marker: null, //marker
      polyline: null,
      polygon: null,
      //折线坐标,所有的点位都存在这
      markarr: [],
      markers: [],
      polylines: [],
      polygonActual: null, // 初始化第二个地图渲染第一个地图画过的区域
      isActive: false, // 全屏
      result: [],
      // 地图2
      mapActual: null,
      viewok: false,
      markerActual: null, //marker
      polylineActual: null,
      polygonact: null,
      //地图2折线坐标,所有的点位都存在这
      markarrActual: [],
      markersActual: [],
      polylinesActual: [],
      isActiveActual: false // 全屏
    };
  },
  mounted() {
    // 查询大区
    this.getallianList();
    this.createdTrue()
  },
  methods: {
      // 进来初始化地图
    createdTrue() {
        // this.init();
        // debugger
        this.searchAddress = "";
    },
    handleClick(tab, event) {
      if (this.activeName == "Actual" && this.polygon == null) {
        this.activeName = "Visible";
        this.$message({
          message: "必须先画完用户可见区域才能画实际区域",
          type: "warning"
        });
        this.viewok = false;
      } else {
        console.log(this.polygon, "1111");
        this.viewok = true;
        this.$nextTick(() => {
          this.initmapActual();
          this.mapActuallading = false;
        });
      }
    },
    // 查询大区
    getallianList() {
      allRegion()
        .then(res => {
          if (res.code == 0) {
            this.AllianOptions = res.data;
          }
        })
        .catch(() => {});
    },
    clearValue() {
      this.allianceOptions = [];
    },
    // 获取到大区的id去请求加盟商
    allianValue(value) {
      this.listQuery.franchiseeId = "";
      this.allianceOptions = [];
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptions = res.data;
          }
        })
        .catch(() => {});
    },
    // 地图
    async init() {
      console.log("loadmap");
      this.markers = [];
      this.polylines = [];
      this.markarr = [];
      let that = this;
      that.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 14
      });
      // 工具条控件
      console.log(that.map, "加载了");
      this.map.plugin(["AMap.ToolBar"], function() {
        that.map.addControl(new AMap.ToolBar());
      });
      // 地图类型切换
      this.map.plugin(["AMap.MapType"], function() {
        that.map.addControl(new AMap.MapType());
      });
      this.clickOn();
      this.maplading = false;
    },
    showInfoClick(e) {
      console.log(e, "1111");
      console.log(
        "您在 [ " +
          e.lnglat.getLng() +
          "," +
          e.lnglat.getLat() +
          " ] 的位置单击了地图！"
      );
      if (this.polygon) {
        this.polygon.setMap(null);
        this.polygon = null;
      }
      // 创建点覆盖物
      this.marker = new AMap.Marker({
        position: [e.lnglat.getLng(), e.lnglat.getLat()],
        // position: [e.lnglat.getLat(), e.lnglat.getLng()],
        offset: new AMap.Pixel(-13, -30)
      });
      this.markers.push(this.marker);
      this.markarr.push([e.lnglat.getLng(), e.lnglat.getLat()]);
      this.marker.setMap(this.map);
      this.polyline = new AMap.Polyline({
        path: this.markarr,
        isOutline: false,
        outlineColor: "#ffeeff",
        borderWeight: 1,
        strokeColor: "#67c23a",
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
      this.polylines.push(this.polyline);
      this.polyline.setMap(this.map);
    },
    clickOn() {
      this.map.on("click", this.showInfoClick);
    },
    // 初始化第二个地图
    initmapActual(e) {
      console.log("container1");
      this.markersActual = [];
      this.polylinesActual = [];
      this.markarrActual = [];
      let that = this;
      that.mapActual = new AMap.Map("container1", {
        resizeEnable: true,
        zoom: 14
      });
      console.log(this.location, "111111");
      this.mapActual.setCenter(this.location);
      // 工具条控件
      console.log(that.mapActual, "111");
      that.mapActual.plugin(["AMap.ToolBar"], function() {
        that.mapActual.addControl(new AMap.ToolBar());
      });
      // 地图类型切换
      that.mapActual.plugin(["AMap.MapType"], function() {
        that.mapActual.addControl(new AMap.MapType());
      });

      // 绘制折线
      this.marker = new AMap.Marker({
        position: this.markarr,
        // position: [e.lnglat.getLat(), e.lnglat.getLng()],
        offset: new AMap.Pixel(-13, -30)
      });
      this.polyline = new AMap.Polyline({
        path: this.markarr,
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
      this.polyline.setMap(that.mapActual);
      this.polygonActual = new AMap.Polygon({
        path: this.markarr,
        fillColor: "#67c23a",
        fillOpacity: 0.4,
        strokeOpacity: 1,
        strokeColor: "#67c23a",
        strokeWeight: 3
      });
      that.mapActual.add(this.polygonActual);
      this.clickOnActual();
    },
    // 第二个地图点击画区域
    ActualClick(e) {
      console.log(e, "1111");
      console.log(
        "您在 [ " +
          e.lnglat.getLng() +
          "," +
          e.lnglat.getLat() +
          " ] 的位置单击了地图！"
      );
      if (this.polygonact) {
        this.polygonact.setMap(null);
        this.polygonact = null;
      }
      // 创建点覆盖物
      this.markerActual = new AMap.Marker({
        position: [e.lnglat.getLng(), e.lnglat.getLat()],
        // position: [e.lnglat.getLat(), e.lnglat.getLng()],
        offset: new AMap.Pixel(-13, -30)
      });
      this.markersActual.push(this.markerActual);
      this.markarrActual.push([e.lnglat.getLng(), e.lnglat.getLat()]);
      this.markerActual.setMap(this.mapActual);
      this.polylineActual = new AMap.Polyline({
        path: this.markarrActual,
        isOutline: false,
        borderWeight: 1,
        strokeColor: "#f56c6c",
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
      this.polylinesActual.push(this.polylineActual);
      this.polylineActual.setMap(this.mapActual);
    },
    clickOnActual() {
      this.mapActual.on("click", this.ActualClick);
    },
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
          console.log(result, "1111");
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
      console.log(item);
      this.searchAddress = item.name;
      this.location = item.location;
      this.map.setCenter(item.location);
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
    // 上一步
    previous() {
      if (this.polygon) {
        this.polygon.setMap(null);
        this.polygon = null;
      }
      if (this.markarr.length != 0) {
        this.markarr.pop();
        this.markers[this.markarr.length].setMap(null);
        this.markers.pop();
        this.polylines[this.markarr.length].setMap(null);
        this.polylines.pop();
      }
    },
    // 重做
    redo() {
      this.map.clearMap();
      this.markers = [];
      this.polylines = [];
      this.markarr = [];
      this.polygon = null;
      // this.polygon.setMap(null)
    },
    // 绘制完成
    markerfn() {
      if (!this.polygon) {
        this.polygon = new AMap.Polygon({
          path: this.markarr,
          fillColor: "#67c23a",
          fillOpacity: 0.4,
          strokeOpacity: 1,
          strokeColor: "#67c23a",
          strokeWeight: 3
        });
        this.map.add(this.polygon);
      } else {
        console.log(this.polygon, "走这里了");
      }
    },
    // 放大缩小地图
    clickActualmap() {
      if (this.isFullscreen === false) {
        this.isFullscreen = true;
        this.isActiveActual = true;
      } else {
        this.isFullscreen = false;
        this.isActiveActual = false;
      }
    },
    // 第二个地图重做
    redoActual() {
      this.mapActual.clearMap();
      this.markersActual = [];
      this.polylinesActual = [];
      this.markarrActual = [];
      this.polygonact = null;
      this.initmapActual();
    },
    // 第二个地图上一步
    previousActual() {
      if (this.polygonact) {
        this.polygonact.setMap(null);
        this.polygonact = null;
      }
      if (this.markarrActual.length != 0) {
        this.markarrActual.pop();
        this.markersActual[this.markarrActual.length].setMap(null);
        this.markersActual.pop();
        this.polylinesActual[this.markarrActual.length].setMap(null);
        this.polylinesActual.pop();
      }
    },
    // 第二个地图绘制完成
    markerfnActual() {
      if (!this.polygonact) {
        this.polygonact = new AMap.Polygon({
          path: this.markarrActual,
          fillColor: "#f56c6c",
          fillOpacity: 0.4,
          strokeOpacity: 1,
          strokeColor: "#f56c6c",
          strokeWeight: 3
        });
        this.mapActual.add(this.polygonact);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.operateDialog {
  .opearteform {
    .bg-size-color {
      span {
        color: red;
      }
    }
    .gdmap,
    .gdmapActual {
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
  }
}
.operateDialog .gdmap #container /deep/ .amap-maptype-list,
.operateDialog .gdmapActual #container1 /deep/ .amap-maptype-list {
  display: none !important;
}

.operateDialog .gdmap.active,
.operateDialog .gdmapActual.active {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999;
}
</style>