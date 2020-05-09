<template>
  <div class="region-container">
    <div class="create-button">
      <el-button
        type="primary"
        @click="handleCreate"
        icon="el-icon-edit"
        v-permission="button.region_region_add"
      >新增区域管理</el-button>
    </div>
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select
              v-model="listQuery.regionId"
              @change="allianValue"
              clearable
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
        <el-col :span="5">
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
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>负责人</span>
            <el-input v-model="listQuery.manageName" clearable placeholder="请输入负责人"></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>电话</span>
            <el-input v-model="listQuery.managePhone" clearable placeholder="请输入电话"></el-input>
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
          <el-table-column prop="manageName" label="负责人" align="center"></el-table-column>
          <el-table-column prop="managePhone" label="联系电话" align="center"></el-table-column>
          <el-table-column prop="dutyList" label="责任区域" align="center">
            <template slot-scope="scope">
              <div
                v-for="(item,index) in scope.row.dutyList"
                :key="item.index"
              >{{index+1}}-{{item.areaName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="allianceName" label="所属加盟商" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                v-permission="button.region_region_edit"
                @click="handleedit(scope.row)"
              >编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                v-permission="button.region_region_delete"
                @click="handleDelete(scope.row)"
              >删除</el-button>
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
    </div>

    <!-- 新增修改区域管理 -->
    <el-dialog
      :title="dialogtitle"
      width="30%"
      v-loading="dialogding"
      :close-on-click-modal="false"
      :before-close="cancelsubmitfotm"
      :visible.sync="dialogFormVisible"
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
            @change="getdutyList"
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
        <el-form-item label="责任区域" prop="dutyList2">
          <el-select
            v-model="form.dutyList2"
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
        <el-form-item label="联系人" prop="manageName">
          <el-input v-model="form.manageName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="managePhone">
          <el-input v-model="form.managePhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" class="addredss-select" prop="county">
          <el-select
            v-model="form.province"
            placeholder="请选择省"
            clearable
            @change="handleChooseProvincesRadio"
          >
            <el-option
              v-for="item in provinceOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.city"
            placeholder="请选择市"
            clearable
            @change="handleChoosecityRadio"
          >
            <el-option
              v-for="item in cityOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
          <el-select v-model="form.county" placeholder="请选择区" clearable>
            <el-option
              v-for="item in areaOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码">
          <el-input v-model="form.password" show-password autocomplete="off"></el-input>
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
import { queryByCode } from "@/api/publicapi";
import { findByLargeFranchisee } from "@/api/responsibility";
import {
  allRegion,
  allianceListByRegionId,
  queryManagerListPage,
  createarea,
  updatearea,
  selectByAreaManageId,
  deleteById
} from "@/api/region";
import permission from "@/directive/permission";
export default {
  name: "region",
  directives: { permission },
  data() {
    return {
      button: {
        region_region_add: "region_region_add",
        region_region_edit: "region_region_edit",
        region_region_delete: "region_region_delete"
      },
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      AllianOptionsDialog: [], // 查询大区
      allianceOptionsDialog: [], // 加盟商
      provinceOptions: [], // 省
      cityOptions: [], // 市
      areaOptions: [], // 县
      bilityOptions: [], //责任区域
      isEdit: false,
      loading: false,
      listQuery: {
        regionId: "",
        allianceId: "",
        manageName: "",
        managePhone: "",
        current: 1,
        size: 10
      },
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      indexs: [],
      form: {
        regionId: "",
        regionName: "",
        allianceId: "",
        allianceName: "",
        dutyList: [],
        dutyList2: [],
        manageName: "",
        managePhone: "",
        province: "",
        city: "",
        county: "",
        address: "",
        password: ""
      },
      rules: {
        regionId: [
          { required: true, message: "请选择大区", trigger: "change" }
        ],
        allianceId: [
          { required: true, message: "请选择加盟商", trigger: "change" }
        ],
        dutyList2: [
          { required: true, message: "请选择责任区域", trigger: "change" }
        ],
        manageName: [
          { required: true, message: "请输入负责人", trigger: "blur" }
        ],
        managePhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        county: [
          { required: true, message: "请选择联系地址", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      dialogtitle: "",
      dialogding: false
    };
  },
  mounted() {
    // 查询大区下的加盟商（搜索下拉用）
    this.getallianList();
    this.getallianListDialog();
    // 获取列表
    this.getList();
    // 获取城市
    this.getprovinces();
  },
  methods: {
    // 查询大区下的加盟商（搜索下拉用）
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
    allianValuedialog(value) {
      this.$nextTick(() => {
        this.form.regionName = this.$refs.reginoName.selectedLabel;
      });
      this.bilityOptions = [];
      this.form.allianceId = "";
      this.form.dutyList = [];
      this.form.dutyList2 = [];
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
    getdutyList(value) {
      this.$nextTick(() => {
        this.form.allianceName = this.$refs.allianceName.selectedLabel;
      });
      this.form.dutyList = [];
      this.form.dutyList2 = [];
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
    // 获取列表
    getList() {
      this.loading = true;
      queryManagerListPage(this.listQuery).then(res => {
        if (res.code == 0) {
          this.total = res.data.total;
          this.tableData = res.data.rows;
          this.loading = false;
        }
      });
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
      this.isEdit = false;
      this.dialogtitle = "新增区域管理";
      this.dialogFormVisible = true;
      this.allianceOptionsDialog = [];
      this.bilityOptions = [];
      this.form.regionName = "";
      this.form.allianceName = "";
      this.form.province = "";
      this.form.city = "";
      this.form.manageId = "";
      this.form.password = "";
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    // 编辑
    handleedit(row) {
      this.dialogtitle = "修改区域管理";
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.dialogding = true;
      selectByAreaManageId({
        areaManageId: row.manageId
      }).then(res => {
        console.log(res, "通过id查询");
        if (res.code == 0) {
          res.data.province = parseInt(res.data.province);
          res.data.city = parseInt(res.data.city);
          res.data.county = parseInt(res.data.county);
          this.getProvincesList({ parent: res.data.province }, "cityOptions");
          this.getProvincesList({ parent: res.data.city }, "areaOptions");
          // 获取加盟尚
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
          res.data.dutyList.forEach((item, index) => {
            this.indexs.push(index);
          });
          this.form = Object.assign(this.form, res.data);
          this.form.dutyList2 = this.indexs;
          this.form.dutyList = [];
          this.dialogding = false;
        }
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
          deleteById({ manageId: row.manageId }).then(res => {
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
    // 新增地址
    getProvincesList({ parent: params }, name) {
      queryByCode({ parent: params }).then(res => {
        if (res.code == 0) {
          if (this[name]) {
            this[name] = res.data;
          }
        }
      });
    },
    // 获取省
    getprovinces() {
      this.getProvincesList({ parent: 0 }, "provinceOptions");
    },
    // 根据省获取市
    handleChooseProvincesRadio(v) {
      this.form.city = "";
      this.form.county = "";
      this.getProvincesList({ parent: v }, "cityOptions");
    },
    // 根据市区获取县
    handleChoosecityRadio(v) {
      this.form.county = "";
      this.getProvincesList({ parent: v }, "areaOptions");
    },
    submitform() {
      if (this.isEdit) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.form.dutyList = [];
            this.indexs.forEach(index => {
              const areaId = this.bilityOptions[index];
              this.form.dutyList.push({
                areaId: areaId.id,
                areaName: areaId.regionName
              });
            });
            updatearea(this.form)
              .then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success"
                  });
                  this.getList();
                  this.form.password = "";
                  this.form.dutyList = [];
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
            this.form.dutyList = [];
            this.indexs.forEach(index => {
              const areaId = this.bilityOptions[index];
              this.form.dutyList.push({
                areaId: areaId.id,
                areaName: areaId.regionName
              });
            });
            createarea(this.form)
              .then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "创建成功",
                    type: "success"
                  });
                  this.getList();
                  this.form.password = "";
                  this.form.dutyList = [];
                  this.dialogFormVisible = false;
                  console.log(this.form, "提交完成的form");
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
.region {
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
    i {
      cursor: pointer;
      font-size: 18px;
      margin-left: 15px;
      &:hover {
        color: #5cb6ff;
      }
    }
    .page-excel {
      display: flex;
      justify-content: space-between;
    }
  }
}
.region-container .search-container /deep/ .el-input {
  width: 200px;
}
.region-container .addredss-select /deep/ .el-select > .el-input {
  width: 160px;
}
.region-container .form /deep/ .el-input {
  width: 350px;
}
</style>