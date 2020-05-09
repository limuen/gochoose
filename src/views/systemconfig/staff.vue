<template>
  <div class="staff-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select
              v-model="listQuery.regionId"
              clearable
              @change="allianValue"
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
            <el-select v-model="listQuery.allianceId" clearable placeholder="请选择加盟商">
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
            <span>姓名</span>
            <el-input v-model="listQuery.userName" placeholder="请输入姓名"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>电话</span>
            <el-input v-model="listQuery.phoneNumber" placeholder="请输入电话"></el-input>
          </div>
        </el-col>

        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="handleFilter">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-loading="loading">
      <div class="permission-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{background:'#EBEFF4'}"
        >
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="userName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="phoneNumber" label="联系电话" align="center"></el-table-column>
          <el-table-column prop="ruleNames" label="运维角色" align="center"></el-table-column>
          <el-table-column prop="regionName" label="责任区域" align="center"></el-table-column>
          <el-table-column prop="franchiseeName" label="所属加盟商" align="center"></el-table-column>
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
  </div>
</template>

<script>
import { staffqueryManagerListPage } from "@/api/mochaitmo";
import { allRegion, allianceListByRegionId } from "@/api/region";
export default {
  name: "staff",
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      listQuery: {
        regionId: "",
        allianceId: "",
        userName: "",
        phoneNumber: "",
        current: 1,
        size: 10
      },
      total: 0,
      tableData: [],
      loading: false
    };
  },
  mounted() {
    // 查询大区
    this.getallianList();
    this.getList();
  },
  methods: {
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
      this.listQuery.allianceId = "";
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptions = res.data;
          }
        })
        .catch(() => {});
    },
    // 获取列表
    getList() {
      this.loading = true;
      staffqueryManagerListPage(this.listQuery)
        .then(res => {
          console.log(res, "11111");
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
    }
  }
};
</script>

<style lang="scss" scoped>
.staff {
  &-container {
    .create-button {
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