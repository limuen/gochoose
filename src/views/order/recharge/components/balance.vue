<template>
  <div class="balance-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>充值渠道</span>
            <el-select v-model="listQuery.payChannel" placeholder="请选择充值渠道">
              <el-option label="微信" :value="0"></el-option>
              <el-option label="支付宝" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>充值端</span>
            <el-select v-model="listQuery.rechargeSource" placeholder="请选择充值端">
              <el-option label="微信小程序" :value="0"></el-option>
              <el-option label="IOS" :value="1"></el-option>
              <el-option label="安卓" :value="2"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>付款状态</span>
            <el-select v-model="listQuery.paymentStatus" placeholder="请选择退款状态">
              <el-option label="已退款" :value="0"></el-option>
              <el-option label="未退款" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>用户昵称</span>
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
            <span>付款单号</span>
            <el-input v-model="listQuery.payNumber" placeholder="请输入打款单号"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>付款时间</span>
            <el-date-picker
              v-model="payTimes"
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
            <el-button type="text" @click="handleedit(scope.row.id)">编辑</el-button>
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
      <div class="page-info">总金额：673元，收益：603元， 已退款：30元，未付款：10元，赠送金额：30元，</div>
    </div>
  </div>
</template>

<script>
import { rechargeListPage } from "@/api/order";
import { getDay, transTime } from "@/utils/index.js";
export default {
  name: "balance",
  data() {
    return {
      listQuery: {
        payChannel: "",
        rechargeSource: "",
        paymentStatus: "",
        customerName: "",
        customerPhone: "",
        payNumber: "",
        payTimes: "",
        current: 1,
        size: 10
      },
      payTimes: [],
      tableData: [],
      total: 0,
      loading: false
    };
  },
  mounted() {
    // 获取列表
    this.getList() 
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
      this.payTimes = [start, end];
      this.listQuery.payTimes = this.payTimes.toString();
    },
    // 获取本月
    Thismonth() {
      let month = transTime(new Date());
      let date = getDay("month", month);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.payTimes = [start, end];
      this.listQuery.payTimes = this.payTimes.toString();
    },
    // 获取季度
    Thisquarter() {
      let quarter = transTime(new Date());
      let date = getDay("quarter", quarter);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.payTimes = [start, end];
      this.listQuery.payTimes = this.payTimes.toString();
    },
    // 获取列表
    getList() {
      this.loading = true;
      rechargeListPage(this.listQuery)
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
.balance {
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
.balance-container .search-container /deep/ .el-input {
  width: 195px;
}
</style>