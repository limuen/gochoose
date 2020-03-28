<template>
  <div class="mochaitmo-container">
    <div class="create-button">
      <el-button type="primary" @click="handleCreate" icon="el-icon-edit">新增运维员</el-button>
    </div>
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
            <el-select
              v-model="listQuery.allianceId"
              clearable
              @change="getdutyList"
              placeholder="请选择加盟商"
            >
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
            <span>责任区域</span>
            <el-select clearable v-model="listQuery.areaId" placeholder="请选择责任区域">
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.regionName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>姓名</span>
            <el-input v-model="listQuery.operationName" clearable placeholder="请输入姓名"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>电话</span>
            <el-input v-model="listQuery.operationPhone" clearable placeholder="请输入电话"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="handleFilter">查询</el-button>
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
        v-loading="loading"
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="operationName" label="联系人" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.headImage" alt style="width:120px;height:auto;" />
            <div>{{scope.row.operationName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="operationPhone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="roleModelList" label="运维角色" align="center">
          <template slot-scope="scope">
            <el-tag
              style="margin-right:5px;"
              v-for="item in scope.row.roleModelList"
              :key="item.index"
              effect="dark"
              :type=" item.roleName | roleName"
            >{{item.roleName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="派单状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 0">
              {{scope.row.allocationStartTime.substring(scope.row.allocationStartTime.lastIndexOf(' ')+1)}}
              -
              {{scope.row.allocationEndTime.substring(scope.row.allocationEndTime.lastIndexOf(' ')+1)}}
            </div>
            <div v-else>{{scope.row.status | status}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="dutyModelList" label="责任区域" align="center">
          <template slot-scope="scope">
            <div
              v-for="(item,index) in scope.row.dutyModelList"
              :key="item.index"
            >{{index+1}}-{{item.areaName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="allianceName" label="所属加盟商" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleedit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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

    <!-- 新增编辑运维 -->
    <el-dialog
      :title="dialogtitle"
      width="30%"
      :close-on-click-modal="false"
      :before-close="cancelsubmitfotm"
      :visible.sync="dialogFormVisible"
      v-loading="dialogding"
    >
      <el-form :model="form" class="form" ref="form" label-width="120px" :rules="rules">
        <el-form-item label="大区" prop="regionId">
          <el-select
            v-model="form.regionId"
            ref="reginoName"
            @change="allianValuedialog"
            placeholder="请选择大区"
          >
            <el-option
              v-for="item in AllianOptionsDialog"
              :key="item.regionId"
              :label="item.regionName"
              :value="item.regionId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加盟商" prop="allianceId">
          <el-select
            v-model="form.allianceId"
            ref="allianceName"
            @change="getdutyListDialog"
            placeholder="请选择加盟商"
          >
            <el-option
              v-for="item in allianceOptionsDialog"
              :key="item.allianceId"
              :label="item.allianceName"
              :value="item.allianceId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="责任区域" prop="dutyModelList2">
          <el-select
            v-model="form.dutyModelList2"
            ref="dutyObj"
            @change="changeDutyName"
            multiple
            placeholder="请选择责任区域"
          >
            <el-option
              v-for="(item,index) in bilityOptions"
              :key="index"
              :label="item.regionName"
              :value="index"
            ></el-option>
          </el-select>
          <!-- <i class="el-icon-refresh"></i> -->
        </el-form-item>
        <el-form-item label="运维角色" prop="roleModelList2">
          <el-checkbox-group v-model="form.roleModelList2" @change="handlechangecheck">
            <el-checkbox
              v-for="(item,index) in roleModelList"
              :label="index"
              :key="index"
            >{{item.roleName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="开启派单" prop="sendorderStatus">
          <el-radio-group v-model="form.sendorderStatus" >
            <el-radio :label="0" border>开启</el-radio>
            <el-radio :label="1" border>关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="派单时间" class="item-datepick" required>
          <el-col :span="7">
            <el-form-item prop="allocationStartTime">
              <el-time-picker
                placeholder="选择时间"
                value-format="HH:mm:ss"
                style="width:151px"
                v-model="form.allocationStartTime"
              ></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" style="text-align:center;" :span="2">-</el-col>
          <el-col :span="6">
            <el-form-item prop="allocationEndTime">
              <el-time-picker
                placeholder="选择时间"
                value-format="HH:mm:ss"
                style="width:151px"
                v-model="form.allocationEndTime"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="联系人" prop="operationName">
          <el-input v-model="form.operationName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="operationPhone">
          <el-input v-model="form.operationPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="headImage">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            :headers="headerToken"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :data="imgdata"
            name="files"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="登陆密码">
          <el-input v-model="form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitform">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth"; // get token from cookie
import { allRegion, allianceListByRegionId } from "@/api/region";
import {
  queryManagerListPage,
  createmochaitmo,
  allRole,
  selectByOperationId,
  updatemochaitmo,
  deleteById
} from "@/api/mochaitmo";
import { findByLargeFranchisee } from "@/api/responsibility";
export default {
  name: "mochaitmo",
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      areaOptions: [], // 责任区域
      AllianOptionsDialog: [], // 查询大区
      allianceOptionsDialog: [], // 加盟商
      bilityOptions: [], //弹窗责任区域多选
      roleModelList: [], //运维角色多选
      listQuery: {
        regionId: "",
        allianceId: "",
        areaId: "",
        operationName: "",
        operationPhone: "",
        current: 1,
        size: 10
      },
      isEdit: false,
      total: 0,
      loading: false,
      tableData: [],
      dialogding: false,
      dialogFormVisible: false,
      indexs: [],
      indexchecks: [],
      form: {
        regionId: "",
        regionName: "",
        allianceId: "",
        allianceName: "",
        dutyModelList: [],
        dutyModelList2: [],
        roleModelList: [],
        roleModelList2: [],
        operationName: "",
        operationPhone: "",
        headImage: "",
        password: "",
        sendorderStatus: "",
        allocationStartTime: "",
        allocationEndTime: ""
      },
      rules: {
        regionId: [
          { required: true, message: "请选择大区", trigger: "change" }
        ],
        allianceId: [
          { required: true, message: "请选择加盟商", trigger: "change" }
        ],
        dutyModelList2: [
          { required: true, message: "请选择责任区域", trigger: "change" }
        ],
        operationName: [
          { required: true, message: "请输入负责人", trigger: "blur" }
        ],
        operationPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        headImage: [
          { required: true, message: "请选择上传头像", trigger: "change" }
        ],
        sendorderStatus: [
          { required: true, message: "请选择开启派单", trigger: "change" }
        ],
        allocationStartTime: [
          { required: true, message: "请选择派单开启时间", trigger: "change" }
        ],
        allocationEndTime: [
          { required: true, message: "请选择派单结束时间", trigger: "change" }
        ],
        roleModelList2: [
          { required: true, message: "请选择系统角色", trigger: "change" }
        ]
      },
      serverUrl: "/api/upload/oss", //上传地址
      headerToken: {
        Admin_Token: getToken()
      },
      imageUrl: "",
      imgdata: {
        type: "image"
      },
      dialogtitle: ""
    };
  },
  mounted() {
    // 查询大区
    this.getallianList();
    this.getallianListDialog();
    // 获取列表
    this.getList();
    // 查询所有运维员角色
    this.getallRole();
  },
  filters: {
    roleName(name) {
      const roleMap = {
        维修员: "danger",
        调度员: "warning",
        找车员: "info",
        换电员: "success"
      };
      return roleMap[name];
    },
    status(key) {
      const statusMap = {
        1: "关闭"
      };
      return statusMap[key];
    }
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
    getallianListDialog() {
      allRegion()
        .then(res => {
          if (res.code == 0) {
            this.AllianOptionsDialog = res.data;
          }
        })
        .catch(() => {});
    },
    // 查询所有运维员角色
    async getallRole() {
      await allRole().then(res => {
        if (res.code == 0) {
          this.roleModelList = res.data;
        }
      });
    },

    // 获取到大区的id去请求加盟商
    allianValue(value) {
      this.listQuery.allianceId = "";
      this.listQuery.areaId = "";
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptions = res.data;
          }
        })
        .catch(() => {});
    },
    // 通过大区id和加盟商id获取责任区域
    getdutyList(value) {
      this.listQuery.areaId = "";
      findByLargeFranchisee({
        largeAreaId: this.listQuery.regionId,
        franchiseeId: value
      })
        .then(res => {
          if (res.code == 0) {
            this.areaOptions = res.data;
          }
        })
        .catch(() => {});
    },

    // 获取列表
    getList() {
      this.loading = true;
      queryManagerListPage(this.listQuery)
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
    },
    cancelsubmitfotm() {
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
      this.dialogFormVisible = false;
    },
    handleCreate() {
      this.dialogFormVisible = true;
      this.isEdit = false;
      this.dialogtitle = "新增运维员";
      this.allianceOptionsDialog = [];
      this.bilityOptions = [];
      delete this.form.operationId;
      this.imageUrl = "";
      this.form.password = "";
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
      console.log(this.form, "11111111111");
    },
    // 编辑
    handleedit(row) {
      this.dialogtitle = "修改运维员工";
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.dialogding = true;
      selectByOperationId({
        operationId: row.operationId
      }).then(res => {
        console.log(res, "通过id查询");
        if (res.code == 0) {
          this.imageUrl = res.data.headImage;
          // 获取加盟商
          allianceListByRegionId({ regionId: res.data.regionId }).then(res => {
            if (res.code == 0) {
              this.allianceOptionsDialog = res.data;
            }
          });
          // 大区id和加盟商id获取责任区域
          findByLargeFranchisee({
            largeAreaId: res.data.regionId,
            franchiseeId: res.data.allianceId
          }).then(res => {
            if (res.code == 0) {
              this.bilityOptions = res.data;
            }
          });
          this.indexs = [];
          res.data.dutyModelList.forEach((item, index) => {
            this.indexs.push(index);
          });
          this.indexchecks = [];
          res.data.roleModelList.forEach((item, index) => {
            this.indexchecks.push(index);
          });
          this.form = Object.assign(this.form, res.data);
          this.form.dutyModelList2 = this.indexs;
          this.form.dutyModelList = [];
          this.form.roleModelList2 = this.indexchecks;
          this.form.roleModelList = [];
          this.dialogding = false;
        }
      });
    },
    allianValuedialog(value) {
      this.$nextTick(() => {
        this.form.regionName = this.$refs.reginoName.selectedLabel;
      });
      this.bilityOptions = []
      this.form.allianceId = "";
      this.form.dutyModelList = [];
      this.form.dutyModelList2 = [];
      allianceListByRegionId({ regionId: value })
        .then(res => {
          console.log(res, "1111111111");
          if (res.code == 0) {
            this.allianceOptionsDialog = res.data;
          }
        })
        .catch(() => {});
    },
    // 通过大区id和加盟商id获取责任区域
    getdutyListDialog(value) {
      this.$nextTick(() => {
        this.form.allianceName = this.$refs.allianceName.selectedLabel;
      });
      this.form.dutyModelList = [];
      this.form.dutyModelList2 = [];
      findByLargeFranchisee({
        largeAreaId: this.form.regionId,
        franchiseeId: value
      })
        .then(res => {
          console.log(res, "111111111");
          if (res.code == 0) {
            this.bilityOptions = res.data;
          }
        })
        .catch(() => {});
    },
    // 责任区域id和name存起来
    changeDutyName(index) {
      this.indexs = [];
      this.$nextTick(() => {
        this.indexs = index;
      });
    },
    handleAvatarSuccess(res, files) {
      console.log(res, files, "上传成功");
      this.imageUrl = res.images[0];
      this.form.headImage = this.imageUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size < 500 * 1024;
      if (!isJPG && !isPNG) {
        this.$message.error("上传图标只能是 JPG格式 或者 PNG格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图标大小不能超过 500KB!");
      }
      return (isJPG || isPNG) && isLt2M;
    },
    handlechangecheck(index) {
      console.log(index, "11111");
      this.indexchecks = [];
      this.$nextTick(() => {
        this.indexchecks = index;
      });
    },
    // 表格删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteById({ operationId: row.operationId }).then(res => {
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 提交
    submitform() {
      if (this.isEdit) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.form.dutyModelList = [];
            this.form.roleModelList = [];
            this.indexs.forEach(index => {
              const areaId = this.bilityOptions[index];
              this.form.dutyModelList.push({
                areaId: areaId.id,
                areaName: areaId.regionName
              });
            });
            this.indexchecks.forEach(index => {
              const roleModel = this.roleModelList[index];
              this.form.roleModelList.push({
                roleId: roleModel.roleId,
                roleName: roleModel.roleName
              });
            });
            updatemochaitmo(this.form)
              .then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success"
                  });
                  this.getList();
                  this.form.password = "";
                  this.form.dutyModelList = [];
                  this.form.roleModelList = [];
                  this.dialogFormVisible = false;
                }
              })
              .catch(() => {});
          } else {
            return false;
          }
        });
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.form.dutyModelList = [];
            this.form.roleModelList = [];
            this.indexs.forEach(index => {
              const areaId = this.bilityOptions[index];
              this.form.dutyModelList.push({
                areaId: areaId.id,
                areaName: areaId.regionName
              });
            });
            this.indexchecks.forEach(index => {
              const roleModel = this.roleModelList[index];
              this.form.roleModelList.push({
                roleId: roleModel.roleId,
                roleName: roleModel.roleName
              });
            });
            createmochaitmo(this.form)
              .then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "创建成功",
                    type: "success"
                  });
                  this.getList();
                  this.form.password = "";
                  this.form.dutyModelList = [];
                  this.form.roleModelList = [];
                  this.dialogFormVisible = false;
                }
              })
              .catch(() => {});
          } else {
            return false;
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mochaitmo {
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
.mochaitmo-container .search-container /deep/ .el-input {
  width: 200px;
}
.mochaitmo-container .form /deep/ .el-input {
  width: 350px;
}
.form /deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 80px;
  height: 80px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
}
.form .item-datepick /deep/ .el-input {
  width: 173px;
}
</style>