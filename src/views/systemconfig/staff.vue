<template>
  <div class="staff-container">
    <!-- <div class="create-button">
        <el-button type="primary" @click="handleCreate" icon="el-icon-edit">新增员工</el-button>
    </div>   -->
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
            <span>运营角色</span>
            <el-select v-model="value" placeholder="请选择运营角色">
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
            <span>姓名</span>
            <el-input v-model="value" placeholder="请输入姓名"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>电话</span>
            <el-input v-model="value" placeholder="请输入电话"></el-input>
          </div>
        </el-col>
        
        <el-col :span="24">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "staff",
  data() {
    return {
      listQuery: {
        regionId: "",
        allianceId: "",
        areaId: "",
        operationName: "",
        operationPhone: "",
        current: 1,
        size: 10
      },
      total: 0,
      tableData: [],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  }
};
</script>

<style lang="scss" scoped>
.staff {
  &-container {
    .create-button{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 20px;
    }
    .search-container {
      .el-row {
        margin-bottom: 20px;
        & > div {
          margin-bottom: 10px;
          display: flex;
          span {
            margin: 0px;
            display: inline-block;
            width: 80px;
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
    }
  }
}
.staff-container .search-container /deep/ .el-input {
  width: 200px;
}
</style>