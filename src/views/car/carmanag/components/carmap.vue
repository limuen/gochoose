<template>
  <div class="carmap-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select v-model="value" placeholder="请选择大区">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>加盟商</span>
            <el-select v-model="value" placeholder="请选择加盟商">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>责任区域</span>
            <el-select v-model="value" placeholder="请选择责任区域">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>租赁状态</span>
            <el-select v-model="value" placeholder="请选择租赁状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>锁车状态</span>
            <el-select v-model="value" placeholder="请选择锁车状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>收费模式</span>
            <el-select v-model="value" placeholder="请选择收费模式">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆状态</span>
            <el-select v-model="value" placeholder="请选择车辆状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>锁车状态</span>
            <el-select v-model="value" placeholder="请选择锁车状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>运营状态</span>
            <el-select v-model="value" placeholder="请选择车辆状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
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
        </el-col>
        
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>未使用车辆</span>
             <el-input placeholder="请输入未使用车辆" v-model="input2">
              <template slot="append">小时内</template>
             </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>未归还车辆</span>
             <el-input placeholder="请输入未归还车辆" v-model="input2">
              <template slot="append">小时内</template>
             </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>报警开关</span>
            <el-select v-model="value" placeholder="请选择报警开关">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>剩余里程小于</span>
             <el-input placeholder="请输入剩余里程小于" v-model="input2">
              <template slot="append">km</template>
             </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>GPS丢星</span>
             <el-input placeholder="请输入GPS丢星" v-model="input2">
              <template slot="append">天</template>
             </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>剩余电量小于</span>
             <el-input placeholder="请输入GPS丢星" v-model="input2">
              <template slot="append">%</template>
             </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>运营区域内外</span>
            <el-select v-model="value" placeholder="请选择运营区域内外">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="24">
          <div class="grid-content bg-purple" style="color: red;font-size: 14px;">
              以下信息填写后上面查询条件不生效
          </div>
        </el-col> -->
         <el-col :span="6">
          <div class="grid-content bg-purple">
           <span>车辆编号</span>
            <el-input v-model="value" placeholder="请输入车辆编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
           <span>设备IMEI</span>
            <el-input v-model="value" placeholder="请输入设备IMEI"></el-input>
          </div>
        </el-col>
       
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-button type="primary">查询</el-button>
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
export default {
  name: "carmap",
  data() {
    return {
      query: {},
      value2: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    }
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
  width: 195px;
}
.carmap-container .Operation /deep/ .el-input,.el-textarea{
  width: 300px;
}
</style>