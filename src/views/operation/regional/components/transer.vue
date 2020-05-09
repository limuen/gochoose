<template>
  <div class="sibility-container">
    <div class="create-button">
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate">添加停车点</el-button>
    </div>
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select
              v-model="listQuery.largeAreaId"
              clearable
              placeholder="请选择大区"
              @change="allianValue"
              @clear="clearValue"
            >
              <el-option
                v-for="item in AllianOptions"
                :key="item.regionId"
                :label="item.regionName"
                :value="item.regionId"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>加盟商</span>
            <el-select v-model="listQuery.franchiseeId" placeholder="请选择加盟商">
              <el-option
                v-for="item in allianceOptions"
                :key="item.allianceId"
                :label="item.allianceName"
                :value="item.allianceId"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>区域名称</span>
            <el-input v-model="listQuery.regionName" placeholder="请输入区域名称" />
          </div>
        </el-col>
        <el-col :span="6">
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
          <el-table-column type="index" width="50" />
          <el-table-column prop="parkCode" label="停车点编号" align="center" />
          <el-table-column prop="parkName" label="停车点名称" align="center" />
          <el-table-column prop="operateName" label="运营区域" align="center" />
          <el-table-column prop="franchiseeName" label="加盟商" align="center" />
          <el-table-column prop="largeAreaName" label="大区" align="center" />
          <el-table-column label="操作" align="center" width="250" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="tapEdit(scope.row)">编辑</el-button>
              <el-button type="primary" size="mini" @click="tapArea(scope.row)">区域</el-button>
              <el-button
                v-if="scope.row.available==0"
                type="primary"
                size="mini"
                @click="tapDisable(scope.row)"
              >已启用</el-button>
              <el-button
                v-if="scope.row.available>0"
                type="primary"
                size="mini"
                @click="tapDisable(scope.row)"
              >已禁用</el-button>
              <!-- <el-button
              v-if="scope.row.available==2"
              type="primary"
              size="mini"
              @click="tapDisable(scope.row)"
            >已启用</el-button>
            <el-button
              v-if="scope.row.available==3"
              type="primary"
              size="mini"
              @click="tapDisable(scope.row)"
              >已禁用</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-container">
        <el-pagination
          background
          align="left"
          :current-page.sync="listQuery.current"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <!-- 添加修改停车点 -->
    <el-dialog
      v-if="dialogFormVisible"
      :title="dialogtitle"
      class="transerform"
      :visible.sync="dialogForm"
    >
      <el-row :gutter="24">
        <el-form ref="form" :model="form" :rules="rules">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="大区" :label-width="formLabelWidth" prop="largeAreaId">
                <el-select v-model="form.largeAreaId" placeholder="请选择大区" @change="formallianValue">
                  <el-option
                    v-for="item in AllianOptions"
                    :key="item.regionId"
                    :label="item.regionName"
                    :value="item.regionId"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="加盟商" :label-width="formLabelWidth" prop="franchiseeId">
                <el-select
                  v-model="form.franchiseeId"
                  placeholder="请选择加盟商"
                  @change="changeFranchisee(form.largeAreaId,form.franchiseeId)"
                >
                  <el-option
                    v-for="item in formallianceOptions"
                    :key="item.allianceId"
                    :label="item.allianceName"
                    :value="item.allianceId"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="运营区域" :label-width="formLabelWidth" prop="operateId">
                <el-select
                  v-model="form.operateId"
                  placeholder="请选择运营区域"
                  @change="changeOperate(form.operateId)"
                >
                  <el-option
                    v-for="item in franchiseeAreaOptions"
                    :key="item.id"
                    :label="item.regionName"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="调度费" :label-width="formLabelWidth" prop="dispatchFee">
                <el-input v-model="form.dispatchFee" autocomplete="off" type="number" />
              </el-form-item>
            </div>
          </el-col>
          <el-col v-if="dialogtitle == '编辑停车点'" :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="停车点编号" :label-width="formLabelWidth">
                <el-input v-model="form.parkCode" disabled autocomplete="off" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="车辆点名称" :label-width="formLabelWidth" prop="parkName">
                <el-input v-model="form.parkName" autocomplete="off" />
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="区域配置说明：" class="bg-size-color" :label-width="formLabelWidth">
                <ol>
                  <li>停车点必须设置在红色运营区域内,创建时最多只能创建4个点，形成一个方形，停车“P”标在显示时处在所画停车位的中心点。</li>
                  <li>受制于车辆GPS位置精度，停车位要稍大点，否则可能造成用户到达了指定位置却无法还车。用户在停车点外还车会产生调度费</li>
                </ol>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item :label-width="formLabelWidth">
                <div class="gdmap">
                  <component
                    :is="componentName"
                    ref="MapRegion"
                    v-loading="mapLading"
                    parking-point
                    :tabsactive="false"
                    :is-edit="true"
                    @markerRegion="markerRegion"
                  />
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="tapSave">保 存</el-button>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
        align="left"
        style="margin-top:20px;padding:0px 15px;"
      >
        说明:
        责任区域，本加盟商其它区域的车辆如果进入此区域，运维消息会推送给对应的运维员与此区域管理员APP。
      </div>
    </el-dialog>

    <OpearteModelList v-if="dialogtitle=='运营区域'" ref="OpearteModelList" :dialogtitle="dialogtitle" />
  </div>
</template>

<script>
import { allRegion, allianceListByRegionId } from "@/api/region";
import {
  findById,
  parkSpotdutyParkQueryManagerListPage,
  parkSpotdutyParkFindById,
  parkSpotdutyParkInsert,
  parkSpotdutyParkUpdate,
  parkSpotavailable,
  parkSpotdutyParkFindPositionModelList,
  operateRegionfindByLargeFranchisee
} from "@/api/operationRegional";
import OpearteModelList from "../mapDialog/OpearteModelList";
export default {
  name: "Sibility",
  components: {
    OpearteModelList
  },
  data() {
    return {
      listQuery: {
        largeAreaId: "",
        franchiseeId: "",
        regionName: "",
        current: 1,
        size: 10
      },
      total: 0,
      mapLading: false,
      componentName: "Amap",
      query: {},
      AllianOptions: [], // 大区数据(公用)
      allianceOptions: [], // 加盟商数据
      formallianceOptions: [], // 弹窗的加盟商数据
      franchiseeAreaOptions: [], // 弹窗的运营区数据
      tableData: [],
      loading: false,
      form: {
        largeAreaId: "", // 大区ID
        franchiseeId: "", // 加盟商ID
        operateId: "", // 运营区域Id
        parkName: "", // 停车点名称
        dispatchFee: "", // 调度费
        actualRegionModelList: [] // 经纬度列表
      },
      formLabelWidth: "120px",
      dialogFormVisible: false, // dialog弹窗的显示开关(用来强制刷新弹窗v-if)
      dialogForm: false, // dialog弹窗的显示开关(element开关属性)
      dialogtitle: "", // dialog弹窗的标题
      // form校验规则
      rules: {
        largeAreaId: [
          { required: true, message: "请选择大区", trigger: "change" }
        ],
        franchiseeId: [
          { required: true, message: "请选择加盟商", trigger: "change" }
        ],
        operateId: [
          { required: true, message: "请选择运营区域", trigger: "change" }
        ],
        parkName: [
          { required: true, message: "请输入停车点名称", trigger: "blur" }
        ],
        dispatchFee: [
          { required: true, message: "请输入调度费", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    dialogForm: {
      handler(newValue, oldValue) {
        this.dialogFormVisible = this.dialogForm;
      }
    }
  },
  mounted() {
    // 获取列表
    this.getList();
    // 查询大区
    this.getallianList();
  },
  methods: {
    // 获取列表
    getList() {
      this.loading = true;
      parkSpotdutyParkQueryManagerListPage(this.listQuery).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.total = res.data.total;
          this.tableData = res.data.rows;
          this.loading = false;
        }
      });
    },
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
      if (value == "") {
        return;
      }
      this.listQuery.franchiseeId = "";
      this.allianceOptions = [];
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptions = res.data;
          }
        })
        .catch(() => {});
    },
    clearValue() {
      this.allianceOptions = [];
    },
    // 获取到大区的id去请求加盟商(弹窗里的)
    formallianValue(value) {
      this.form.franchiseeId = "";
      this.form.operateId = "";
      this.formallianceOptions = [];
      this.franchiseeAreaOptions = [];
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.formallianceOptions = res.data;
          }
        })
        .catch(() => {});
    },

    // 根据大区ID和加盟商ID获取运营区域
    changeFranchisee(largeAreaId, franchiseeId) {
      this.form.operateId = "";
      this.franchiseeAreaOptions = [];
      // console.log(largeAreaId, franchiseeId);
      operateRegionfindByLargeFranchisee({ largeAreaId, franchiseeId }).then(
        res => {
          // console.log(res);
          if (res.code == 0) {
            this.franchiseeAreaOptions = res.data;
          }
        }
      );
    },

    // 改变运营区域 显示运营区域地图
    changeOperate(id, noClear = false, noCenter = false, parkSpotId = -1) {
      findById({ id }).then(res => {
        console.log(res, "查询运营区域地图");
        if (res.code == 0) {
          const amap = this.$refs.MapRegion;
          // 清理地图
          if (!noClear) {
            amap.clearMap();
          }
          // 移动地图
          if (!noCenter) {
            amap.setCenter(res.data.seeingRegionModelList[0]);
          }
          amap.greenArr = [res.data.seeingRegionModelList];
          amap.drawMapArr({
            dataList: [res.data.seeingRegionModelList]
          });
          // 查询绘制其他停车点
          parkSpotdutyParkFindPositionModelList({
            largeAreaId: res.data.largeAreaId,
            franchiseeId: res.data.franchiseeId,
            operateId: res.data.id,
            parkSpotId
          }).then(res => {
            console.log(res);

            const amap = this.$refs.MapRegion;
            const actArr = [];
            for (const n of res.data) {
              actArr.push(n.actualRegionModelList);
            }
            amap.blackArr = actArr;
            amap.drawMapArr({
              dataList: actArr,
              polygonSetting: {
                strokeColor: "#000",
                fillColor: "#000",
                strokeWeight: 0,
                zIndex: 99
              }
            });
          });
        }
      });
    },
    // 编辑
    tapEdit(v) {
      console.log(v);
      this.dialogtitle = "编辑停车点";
      this.dialogForm = true;

      // 查询当前大区的加盟商并把数据给到弹窗的select
      this.formallianValue(v.largeAreaId);
      // 查询当前加盟商的运营区域并把数据给到弹窗的select
      this.changeFranchisee(v.largeAreaId, v.franchiseeId);
      // 修改form表单数据(显示当前数据)
      this.changeForm(v);

      // 查询绘制本停车点数据
      parkSpotdutyParkFindById({ id: v.id }).then(res => {
        console.log(res, "查询绘制本停车点数据");
        if (res.code == 0) {
          this.Maploading = true;
          const amap = this.$refs.MapRegion;
          amap.setCenter(res.data.actualRegionModelList[0]);
          // amap.setZoom(18);
          // 清理地图
          amap.clearMap();
          amap.Mapobject.seeingRegion.seeingRegionModelList = res.data.actualRegionModelList.concat(
            []
          );
          amap.drawMapArr({
            dataList: [res.data.actualRegionModelList],
            isEdit: true,
            target: "seeingRegion",
            polygonSetting: {
              fillColor: "#1890ff",
              strokeColor: "#1890ff",
              zIndex: 100
            },
            polylineSetting: {
              strokeColor: "#1890ff",
              zIndex: 100
            }
          });
          this.form.actualRegionModelList = res.data.actualRegionModelList.concat(
            []
          );
          this.changeOperate(res.data.operateId, true, true, v.id);
        }
      });
    },
    // 查看区域
    tapArea(row) {
      console.log(row);
      this.dialogtitle = "运营区域";
      parkSpotdutyParkFindPositionModelList({
        largeAreaId: row.largeAreaId,
        franchiseeId: row.franchiseeId,
        operateId: row.operateId,
        parkSpotId: row.id
      }).then(res => {
        console.log(res);
        this.$refs.OpearteModelList.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs.OpearteModelList.amapDataPoint(
            res.data,
            row.id,
            row.operateId
          );
        });
      });
    },
    // 启用禁用
    tapDisable(v) {
      console.log(v);
      parkSpotavailable({ id: v.id, available: v.available }).then(res => {
        if (res.code == 0) {
          this.$notify({
            title: "成功",
            message: "修改成功！",
            type: "success"
          });
          this.tableData[this.tableData.indexOf(v)].available = !v.available;
        }
      });
    },
    // 保存
    tapSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.dialogtitle);
          console.log(this.form);
          if (this.form.actualRegionModelList.length >= 3) {
            this.submitData(this.form);
          } else {
            console.log(this.form.actualRegionModelList);
            this.$notify.error({
              title: "错误",
              message: "请完善区域"
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 提交数据
    submitData(data) {
      if (this.dialogtitle == "新增停车点") {
        data.dispatchFee = Number(data.dispatchFee);
        parkSpotdutyParkInsert(data)
          .then(res => {
            console.log(res, "1111111");
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "添加成功",
                type: "success"
              });
              // this.dialogFormVisible = false;
              this.dialogForm = false;
              this.getList();
            }
          })
          .catch(err => {
            // this.$refs.mydialog.close();
            // this.$message.error(err.message);
          });
      } else {
        parkSpotdutyParkUpdate(data)
          .then(res => {
            console.log(res, "1111111");
            if (res.code == 0) {
              this.$notify({
                title: "成功",
                message: "修改成功",
                type: "success"
              });
              // this.dialogFormVisible = false;
              this.dialogForm = false;
              this.getList();
            }
          })
          .catch(err => {
            // this.$refs.mydialog.close();
            // this.$message.error(err.message);
          });
      }
    },
    changeForm(v) {
      this.form.id = v.id || ""; // 编辑时需要id  新增时会删除该属性
      this.form.largeAreaId = v.largeAreaId || "";
      this.form.franchiseeId = v.franchiseeId || "";
      this.form.operateId = v.operateId || "";
      this.form.parkName = v.parkName || "";
      this.form.dispatchFee = v.dispatchFee || "";
      this.form.parkCode = v.parkCode || ""; // 该数据只读
      this.form.actualRegionModelList = v.actualRegionModelList || [];
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
    // 查询
    handleFilter() {
      this.listQuery.current = 1;
      this.getList();
    },

    // 新建
    handleCreate() {
      this.dialogtitle = "新增停车点";
      this.dialogFormVisible = true;
      this.dialogForm = true;
      this.formallianceOptions = []; // 弹窗的加盟商数据
      this.franchiseeAreaOptions = []; // 弹窗的运营区数据
      this.changeForm({});
      delete this.form.id;
      this.$nextTick(() => {
        const amap = this.$refs.MapRegion;
        // 清理地图
        amap.clearMap();
        this.$refs.form.resetFields();
      });
    },
    markerRegion(v) {
      this.form.actualRegionModelList = v;
      console.log(this.form, "编辑完成用户可见区域点击提交传递到from");
    }
  }
};
</script>

<style lang="scss" scoped>
.sibility {
  &-container {
    .search-container {
      position: relative;
      & > button {
        position: absolute;
        right: 0;
        top: 0;
      }
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
    .sibilityform {
      .bg-size-color {
        span {
          color: red;
        }
      }
      .gdmap {
        width: 100%;
        height: 400px;
      }
    }
  }
}
.sibility-container .search-container /deep/ .el-input {
  width: 195px;
}
.sibility-container /deep/ .page-container {
  justify-content: flex-start;
}
</style>
