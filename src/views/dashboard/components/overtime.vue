<template>
  <div class="Rideout">
    <div class="rideout-header">
        <div>
            <span>租车超时</span>
            <span style="margin-left:20px;">超</span>
            <el-select v-model="value" clearable style="width:100px;" placeholder="请选择">
                <el-option
                v-for="item in overtime"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
      <div>
        <i class="el-icon-refresh" @click="handleload"></i>
        <router-link to="/setup/operate">
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" align="center" label="车辆编号"></el-table-column>
      <el-table-column prop="name" align="center" label="订单号"></el-table-column>
      <el-table-column prop="address" align="center" label="超时"></el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="handleclickDetail(scope.row)"
            type="text"
            size="small"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      class="rideout-drawer"
    >
      <h3>详情</h3>
      <p>IMEI：358480000123456</p>
      <p>车辆编号：571010001</p>
      <p>最后骑行：13911002233</p>
      <p>GPS定位时间：2020-02-09 19：23：12</p>
      <div id="container" v-loading="maplading"></div>
    </el-drawer>
  </div>
</template>

<script>
import AMap from "AMap";
export default {
  name: "Rideout",
  data() {
    return {
      drawer: false,
      direction: "rtl",
      value: '',
      overtime:[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      maplading: true
    };
  },
  methods: {
    handleclickDetail(row) {
      this.drawer = true;
      this.$nextTick(() => {
        this.init();
        this.maplading = false;
      });
    },
    handleload() {
      console.log('点击刷新')
    },
    init() {
      let map = new AMap.Map("container", {
        center: [116.397428, 39.90923],
        resizeEnable: true,
        zoom: 10
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.Rideout {
  width: 45%;
  margin: 20px 30px;
  background-color: #fff;
  .rideout-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    line-height: 30px;
    i{
        cursor: pointer;
        &:hover {
            color: #5cb6ff;
        }
    }
    div>span {
      font-weight: bold;
    }
  }
  .rideout-drawer{
      h3,p{
          margin: 0px;
          padding: 15px;
      }
      #container {
        height: 300px;
        width: 100%;
    }
  }
}
.Rideout /deep/ .el-drawer__header{
    margin-bottom: 0px;
}
</style>