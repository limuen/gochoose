<template>
  <div class="dispatching-container">
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
              <el-option label="安卓" :value="1"></el-option>
              <el-option label="IOS" :value="2"></el-option>
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
        <el-table-column prop="rechargeType" label="充值类型" align="center"></el-table-column>
        <el-table-column prop="payNumber" label="付款单号" align="center"></el-table-column>
        <el-table-column prop="payChannel" label="支付渠道" align="center"></el-table-column>
        <el-table-column prop="rechargeSource" label="充值端" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.rechargeSource | rechargeSourceState}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="customerPhone" label="用户手机号" align="center"></el-table-column>
        <el-table-column prop="rechargeMoney" label="充值金额" align="center"></el-table-column>
        <el-table-column prop="payTime" label="付款时间" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建订单时间" align="center"></el-table-column>
        <el-table-column prop="paymentStatus" label="付款状态" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.paymentStatus | paymentStatusState}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" v-permission="button.recharge_recharge_dispatch_rouse" @click="handleAwaken(scope.row)">唤醒</el-button>
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


    <!-- 编辑 -->
    <el-dialog title="唤醒用户充值" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="订单金额">
          <el-input v-model="form.equipmentImel" disabled></el-input> 元
        </el-form-item>
        <el-form-item label="赠送券额"  prop="operationState">
          <el-select v-model="form.operationState" placeholder="请选择赠送券额">
            <el-option label="5元骑行红包" :value="0"></el-option>
            <el-option label="3元骑行券" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { DispatchListPage } from "@/api/order";
import { getDay, transTime } from "@/utils/index.js";
import permission from "@/directive/permission";
export default {
  name: "deposit",
  directives: { permission },
  data() {
    return {
      button: {
        recharge_recharge_dispatch_rouse: 'recharge_recharge_dispatch_rouse'
      },
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
      loading: false,
      form: {
        rechargeMoney: "",
        operationState: "",
      },
      dialogFormVisible: false,
      rules: {
        operationState: [
          { required: true, message: "请选择赠送券额", trigger: "change" }
        ]
      }
    };
  },
  filters: {
    rechargeSourceState(key) {
      const rechargeSourceStateMap = {
        0: "微信小程序",
        1: "安卓",
        2: "IOS"
      };
      return rechargeSourceStateMap[key];
    },
    paymentStatusState(key) {
      const paymentStatusStateMap = {
        0: "未付款",
        1: "已付款"
      };
      return paymentStatusStateMap[key];
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
      DispatchListPage(this.listQuery)
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
    },
    handleAwaken(row) {
      console.log(row,'唤醒')
      this.rechargeMoney = row.rechargeMoney;
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.dispatching {
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
.dispatching-container .search-container /deep/ .el-input {
  width: 230px;
}
.dispatching-container .form /deep/ .el-input{
  width: 350px;
}
</style>