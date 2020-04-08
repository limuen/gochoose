<template>
  <div class="replace-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select
              v-model="listQuery.regionId"
              @change="allianValue"
              clearable
              placeholder="请选择大区"
            >
              <el-option
                v-for="item in AllianOptions"
                :key="item.regionId"
                :label="item.regionName"
                :value="item.regionId"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>加盟商</span>
            <el-select v-model="listQuery.allianceId" clearable placeholder="请选择加盟商">
              <el-option
                v-for="item in allianceOptions"
                :key="item.allianceId"
                :label="item.allianceName"
                :value="item.allianceId"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆编号</span>
            <el-input v-model="listQuery.electrombileNumber" placeholder="请输入车辆编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>更换人员</span>
            <el-input v-model="listQuery.changePersonName" placeholder="请输入更换人员"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>现电池imei</span>
            <el-input v-model="listQuery.batteryImei" placeholder="请输入现电池imei"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>原电池imei</span>
            <el-input v-model="listQuery.batteryImeiEx" placeholder="请输入原电池imei"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>更换日期</span>
            <el-date-picker
              v-model="changeTimes"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="margin-right: 20px;"
              @change="changeClose"
            ></el-date-picker>
            <el-button plain @click="Thisweek">本周</el-button>
            <el-button plain @click="Thismonth">本月</el-button>
            <el-button plain @click="Thisquarter">本季度</el-button>
          </div>
        </el-col>

        <el-col :span="6">
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
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="electrombileNumber" label="车辆编号" align="center"></el-table-column>
        <el-table-column prop="batteryImei" label="电池imei" align="center"></el-table-column>
        <el-table-column prop="residueEndurance" width="190" label="更换前剩余里程/km" align="center"></el-table-column>
        <el-table-column prop="residueElectric" width="190" label="更换前剩余电量" align="center"></el-table-column>
        <el-table-column prop="batteryImeiEx" width="190" label="更换前电池imei" align="center"></el-table-column>
        <el-table-column prop="changePersonName" label="更换人员" align="center"></el-table-column>
        <el-table-column prop="changePicture1" label="更换照片1" width="200" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 100px; height: 100px"
              :src="scope.row.changePicture1"
              :preview-src-list="scope.row.changePicture1.split(' ')">
            </el-image>
            <div>{{scope.row.remark}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="changePicture2" label="更换照片2" width="200" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 100px; height: 100px"
              :src="scope.row.changePicture2"
              :preview-src-list="scope.row.changePicture2.split(' ')">
            </el-image>
            <div>{{scope.row.remark}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="changePicture3" label="更换照片3" width="200" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 100px; height: 100px"
              :src="scope.row.changePicture3"
              :preview-src-list="scope.row.changePicture3.split(' ')">
            </el-image>
            <div>{{scope.row.remark}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"  align="center"></el-table-column>
        <el-table-column prop="distributeTime" width="200" label="派单时间" align="center"></el-table-column>
        <el-table-column prop="changeTime" width="200" label="更换时间" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="page-excel">
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
    </div>
  </div>
</template>

<script>
import { allRegion, allianceListByRegionId } from "@/api/region";
import { getDay, transTime, getDate } from "@/utils/index.js";
import number from "@/directive/input-filter";
import { batteryListPage } from "@/api/car";
export default {
  name: "replace",
  directives: { number },
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      listQuery: {
        regionId: "",
        allianceId: "",
        electrombileNumber: "",
        changePersonName: "",
        batteryImei: "",
        batteryImeiEx: "",
        changeTimes: '',
        current: 1,
        size: 10
      },
      tableData: [],
      total: 0,
      loading: false,
      changeTimes: []
    };
  },
  mounted() {
    // 查询大区
    this.getallianList();
    // 获取列表
    this.getList();
  },
  methods: {
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
    // 获取到大区的id去请求加盟商
    allianValue(value) {
      this.listQuery.allianceId = "";
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptions = res.data;
          }
        })
        .catch(() => {});
    },
    // 获取本周
    Thisweek() {
      let week = transTime(new Date());
      let date = getDay("week", week);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.changeTimes = [start, end];
      this.listQuery.changeTimes  = this.changeTimes.toString()
    },
    // 获取本月
    Thismonth() {
      let month = transTime(new Date());
      let date = getDay("month", month);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.changeTimes = [start, end];
      this.listQuery.changeTimes  = this.changeTimes.toString()
    },
    // 获取季度
    Thisquarter() {
      let quarter = transTime(new Date());
      let date = getDay("quarter", quarter);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.changeTimes = [start, end];
      this.listQuery.changeTimes  = this.changeTimes.toString()
    },
    // 获取列表
    getList() {
      this.loading = true;
      batteryListPage(this.listQuery)
        .then(res => {
          console.log(res, "1111111");
          if (res.code == 0) {
            this.total = res.data.total;
            this.tableData = res.data.rows;
            this.loading = false;
          }
        })
        .catch(() => {});
    },
    changeClose(value) {
      console.log(value)
      if (value == null){
        this.changeTimes = []
        this.listQuery.changeTimes = '';
      }else{
        this.listQuery.changeTimes = value.toString()
      }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.replace {
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
            width: 80px;
            text-align: right;
            line-height: 36px;
            margin-right: 10px;
          }
        }
      }
      .editPrice {
        .el-input:nth-child(2),
        .el-select,
        .el-input:nth-child(3) {
          margin-left: -4px;
        }
      }
    }
    .page-excel {
      display: flex;
      justify-content: space-between;
      .page-container {
        > span {
          line-height: 32px;
          font-size: 14px;
        }
      }
      & > div:nth-child(2) {
        margin-top: 25px;
        color: #20a0ff;
        cursor: pointer;
      }
    }
  }
}
.replace-container .search-container /deep/ .el-input {
  width: 230px;
}
</style>