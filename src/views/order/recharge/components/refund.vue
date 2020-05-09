<template>
  <div class="refund-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>退款类型</span>
            <el-select v-model="listQuery.refundType" placeholder="请选择退款类型">
              <el-option label="押金" :value="0"></el-option>
              <el-option label="余额" :value="1"></el-option>
              <el-option label="调度费" :value="2"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>退款渠道</span>
            <el-select v-model="listQuery.refundChannel" placeholder="请选择退款渠道">
              <el-option label="微信" :value="0"></el-option>
              <el-option label="支付宝" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>退款状态</span>
            <el-select v-model="listQuery.refundStatus" placeholder="请选择退款状态">
              <el-option label="已退款" :value="0"></el-option>
              <el-option label="未退款" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>用户姓名</span>
            <el-input v-model="listQuery.customerName" placeholder="请输入用户昵称"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>用户电话</span>
            <el-input v-model="listQuery.customerPhone" placeholder="请输入用户电话"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>退款操作人</span>
            <el-select v-model="listQuery.refundOperator" placeholder="请选择退款操作人">
              <el-option label="平台" :value="0"></el-option>
              <el-option label="用户" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>退款单号</span>
            <el-input v-model="listQuery.refundNumber" placeholder="请输入退款单号"></el-input>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <span>退款时间</span>
            <el-date-picker
              v-model="refundEndTimes"
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
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="handleFilter">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-loading="loading">
      <div class="permission-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{background:'#EBEFF4'}"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="rechargeType" label="充值类型" align="center"></el-table-column>
          <el-table-column prop="refundNumber" label="退款单号" align="center"></el-table-column>
          <el-table-column prop="billNumber" label="对账单号" align="center"></el-table-column>
          <el-table-column prop="refundChannel" label="退款渠道" align="center">
            <template slot-scope="scope">
              <div>{{refundChannelStateMap[scope.row.refundChannel]}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="refundOperator" label="退款操作人" align="center"></el-table-column>
          <el-table-column prop="customerName" label="用户名" align="center"></el-table-column>
          <el-table-column prop="customerPhone" label="用户手机号" align="center"></el-table-column>
          <el-table-column prop="refundMoney" label="退款金额" align="center"></el-table-column>
          <el-table-column prop="refundTime" label="退款发起时间" align="center"></el-table-column>
          <el-table-column prop="refundEndTime" label="退款到账时间" align="center"></el-table-column>
          <el-table-column prop="refundStatus" label="付款状态" align="center">
            <template slot-scope="scope">
              <div>{{scope.row.refundStatus | refundStatusState}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-excel">
        <div class="page-content">
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
          <div>
            <i class="el-icon-folder-opened excel-blue"></i>
            <span>导出excel</span>
          </div>
        </div>
        <div class="page-info">总金额：290元，收益：603元， 已退款：30元，未付款：58元</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDay, transTime } from "@/utils/index.js";
import { RefundListPage } from "@/api/order";
export default {
  name: "refund",

  data() {
    return {
      listQuery: {
        refundType: "",
        refundChannel: "",
        refundStatus: "",
        customerName: "",
        customerPhone: "",
        refundOperator: "",
        refundNumber: "",
        refundEndTimes: "",
        current: 1,
        size: 10
      },
      refundEndTimes: [],
      tableData: [],
      total: 0,
      loading: false,
      refundChannelStateMap: {
        0: "微信",
        1: "支付宝"
      }
    };
  },
  filters: {
    // refundChannelState(key) {
    //   const refundChannelStateMap = {
    //     0: "微信",
    //     1: "支付宝"
    //   };
    //   return refundChannelStateMap[key];
    // },
    refundStatusState(key) {
      const refundStatusStateMap = {
        0: "未退款",
        1: "已退款"
      };
    }
  },
  mounted() {
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
      this.refundEndTimes = [start, end];
      this.listQuery.refundEndTimes = this.refundEndTimes.toString();
    },
    // 获取本月
    Thismonth() {
      let month = transTime(new Date());
      let date = getDay("month", month);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.refundEndTimes = [start, end];
      this.listQuery.refundEndTimes = this.refundEndTimes.toString();
    },
    // 获取季度
    Thisquarter() {
      let quarter = transTime(new Date());
      let date = getDay("quarter", quarter);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.refundEndTimes = [start, end];
      this.listQuery.refundEndTimes = this.refundEndTimes.toString();
    },
    // 获取列表
    getList() {
      this.loading = true;
      RefundListPage(this.listQuery)
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
        this.changeTimes = [];
        this.listQuery.changeTimes = "";
      } else {
        this.listQuery.changeTimes = value.toString();
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
.refund {
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
  }
}
.refund-container .search-container /deep/ .el-input {
  width: 230px;
}
</style>