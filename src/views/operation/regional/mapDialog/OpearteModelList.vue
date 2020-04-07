<template>
  <div class="operateDialog">
    <el-dialog
      :title="dialogtitle"
      width="40%"
      class="opearteform"
      :visible.sync="dialogFormVisible"
    >
      <el-row :gutter="24">
        <el-form :model="form" ref="form" :rules="rules">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <div id="container" v-loading="maplading"></div>
            </div>
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import AMap from "AMap";
import { allRegion, allianceListByRegionId } from "@/api/region";
// import { findById } from '@/api/operationRegional';
import number from "@/directive/input-filter";
export default {
  name: "operateDialog",
  props: {
    dialogtitle: {
      type: String
    },
    isEdit: {
      type: Boolean
    }
  },
  directives: { number },
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      isFullscreen: false,
      isFullscreenmap: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      activeName: "Visible",
      actualRegionModelList: [], //实际区域的经纬度列表
      seeingRegionModelList: [], //用户区域的经纬度列表
      form: {
        largeAreaId: "",
        franchiseeId: "",
        regionName: "",
        dispatchFee: "",
        actualRegionModelList: [], //实际区域的经纬度列表
        seeingRegionModelList: [] //用户区域的经纬度列表
      },
      rules: {
        largeAreaId: [
          { required: true, message: "请选择大区", trigger: "change" }
        ],
        franchiseeId: [
          { required: true, message: "请选择加盟商", trigger: "change" }
        ],
        regionName: [
          { required: true, message: "请输入区域名称", trigger: "blur" }
        ],
        dispatchFee: [
          { required: true, message: "请输入调度费", trigger: "blur" }
        ]
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
      isActiveActual: false, // 全屏
      mapData: {},
      ismapEdit: false
    };
  },
  methods: {
    // 地图
    init() {
    //   this.markarr = []
    //   this.markarrActual = []
      let that = this;
      that.map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 14
      });
      // 工具条控件
      this.map.plugin(["AMap.ToolBar"], function() {
        that.map.addControl(new AMap.ToolBar());
      });
      // 地图类型切换
      this.map.plugin(["AMap.MapType"], function() {
        that.map.addControl(new AMap.MapType());
      });
      this.maplading = false;
    },
    // 获取数据
    sendInfo(data) {
      
      console.log(data, "传递进来的data");
      this.init();
      data.forEach((item,index) => {
        item.actualRegionModelList.forEach(el => {
          this.markarr.push([el.lng, el.lat]);
          // 绘制折线
          //   this.marker = new AMap.Marker({
          //     position: [[item.lng, item.lat]],
          //     // position: [e.lnglat.getLat(), e.lnglat.getLng()],
          //     offset: new AMap.Pixel(-13, -30)
          //   });
        });
        console.log(this.markarr)
        if (!this.polyline && !this.polygon) {
            this.polyline = new AMap.Polyline({
              path: this.markarr,
              isOutline: false,
              borderWeight: 1,
              strokeColor: "#67c23a",
              strokeOpacity: 1,
              strokeWeight: 3,
              strokeStyle: "solid",
              lineJoin: "round",
              lineCap: "round",
              zIndex: 50
            });
            this.polyline.setMap(this.map);
            this.polyline = null
            this.polygon = new AMap.Polygon({
              path: this.markarr,
              fillColor: "#67c23a",
              fillOpacity: 0.4,
              strokeOpacity: 1,
              strokeColor: "#67c23a",
              strokeWeight: 3
            });
            this.map.add(this.polygon);
            this.polygon = null
            this.markarr = []
          }
        item.seeingRegionModelList.forEach((itemEl,idx) => {
          this.markarrActual.push([itemEl.lng, itemEl.lat]);
        });
        if (!this.polylineActual && !this.polygonact) {
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
            this.polylineActual.setMap(this.map);
            this.polylineActual = null;
            this.polygonact = new AMap.Polygon({
              path: this.markarrActual,
              fillColor: "#f56c6c",
              fillOpacity: 0.4,
              strokeOpacity: 1,
              strokeColor: "#f56c6c",
              strokeWeight: 3
            });
            this.map.add(this.polygonact);
            this.polygonact = null
            this.markarrActual = []
          }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.operateDialog {
  #container {
    width: 100%;
    height: 400px;
  }
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
.operateDialog #container /deep/ .amap-maptype-list {
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