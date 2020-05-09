<template>
  <div class="drawer-container">
    <el-drawer :visible.sync="drawer" :direction="direction" class="rideout-drawer">
      <h3>车辆详情</h3>
      <p>车辆归属：{{drawerData.electrombileAllianceName}}</p>
      <p>车辆编号：{{drawerData.electrombileNumber}}</p>
      <p>运营区域：{{drawerData.isInArea}}</p>
      <p>报警开关：{{drawerData.alarmSwitch}}</p>
      <p>运营状态：{{drawerData.operationState}}</p>
      <p>车型：{{drawerData.electrombileType}}</p>
      <p>设备IMEI：{{drawerData.equipmentImel}}</p>
      <p>SIM卡号：{{drawerData.equipmentSim}}</p>
      <p>设备版本号：2020-02-09 19：23：12</p>
      <p>设备IMEL2：{{drawerData.equipmentImel2}}</p>
      <p>SIM卡号2：{{drawerData.equipmentSim2}}</p>
      <p>设备版本号：2020-02-09 19：23：12</p>
      <div class="drawer_buttonList">
        <ul>
          <li>
            <el-button type="success" @click="handleks(11)">启动</el-button>
            <el-button type="warning" @click="handlehc">还车</el-button>
            <el-button type="danger" @click="handleks(1)">锁车</el-button>
          </li>
          <li>
            <el-button type="primary" @click="handleLocal">定位</el-button>
            <el-button type="primary" @click="handleGoRouter">订单</el-button>
            <el-button type="primary" @click="handletrajectory">轨迹</el-button>
          </li>
          <li>
            <el-button type="primary" @click="handlereset">重置里程</el-button>
            <el-button @click="handleDeatil" type="primary">车型详情</el-button>
            <el-button @click="handleDispatch" type="primary">维修调度</el-button>
          </li>
        </ul>
      </div>
    </el-drawer>

    <!-- 操作记录弹框 -->
    <el-dialog :title="carTitle" class="carDeatil" :visible.sync="recordsTableVisible" width="20%">
      <h3>参数</h3>
      <ul>
        <li>
          <div>品牌</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>脉冲</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>电池电压</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>保护电压</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>电流</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>功率</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>工作电压</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>最高速度</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>车轮半径</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>电池类型</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>转把</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>传感器</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>蜂鸣器</div>
          <div>1</div>
        </li>
        <li class="bordeTop">
          <div>夜行灯</div>
          <div>1</div>
        </li>
      </ul>
    </el-dialog>

    <!-- 定位弹窗 -->
    <div v-if="this.LocationId != ''">
      <Location ref="Location" :LocationId="LocationId" />
    </div>

    <!-- 轨迹弹窗 -->
    <div v-if="this.trajectoryId != ''">
      <trajectory ref="trajectory" @handleqkId="handleqkId" :trajectoryId="trajectoryId" />
    </div>

    <!-- 维修调度 -->
    <el-dialog
      :title="dialogtitle"
      width="30%"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" label-width="120px" class="form" ref="form">
        <el-form-item label="车辆编号">
          <el-input v-model="form.electrombileNumber" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="运维工序">
          <el-select v-model="form.region" placeholder="请选择运维工序">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { carByelectrombileId,execute,mileageReset,compulsiveFinishOrder } from "@/api/car";
import Location from '../carmanagDialog/Location';
import trajectory from "../carmanagDialog/trajectory";
export default {
  props: {
    drawerId: {
      type: Number
    }
  },
  components: {
    Location,
    trajectory
  },
  name: "drawer",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      drawerData: {},
      recordsTableVisible: false,
      carTitle: "",
      align: "center",
      dialogtitle: "",
      dialogFormVisible: false,
      form: {
        electrombileNumber: "",
        region: ""
      },
      LocationId: "",
      trajectoryId: "",
    };
  },
  methods: {
    getDetail() {
      carByelectrombileId({
        electrombileId: this.drawerId
      }).then(res => {
        if (res.code == 0) {
          let data = { ...res.data };
          console.log(data, "data");
          this.drawerData = this.changeData(data);
        }
        console.log(this.drawerData, "bianji");
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    changeData(data) {
      data.alarmSwitch = data.alarmSwitch == 0 ? "开" : "关";
      data.operationState = data.operationState == 0 ? "运营中" : "未运营";
      data.isInArea = data.isInArea == 0 ? "内" : "外";
      if (!data.equipmentImel2) {
        data.equipmentImel2 = "无数据";
      }
      if (!data.equipmentSim2) {
        data.equipmentSim2 = "无数据";
      }
      return data;
    },
    // 车辆详情
    handleDeatil() {
      this.recordsTableVisible = true;
      this.carTitle = `车辆【${this.drawerData.electrombileType}】`;
      console.log(this.drawerId);
    },
    // 维修调度
    handleDispatch() {
      this.dialogFormVisible = true;
      this.form.electrombileNumber = this.drawerData.electrombileNumber;
    },
    handleks(typecommand) {
      console.log(this.drawerData.equipmentImel,'1111111');
      execute({
        command: typecommand,
        deviceNo:this.drawerData.equipmentImel
      }).then(res=>{
        console.loh(res,'command')
      }).catch(()=>{})
    },
    handleGoRouter() {
      console.log(this.drawerData.electrombileNumber,'electrombileNumber');
      this.$router.push({
        path: "/order/orderrecord",
        query: {
          electrombileNumber: this.drawerData.electrombileNumber,
        }
      });
    },
    handleLocal() {
      console.log(this.drawerData,'handleLocal');
      this.LocationId = this.drawerData.electrombileId;
      this.$nextTick(() => {
        this.$refs.Location.dialogFormVisible = true;
        this.$refs.Location.initMap();
      });
    },
    handletrajectory() {
      console.log(this.drawerData,'handletrajectory');
      this.trajectoryId = this.drawerData.equipmentImel;
      console.log(this.trajectoryId,'trajectoryId')
      this.$nextTick(() => {
        this.$refs.trajectory.dialogFormVisible = true;
        this.$refs.trajectory.initMap();
      });
    },
    handleqkId(value) {
      this.trajectoryId = "";
    },
    handlereset() {
      mileageReset({
        electrombileId: this.drawerData.electrombileId
      }).then(res=>{
        console.log(res,'重置')
        if(res.code == 0){
          this.$notify({
              title: '成功',
              message: '重置成功',
              type: 'success'
          });
          this.$parent.getList();
        }
      }).catch(()=>{})
    },
    handlehc() {
      console.log(this.drawerData,'handletrajectory');
      compulsiveFinishOrder({
        electrombileId: this.drawerData.electrombileId
      }).then(res=>{
        console.log(res,'还车')
        if(res.code == 0){
          this.$notify({
              title: '成功',
              message: '还车成功',
              type: 'success'
          });
          this.$parent.getList();
        }
      }).catch(()=>{})
    },
  }
};
</script>

<style lang="scss" scoped>
.rideout-drawer {
  margin: 0px;
  h3,
  p {
    margin: 0px;
    padding: 10px;
  }
  .drawer_buttonList {
    position: absolute;
    left: 0;
    bottom: 80px;
    ul {
      margin: 0px;
      padding: 0px;
      list-style: none;
      li {
        margin: 10px;
      }
    }
  }
}
.carDeatil {
  h3 {
    margin-bottom: 15px;
  }
  ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
    width: 100%;
    li {
      width: 100%;
      display: flex;
      flex-direction: row;
      border: 1px solid #ccc;
      div {
        width: 50%;
        height: 30px;
        line-height: 30px;
        text-align: center;
      }
      div:nth-child(1) {
        border-right: 1px solid #ccc;
      }
    }
    .bordeTop {
      border-top: none;
    }
  }
}
.rideout-drawer /deep/ .el-drawer {
  width: 20% !important;
}
.drawer-container .carDeatil /deep/ .el-dialog__body {
  padding: 10px 50px 30px 50px;
}
.drawer-container .form /deep/ .el-input {
  width: 350px;
}
</style>