<template>
  <div class="orderlist-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select
              v-model="listQuery.orderRegionId"
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
            <el-select v-model="listQuery.orderAllianceId" clearable placeholder="请选择加盟商">
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
            <span>责任区</span>
            <el-select v-model="listQuery.areaId" placeholder="请选择责任区">
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.regionName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>用户电话</span>
            <el-input v-model="listQuery.customerPhone" v-number="0" placeholder="请输入用户电话"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>用户姓名</span>
            <el-input v-model="listQuery.customerName" placeholder="请输入用户姓名"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>订单状态</span>
            <el-select v-model="listQuery.status" placeholder="请选择订单状态">
              <el-option label="进行中" :value="0"></el-option>
              <el-option label="结束已付款" :value="1"></el-option>
              <el-option label="结束未付款" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>区域外还车</span>
            <el-select v-model="listQuery.isQuyu" placeholder="请选择区域外换车">
              <el-option label="是" :value="0"></el-option>
              <el-option label="否" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>停车点外还车</span>
            <el-select v-model="listQuery.isQuyu" placeholder="请选择停车点外还车">
              <el-option label="是" :value="0"></el-option>
              <el-option label="否" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <span>租车时间</span>
            <el-date-picker
              v-model="rentTimes"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="margin-right: 20px;"
            ></el-date-picker>
            <el-button plain @click="Thisweek">本周</el-button>
            <el-button plain @click="Thismonth">本月</el-button>
            <el-button plain @click="Thisquarter">本季度</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆编号</span>
            <el-input v-model="listQuery.electrombileNumber" v-number="0" placeholder="请输入车辆编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>订单编号</span>
            <el-input v-model="listQuery.orderNumber" v-number="0" placeholder="请输入订单编号"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple editPrice">
            <span>订单金额</span>
            <el-input placeholder="请输入内容" v-number="2" type="number" v-model="listQuery.orderMoney1">
              <template slot="append">～</template>
            </el-input>
            <el-input v-model="listQuery.orderMoney2" v-number="2"  type="number" placeholder="请输入车辆编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>是否报修</span>
            <el-select v-model="listQuery.isReport" placeholder="请选择运维员姓名">
              <el-option label="是" :value="0"></el-option>
              <el-option label="否" :value="1"></el-option>
            </el-select>
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
        <el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="electrombileNumber" label="车辆编号" align="center"></el-table-column>
        <el-table-column prop="status" label="订单状态" align="center">
          <template slot-scope="scope">
            <div>{{statusStateMap[scope.row.status]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="customerPhone" label="用户电话" align="center"></el-table-column>
        <el-table-column prop="travelDistance" label="骑行距离" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.travelDistance}}米</div>
          </template>
        </el-table-column>
        <el-table-column prop="rentTime" label="租车时长" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.rentTime}}分钟</div>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="租车时间" align="center"></el-table-column>
        <el-table-column prop="endTime" label="还车时间" align="center"></el-table-column>
        <el-table-column prop="isReport" label="报修" align="center">
          <template slot-scope="scope">
            <div>{{isReportStateMap[scope.row.isReport]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="isQuyu" label="区域外还车" align="center">
          <template slot-scope="scope">
            <div>{{isQuyuStateMap[scope.row.isQuyu]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="isArea" label="停车点外还车" align="center">
          <template slot-scope="scope">
            <div>{{isAreaStateMap[scope.row.isArea]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="totalMoney" label="总扣款（元）" align="center"></el-table-column>
        <el-table-column prop="balanceMoneyPay" label="充值余额扣款（元）" align="center"></el-table-column>
        <el-table-column prop="giveMoneyPay" label="赠送余额扣款（元）" align="center"></el-table-column>
        <el-table-column prop="dispatchMoneyPay" label="调度费扣款（元）" align="center"></el-table-column>
        <el-table-column prop="removeMoneyPay" label="挪车费（元）" align="center"></el-table-column>
        <el-table-column prop="activityDiscountPay" label="骑行券扣款（元）" align="center"></el-table-column>
        <el-table-column prop="orderAllianceName" label="加盟商" align="center"></el-table-column>
        <el-table-column prop="orderRegionName" label="大区" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleedit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-excel">
      <div class="page-container">
        <span>总收益：0元【余额：0元 红包：0元 骑行券：0元（张）】</span>
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
      <div>
        <i class="el-icon-folder-opened excel-blue"></i>
        <span>导出excel</span>
      </div>
    </div>
  </div>
</template>

<script>
import { allRegion, allianceListByRegionId } from "@/api/region";
import { findByLargeFranchisee } from "@/api/responsibility";
import { getDay, transTime } from "@/utils/index.js";
import { orderListPage } from "@/api/orderrecord";
import number from "@/directive/input-filter";
export default {
  name: "orderlist",
  directives: { number },
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      areaOptions: [], // 责任区域
      listQuery: {
        orderRegionId: "",
        orderAllianceId: "",
        areaId: "",
        customerPhone: "",
        customerName: "",
        status: "",
        isQuyu: "",
        rentTimes: "",
        electrombileNumber: "",
        orderNumber: "",
        orderMoney1: "",
        orderMoney2: "",
        isReport: "",
        current: 1,
        size: 10
      },
      rentTimes: [],
      tableData: [],
      total: 0,
      loading: false,
      statusStateMap: {
        0: "进行中",
        1: "结束已付款",
        2: "结束未付款"
      },
      isReportStateMap: {
        0: "是",
        1: "否"
      },
      isQuyuStateMap: {
        0: "是",
        1: "否"
      },
      isAreaStateMap: {
        0: "是",
        1: "否"
      }
    };
  },
  mounted() {
    // 查询大区
    this.getallianList();
    // 获取列表
    this.getList();
  },
  methods: {
    // 获取本周
    Thisweek() {
      let week = transTime(new Date());
      let date = getDay("week", week);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.rentTimes = [start, end];
      this.listQuery.rentTimes = this.rentTimes.toString();
    },
    // 获取本月
    Thismonth() {
      let month = transTime(new Date());
      let date = getDay("month", month);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.rentTimes = [start, end];
      this.listQuery.rentTimes = this.rentTimes.toString();
    },
    // 获取季度
    Thisquarter() {
      let quarter = transTime(new Date());
      let date = getDay("quarter", quarter);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.rentTimes = [start, end];
      this.listQuery.rentTimes = this.rentTimes.toString();
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
    // 获取到大区的id去请求加盟商
    allianValue(value) {
      this.listQuery.orderAllianceId = "";
      this.listQuery.areaId = "";
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptions = res.data;
          }
        })
        .catch(() => {});
    },
    // 通过大区id和加盟商id获取责任区域
    getdutyList(value) {
      this.listQuery.areaId = "";
      findByLargeFranchisee({
        largeAreaId: this.listQuery.regionId,
        franchiseeId: value
      })
        .then(res => {
          if (res.code == 0) {
            this.areaOptions = res.data;
          }
        })
        .catch(() => {});
    },
    // 获取列表
    getList() {
      this.loading = true;
      orderListPage(this.listQuery)
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
      console.log(value);
      if (value == null) {
        this.rentTimes = [];
        this.listQuery.rentTimes = "";
      } else {
        this.listQuery.rentTimes = value.toString();
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
      if (
        (this.listQuery.orderMoney1 != "" &&
          this.listQuery.orderMoney2 == "") ||
        (this.listQuery.orderMoney1 == "" && this.listQuery.orderMoney2 != "")
      ) {
        // alert('第二个或者第一个唯恐')
        this.$message({
          showClose: true,
          message: "请完善订单金额",
          type: "warning"
        });
      } else {
        // alert('没有填写 直接走默认查询')
        this.listQuery.current = 1;
        this.getList();
      }
      //
    }
  }
};
</script>

<style lang="scss" scoped>
.orderlist {
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
            width: 100px;
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
          margin-left: -6px;
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
.orderlist-container .search-container /deep/ .el-input {
  width: 230px;
}
.orderlist-container .Operation /deep/ .el-input,
.el-textarea {
  width: 350px;
}
.orderlist-container .editPrice /deep/ .el-input .el-input__inner {
  border-radius: 0px;
}
.orderlist-container .editPrice /deep/ .el-input-group__append {
  border-radius: 0px;
}
</style>