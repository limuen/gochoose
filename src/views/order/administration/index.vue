<template>
  <div class="administration-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select
              v-model="listQuery.electrombileRegionId"
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
            <el-select v-model="listQuery.electrombileAllianceId" clearable placeholder="请选择加盟商">
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
            <span>实名认证</span>
            <el-select v-model="listQuery.isTrueName" placeholder="请选择实名认证">
              <el-option label="已实名" :value="0"></el-option>
              <el-option label="未实名" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>黑名单</span>
            <el-select v-model="listQuery.isBlacklist" placeholder="请选择黑名单">
              <el-option label="是" :value="0"></el-option>
              <el-option label="否" :value="1"></el-option>
            </el-select>
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
            <span>用户电话</span>
            <el-input v-model="listQuery.mobile" placeholder="请输入用户电话"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>注册时间</span>
            <el-date-picker
              v-model="createTimes"
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
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="handleFilter">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="permission-table">
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="customerName" label="姓名" align="center"></el-table-column>
        <el-table-column prop="mobile" label="用户手机号" width="120" align="center"></el-table-column>
        <el-table-column prop="customerIdcard" label="身份证号码" width="180" align="center"></el-table-column>
        <el-table-column prop="isBlacklist" label="是否黑名单" width="100" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.isBlacklist | isBlacklist}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.sex == 1">男</div>
            <div v-else-if="scope.row.sex == 2">女</div>
            <div v-else>未知</div>
          </template>
        </el-table-column>
        <el-table-column prop="cashPledge" label="押金" align="center"></el-table-column>
        <el-table-column prop="dispatchMoney" label="调度费" align="center"></el-table-column>
        <el-table-column prop="balanceMoney" label="充值余额" align="center"></el-table-column>
        <el-table-column prop="giveMoney" label="赠送余额" align="center"></el-table-column>
        <el-table-column prop="totalCardNumber" label="骑行券数量" width="120" align="center"></el-table-column>
        <el-table-column prop="rideTotalDistance" width="120" label="骑行总里程" align="center"></el-table-column>
        <el-table-column prop="rideTotalTime" width="120" label="骑行总时长" align="center"></el-table-column>
        <el-table-column prop="offLineDay" width="120" label="已离线天数" align="center"></el-table-column>
        <el-table-column prop="处理结果图片与备注" width="120" label="故障上报次数" align="center"></el-table-column>
        <el-table-column prop="moneyTotal" width="120" label="余额总充值" align="center"></el-table-column>
        <el-table-column prop="giveupTotal" width="120" label="余额总赠送" align="center"></el-table-column>
        <el-table-column prop="totalCardNumber" width="130" label="红包/卡券总领取" align="center"></el-table-column>
        <el-table-column prop="expenseCalendarTotsl" label="消费记录" align="center"></el-table-column>
        <el-table-column prop="allianceName" width="120" label="加盟商" align="center"></el-table-column>
        <el-table-column prop="regionName" width="120" label="大区" align="center"></el-table-column>
        <el-table-column prop="createTime" width="200" label="注册时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="350" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.blackcount.toString()"
              placement="top"
            >
              <span v-if="scope.row.blackcount != 0">{{scope.row.blackcount}}</span>
            </el-tooltip>
            <el-button
              type="primary"
              v-permission="button.administration_administration_whitelist"
              @click="handleBlacklist(scope.row)"
            >加入黑名单</el-button>
            <el-button
              type="primary"
              v-permission="button.administration_administration_rouse"
              @click="handleAwaken(scope.row)"
            >唤醒用户</el-button>
            <el-button
              type="primary"
              v-permission="button.administration_administration_refund"
              @click="handleRefund(scope.row)"
            >退款</el-button>
          </template>
        </el-table-column>
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
      <div>
        <i class="el-icon-folder-opened excel-blue"></i>
        <span>导出excel</span>
      </div>
    </div>

    <!-- 加入黑名单 -->
    <el-dialog
      title="黑名单"
      width="30%"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="BlacklistForm"
        :rules="BlacklistRules"
        class="form"
        ref="BlacklistForm"
        label-width="120px"
      >
        <el-form-item label="拉黑名单原因" prop="blackReason">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入拉黑名单原因"
            v-model="BlacklistForm.blackReason"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitformBlacklist">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 用户唤醒 -->
    <el-dialog
      title="用户唤醒"
      width="30%"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisibleGive"
    >
      <el-form :model="GiveForm" :rules="GiveRules" class="form" ref="GiveForm" label-width="120px">
        <el-form-item label="赠送卡券" prop="remark">
          <el-select v-model="GiveForm.remark" placeholder="请选择赠送卡券">
            <el-option label="5元骑行红包" :value="0"></el-option>
            <el-option label="3元骑行券" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisibleGive = false">取 消</el-button>
        <el-button type="primary" @click="submitformGive">提 交</el-button>
      </div>
    </el-dialog>

    <!-- 退款 -->
    <el-dialog
      :title="RefundTitle"
      width="30%"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisibleRefund"
    >
      <el-form
        :model="RefundForm"
        :rules="RefundRules"
        class="form"
        ref="RefundForm"
        label-width="120px"
      >
        <el-form-item label="赠送卡券" prop="radio">
          <el-radio-group v-model="RefundForm.radio">
            <el-radio :label="0" border>押金</el-radio>
            <el-radio :label="1" border>调度费</el-radio>
            <el-radio :label="2" border>充值余额</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="可退金额">
          <el-input placeholder="可退金额" disabled v-model="RefundForm.remark"></el-input>元
        </el-form-item>
        <el-form-item label="要退金额" prop="remark1">
          <el-input placeholder="请输入要退金额" v-model="RefundForm.remark1"></el-input>元
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisibleRefund = false">取 消</el-button>
        <el-button type="primary" @click="submitformRefund">提 交</el-button>
      </div>
      <div
        slot="footer"
        class="dialog-footer dialoginfo"
        align="center"
        style="margin-top:20px;padding:0px 15px;"
      >
        <div>注意：1.提示用户退回的资金将在1-3个工作日原路返回。</div>
        <div>2.退款记录查看路径：充值退款-退款记录</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { administrationListPage, updateByBlackReason } from "@/api/order";
import { allRegion, allianceListByRegionId } from "@/api/region";
import { getDay, transTime } from "@/utils/index.js";
import permission from "@/directive/permission";
export default {
  name: "administration",
  directives: { permission },
  data() {
    return {
      button: {
        administration_administration_whitelist:
          "administration_administration_whitelist",
        administration_administration_rouse:
          "administration_administration_rouse",
        administration_administration_refund:
          "administration_administration_refund"
      },
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      listQuery: {
        electrombileRegionId: "",
        electrombileAllianceId: "",
        isTrueName: "",
        isBlacklist: "",
        mobile: "",
        customerName: "",
        createTimes: "",
        current: 1,
        size: 10
      },
      Tipcontent: "",
      createTimes: [],
      tableData: [],
      total: 0,
      loading: false,
      dialogFormVisible: false,
      BlacklistForm: {
        customerId: "",
        blackReason: ""
      },
      BlacklistRules: {
        blackReason: [
          { required: true, message: "请输入拉黑名单原因", trigger: "blur" }
        ]
      },
      GiveRules: {
        remark: [
          { required: true, message: "请选择赠送卡券", trigger: "change" }
        ]
      },
      GiveForm: {
        remark: ""
      },
      dialogFormVisibleGive: false,
      dialogFormVisibleRefund: false,
      RefundForm: {
        radio: 0,
        remark: "23",
        remark1: ""
      },
      RefundRules: {
        radio: [
          { required: true, message: "请选择退款类型", trigger: "change" }
        ],
        remark1: [
          { required: true, message: "请输入要退金额", trigger: "blur" }
        ]
      },
      RefundTitle: ""
    };
  },
  filters: {
    isBlacklist(key) {
      const isBlacklistMap = {
        0: "是",
        1: "否"
      };
      return isBlacklistMap[key];
    }
  },
  mounted() {
    // 查询大区下的加盟商（搜索下拉用）
    this.getallianList();
    this.getList();
  },
  methods: {
    // 查询大区下的加盟商（搜索下拉用）
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
      this.listQuery.electrombileAllianceId = "";
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptions = res.data;
          }
        })
        .catch(() => {});
    },
    changeClose(value) {
      console.log(value);
      if (value == null) {
        this.createTime = [];
        this.listQuery.createTimes = "";
      } else {
        this.listQuery.createTimes = value.toString();
      }
    },
    // 获取本周
    Thisweek() {
      let week = transTime(new Date());
      let date = getDay("week", week);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.createTimes = [start, end];
      this.listQuery.createTimes = this.createTimes.toString();
    },
    // 获取本月
    Thismonth() {
      let month = transTime(new Date());
      let date = getDay("month", month);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.createTimes = [start, end];
      this.listQuery.createTimes = this.createTimes.toString();
    },
    // 获取季度
    Thisquarter() {
      let quarter = transTime(new Date());
      let date = getDay("quarter", quarter);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.createTimes = [start, end];
      this.listQuery.createTimes = this.createTimes.toString();
    },
    // 获取列表
    getList() {
      this.loading = true;
      administrationListPage(this.listQuery)
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
    // 加入黑名单
    handleBlacklist(row) {
      console.log(row, "加入黑名单");
      this.dialogFormVisible = true;
      this.BlacklistForm.customerId = row.customerId;
      this.$nextTick(() => {
        this.$refs.BlacklistForm.resetFields();
      });
    },
    // 唤醒用户
    handleAwaken(row) {
      this.dialogFormVisibleGive = true;
      this.$nextTick(() => {
        this.$refs.GiveForm.resetFields();
      });
    },
    // 加入黑名单提交
    submitformBlacklist() {
      this.$refs.BlacklistForm.validate(valid => {
        if (valid) {
          updateByBlackReason(this.BlacklistForm).then(res => {
            console.log(res, "11111111");
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "加入黑名单成功",
                type: "success"
              });
              this.getList();
              this.dialogFormVisible = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 唤醒用户提交
    submitformGive() {
      this.$refs.GiveForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRefund(row) {
      this.dialogFormVisibleRefund = true;
      this.RefundTitle = `您正在对用户【${row.mobile}】进行退款`;
      this.$nextTick(() => {
        this.$refs.RefundForm.resetFields();
      });
    },
    submitformRefund() {
      this.$refs.RefundForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.administration {
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
    .page-excel {
      display: flex;
      justify-content: space-between;
      .page-container {
        > span {
          line-height: 32px;
          font-size: 14px;
          margin-right: 10px;
        }
      }
      & > div:nth-child(2) {
        margin-top: 25px;
        color: #20a0ff;
        cursor: pointer;
      }
    }
    .dialoginfo {
      div {
        line-height: 24px;
        font-size: 14px;
        color: #909399;
      }
    }
  }
}
.administration-container .search-container /deep/ .el-input {
  width: 230px;
}
.administration-container .form /deep/ .el-input,
.el-textarea {
  width: 350px;
}
</style>