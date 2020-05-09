<template>
  <div class="freesheet-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>订单编号</span>
            <el-input v-model="listQuery.orderNumber" placeholder="请输入订单编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>操作员</span>
            <el-input v-model="listQuery.refundOperator" placeholder="请输入操作员"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary">查询</el-button>
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
          <el-table-column prop="orderNumber" label="订单编号" align="center"></el-table-column>
          <el-table-column prop="refundOperator" label="退款操作员" align="center"></el-table-column>
          <el-table-column prop="运维方式" label="免单前金额" align="center"></el-table-column>
          <el-table-column prop="维修部件" label="免单后金额" align="center"></el-table-column>
          <el-table-column prop="reason" label="免单原因" align="center"></el-table-column>
          <el-table-column prop="createTime" label="免单时间" align="center"></el-table-column>
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
import { freesheetListPage } from "@/api/orderrecord";
export default {
  name: "freesheet",
  data() {
    return {
      listQuery: {
        orderNumber: "",
        refundOperator: ""
      },
      tableData: [],
      total: 0,
      loading: false
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      this.loading = true;
      freesheetListPage(this.listQuery)
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
.freesheet {
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
      cursor: pointer;
      & > div:nth-child(2) {
        margin-top: 25px;
        color: #20a0ff;
      }
    }
  }
}
.freesheet-container .search-container /deep/ .el-input {
  width: 230px;
}
.freesheet-container .Operation /deep/ .el-input,
.el-textarea {
  width: 300px;
}
</style>