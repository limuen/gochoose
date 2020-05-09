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
            <el-input
              placeholder="请输入内容"
              v-number="2"
              type="number"
              v-model="listQuery.orderMoney1"
            >
              <template slot="append">～</template>
            </el-input>
            <el-input
              v-model="listQuery.orderMoney2"
              v-number="2"
              type="number"
              placeholder="请输入车辆编号"
            ></el-input>
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


    <div  v-loading="loading">
      <div class="permission-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="orderNumber" width="180" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="electrombileNumber" width="140" label="车辆编号" align="center"></el-table-column>
        <el-table-column prop="status" width="130" label="订单状态" align="center">
          <template slot-scope="scope">
            <div>{{statusStateMap[scope.row.status]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="customerName" label="用户名" align="center"></el-table-column>
        <el-table-column prop="customerPhone" width="80" label="用户电话" align="center"></el-table-column>
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
        <el-table-column prop="startTime" width="200" label="租车时间" align="center"></el-table-column>
        <el-table-column prop="endTime" width="200" label="还车时间" align="center"></el-table-column>
        <el-table-column prop="isReport" label="报修" align="center">
          <template slot-scope="scope">
            <div>{{isReportStateMap[scope.row.isReport]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="isQuyu" width="120" label="区域外还车" align="center">
          <template slot-scope="scope">
            <div>{{isQuyuStateMap[scope.row.isQuyu]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="isArea" width="140" label="停车点外还车" align="center">
          <template slot-scope="scope">
            <div>{{isAreaStateMap[scope.row.isArea]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="totalMoney" width="130" label="总扣款（元）" align="center"></el-table-column>
        <el-table-column prop="balanceMoneyPay" width="180" label="充值余额扣款（元）" align="center"></el-table-column>
        <el-table-column prop="giveMoneyPay" width="180" label="赠送余额扣款（元）" align="center"></el-table-column>
        <el-table-column prop="dispatchMoneyPay" width="140" label="调度费扣款（元）" align="center"></el-table-column>
        <el-table-column prop="removeMoneyPay" width="130" label="挪车费（元）" align="center"></el-table-column>
        <el-table-column prop="activityDiscountPay" width="180" label="骑行券扣款（元）" align="center"></el-table-column>
        <el-table-column prop="orderAllianceName" label="加盟商" align="center"></el-table-column>
        <el-table-column prop="orderRegionName" label="大区" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              v-permission="button.orderrecord_orderrecord_order_refund"
              @click="handleRefund(scope.row)"
            >退款</el-button>
            <el-button
              type="primary"
              v-permission="button.orderrecord_orderrecord_order_seat"
              @click="handleCar(scope.row)"
            >还车位置</el-button>
            <el-button
              type="primary"
              v-permission="button.orderrecord_orderrecord_order_trip"
              @click="handleTrip(scope.row)"
            >行程</el-button>
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

    

    <!-- 退款 -->
    <el-dialog
      :title="RefundTitle"
      width="30%"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisibleRefund"
    >
      <el-form :model="RefundForm" class="form" :rules="rules" ref="RefundForm" label-width="120px">
        <el-form-item label="订单金额">
          <el-input placeholder="订单金额" disabled v-model="RefundForm.totalMoney"></el-input>元
        </el-form-item>
        <el-form-item label="退款金额" prop="residueMoney">
          <el-input placeholder="退款金额" v-number="2" v-model="RefundForm.residueMoney"></el-input>元
        </el-form-item>
        <el-form-item label="退款原因" prop="reason">
          <el-select v-model="RefundForm.reason" @change="changeselectValue" placeholder="请选择退款原因">
            <el-option label="车辆故障" value="车辆故障"></el-option>
            <el-option label="忘记换车" value="忘记换车"></el-option>
            <el-option label="车费多收" value="车费多收"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退款原因" v-if="RefundForm.reason == '其他'" prop="reason1">
          <el-input placeholder="退款原因" type="textarea" :rows="4" v-model="RefundForm.reason1"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisibleRefund = false">取 消</el-button>
        <el-button type="primary" @click="submitformRefund">提 交</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="tabTitle"
      width="40%"
      class="opearteform"
      :visible.sync="dialogCarMapVisible"
    >
      <el-row :gutter="24">
        <el-form ref="form">
          <el-col :span="24" class="MapClass">
            <div id="container" v-loading="Maploading" />
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>
    <el-dialog title="用户行程" width="40%" class="opearteform" :visible.sync="dialogorderRouteVisible">
      <el-row :gutter="24">
        <el-form ref="form1">
          <el-col :span="24" class="MapClass">
            <div id="container1" v-loading="Maploading1" />
          </el-col>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import AMap from "AMap";
import { allRegion, allianceListByRegionId } from "@/api/region";
import { findByLargeFranchisee } from "@/api/responsibility";
import { getDay, transTime } from "@/utils/index.js";
import {
  orderListPage,
  returnPosition,
  returnorderRefund,
  orderRoute
} from "@/api/orderrecord";
import number from "@/directive/input-filter";
import permission from "@/directive/permission";
export default {
  name: "orderlist",
  directives: { number, permission },
  data() {
    const validatemoney = (rule, value, callback) => {
      console.log(value, "退款金额");
      if (value > this.RefundForm.totalMoney) {
        callback(new Error("退款金额不能大于订单金额"));
      } else {
        callback();
      }
    };
    return {
      button: {
        orderrecord_orderrecord_order_refund:
          "orderrecord_orderrecord_order_refund",
        orderrecord_orderrecord_order_seat:
          "orderrecord_orderrecord_order_seat",
        orderrecord_orderrecord_order_trip: "orderrecord_orderrecord_order_trip"
      },
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
      },
      dialogFormVisibleRefund: false,
      RefundTitle: "",
      RefundForm: {
        totalMoney: "",
        residueMoney: "",
        reason: "",
        reason1: "",
        orderNumber: "",
        orderId: "",
        customerId: ""
      },
      rules: {
        residueMoney: [
          { required: true, trigger: "blur", validator: validatemoney }
        ],
        reason: [
          { required: true, message: "请选择退款原因", trigger: "change" }
        ],
        reason1: [
          { required: true, message: "请输入退款原因", trigger: "blur" }
        ]
      },
      dialogCarMapVisible: false,
      tabTitle: "",
      Maploading: true,
      map: null,
      dialogorderRouteVisible: false,
      Maploading1: true,
      map1: null,
    };
  },
  mounted() {
    // 查询大区
    this.getallianList();
    // 获取列表
    this.getList();
    if (this.$route.query.electrombileNumber) {
      let electrombileNumber = this.$route.query.electrombileNumber;
      console.log(electrombileNumber)
      this.listQuery.electrombileNumber = electrombileNumber;
      this.getList();
    }else{
      this.getList();
    }
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
    async getallianList() {
        await allRegion()
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
    },
    handleRefund(row) {
      console.log(row, "row退款");
      this.dialogFormVisibleRefund = true;
      this.RefundForm = {
        totalMoney: row.totalMoney,
        residueMoney: "",
        reason: "",
        reason1: "",
        orderNumber: row.orderNumber,
        orderId: row.orderId,
        customerId: row.customerId
      };
      this.RefundTitle = `您正在对用户【${row.customerPhone}】进行退款`;
      this.$nextTick(() => {
        this.$refs.RefundForm.resetFields();
      });
    },
    // 还车位置
    handleCar(row) {
      console.log(row,'用户还车地点')
      this.dialogCarMapVisible = true;
      this.tabTitle = "用户还车地点";
      this.map = null;
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
        returnPosition({
          orderId: row.orderId
        })
          .then(res => {
            console.log(res, "用户还车地点res");
            let marker = null;
            marker = new AMap.Marker({
              position: [res.data.endLongitude, res.data.endLatitude],
              icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
              offset: new AMap.Pixel(-13, -30)
            });
            this.map.add(marker);
            this.map.setFitView();
            this.Maploading = false;
          })
          .catch(() => {});
      });
    },
    changeselectValue(value) {
      console.log(value, "11111111");
    },
    submitformRefund() {
      this.$refs.RefundForm.validate(valid => {
        if (valid) {
          if (this.RefundForm.reason == "其他") {
            this.RefundForm.reason = this.RefundForm.reason1;
          }
          returnorderRefund(this.RefundForm)
            .then(res => {
              if (res.code == 0) {
                this.$notify({
                  title: "成功",
                  message: "退款成功",
                  type: "success"
                });
                this.$refs.RefundForm.resetFields();
                this.dialogFormVisibleRefund = false;
                this.getlarList();
              } else {
                this.$notify.error({
                  title: "错误",
                  message: res.message
                });
              }
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleTrip(row) {
      this.map1 = null;
      this.dialogorderRouteVisible = true;
      
      this.$nextTick(() => {
        const that = this;
        that.map1 = new AMap.Map("container1", {
          resizeEnable: true,
          zooms: [3, 20],
          zoom: 16
        });
        // 工具条控件
        that.map1.plugin(["AMap.ToolBar"], function() {
          that.map1.addControl(new AMap.ToolBar());
        });
        // 地图类型切换
        that.map1.plugin(["AMap.MapType"], function() {
          that.map1.addControl(new AMap.MapType());
        });
        orderRoute({
          orderId: row.orderId
        })
          .then(res => {
            let polyline = null;
            let marker = null;
            let marker1 = null;
            console.log(res, "行程通过id查询");
            if (res.code == 0) {
              let trackList = [];
              res.data.trackList.forEach(item => {
                trackList.push([item.lng, item.lat]);
              });
              polyline = new AMap.Polyline({
                path: trackList,
                isOutline: false,
                borderWeight: 3,
                strokeColor: '#67c23a',
                strokeOpacity: 1,
                strokeWeight: 3,
                strokeStyle: 'solid',
                lineJoin: 'round',
                lineCap: 'round',
                zIndex: 50
              });
              console.log(trackList.length-1)
              let numberIndex = trackList.length-1;
              marker = new AMap.Marker({
                 position: [trackList[0].lng,trackList[0].lat ],
                 icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                 offset: new AMap.Pixel(-13, -30)
              });
              marker1 = new AMap.Marker({
                 position: [trackList[numberIndex].lng,trackList[numberIndex].lat ],
                 icon: `https://webapi.amap.com/theme/v1.3/markers/n/mark_b${trackList[numberIndex]}.png`,
                 offset: new AMap.Pixel(-13, -30)
              });
              this.map1.add(marker);
              this.map1.add(marker1)
              this.map1.add(polyline);
              this.map1.setFitView();
              this.Maploading1 = false;
              console.log(trackList,'11111111')
            }
          })
          .catch(() => {});
      });
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
.orderlist-container .form /deep/ .el-input,
.el-textarea {
  width: 350px;
}
.orderlist-container .editPrice /deep/ .el-input .el-input__inner {
  border-radius: 0px;
}
.orderlist-container .editPrice /deep/ .el-input-group__append {
  border-radius: 0px;
}
.MapClass {
  width: 100%;
  height: 400px;
  position: relative;
  #container,
  #container1 {
    width: 100%;
    height: 100%;
  }
}
#container /deep/ .amap-maptype-list {
  display: none !important;
}
#container1 /deep/ .amap-maptype-list {
  display: none !important;
}
.MapClass /deep/ .amap-indoormap-floorbar-control .panel-box {
  display: none !important;
}
</style>