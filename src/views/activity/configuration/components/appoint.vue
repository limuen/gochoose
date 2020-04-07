<template>
  <div class="discount-container">
    <div class="create-button">
      <el-button type="primary" @click="handleCreate" icon="el-icon-edit">添加活动</el-button>
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
            <span>活动状态</span>
            <el-select v-model="listQuery.status" placeholder="请选择活动状态">
              <el-option
                v-for="item in Activityoptions"
                :key="item.value"
                :label="item.type"
                :value="item.value"
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
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="allianceName" width="200" label="加盟商" align="center"></el-table-column>
        <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
        <el-table-column prop="activityName"  width="150" label="活动名称" align="center"></el-table-column>
        <el-table-column prop="status" label="活动状态" align="center"></el-table-column>
        <el-table-column prop="discountPercent" label="折扣" align="center"></el-table-column>
        <el-table-column prop="discountTotal" width="150" label="发行总数量" align="center"></el-table-column>
        <el-table-column prop="remainNumber" width="150" label="已领取数量" align="center"></el-table-column>
        <el-table-column prop="useNumber"  width="150" label="已使用数量" align="center"></el-table-column>
        <el-table-column prop="activityStartTime" width="210" label="活动开始日期" align="center"></el-table-column>
        <el-table-column prop="activityEndTime" width="210" label="活动结束时间" align="center"></el-table-column>
        <el-table-column prop="auditName" label="审核人" align="center"></el-table-column>
        <el-table-column prop="applyTime" width="210" label="申请日期" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="400" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button type="primary" size="mini" @click="handleStatus(scope.row.discountId,1,'申请')">申请</el-button>
            <el-button type="primary" size="mini" @click="handleexamine(scope.row.discountId)">审核</el-button>
            <el-button type="primary" size="mini" @click="handleStatus(scope.row.discountId,3,'启用')">启用</el-button>
            <el-button type="warning" size="mini" @click="handleStatus(scope.row.discountId,4,'停止')">停止</el-button>
            <el-button type="primary" size="mini" @click="handleedit(scope.row)">编辑</el-button> -->
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
      <div>
        <i class="el-icon-folder-opened excel-blue"></i>
        <span>导出excel</span>
      </div>
    </div>

    <!-- 添加修改新分享 -->
    <!-- <el-dialog :title="dialogtitle" width="35%" :visible.sync="dialogForm">
      <el-form :model="form" class="Operation">
        <el-form-item label="大区" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择大区">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加盟商" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择加盟商">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="value" placeholder="请输入车辆编号"></el-input>
        </el-form-item>
        <el-form-item label="默认开启" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择大区">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="券金额" :label-width="formLabelWidth">
          <el-input placeholder="请输入券金额" v-model="input2">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="发行总量" :label-width="formLabelWidth">
          <el-input placeholder="请输入发行总量" v-model="input2">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item label="券有效期" :label-width="formLabelWidth">
          <el-input placeholder="请输入券有效期" v-model="input2">
            <template slot="append">天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="可领数量" :label-width="formLabelWidth">
          <el-input placeholder="请输入可领数量" v-model="input2">
            <template slot="append">张/人</template>
          </el-input>
        </el-form-item>
        <el-form-item label="活动日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="活动申请" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio :label="1">立即申请</el-radio>
            <el-radio :label="2">稍后申请</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="dialogForm = false">确 定</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import { NewListPage } from '@/api/activity';
import { allRegion, allianceListByRegionId } from "@/api/region";
export default {
  name: "betterylist",
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      AllianOptionsDialog: [], // 查询大区
      allianceOptionsDialog: [], // 加盟商
      Activityoptions: [
        { value: 0, type: "未申请" },
        { value: 1, type: "申请中" },
        { value: 2, type: "待开始" },
        { value: 3, type: "进行中启用中" },
        { value: 4, type: "进行中已停止" },
        { value: 5, type: "已结束使用中" },
        { value: 6, type: "已结束已停止" },
        { value: 7, type: "审核不通过" }
      ],
      listQuery: {
        regionId: "",
        allianceId: "",
        activityName: "",
        status: "",
        current: 1,
        size: 10
      },
      isEdit: false,
      tableData: [],
      total: 0,
      loading: false,
      formLabelWidth: "120px",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        textarea: ""
      },
      dialogForm: false,
      dialogtitle: ""
    };
  },
  mounted() {
    // 查询大区
    this.getallianList();
    this.getallianListDialog();
    // 获取列表
    this.getList()
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
      NewListPage(this.listQuery)
        .then(res => {
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
      this.dialogtitle = "新增用户券活动";
      this.dialogForm = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.discount {
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
.discount-container .search-container /deep/ .el-input {
  width: 195px;
}
</style>