<template>
  <div class="share-container">
    <div class="create-button">
      <el-button type="primary" @click="handleCreate" icon="el-icon-edit">添加新分享</el-button>
    </div>
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
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
            <span>活动名称</span>
            <el-input v-model="listQuery.activityName" placeholder="请输入活动名称"></el-input>
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
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loading"
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="allianceName" label="加盟商" align="center"></el-table-column>
        <el-table-column prop="车辆编号" label="创建人" align="center"></el-table-column>
        <el-table-column prop="activityName" label="活动名称" align="center"></el-table-column>
        <el-table-column prop="activityStatus" label="活动状态" align="center"></el-table-column>
        <el-table-column prop="shareMomey" label="面额" align="center"></el-table-column>
        <el-table-column prop="getNumber" label="可领取数量" align="center"></el-table-column>
        <el-table-column prop="shareType" label="分享类型" align="center"></el-table-column>
        <el-table-column prop="shareTotal" label="发行总数量" align="center"></el-table-column>
        <el-table-column prop="remainNumber" label="已领取数量" align="center"></el-table-column>
        <el-table-column prop="useNumber" label="已使用数量" align="center"></el-table-column>
        <el-table-column prop="activityStartTime" label="活动开始日期" width="200" align="center"></el-table-column>
        <el-table-column prop="activityEndTime" label="活动结束日期" width="200" align="center"></el-table-column>
        <el-table-column prop="auditName" label="审核人" align="center"></el-table-column>
        <el-table-column prop="评分" label="申请日期" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="400" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleStatus(scope.row.shareId,1,'申请')">申请</el-button>
            <el-button type="primary" size="mini" @click="handleexamine(scope.row.shareId)">审核</el-button>
            <el-button type="primary" size="mini" @click="handleStatus(scope.row.shareId,3,'启用')">启用</el-button>
            <el-button type="warning" size="mini" @click="handleStatus(scope.row.shareId,4,'停止')">停止</el-button>
            <el-button type="primary" size="mini" @click="handleedit(scope.row)">编辑</el-button>
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

    <!-- 添加修改新分享 -->
    <el-dialog :title="dialogtitle" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="form" ref="form" :rules="rules" label-width="120px">
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
        <el-form-item label="活动名称" prop="activityName">
          <el-input v-model="form.activityName" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="默认开启" prop="isDefaultOpen">
          <el-select v-model="form.isDefaultOpen" placeholder="请选择大区">
            <el-option label="是" :value="0"></el-option>
            <el-option label="否" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分享类型" prop="shareType">
          <el-radio-group v-model="form.shareType">
            <el-radio :label="0" border>行程分享</el-radio>
            <el-radio :label="1" border>邀请好友</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="券金额" prop="shareMomey">
          <el-input placeholder="请输入券金额" v-number="2" v-model="form.shareMomey">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="发行总量" prop="shareTotal">
          <el-input placeholder="请输入发行总量" type="number" v-number="0" v-model="form.shareTotal">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item label="券有效期" prop="termValidity">
          <el-input placeholder="请输入券有效期" v-number="0" v-model="form.termValidity">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="可领数量" prop="getNumber">
          <el-input placeholder="请输入可领数量" v-number="0" v-model="form.getNumber">
            <template slot="append">张/人</template>
          </el-input>
        </el-form-item>
        <el-form-item label="活动日期" required>
          <el-col :span="9.5">
            <el-form-item prop="activityStartTime">
              <el-date-picker
                placeholder="选择时间"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.activityStartTime"
                style="width: 210px;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" style="text-align:center;" :span="2">-</el-col>
          <el-col :span="7">
            <el-form-item prop="activityEndTime">
              <el-date-picker
                placeholder="选择时间"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.activityEndTime"
                style="width: 210px;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="活动申请" prop="applyTime" v-if="!this.isEdit">
          <el-radio-group v-model="form.applyTime">
            <el-radio :label="1" border>立即申请</el-radio>
            <el-radio :label="2" border>稍后申请</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分享图片" prop="sharePicture">
          <el-upload
            ref="uploader"
            :action="serverUrl"
            :headers="headerToken"
            :class="photoList.length > 0 ?'hide-upload':'show-upload'"
            :data="imgdata"
            list-type="picture-card"
            :file-list="photoList"
            :on-preview="photoPreview"
            :on-remove="photoRemove"
            :on-change="photoChange"
            :before-upload="beforeUploadImg"
            :on-success="handleAvatarSuccess"
            accept="image/jpeg, image/jpg, image/png"
            name="files"
          >
            <i class="el-icon-plus"></i>
            <p class="upload-text">上传图片</p>
          </el-upload>
        </el-form-item>
        <el-form-item label="分享内容">
          <el-input type="textarea" :rows="3" placeholder="请输入分享内容" v-model="form.shareContent"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitform">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="预览图片" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth"; // get token from cookie
import { allRegion, allianceListByRegionId } from "@/api/region";
import {
  ShareListPage,
  ShareByStatus,
  insertShare,
  SharefindById,
  Shareupdate
} from "@/api/activity";
export default {
  name: "share",
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      AllianOptionsDialog: [], // 查询大区
      allianceOptionsDialog: [], // 加盟商
      listQuery: {
        regionId: "",
        allianceId: "",
        activityName: "",
        current: 1,
        size: 10
      },
      isEdit: false,
      total: 0,
      loading: false,
      tableData: [],
      form: {
        regionId: "",
        regionName: "",
        allianceId: "",
        allianceName: "",
        activityName: "",
        isDefaultOpen: 0,
        shareType: "",
        shareMomey: "",
        shareTotal: "",
        termValidity: "",
        getNumber: "",
        activityStartTime: "",
        activityEndTime: "",
        applyTime: "",
        sharePicture: "",
        shareContent: ""
      },
      rules: {
        regionId: [
          { required: true, message: "请选择大区", trigger: "change" }
        ],
        allianceId: [
          { required: true, message: "请选择加盟商", trigger: "change" }
        ],
        activityName: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        isDefaultOpen: [
          { required: true, message: "请选择是否默认开启", trigger: "change" }
        ],
        shareType: [
          { required: true, message: "请选择分享类型", trigger: "change" }
        ],
        shareMomey: [
          { required: true, message: "请输入券金额", trigger: "blur" }
        ],
        shareTotal: [
          { required: true, message: "请输入发行总量", trigger: "blur" }
        ],
        termValidity: [
          { required: true, message: "请输入有效期", trigger: "blur" }
        ],
        getNumber: [
          { required: true, message: "请输入可领取数量", trigger: "blur" }
        ],
        activityStartTime: [
          { required: true, message: "请选择开启时间", trigger: "change" }
        ],
        activityEndTime: [
          { required: true, message: "请选择结束时间", trigger: "change" }
        ],
        applyTime: [
          { required: true, message: "请选择活动申请", trigger: "change" }
        ],
        sharePicture: [
          { required: true, message: "请上传分享图片", trigger: "change" }
        ]
      },
      dialogFormVisible: false,
      dialogtitle: "",
      photoList: [],
      serverUrl: "/api/upload/oss", //上传地址
      headerToken: {
        Admin_Token: getToken()
      },
      imgdata: {
        type: "image"
      },
      dialogVisible: false,
      dialogImageUrl: ""
    };
  },
  mounted() {
    // 查询大区
    this.getallianList();
    this.getallianListDialog();
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
      this.form.allianceId = "";
      allianceListByRegionId({ regionId: value })
        .then(res => {
          console.log(res, "1111111111");
          if (res.code == 0) {
            this.allianceOptionsDialog = res.data;
          }
        })
        .catch(() => {});
    },
    getdutyListDialog(value) {
      this.$nextTick(() => {
        this.form.allianceName = this.$refs.allianceName.selectedLabel;
      });
    },
    // 获取列表
    getList() {
      this.loading = true;
      ShareListPage(this.listQuery)
        .then(res => {
          console.log(res, "res");
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
    // 新增分享
    handleCreate() {
      this.dialogtitle = "新增分享活动";
      this.dialogFormVisible = true;
      this.isEdit = false;
      this.photoList = [];
      this.form.sharePicture = "";
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    handleStatus(newId, status, name) {
      this.$confirm(`是否${name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ShareByStatus({ newId, status })
            .then(res => {
              // this.getList();
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: `${name}成功!`
                });
                this.getList();
              }
            })
            .catch(() => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消${name}`
          });
        });
    },
    // 审核
    handleexamine(discountId) {
      let status;
      this.$confirm(`是否审核通过`, "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "通过",
        cancelButtonText: "不通过",
        type: "warning"
      })
        .then(() => {
          status = 3;
          ShareByStatus({ discountId, status })
            .then(res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: `审核通过成功!`
                });
                this.getList();
              }
            })
            .catch(() => {});
        })
        .catch(action => {
          if (action == "cancel") {
            status = 7;
            ShareByStatus({ discountId, status })
              .then(res => {
                if (res.code == 0) {
                  this.$message({
                    type: "warning",
                    message: `审核不通过!`
                  });
                  this.getList();
                }
              })
              .catch(() => {});
          } else {
            this.$message("取消审核");
          }
        });
    },
    photoPreview(file) {
      console.log(file, "file");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    photoRemove(file, fileList) {
      this.form.sharePicture = "";
      this.photoList = [];
    },
    photoChange(file, fileList) {
      const arr = fileList.slice(-1);
      this.photoList = arr;
    },
    beforeUploadImg(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (["image/jpeg", "image/jpg", "image/png"].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的图片格式");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过1MB!");
        return false;
      }
    },
    handleAvatarSuccess(res, files) {
      console.log(res, files, "上传成功");
      this.dialogImageUrl = res.images[0];
      this.form.sharePicture = this.dialogImageUrl;
    },
    handleedit(row) {
      this.dialogtitle = "修改分享活动";
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.photoList = [];
      this.form.sharePicture = "";
      SharefindById({
        id: row.shareId
      }).then(res => {
        console.log(res, "通过id查询");
        if (res.code == 0) {
          allianceListByRegionId({ regionId: res.data.regionId })
            .then(resp => {
              if (resp.code == 0) {
                this.allianceOptionsDialog = resp.data;
              }
            })
            .catch(() => {});
          if (res.data.sharePicture) {
            let name = res.data.sharePicture.substring(
              res.data.sharePicture.lastIndexOf("/") + 1
            );
            this.photoList = [{ name, url: res.data.sharePicture }];
          }
          this.form = Object.assign(this.form, res.data);
        }
      });
    },
    // 提交
    submitform() {
      if (this.isEdit) {
        this.$refs.form.validate(valid => {
          if (valid) {
            Shareupdate(this.form)
              .then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success"
                  });
                  this.getList();
                  this.form.shareContent = "";
                  this.photoList = [];
                  this.form.sharePicture = "";
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
            insertShare(this.form)
              .then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "创建成功",
                    type: "success"
                  });
                  this.getList();
                  this.form.shareContent = "";
                  this.photoList = [];
                  this.form.sharePicture = "";
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
.share {
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
.share-container .search-container /deep/ .el-input {
  width: 230px;
}
.share-container .form /deep/ .el-input,
.el-textarea {
  width: 350px;
}
.share-container /deep/ .el-dialog {
  margin: 0 auto 50px;
}
.hide-upload /deep/ .el-upload--picture-card {
  display: none;
  width: 343px;
  height: 150px;
  line-height: 150px;
}
.show-upload /deep/ .el-upload--picture-card {
  display: block;
  width: 343px;
  height: 150px;
  line-height: 150px;
}
.upload-text {
  position: relative;
  top: -130px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item {
  width: 343px;
  height: 150px;
}
</style>