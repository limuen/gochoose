<template>
  <div class="charge-container">
    <div class="create-button">
      <el-button type="primary" @click="handleCreate" icon="el-icon-edit" v-permission="button.charge_charge_index_add">新增收费标准</el-button>
    </div>
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select
              v-model="listQuery.largeAreaId"
              clearable
              @change="allianValue"
              placeholder="请选择大区"
              @clear="clearValue"
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
            <el-select v-model="listQuery.franchiseeId" clearable placeholder="请选择加盟商">
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
            <span>计费方式</span>
            <el-select v-model="listQuery.feeType" clearable placeholder="请选择计费方式">
              <el-option
                v-for="item in Feetypeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
        <el-table-column prop="largeAreaName" label="大区" align="center"></el-table-column>
        <el-table-column prop="franchiseeName" label="加盟商" align="center"></el-table-column>
        <el-table-column prop="name" label="收费名称" align="center"></el-table-column>
        <el-table-column prop="feeType" label="计费方式" align="center">
          <template slot-scope="scope">{{scope.row.feeType | feeType}}</template>
        </el-table-column>
        <el-table-column prop="startPrice" width="500" label="收费标准" align="center">
          <template slot-scope="scope">
            <div
              v-if="scope.row.feeType == 1"
            >免费时长：{{scope.row.freeDuration}}分钟 基本单价： {{scope.row.price}}元/{{scope.row.unitTime}}{{scope.row.unit | unitType}} 最高限额：{{scope.row.maxLimitAmount}}元/{{scope.row.maxLimitAmountUnitTime}}{{scope.row.maxLimitAmountUnit | maxUnit}}</div>
            <div
              v-else
            >起步价：{{scope.row.startPrice}}元 基本单价：{{scope.row.price}}元/{{scope.row.unitTime}}{{scope.row.unit | unitType}} 里程单价：{{scope.row.mileagePrice}}元/{{scope.row.mileagePriceUnitValue}}千米</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-permission="button.charge_charge_index_edit" @click="handleedit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" v-permission="button.charge_charge_index_delete" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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

    <!-- 新增收费标准 -->
    <el-dialog
      :title="dialogtitle"
      width="33%"
      :close-on-click-modal="false"
      :before-close="cancelsubmitfotm"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form" label-width="120px" class="form" ref="form" :rules="rules">
        <el-form-item label="大区" prop="largeAreaId">
          <el-select
            class="selectinput-header"
            v-model="form.largeAreaId"
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
        <el-form-item label="加盟商" prop="franchiseeId">
          <el-select class="selectinput-header" v-model="form.franchiseeId" placeholder="请选择加盟商">
            <el-option
              v-for="item in allianceOptionsDialog"
              :key="item.allianceId"
              :label="item.allianceName"
              :value="item.allianceId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input
            v-model="form.name"
            class="selectinput-header"
            placeholder="请输入收费名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="计费方式" prop="feeType">
          <el-radio-group v-model="form.feeType" @change="changeradio">
            <el-radio :label="1" border>按时间计费</el-radio>
            <el-radio :label="2" border>按时间+里程计费</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="起步价"
          class="editPrice"
          v-if="form.feeType == 2"
          prop="startPrice"
          :key="`${form.feeType}startPrice`"
        >
          <el-input
            placeholder="请输入内容"
            type="number"
            v-number="2"
            :min="0"
            v-model="form.startPrice"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item class="forminfo" :label-width="formlabelinfo">
            预览：前 <span>2</span>分钟，收费 <span>0</span>元(不足 <span>2</span>分钟以 <span>2</span>分钟计费)
        </el-form-item>
        <el-form-item class="forminfo" :label-width="formlabelinfo">
          最低收费<span>0</span>元
        </el-form-item>-->
        <el-form-item
          label="基本单价"
          class="editPrice elselect-bg"
          required
          v-if="form.feeType == 1 || form.feeType == 2"
          :key="`${form.feeType}price`"
        >
          <el-col :span="8">
            <el-form-item prop="price">
              <el-input
                placeholder="请输入内容"
                step="0.01"
                :min="0.01"
                v-number="2"
                class="elinput-price"
                type="number"
                v-model="form.price"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="unitTime">
              <el-input
                v-model="form.unitTime"
                type="number"
                v-number="0"
                class="elinput-select"
                autocomplete="off"
              ></el-input>
              <el-select v-model="form.unit" style="width: 80px;">
                <el-option
                  v-for="item in unitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- <el-form-item class="forminfo" :label-width="formlabelinfo">
          说明：超出 <span>2</span>分钟的时间，收 <span>1</span>元/ <span>15</span>分钟
        </el-form-item>
        <el-form-item class="forminfo" :label-width="formlabelinfo">
          说明：<span>1</span> 元/ <span>15</span> 分钟
        </el-form-item>-->
        <el-form-item
          label="里程单价"
          required
          class="editPrice"
          v-if="form.feeType == 2"
          :key="`${form.feeType}mileagePrice`"
        >
          <el-col :span="8">
            <el-form-item prop="mileagePrice">
              <el-input
                placeholder="请输入里程单价"
                step="1"
                class="elinput-price"
                type="number"
                v-model="form.mileagePrice"
                v-number="2"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="mileagePriceUnitValue">
              <el-input
                placeholder="请输入里程单位"
                type="number"
                class="elinput-price"
                v-number="1"
                v-model="form.mileagePriceUnitValue"
              >
                <template slot="append">千米</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          label="最高限额"
          class="editPrice elselect-bg"
          required
          v-if="form.feeType == 1"
          :key="`${form.feeType}maxLimitAmountUnitTime`"
        >
          <el-col :span="6">
            <el-form-item prop="maxLimitAmountUnitTime">
              <el-input
                v-model="form.maxLimitAmountUnitTime"
                type="number"
                style="width:146px"
                v-number="0"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-select v-model="form.maxLimitAmountUnit" style="width: 80px;">
              <el-option
                v-for="item in maxunitOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="maxLimitAmount">
              <el-input
                placeholder="请输入内容"
                step="1"
                v-number="2"
                type="number"
                class="elinput-price"
                v-model="form.maxLimitAmount"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- <el-form-item class="forminfo" :label-width="formlabelinfo">
          注：最高限额金额设置为<span>0</span>时，将按照基本单价计费
        </el-form-item>
        <el-form-item class="forminfo" :label-width="formlabelinfo">
          说明：收 <span>2.5</span>元/ <span>2</span>千米
        </el-form-item>-->
        <el-form-item
          label="免费时常"
          prop="freeDuration"
          v-if="form.feeType == 1"
          :key="`${form.feeType}freeDuration`"
        >
          前
          <el-input v-model="form.freeDuration" style="width:80px;" v-number="0" autocomplete="off"></el-input>分钟免费
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="cancelsubmitfotm">取 消</el-button>
        <el-button type="primary" @click="submitform">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { allRegion, allianceListByRegionId } from "@/api/region";
import {
  queryManagerListPage,
  createCharge,
  findById,
  update,
  deletecharge
} from "@/api/charge";
import number from "@/directive/input-filter";
import permission from "@/directive/permission";
export default {
  name: "charge",
  directives: { number,permission },
  data() {
    return {
      button: {
        charge_charge_index_add: 'charge_charge_index_add',
        charge_charge_index_edit: 'charge_charge_index_edit',
        charge_charge_index_delete: 'charge_charge_index_delete'
      },
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      AllianOptionsDialog: [], // 查询大区
      allianceOptionsDialog: [], // 加盟商
      Feetypeoptions: [
        { value: 1, label: "按实际计费" },
        { value: 2, label: "按时间+里程" }
      ],
      unitOptions: [
        { value: 1, label: "分钟" },
        { value: 2, label: "小时" },
        { value: 3, label: "天" }
      ],
      maxunitOptions: [
        { value: 2, label: "小时" },
        { value: 3, label: "天" }
      ],
      listQuery: {
        largeAreaId: "",
        franchiseeId: "",
        feeType: "",
        current: 1,
        size: 10
      },
      total: 0,
      loading: false,
      isEdit: false,
      tableData: [],
      dialogFormVisible: false,
      dialogtitle: "",
      form: {
        largeAreaId: "",
        franchiseeId: "",
        name: "",
        feeType: 1,
        // 按时间里程
        startPrice: "", //起步价
        price: "", // 基本单价
        unit: 1, //基本单价单位
        unitTime: "", //基本单价时间
        mileagePrice: "", // 里程单价
        mileagePriceUnit: "", //里程单位
        mileagePriceUnitValue: "", //里程单位数值
        // 按时间计费
        freeDuration: "", // 免费时长
        maxLimitAmount: "", //最高限额
        maxLimitAmountUnit: 2, //最高限额单位
        maxLimitAmountUnitTime: "" //最高限额单位时间
      },
      rules: {
        largeAreaId: [
          { required: true, message: "请选择大区", trigger: "change" }
        ],
        franchiseeId: [
          { required: true, message: "请选择加盟商", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入收费名称", trigger: "blur" }],
        feeType: [
          { required: true, message: "请选择计费方式", trigger: "change" }
        ],
        startPrice: [
          { required: true, message: "请输入起步价", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入基本单价", trigger: "blur" }],
        unitTime: [
          { required: true, message: "请输入基本单价时间", trigger: "blur" }
        ],
        maxLimitAmount: [
          { required: true, message: "请输入最高限额", trigger: "blur" }
        ],
        maxLimitAmountUnitTime: [
          { required: true, message: "请输入最高限额时间", trigger: "blur" }
        ],
        freeDuration: [
          { required: true, message: "请输入免费时常", trigger: "blur" }
        ],
        mileagePrice: [
          { required: true, message: "请输入里程单价", trigger: "blur" }
        ],
        mileagePriceUnitValue: [
          { required: true, message: "请输入里程单位", trigger: "blur" }
        ]
      },
      formlabelinfo: "111px"
    };
  },
  mounted() {
    // 查询大区
    this.getallianList();
    this.getallianListDialog();
    // 获取列表
    this.getList();
  },
  filters: {
    feeType(key) {
      const feeTypeMap = {
        1: "按时间计费",
        2: "按时间+里程"
      };
      return feeTypeMap[key];
    },
    unitType(key) {
      const unitTypeMap = {
        1: "分钟",
        2: "小时",
        3: "天"
      };
      return unitTypeMap[key];
    },
    maxUnit(key) {
      const maxUnitMap = {
        1: "分钟",
        2: "小时",
        3: "天"
      };
      return maxUnitMap[key];
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
    // 获取到大区的id去请求加盟商
    allianValue(value) {
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
    allianValuedialog(value) {
      this.allianceOptions = [];
      this.form.franchiseeId = "";
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptionsDialog = res.data;
          }
        })
        .catch(() => {});
    },
    clearValue() {
      this.allianceOptions = [];
    },
    // 弹窗切换清空消息
    changeradio(value) {
      if (value == 1) {
        this.form.startPrice = ""; //起步价
        this.form.price = ""; // 基本单价
        this.form.unitTime = ""; //基本单价时间
        this.form.mileagePrice = ""; // 里程单价
        this.form.mileagePriceUnit = ""; //里程单位
        this.form.mileagePriceUnitValue = ""; //里程单位数值
      } else {
        this.form.freeDuration = ""; // 免费时长
        this.form.maxLimitAmount = ""; //最高限额
        this.form.maxLimitAmountUnitTime = ""; //最高限额单位时间
        this.form.price = ""; // 基本单价
        this.form.unitTime = ""; //基本单价时间
      }
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
    handleCreate() {
      this.dialogFormVisible = true;
      this.isEdit = false;
      this.dialogtitle = "新增收费标准";
      this.allianceOptionsDialog = [];
      this.form.startPrice = "";
      this.form.price = "";
      this.form.unit = 1;
      this.form.unitTime = "";
      this.form.mileagePrice = "";
      this.form.mileagePriceUnit = "";
      this.form.mileagePriceUnitValue = "";
      this.form.freeDuration = "";
      this.form.maxLimitAmount = "";
      this.form.maxLimitAmountUnit = 2;
      this.form.maxLimitAmountUnitTime = "";
      delete this.form.id
      delete this.form.largeAreaName
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
      console.log(this.form,'111111')
    },
    cancelsubmitfotm() {
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
      this.dialogFormVisible = false;
    },
    // 编辑
    handleedit(row) {
      this.dialogtitle = "修改收费标准";
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.dialogding = true;
      findById({
        id: row.id
      }).then(res => {
        console.log(res, "11111111");
        if (res.code == 0) {
          // if (res.data.feeType == 1) {
          //   res.data.price = res.data.price / 100;
          //   res.data.maxLimitAmount = res.data.maxLimitAmount / 100;
          // } else {
          //   res.data.startPrice = res.data.startPrice / 100;
          //   res.data.price = res.data.price / 100;
          //   res.data.mileagePrice = res.data / 100;
          // }
          allianceListByRegionId({ regionId: res.data.largeAreaId })
            .then(res => {
              if (res.code == 0) {
                this.allianceOptionsDialog = res.data;
              }
            })
            .catch(() => {});
          this.form = Object.assign(this.form, res.data);
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
          deletecharge({ id: row.id }).then(res => {
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
    submitform() {
      if (this.isEdit) {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(this.form, "1111111");
            // if (this.form.feeType == 1) {
            //   this.form.price = this.form.price * 100;
            //   this.form.maxLimitAmount = this.form.maxLimitAmount * 100;
            //   console.log(this.form.price);
            // } else {
            //   this.form.startPrice = this.form.startPrice * 100;
            //   this.form.price = this.form.price * 100;
            //   this.form.mileagePrice = this.form.mileagePrice * 100;
            // }
            update(this.form)
              .then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success"
                  });
                  this.getList();
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
            console.log(this.form, "1111111");
            // if (this.form.feeType == 1) {
            //   this.form.price = this.form.price * 100;
            //   this.form.maxLimitAmount = this.form.maxLimitAmount * 100;
            //   console.log(this.form.price);
            // } else {
            //   this.form.startPrice = this.form.startPrice * 100;
            //   this.form.price = this.form.price * 100;
            //   this.form.mileagePrice = this.form.mileagePrice * 100;
            // }
            createCharge(this.form)
              .then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "创建成功",
                    type: "success"
                  });
                  this.getList();
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
.charge {
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
    .elselect-bg {
      .el-select {
        background: #f5f7fa;
      }
    }
    .editPrice {
      .el-input {
        width: 250px;
      }
      .el-input:nth-child(2),
      .el-select,
      .el-input:nth-child(3) {
        margin-left: -4px;
      }
    }
    .forminfo {
      margin: 10px;

      span {
        color: #ff5722;
      }
    }
  }
}
.charge-container .search-container /deep/ .el-input {
  width: 230px;
}
.charge-container /deep/ .page-container {
  justify-content: flex-start;
}
.charge-container .editPrice /deep/ .el-input .el-input__inner {
  border-radius: 0px;
}
.charge-container .editPrice /deep/ .el-input-group__append {
  border-radius: 0px;
}
.charge-container .elselect-bg /deep/ .el-select .el-input__inner {
  background: #f5f7fa;
}
.charge-container .forminfo /deep/ .el-form-item__content {
  line-height: 20px;
  font-size: 12px;
}
.charge-container .form /deep/ .selectinput-header {
  width: 350px;
}
.charge-container .form /deep/ .elinput-price {
  width: 200px;
}
.charge-container .form /deep/ .elinput-select {
  width: 130px;
}
</style>