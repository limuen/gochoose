<template>
  <div class="betterylist-container">
    <div class="create-button">
      <el-button
        type="primary"
        @click="handleCreate"
        icon="el-icon-edit"
        v-permission="button.battery_battery_batterylist_addbattery"
      >添加电池</el-button>
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
            <span>电池imei</span>
            <el-input v-model="listQuery.batteryImei" placeholder="请输入电池imei"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>电池厂商</span>
            <el-input v-model="listQuery.batteryManufacturer" placeholder="请输入电池厂商"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span>更换日期</span>
            <el-date-picker
              v-model="createTimes"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="margin-right: 20px;"
              @change="changeClose"
            ></el-date-picker>
            <el-button plain @click="Thisweek">本周</el-button>
            <el-button plain @click="Thismonth">本月</el-button>
            <el-button plain @click="Thisquarter">本季度</el-button>
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
          <el-table-column prop="batteryImei" label="电池IMEI" align="center"></el-table-column>
          <el-table-column prop="batteryCapacity" label="电池容量/Ah" align="center"></el-table-column>
          <el-table-column prop="enduranceMileage" label="总续航里程/km" align="center"></el-table-column>
          <el-table-column prop="batteryManufacturer" label="电池厂商" align="center"></el-table-column>
          <el-table-column prop="remark" label="电池描述" align="center"></el-table-column>
          <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="allianceName" label="加盟商" align="center"></el-table-column>
          <el-table-column prop="regionName" label="大区" align="center"></el-table-column>
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

    <!-- 编辑 -->
    <el-dialog :title="dialogtitle" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="操作方式">
          <el-radio-group v-model="resource">
            <el-radio :label="1">单个添加</el-radio>
            <el-radio :label="2">批量添加</el-radio>
            <el-radio :label="3">批量修改</el-radio>
          </el-radio-group>
        </el-form-item>

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
        <el-form-item label="电池imei" v-if="resource=='1'" prop="batteryImei">
          <el-input v-model="form.batteryImei" placeholder="请输入电池imei"></el-input>
        </el-form-item>
        <el-form-item label="电池厂商" v-if="resource=='1'" prop="batteryManufacturer">
          <el-input placeholder="请输入电池厂商" v-model="form.batteryManufacturer"></el-input>
        </el-form-item>
        <el-form-item label="电池容量" v-if="resource=='1'" prop="batteryCapacity">
          <el-input placeholder="请输入电池容量" v-model="form.batteryCapacity">
            <template slot="append">vh</template>
          </el-input>
        </el-form-item>
        <el-form-item label="总续航里程" v-if="resource=='1'" prop="enduranceMileage">
          <el-input placeholder="请输入总续航里程" v-model="form.enduranceMileage">
            <template slot="append">km</template>
          </el-input>
        </el-form-item>
        <el-form-item label="电池描述" v-if="resource=='1'" prop="remark">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item label="电池信息文件" v-if="resource=='2' || resource=='3'" class="upload-create">
          <el-upload
            class="upload-add"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
          <div>
            <div>
              Excel模板：
              <a href style="color:#1890ff;">点击下载</a>
            </div>
            <h3>注意事项:</h3>
            <ol>
              <li>
                模板中所有
                <span>红色字段</span>为必须字段，不能为空。
              </li>
              <li>
                电池IMEI必须为
                <span>xx</span>位数字。
              </li>
            </ol>
          </div>
        </el-form-item>
        <el-form-item label="电池信息文件" v-if="resource=='5'" class="upload-create">
          <el-upload
            class="upload-add"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
          <div>
            <div>
              Excel模板：
              <a href style="color:#1890ff;">点击下载</a>
            </div>
            <h3>注意事项:</h3>
            <ol>
              <li>
                系统会根据*车辆编号*，修改此车相应的数据车辆编号必须是完整车辆编号，
                <span>不能缺少车辆前辍，建议从车辆列表导出Excel</span>。
              </li>
              <li>只需填写需要修改的信息栏，不想修改的信息请留空，如果*车辆编号*不存在，系统将会提示报错。</li>
              <li>
                如果填写了*续航(km)*，系统会自动执行里程重置操作，
                <span>提醒：可以从【车辆管理】-【车辆列表】导出需要修改的车辆，对Excel进行修改后再利用此功能上传Excel,或者直接下载模板文件，填写*车辆编号* 和 你想修改的信息列</span>。
              </li>
            </ol>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitform">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { allRegion, allianceListByRegionId } from "@/api/region";
import { getDay, transTime } from "@/utils/index.js";
import { batteryPage, batteryinsert } from "@/api/car";
import permission from "@/directive/permission";
export default {
  name: "betterylist",
  directives: { permission },
  data() {
    return {
      button: {
        battery_battery_batterylist_addbattery:
          "battery_battery_batterylist_addbattery"
      },
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      AllianOptionsDialog: [], // 查询大区
      allianceOptionsDialog: [], // 加盟商
      listQuery: {
        regionId: "",
        allianceId: "",
        batteryImei: "",
        batteryManufacturer: "",
        createTimes: "",
        current: 1,
        size: 10
      },
      createTimes: [],
      tableData: [],
      total: 0,
      loading: false,
      resource: 1,
      form: {
        regionId: "",
        regionName: "",
        allianceId: "",
        allianceName: "",
        batteryImei: "",
        batteryManufacturer: "",
        batteryCapacity: "",
        enduranceMileage: "",
        remark: ""
      },
      dialogtitle: "",
      dialogFormVisible: false,
      rules: {
        regionId: [
          { required: true, message: "请选择大区", trigger: "change" }
        ],
        allianceId: [
          { required: true, message: "请选择加盟商", trigger: "change" }
        ],
        batteryImei: [
          { required: true, message: "请输入电池IMEI", trigger: "blur" }
        ],
        batteryManufacturer: [
          { required: true, message: "请输入电池厂商", trigger: "blur" }
        ],
        batteryCapacity: [
          { required: true, message: "请输入电池容量", trigger: "blur" }
        ],
        enduranceMileage: [
          { required: true, message: "请输入总续航里程", trigger: "blur" }
        ],
        remark: [
          { required: true, message: "请输入电池总描述", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // 查询大区
    this.getallianList();
    this.getallianListDialog();
    // 获取列表
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
    changeClose(value) {
      console.log(value);
      if (value == null) {
        this.createTime = [];
        this.listQuery.createTimes = "";
      } else {
        this.listQuery.createTimes = value.toString();
      }
    },
    // 获取本周
    Thisweek() {
      let week = transTime(new Date());
      let date = getDay("week", week);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.createTimes = [start, end];
      this.listQuery.createTimes = this.createTimes.toString();
    },
    // 获取本月
    Thismonth() {
      let month = transTime(new Date());
      let date = getDay("month", month);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.createTimes = [start, end];
      this.listQuery.createTimes = this.createTimes.toString();
    },
    // 获取季度
    Thisquarter() {
      let quarter = transTime(new Date());
      let date = getDay("quarter", quarter);
      // start
      let start = `${date[0]} 00:00:00`;
      // end
      let end = `${date.slice(-1)} 23:59:59`;
      this.createTimes = [start, end];
      this.listQuery.createTimes = this.createTimes.toString();
    },
    // 获取列表
    getList() {
      this.loading = true;
      batteryPage(this.listQuery)
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
    },
    handleCreate() {
      this.dialogtitle = "添加电池";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    submitform() {
      this.$refs.form.validate(valid => {
        if (valid) {
          batteryinsert(this.form)
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
};
</script>

<style lang="scss" scoped>
.betterylist {
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
      .editPrice {
        .el-input:nth-child(2),
        .el-select,
        .el-input:nth-child(3) {
          margin-left: -4px;
        }
      }
    }
    .upload-create {
      h3,
      ol {
        margin: 0px;
        padding: 0px;
        line-height: 20px;
      }
      ol {
        margin-left: 15px;
        span {
          color: red;
        }
      }
    }
    .page-excel {
      display: flex;
      justify-content: space-between;
      .page-container {
        > span {
          line-height: 32px;
          font-size: 14px;
        }
      }
      & > div:nth-child(2) {
        margin-top: 25px;
        color: #20a0ff;
        cursor: pointer;
      }
    }
  }
}
.betterylist-container .search-container /deep/ .el-input {
  width: 230px;
}
.betterylist-container .form /deep/ .el-input,
.el-textarea {
  width: 350px;
}
</style>