<template>
  <div class="operate-container">
    <div class="create-button">
      <el-button type="primary" @click="handleCreate" icon="el-icon-edit">添加运营区域</el-button>
    </div>
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>运营商</span>
            <el-select v-model="value" placeholder="请选择状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>加盟商</span>
            <el-select v-model="value" placeholder="请选择状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>区域名称</span>
            <el-input v-model="value" placeholder="请输入区域名称"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="permission-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column label="运维单号" width="200" align="center"></el-table-column>
        <el-table-column prop="车辆编号" label="车辆编号" width="120" align="center"></el-table-column>
        <el-table-column prop="运维方式" label="运维方式" align="center"></el-table-column>
        <el-table-column prop="维修部件" label="维修部件" align="center"></el-table-column>
        <el-table-column prop="运维员" label="运维员" align="center"></el-table-column>
        <el-table-column prop="运维手机" label="运维手机" align="center"></el-table-column>
        <el-table-column prop="推送时间" label="推送时间" width="150" align="center"></el-table-column>
        <el-table-column prop="完成时间" label="完成时间" width="150" align="center"></el-table-column>
        <el-table-column prop="处理结果" label="处理结果" align="center"></el-table-column>
        <el-table-column prop="处理时效" label="处理时效" align="center"></el-table-column>
        <el-table-column prop="评分" label="评分" align="center"></el-table-column>
        <el-table-column prop="处理结果图片与备注" label="处理结果图片与备注" width="200" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleedit(scope.row.id)">忽略</el-button>
            <el-button type="text" @click="handleedit(scope.row.id)">设为待处理</el-button>
            <el-button type="text" @click="handleedit(scope.row.id)">工单指派</el-button>
            <el-button type="text" @click="handleedit(scope.row.id)">运维日志</el-button>
            <el-button type="text" @click="handleedit(scope.row.id)">给奖励</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        background
        align="left"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>

    <!-- 新增编辑区域 -->
    <el-dialog :title="dialogtitle" class="opearteform" :visible.sync="dialogForm">
      <el-row :gutter="24">
        <el-form :model="form">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="大区" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择大区">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="加盟商" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择加盟商">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="区域名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="调度费" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
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
                    <div class="gdmap">
                      <el-autocomplete
                        class="location-search"
                        v-model="searchAddress"
                        id="locationsearch"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                      ></el-autocomplete>
                      <div id="container" v-loading="maplading"></div>
                      <div class="action-area-map-action">
                        <ul>
                          <li>
                            <svg-icon
                              :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"
                              @click="clickmap"
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
                    <div class="gdmap">
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
                          <li>
                            <svg-icon
                              :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'"
                              @click="clickmap"
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
export default {
  name: "operate",
  data() {
    return {
      isFullscreen: false,
      query: {},
      value2: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableData: [],
      checkList: ["选中且禁用", "复选框 A"],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        textarea: ""
      },
      formLabelWidth: "120px",
      dialogtitle: "",
      dialogForm: false,
      activeName: "Visible",
      maplading: true,
      mapActuallading: true,
      searchAddress: "",
      map: null, // 地图1
      mapActual: null, // 地图2
      viewok: false,
      marker: null, //marker
      polyline: null,
      polygon: null,
      //折线坐标,所有的点位都存在这
      markarr: [],
      markers: [],
      polylines: []
    };
  },
  mounted() {
    // this.clickOn();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    clickmap() {},
    // 创建
    handleCreate() {
      this.dialogtitle = "新建运营区域";
      this.dialogForm = true;
      if(this.activeName ='Visible'){
        this.$nextTick(() => {
          this.init();
          this.maplading = false;
        });
      }
    },
    querySearch(queryString, cb) {
      // let map = this.map;
      // AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
      //   var autoOptions = {
      //     // 城市，默认全国 
      //     city: "杭州",
      //     // 使用联想输入的input的id
      //     input: "locationsearch"
      //   }
      //   var autocomplete= new AMap.Autocomplete(autoOptions)

      //   var placeSearch = new AMap.PlaceSearch({
      //     city:'北京',
      //     map: map
      //   })
      //   AMap.event.addListener(autocomplete, 'el-scrollbar', function(e){
      //     //TODO 针对选中的poi实现自己的功能
      //     console.log(e,'111111')
      //     // placeSearch.search(e.poi.name)
      //     this.select()
      //   })
      // })
    
    },
    select(e) {
        this.map.placeSearch.setCity(e.poi.adcode);
        this.map.placeSearch.search(e.poi.name);  //关键字查询查询
    },
    handleSelect(item) {
      console.log(item);
      this.searchAddress = item.name
      this.map.setCenter(item.location)
      this.map.setMapZoom(18)
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 切换tabs
    handleClick(tab, event) {
      console.log(tab, event, "qqqq");
      if(this.activeName == "Actual" && this.polygon == null){
        this.activeName ='Visible';
        this.$message({
          message: '必须先画完用户可见区域才能画实际区域',
          type: 'warning'
        });
        this.viewok = false;
      }else{
        this.viewok = true;
        this.$nextTick(()=>{
          this.initmapActual();
          this.mapActuallading = false;
        })
      }
    },
    // 地图
    init() {
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
      console.log(this.map,'111')
      this.map.plugin(["AMap.ToolBar"], function() {
        that.map.addControl(new AMap.ToolBar()); 
      });
      // 地图类型切换
      this.map.plugin(["AMap.MapType"], function() {
       that.map.addControl(new AMap.MapType());
      });
      this.clickOn();
    },
    // 初始化第二个地图
    initmapActual() {
      console.log("container1");
      // this.markers = [];
      // this.polylines = [];
      // this.markarr = [];
      let that = this;
      that.mapActual = new AMap.Map("container1", {
        resizeEnable: true,
        zoom: 14
      });
      // 工具条控件
      console.log(that.mapActual,'111')
      that.mapActual.plugin(["AMap.ToolBar"], function() {
        that.mapActual.addControl(new AMap.ToolBar()); 
      });
      // 地图类型切换
      that.mapActual.plugin(["AMap.MapType"], function() {
       that.mapActual.addControl(new AMap.MapType());
      });
      // this.clickOn();
      // 绘制折线
      this.marker = new AMap.Marker({
        position: this.markarr,
        // position: [e.lnglat.getLat(), e.lnglat.getLng()],
        offset: new AMap.Pixel(-13, -30)
      });
      this.polyline = new AMap.Polyline({
        path: this.markarr,
        isOutline: true,
        outlineColor: "#ffeeff",
        borderWeight: 1,
        strokeColor: "#409EFF",
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
      this.polyline.setMap(that.mapActual);
      this.polygon = new AMap.Polygon({
          path: this.markarr,
          fillColor: "#1791fc",
          zIndex: 50,
          fillOpacity: 0.4,
          strokeOpacity: 0.2,
          strokeWeight: 0
        });
        that.mapActual.add(this.polygon);
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
      if(this.polygon){
        this.polygon.setMap(null)
        this.polygon = null;
      }
      // 创建点覆盖物
      this.marker = new AMap.Marker({
        position: [e.lnglat.getLng(), e.lnglat.getLat()],
        // position: [e.lnglat.getLat(), e.lnglat.getLng()],
        offset: new AMap.Pixel(-13, -30)
      });
      this.markers.push(this.marker)
      this.markarr.push([e.lnglat.getLng(), e.lnglat.getLat()]);
      this.marker.setMap(this.map);
      this.polyline = new AMap.Polyline({
        path: this.markarr,
        isOutline: true,
        outlineColor: "#ffeeff",
        borderWeight: 1,
        strokeColor: "#409EFF",
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
      this.polylines.push(this.polyline)
      this.polyline.setMap(this.map);
    },
    clickOn() {
      this.map.on('click', this.showInfoClick);
    },
    // 上一步
    previous() {
      if(this.polygon){
        this.polygon.setMap(null)
        this.polygon = null;
      }
      if(this.markarr.length != 0){
        this.markarr.pop()
        this.markers[this.markarr.length].setMap(null)
        this.markers.pop()
        this.polylines[this.markarr.length].setMap(null)
        this.polylines.pop()
      }
    },
    // 重做
    redo() {
        this.map.clearMap()
        this.markers = [];
        this.polylines = [];
        this.markarr = [];
        this.polygon = null;
        // this.polygon.setMap(null)
    },
    // 绘制完成
    markerfn() {
      if(!this.polygon){
        this.polygon = new AMap.Polygon({
          path: this.markarr,
          fillColor: "#1791fc",
          zIndex: 50,
          fillOpacity: 0.4,
          strokeOpacity: 0.2,
          strokeWeight: 0
        });
        this.map.add(this.polygon);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.operate {
  &-container {
    .search-container {
      position: relative;
      & > button {
        position: absolute;
        right: 0;
        top: 0;
      }
      .el-row {
        margin-bottom: 20px;
        & > div {
          margin-bottom: 10px;
          display: flex;
          span {
            margin: 0px;
            display: inline-block;
            width: 70px;
            text-align: right;
            line-height: 36px;
            margin-right: 10px;
          }
        }
      }
    }
    .opearteform {
      .bg-size-color {
        span {
          color: red;
        }
      }
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
        #container,#container1{
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
          ul{
            list-style: none;
            padding: 0;
            margin: 0;
            li{
              width: 100%;
              height: 65px;
              &:hover {
                background: #ccc;
              }
            }
            cursor: pointer;
            i{
              display: block;
              text-align: center;
              font-size: 30px;
              padding-top: 10px;
              margin-bottom: -10px;
            }
            span{
              display: block;
              -o-user-select: none;
              -moz-user-select: none; /*火狐 firefox*/
              -webkit-user-select: none; /*webkit浏览器*/
              -ms-user-select: none; /*IE10+*/
              -khtml-user-select :none; /*早期的浏览器*/
              user-select: none; 
            }
            svg{
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
}
.operate-container .search-container /deep/ .el-input {
  width: 195px;
}
.operate-container /deep/ .page-container {
  justify-content: flex-start;
}
.operate-container .gdmap #container /deep/ .amap-maptype-list {
  display: none !important;
}
</style>