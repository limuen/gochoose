<template>
  <div class="operation-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆编号</span>
            <el-input v-model="listQuery.electrombileNumber" placeholder="请输入运维单号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>IMEI</span>
            <el-input v-model="listQuery.equipmentImel" placeholder="请输入完整的IMEI"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>操作类型</span>
            <el-select v-model="listQuery.operateType" placeholder="请选择操作类型">
              <el-option
                v-for="item in operateType"
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
            <el-input v-model="listQuery.createName" placeholder="请输入员工"></el-input>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <span>创建时间</span>
            <el-date-picker
              v-model="pickDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
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
        <el-table-column prop="createName" label="操作员工" align="center"></el-table-column>
        <el-table-column prop="operateType" label="操作类型" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.operateType | operateTypeState}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="electrombileNumber" label="车辆编号" align="center"></el-table-column>
        <el-table-column prop="equipmentImel" label="IMEI" align="center"></el-table-column>
        <el-table-column prop="createTime" label="日期" align="center"></el-table-column>
        <el-table-column prop="allianceName" label="加盟商" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="page-excel">
      <div class="page-container">
        <el-pagination
         background
        align="left"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.pageNum"
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
</template>

<script>
import { findOperateLogPage } from "@/api/wbmaintenance";
export default {
  name: "operations",
  data() {
    return {
      total: 0,
      loading: false,
      tableData: [],
      pickDate: [],
      operateType: [
        {
          value: 1,
          label: "还车"
        },
        {
          value: 2,
          label: "锁车"
        },
        {
          value: 3,
          label: "启动"
        },
        {
          value: 4,
          label: "寻车"
        }
      ],
      listQuery: {
        electrombileNumber: "",
        equipmentImel: "",
        operateType: "",
        createName: "",
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  filters: {
    operateTypeState(key) {
      const operateTypeMap = {
        1: "还车",
        2: "锁车",
        3: "启动",
        4: "寻车"
      };
      return operateTypeMap[key];
    },
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(){
      this.loading = true;
      findOperateLogPage(this.listQuery).then(res=>{
        console.log(res,'111111111')
        if(res.code == 0){
          // res.data.data.createTime = res.data.data.createTime.substr(0, 19).replace('T', ' ').replace(/-/g, '-')
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.loading = false;
        }
      }).catch(() => {});
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleCreate() {
      console.log("111");
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
    .page-excel {
      display: flex;
      justify-content: space-between;
      & > div:nth-child(2) {
        margin-top: 25px;
        color: #20a0ff;
        cursor: pointer;
      }
    }
  }
}
.operation-container .search-container /deep/ .el-input {
  width: 230px;
}
.operation-container /deep/ .page-container {
  justify-content: flex-start;
}
</style>