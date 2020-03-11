<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <div class="content-item-top">
        <div class="dashboard-item">
          <span>车辆总数：</span>
          <router-link to="/setup/operate">9612</router-link>
          <span>辆</span>
        </div>
        <div class="dashboard-item">
          <span>在线中：</span>
          <router-link to="/">9612</router-link>
          <span>辆</span>
        </div>
        <div class="dashboard-item">
          <span>租车中：</span>
          <router-link to="/">9612</router-link>
          <span>辆</span>
        </div>
        <div class="dashboard-item">
          <span>空闲中：</span>
          <router-link to="/">9612</router-link>
          <span>辆</span>
        </div>
        <div class="dashboard-item item-red">
          <span>离线中：</span>
          <router-link to="/">9612</router-link>
          <span>辆</span>
        </div>
        <div class="dashboard-item item-red">
          <span>故障中：</span>
          <router-link to="/">9612</router-link>
          <span>辆</span>
        </div>
        <div class="dashboard-item item-red">
          <span>续航低于：</span>
          <el-select v-model="value" style="width:80px;margin-right:5px;" placeholder="请选择续航">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <router-link to="/">9612</router-link>
          <span>辆</span>
        </div>
      </div>
      <div class="content-item-bottom">
        <div class="dashboard-item">
          <span>今日营业额：9623元</span>
          <span class="item-font" style="margin-left:5px;">5.12</span>
          <i class="el-icon-top item-font item-red-icon"></i>
          <!-- <i class="el-icon-bottom item-font item-green-icon"></i> -->
          <span class="item-font">较昨日</span>
        </div>
        <div class="dashboard-item">
          <span>今日订单：9623个</span>
          <span class="item-font" style="margin-left:5px;">5.12</span>
          <i class="el-icon-top item-font item-red-icon"></i>
          <!-- <i class="el-icon-bottom item-font item-green-icon"></i> -->
          <span class="item-font">较昨日</span>
        </div>
        <div class="dashboard-item">
          <span>今日新增用户：9623人</span>
          <span class="item-font" style="margin-left:5px;">5.12</span>
          <!-- <i class="el-icon-top item-font item-red-icon"></i> -->
          <i class="el-icon-bottom item-font item-green-icon"></i>
          <span class="item-font">较昨日</span>
        </div>
      </div>
    </div>
    <div class="dashboard-list">
        <Rideout />
        <overtime />
        <free />
        <state />
    </div>
    
  </div>
</template>

<script>
import Rideout from "./components/Rideout";
import overtime from "./components/overtime";
import free from "./components/free"
import state from "./components/state"
export default {
  name: "dashboard",
  components: {
    Rideout,
    overtime,
    free,
    state
  },
  data() {
    return {
      options: [
        {
          value: "1",
          label: "10%"
        },
        {
          value: "2",
          label: "15%"
        },
        {
          value: "3",
          label: "20%"
        }
      ],
      value: "2"
    };
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    .dashboard-content {
      background-color: #ffffff;
      padding: 10px;
      .content-item-top,
      .content-item-bottom {
        display: flex;
        flex-direction: row;
        .dashboard-item {
          margin-right: 20px;
          line-height: 36px;
          .item-font {
            font-size: 12px;
          }
          .item-red-icon {
            color: red;
          }
          .item-green-icon {
            color: green;
          }
        }
      }
      .item-red {
        a {
          color: red;
        }
      }
      a {
        color: blue;
      }
    }
    .dashboard-list{
        margin-top: 20px;
        background-color: #ffffff;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding:10px;
    }
  }
}
.dashboard-list /deep/ .el-drawer__wrapper{
    z-index: 60000;
}
</style>