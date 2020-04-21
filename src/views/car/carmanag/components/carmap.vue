<template>
  <div class="carmap-container">
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
            <el-select
              v-model="listQuery.allianceId"
              @change="getdutyList"
              clearable
              placeholder="请选择加盟商"
            >
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
            <span>责任区域</span>
            <el-select clearable v-model="listQuery.areaId" placeholder="请选择责任区域">
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
            <span>租赁状态</span>
            <el-select v-model="listQuery.rentStatus" placeholder="请选择租赁状态">
              <el-option label="空闲中" :value="0"></el-option>
              <el-option label="租赁中" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>锁车状态</span>
            <el-select v-model="listQuery.lockElectrombileState" placeholder="请选择锁车状态">
              <el-option label="已上锁" :value="0"></el-option>
              <el-option label="未上锁" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>收费模式</span>
            <el-select v-model="value" placeholder="请选择收费模式">
              <el-option label="标准" :value="0"></el-option>
              <el-option label="老师" :value="1"></el-option>
              <el-option label="学生" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>-->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆状态</span>
            <el-select v-model="listQuery.electrombileStatus" placeholder="请选择车辆状态">
              <el-option
                v-for="item in carStatusList"
                :key="item.id"
                :label="item.dataValue"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>运营状态</span>
            <el-select v-model="listQuery.operationState" placeholder="请选择运营状态">
              <el-option
                v-for="item in operationStates"
                :key="item.value"
                :label="item.type"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车型</span>
            <el-select v-model="value" placeholder="请选择车型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>-->

        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>未使用车辆</span>
            <el-input placeholder="请输入未使用车辆" v-model="listQuery.unusedElectrombile">
              <template slot="append">小时内</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>未归还车辆</span>
            <el-input placeholder="请输入未归还车辆" v-model="listQuery.noReturnElectrombile">
              <template slot="append">小时内</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>报警开关</span>
            <el-select v-model="listQuery.alarmSwitch" placeholder="请选择报警开关">
              <el-option label="开" :value="0"></el-option>
              <el-option label="关" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>剩余里程小于</span>
            <el-input placeholder="请输入剩余里程小于" v-model="listQuery.residueEndurance">
              <template slot="append">km</template>
            </el-input>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>GPS丢星</span>
            <el-input placeholder="请输入GPS丢星" v-model="input2">
              <template slot="append">天</template>
            </el-input>
          </div>
        </el-col>-->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>剩余电量小于</span>
            <el-input placeholder="请输入剩余电量小于" v-model="listQuery.residueElectric">
              <template slot="append">%</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>运营区域</span>
            <el-select v-model="listQuery.isInArea" placeholder="请选择运营区域内外">
              <el-option label="内" :value="0"></el-option>
              <el-option label="外" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="24">
          <div class="grid-content bg-purple" style="color: red;font-size: 14px;">
              以下信息填写后上面查询条件不生效
          </div>
        </el-col>-->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆编号</span>
            <el-input v-model="listQuery.electrombileNumber" placeholder="请输入车辆编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>设备IMEI</span>
            <el-input v-model="listQuery.equipmentImel" placeholder="请输入设备IMEI"></el-input>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="handleFilter">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 地图 -->
    <div class="car-map">

    </div>


    

  </div>
</template>

<script>
import { CarselectByPid } from "@/api/publicapi";
import { allRegion, allianceListByRegionId } from "@/api/region";
export default {
  name: "carmap",
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      areaOptions: [], //责任区域单选
      carStatusList: [], // 车辆状态
      operationStates: [
        { value: 0, type: "运营中" },
        { value: 1, type: "未运营" }
      ],
      listQuery: {
        regionId: "",
        allianceId: "",
        areaId: "",
        rentStatus: "",
        lockElectrombileState: "",
        electrombileStatus: "",
        unusedElectrombile: "",
        noReturnElectrombile: "",
        isInArea: "",
        operationState: "",
        alarmSwitch: "",
        residueEndurance: "",
        residueElectric: "",
        electrombileNumber: "",
        equipmentImel: "",
        current: 1,
        size: 10
      },
      isEdit: false,
      total: 0,
      loading: false,
      tableData: [],
    };
  },
  mounted() {
    // 查询大区
    this.getallianList();
    // 获取车辆状态
    this.getCarStatus();
    // this.getList();
  },
  methods: {
    // 获取车辆状态
    getCarStatus() {
      CarselectByPid({ pid: 6 }).then(res => {
        if (res.code == 0) {
          this.carStatusList = res.data;
        }
      });
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
      this.listQuery.electrombileAllianceId = "";
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
    handleFilter() {
      this.listQuery.current = 1;
      // this.getList();
    },
  }
};
</script>

<style lang="scss" scoped>
.carmap {
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
    }
    .car-map{
        height: 500px;
    }
  }
}
.carmap-container .search-container /deep/ .el-input {
  width: 230px;
}
.carmap-container .Operation /deep/ .el-input,.el-textarea{
  width: 300px;
}
</style>