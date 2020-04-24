<template>
  <div class="gpsopera-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆编号</span>
            <el-input v-model="listQuery.electrombileNumber" placeholder="请输入运维单号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>IMEI</span>
            <el-input v-model="listQuery.deviceNo" placeholder="请输入完整的IMEI"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>时间日期</span>
            <el-date-picker
              v-model="listQuery.createTimeStr"
              align="right"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="handleFilter">查询</el-button>
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
        v-loading="loading"
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="deviceNo" label="IMEI" width="200" align="center"></el-table-column>
        <el-table-column prop="type" label="定位类型" align="center"></el-table-column>
        <el-table-column prop="accuracyType" label="定位精度" align="center"></el-table-column>
        <el-table-column prop="lng" label="经度" width="150" align="center"></el-table-column>
        <el-table-column prop="lat" label="	纬度" width="150" align="center"></el-table-column>
        <el-table-column prop="运维手机" label="设备电池电压" width="140" align="center"></el-table-column>
        <el-table-column prop="voltage" label="车辆电池电压" width="140" align="center"></el-table-column>
        <el-table-column prop="batteryLock" label="电池仓锁" align="center"></el-table-column>
        <el-table-column prop="availableVolume" label="设备电量" align="center"></el-table-column>
        <el-table-column prop="处理时效" label="GPRS信号" width="140" align="center"></el-table-column>
        <el-table-column prop="处理结果图片与备注" label="蓝牙PIM码" width="120" align="center"></el-table-column>
        <el-table-column prop="accState" label="ACC" align="center"></el-table-column>
        <el-table-column prop="vehicleStatus" label="安防" align="center"></el-table-column>
        <el-table-column prop="处理结果图片与备注" label="报警" align="center"></el-table-column>
        <el-table-column prop="处理结果图片与备注" label="静音" align="center"></el-table-column>
        <el-table-column prop="处理结果图片与备注" label="运动" align="center"></el-table-column>
        <el-table-column prop="huoerSpeed" label="速度" align="center"></el-table-column>
        <el-table-column prop="singleMileage" label="行驶里程" align="center"></el-table-column>
        <el-table-column prop="singleTime" label="行驶时间" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center"></el-table-column>
        <el-table-column label="位置" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <i
              class="el-icon-location-information"
              style="font-size:20px;line-height:20px"
              @click="handleLocation(scope.row)"
            ></i>
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
        :current-page.sync="listQuery.current"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog title="事件位置" width="40%" class="opearteform" :visible.sync="dialogFormVisible">
      <el-row :gutter="24">
        <el-form ref="form">
          <el-col :span="24" class="MapClass">
            <div id="container" v-loading="Maploading" />
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import AMap from "AMap";
import { gpsListPage, gpsfindById } from "@/api/journal";
export default {
  name: "gpsopera",
  data() {
    return {
      listQuery: {
        electrombileNumber: "",
        deviceNo: "",
        createTimeStr: "",
        current: 1,
        size: 10
      },
      total: 0,
      loading: false,
      tableData: [],
      dialogFormVisible: false,
      Maploading: true,
      map: null,
      marker: null,
    };
  },
  mounted() {
    // 获取列表
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      this.loading = true;
      gpsListPage(this.listQuery)
        .then(res => {
          console.log(res);
          if (res.code == 0) {
            this.total = res.data.total;
            this.tableData = res.data.rows;
            this.loading = false;
          }
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.listQuery.current = 1;
      this.listQuery.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.current = val;
      this.getList();
    },
    handleFilter() {
      this.listQuery.current = 1;
      this.getList();
    },
    handleLocation(row) {
      console.log(row, "row");
      this.marker = null;
      this.map = null;
      this.dialogFormVisible = true;
      this.$nextTick(() => {
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
        this.Maploading = false;
        gpsfindById({
          id: row.id
        }).then(res => {
          this.marker = new AMap.Marker({
            position: [res.data.lng, res.data.lat],
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            offset: new AMap.Pixel(-13, -30)
          });
          this.map.add(this.marker);
          this.map.setFitView();
        }).catch(()=>{})
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.gpsopera {
  &-container {
    .search-container {
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
  }
}
.gpsopera-container .search-container /deep/ .el-input {
  width: 230px;
}
.gpsopera-container /deep/ .page-container {
  justify-content: flex-start;
}
.MapClass {
  width: 100%;
  height: 400px;
  position: relative;
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
</style>