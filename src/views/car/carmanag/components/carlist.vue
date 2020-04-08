<template>
  <div class="carlist-container">
    <div class="create-button">
      <el-button type="primary" @click="handleCreate" icon="el-icon-edit">添加车辆</el-button>
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
            <span>责任区域</span>
            <el-select v-model="value" placeholder="请选择责任区域">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>租赁状态</span>
            <el-select v-model="value" placeholder="请选择租赁状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>锁车状态</span>
            <el-select v-model="value" placeholder="请选择锁车状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>收费模式</span>
            <el-select v-model="value" placeholder="请选择收费模式">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆状态</span>
            <el-select v-model="value" placeholder="请选择车辆状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>锁车状态</span>
            <el-select v-model="value" placeholder="请选择锁车状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>运营状态</span>
            <el-select v-model="value" placeholder="请选择车辆状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车型</span>
            <el-select v-model="value" placeholder="请选择车型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>未使用车辆</span>
            <el-input placeholder="请输入未使用车辆" v-model="input2">
              <template slot="append">小时内</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>未归还车辆</span>
            <el-input placeholder="请输入未归还车辆" v-model="input2">
              <template slot="append">小时内</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>报警开关</span>
            <el-select v-model="value" placeholder="请选择报警开关">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>剩余里程小于</span>
            <el-input placeholder="请输入剩余里程小于" v-model="input2">
              <template slot="append">km</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>GPS丢星</span>
            <el-input placeholder="请输入GPS丢星" v-model="input2">
              <template slot="append">天</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>剩余电量小于</span>
            <el-input placeholder="请输入GPS丢星" v-model="input2">
              <template slot="append">%</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>运营区域内外</span>
            <el-select v-model="value" placeholder="请选择运营区域内外">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="24">
          <div class="grid-content bg-purple" style="color: red;font-size: 14px;">
              以下信息填写后上面查询条件不生效
          </div>
        </el-col>-->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆编号</span>
            <el-input v-model="value" placeholder="请输入车辆编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>设备IMEI</span>
            <el-input v-model="value" placeholder="请输入设备IMEI"></el-input>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-button type="primary">查询</el-button>
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
        <el-table-column label="运维单号" width="200" align="center"></el-table-column>
        <el-table-column prop="车辆编号" label="车辆编号" width="120" align="center"></el-table-column>
        <el-table-column prop="运维方式" label="运维方式" align="center"></el-table-column>
        <el-table-column prop="维修部件" label="维修部件" align="center"></el-table-column>
        <el-table-column prop="运维员" label="运维员" align="center"></el-table-column>
        <el-table-column prop="运维手机" label="运维手机" align="center"></el-table-column>
        <el-table-column prop="推送时间" label="推送时间" width="150" align="center"></el-table-column>
        <el-table-column prop="完成时间" label="完成时间" width="150" align="center"></el-table-column>
        <el-table-column prop="处理结果" label="处理结果" align="center"></el-table-column>
        <el-table-column prop="处理时效" label="处理时效" align="center"></el-table-column>
        <el-table-column prop="评分" label="评分" align="center"></el-table-column>
        <el-table-column prop="处理结果图片与备注" label="处理结果图片与备注" width="200" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="handleedit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      <div>
        <i class="el-icon-folder-opened excel-blue"></i>
        <span>导出excel</span>
      </div>
    </div>

    <!-- 编辑 -->
    <el-dialog :title="dialogtitle" width="35%" :visible.sync="dialogForm">
      <el-form :model="form" class="Operation">
        <el-form-item label="添加方式" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio :label="1">单量添加</el-radio>
            <el-radio :label="2">批量添加</el-radio>
            <el-radio :label="3">批量修改</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="批量添加" v-if="form.resource=='2'" class="upload-create" :label-width="formLabelWidth">
          <el-upload
            class="upload-add"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <div>
            <div>
              Excel模板：<a href="" style="color:#1890ff;">点击下载</a>  
            </div>
            <h3>注意事项:</h3>
            <ol>
              <li>车辆编号信息，不需要加盟商前缀</li>
              <li>如果系统中已存在相同的*车辆编号*、*IMEI*，将无法入库，系统会将会提示错误信息。</li>
            </ol>
          </div>
        </el-form-item>
        <el-form-item label="批量修改" v-if="form.resource=='3'" class="upload-create" :label-width="formLabelWidth">
          <el-upload
            class="upload-add"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <div>
            <div>
              Excel模板：<a href="" style="color:#1890ff;">点击下载</a>  
            </div>
            <h3>注意事项:</h3>
            <ol>
              <li>系统会根据*车辆编号*，修改此车相应的数据车辆编号必须是完整车辆编号，<span>不能缺少车辆前辍，建议从车辆列表导出Excel</span>。</li>
              <li>只需填写需要修改的信息栏，不想修改的信息请留空，如果*车辆编号*不存在，系统将会提示报错。</li>
              <li>如果填写了*续航(km)*，系统会自动执行里程重置操作，<span>提醒：可以从【车辆管理】-【车辆列表】导出需要修改的车辆，对Excel进行修改后再利用此功能上传Excel,或者直接下载模板文件，填写*车辆编号* 和 你想修改的信息列</span>。</li>
            </ol>
          </div>
        </el-form-item>
        <el-form-item label="大区" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择大区">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加盟商" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择加盟商">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运营区域" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择加盟商">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆编号" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-input v-model="value" placeholder="请输入车辆编号"></el-input>
        </el-form-item>
        <el-form-item label="报警开关" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择大区">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运营状态" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="如果车辆已投放市场请选择 运营中">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车型" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择车型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="总续航里程" v-if="form.resource=='1'" :label-width="formLabelWidth">
            <el-input placeholder="请输入总续航里程" v-model="input2">
              <template slot="append">km</template>
            </el-input>
        </el-form-item>
        <el-form-item label="低里程报警" v-if="form.resource=='1'" :label-width="formLabelWidth">
            <el-input placeholder="请输入低里程报警" v-model="input2">
              <template slot="append">km</template>
            </el-input>
        </el-form-item>
        <el-form-item label="标准计费" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择标准计费">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特权计费" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择特权计费">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备IMEI" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择设备IMEI">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备SIM" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择设备SIM">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备IMEI 2" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-input placeholder="请输入内容" v-model="form.textarea"></el-input>
        </el-form-item>
        <el-form-item label="设备SIM 2" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-input placeholder="请输入内容" v-model="form.textarea"></el-input>
        </el-form-item>
        <el-form-item label="备注信息" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.textarea"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { allRegion, allianceListByRegionId } from "@/api/region";
export default {
  name: "carlist",
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      AllianOptionsDialog: [], // 查询大区
      allianceOptionsDialog: [], // 加盟商
      query: {},
      value2: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableData: [],
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
      formLabelWidth: "120px",
      dialogtitle: "",
      dialogForm: false
    };
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 新增
    handleCreate() {
      this.dialogtitle = "添加车辆";
      this.dialogForm = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.carlist {
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
            width: 100px;
            text-align: right;
            line-height: 36px;
            margin-right: 10px;
          }
        }
      }
    }
    .upload-create{
      h3,ol{
        margin: 0px;
        padding: 0px;
        line-height: 20px;
      }
      ol{
        margin-left: 15px;
        span{
          color: red;
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
.carlist-container .search-container /deep/ .el-input {
  width: 230px;
}
.carlist-container .Operation /deep/ .el-input,
.el-textarea {
  width: 300px;
}
.carlist-container /deep/ .el-dialog{
  margin: 0 auto 50px;
}
</style>