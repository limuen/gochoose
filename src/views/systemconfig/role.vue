<template>
  <div class="role-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>角色名称</span>
            <el-input
              v-model="listQuery.name"
              placeholder="角色名称"
              style="width: 250px;"
              @keyup.enter.native="handleFilter"
            />
          </div>
        </el-col>
        <el-col :span="4">
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
      v-loading="loading"
      :header-cell-style="{background:'#EBEFF4'}"
    >
      <el-table-column align="center" prop="id" label="id" />
      <el-table-column align="center" prop="name" label="角色名称" />
      <el-table-column align="center" prop="seq" label="排序" />
      <el-table-column align="center" prop="createTime" label="创建时间" width="200" />
      <el-table-column align="center" label="操作" width="300px">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleJurisdiction(scope.row.id)"
          >分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
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

    <!-- 新增系统角色 -->
    <el-dialog :title="rolesTitle" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="rolesForm" class="rolesForm" :rules="rules"  label-width="80px">
        <el-form-item label="角色名称"  prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="descr">
          <el-input v-model="form.descr" rows="3" type="textarea" />
        </el-form-item>
        <el-form-item label="排序"  prop="seq">
          <el-input v-model="form.seq" autocomplete="off" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddroles">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  createRole,
  updateRole,
  deleteRole
} from '@/api/role'
import permission from "@/directive/permission";

export default {
  name: "role",
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
      loading: true,
      total: 0,
      tableData: [],
      listQuery: {
        name: "",
        current	: 1,
        size: 10,
        // column: "create_time", //排序字段 id   title  create_time
        // asc: "true" //true升序  false降序
      },
      rolesData: [],
      idEdit: false,
      dialogFormVisible: false,
      rolesTitle: '',
      form: {
        name: '',
        descr: '',
        seq: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        descr: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
        seq: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      },
    };
  },
  mounted() {
    // this.initData(this.listQuery);
    this.getmanagerlist()
  },
  methods: {
    // 获取列表
    getmanagerlist(){
      getRoleList(this.listQuery).then(res=>{
        console.log(res,'1111111111')
        if(res.code == 0){
          this.total = res.data.total;
          this.tableData = res.data.rows;
          this.loading = false;
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.current = 1;
      this.listQuery.size = val;
      this.getmanagerlist();
    },
    handleCurrentChange(val) {
      console.log(val,'1111')
      this.listQuery.current = val;
      this.getmanagerlist()
    },
    handleFilter() {
      this.listQuery.current = 1;
      this.getmanagerlist()
    },
    // 分配权限
    handleJurisdiction(id) {
      this.$router.push({ name: "RoleEdit", query: { id: id } });
    },
    // 新增角色
    handleCreate() {
      // this.$router.push({ name: "RoleAdd" });
      console.log("11111");
      this.idEdit = true;
      this.dialogFormVisible = true;
    },
    // 提交
    submitAddroles(){
      this.$refs.rolesForm.validate((valid) => {
        if (valid) {
          if(this.idEdit){
            console.log('走新增')
            createRole(this.form).then(res=>{
              console.log(res,'11111')
              if(res.code == 0){
                this.$notify({
                  title: '成功',
                  message: '创建系统角色成功',
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getmanagerlist()
              }
            }).catch(() => {});
          }else{
            console.log('走编辑');
            updateRole(this.form).then(res=>{
              console.log(res,'11111')
              if(res.code == 0){
                this.$notify({
                  title: '成功',
                  message: '修改系统角色成功',
                  type: 'success'
                });
                this.dialogFormVisible = false;
                this.getmanagerlist()
              }
            }).catch(() => {});
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      
    },
    // 修改
    handleUpdate(row) {
      // this.$router.push({ name: "RoleEdit", query: { id: id } });
      this.idEdit = false;
      this.dialogFormVisible = true;
      this.form = { ...row}
    },
    // 删除
    handleDelete(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          const data = {
            id: id
          };
          deleteRole(data).then(res => {
            if(res.code == 0){
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              });
              this.getmanagerlist()
            }
          });
        })
        .catch(() => {});
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
.rolesForm /deep/ .el-input,.rolesForm /deep/ .el-textarea{
  width: 400px;
}
</style>
