<template>
  <div class="role-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>角色名称</span>
            <el-input
              v-model="listQuery.role_name"
              placeholder="角色名称"
              style="width: 200px;"
              @keyup.enter.native="handleFilter"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <span>时间</span>
            <el-date-picker
              v-model="listQuery.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="handleFilter">查询</el-button>
            <el-button type="primary" @click="handleCreate" icon="el-icon-edit">新增系统角色</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{background:'#EBEFF4'}"
          >
      <el-table-column align="center" type="index" width="50" />
      <el-table-column align="center" prop="role_name" label="角色名称" width="200" />
      <el-table-column align="center" prop="desc" label="角色描述" />
      <el-table-column align="center" prop="create_time" label="创建时间" width="200" />
      <el-table-column align="center" prop="update_time" label="更新时间" width="200" />
      <el-table-column align="center" label="操作" width="300px">
        <template slot-scope="scope">
          <el-button
            v-permission="button.role_delete"
            v-loading="loading"
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.role_id)"
          >删除</el-button>
          <el-button
            v-permission="button.role_edit"
            v-loading="loading"
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row.role_id)"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-excel">
      <div class="page-container">
        <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="query.currentPage"
            @current-change="getTrainingList"
        ></el-pagination>-->
        <el-pagination
          background
          align="left"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import { getRoleList, deleteRole } from '@/api/role'
import Pagination from "@/components/Paginations";
import permission from "@/directive/permission";

export default {
  name: "role",
  components: {
    Pagination
  },
  directives: { permission },
  filters: {
    enableFilter(isEnable) {
      const enableMap = {
        0: "info",
        1: "success"
      };
      return enableMap[isEnable];
    }
  },
  data() {
    return {
      button: {
        role_add: "role_add",
        role_edit: "role_edit",
        role_delete: "role_delete"
      },
      loading: false,
      pages: {
        per_page: 20,
        total: 10
      },
      listQuery: {
        page: 1,
        row: 20,
        role_name: undefined,
        date: undefined
      },
      rolesData: []
    };
  },
  created() {
    this.initData(this.listQuery);
  },
  methods: {
    dataBlock(res) {
      this.pages = res.data.pages;
      this.listQuery.page = this.pages.current_page + 1;
      this.listQuery.row = this.pages.per_page;
      this.rolesData = res.data.roles;
    },
    initData(params) {
      getRoleList(params).then(res => {
        this.dataBlock(res);
      });
    },
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.row = val;
      this.initData(this.listQuery);
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.initData(this.listQuery);
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.initData(this.listQuery);
    },
    handleCreate() {
      this.$router.push({ name: "RoleAdd" });
    },
    // 修改
    handleUpdate(id) {
      this.$router.push({ name: "RoleEdit", query: { id: id } });
    },
    // 删除
    handleDelete(id) {
      this.loading = true;
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const data = {
            role_id: id,
            type: 1
          };
          deleteRole(data).then(res => {
            Message.success(res.msg);
            this.dataBlock(res);
          });
        })
        .catch(() => {});
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.role {
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
</style>
