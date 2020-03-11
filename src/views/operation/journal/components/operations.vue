<template>
  <div class="operation-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆编号</span>
            <el-input v-model="value" placeholder="请输入运维单号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>IMEI</span>
            <el-input v-model="value" placeholder="请输入完整的IMEI"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>操作类型</span>
            <el-select v-model="value" placeholder="请选择操作类型">
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
            <span>员工</span>
            <el-select v-model="value" placeholder="请选择员工">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <span>创建时间</span>
            <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary">查询</el-button>
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
          :header-cell-style="{background:'#EBEFF4'}"
        >
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
              <el-button type="text" @click="handleedit(scope.row.id)">
                忽略
              </el-button>
              <el-button type="text" @click="handleedit(scope.row.id)">
                设为待处理
              </el-button>
              <el-button type="text" @click="handleedit(scope.row.id)">
                工单指派
              </el-button>
              <el-button type="text" @click="handleedit(scope.row.id)">
                运维日志
              </el-button>
              <el-button type="text" @click="handleedit(scope.row.id)">
                给奖励
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-container">
          <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="query.currentPage"
            @current-change="getTrainingList"
          ></el-pagination> -->
          <el-pagination
              background
              align="left"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
          </el-pagination>
      </div>

   


  </div>
</template>

<script>
export default {
  name: "operations",
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
      checkList: ['选中且禁用','复选框 A'],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        textarea: ""
      },
      formLabelWidth: "120px",
      dialogcustormer: false,
    };
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    },
    handleCreate() {
        console.log('111')
        this.dialogcustormer = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.operation {
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
    }
  }
}
.operation-container .search-container /deep/ .el-input {
  width: 195px;
}
.operation-container /deep/ .page-container{
    justify-content: flex-start;
}

</style>