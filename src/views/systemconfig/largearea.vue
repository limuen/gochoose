<template>
  <div class="grouping-container">
    <div class="create-button">
      <el-button type="primary" @click="handleCreate" icon="el-icon-edit" v-permission="button.largearea_largearea_addarea">添加大区</el-button>
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
        <el-table-column prop="regionName" label="大区" width="200" align="center"></el-table-column>
        <el-table-column prop="regionCharge" label="负责人" align="center"></el-table-column>
        <el-table-column prop="chargePhone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="allianceCount" label="加盟商" align="center"></el-table-column>
        <el-table-column prop="electrombileCount" label="车辆数量" align="center"></el-table-column>
        <el-table-column prop="regionAddress" label="联系地址" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" v-permission="button.largearea_largearea_edit" @click="handleedit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
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

    <!-- 新增编辑大区 -->
    <el-dialog
      :title="dialogtitle"
      width="35%"
      v-loading="loading"
      :close-on-click-modal="false"
      :before-close="cancelsubmitfotm"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" :rules="rules" ref="Form" label-width="120px">
        <el-form-item label="大区名称" prop="regionName">
          <el-input v-model="form.regionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="regionCharge">
          <el-input v-model="form.regionCharge" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="chargePhone">
          <el-input v-model="form.chargePhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="regionAddress">
          <el-input v-model="form.regionAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码">
          <el-input v-model="form.regionPassword" show-password autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="cancelsubmitfotm">取 消</el-button>
        <el-button type="primary" @click="submitform">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getlargeareaList,
  createlargearea,
  updatelargearea,
  selectByRegionId
} from "@/api/largearea";
import permission from "@/directive/permission";
export default {
  name: "grouping",
  directives: { permission },
  data() {
    return {
      button: {
        largearea_largearea_addarea: "largearea_largearea_addarea",
        largearea_largearea_edit: "largearea_largearea_edit",
      },
      loading: false,
      dialogding: false,
      tableData: [],
      total: 0,
      listQuery: {
        current: 1,
        size: 10
      },
      isEdit: false,
      dialogFormVisible: false,
      form: {
        regionName: "",
        regionCharge: "",
        chargePhone: "",
        regionAddress: "",
        regionPassword: ""
      },
      dialogtitle: "",
      rules: {
        regionName: [
          { required: true, message: "请输入大区名称", trigger: "blur" }
        ],
        regionCharge: [
          { required: true, message: "请输入大区负责人名称", trigger: "blur" }
        ],
        chargePhone: [
          { required: true, message: "请输入负责人电话", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        regionAddress: [
          { required: true, message: "请输入联系地址", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.getlarList();
  },
  methods: {
    getlarList() {
      this.loading = true;
      getlargeareaList(this.listQuery)
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
      this.getlarList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.listQuery.current = val;
      this.getlarList();
      console.log(`当前页: ${val}`);
    },
    // 新增
    handleCreate() {
      this.isEdit = false;
      this.dialogtitle = "新增大区";
      this.form.regionPassword = "";
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
        this.$refs.Form.resetFields();
      })
    },
    cancelsubmitfotm(){
      this.$refs.Form.resetFields();
      this.dialogFormVisible = false;
    },
    // 编辑
    handleedit(row) {
      this.dialogding = true;
      this.isEdit = true;
      this.dialogtitle = "编辑大区";
      this.dialogFormVisible = true;
      selectByRegionId({
        regionId:row.regionId
      }).then(res=>{
        if(res.code == 0){
          this.form = Object.assign({}, res.data)
          this.dialogding = false;
        }
      })
    },
    // 新增修改提交
    submitform() {
      if (this.isEdit) {
        console.log("编辑");
        this.$refs.Form.validate(valid => {
          if (valid) {
            updatelargearea(this.form)
              .then(res => {
                console.log(res, "新增");
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "新增大区成功",
                    type: "success"
                  });
                  this.$refs.Form.resetFields();
                  this.dialogFormVisible = false;
                  this.getlarList();
                } else {
                  this.$notify.error({
                    title: "错误",
                    message: res.message
                  });
                }
              })
              .catch(() => {});
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        console.log("新增");
        this.$refs.Form.validate(valid => {
          if (valid) {
            createlargearea(this.form)
              .then(res => {
                console.log(res, "新增");
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "新增大区成功",
                    type: "success"
                  });
                  this.$refs.Form.resetFields();
                  this.dialogFormVisible = false;
                  this.getlarList();
                } else {
                  this.$notify.error({
                    title: "错误",
                    message: res.message
                  });
                }
              })
              .catch(() => {});
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.grouping {
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
.grouping-container .search-container /deep/ .el-input {
  width: 185px;
}
</style>