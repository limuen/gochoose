<template>
  <div class="betterylist-container">
    <div class="create-button">
      <el-button type="primary" @click="handleCreate" icon="el-icon-edit">添加电池</el-button>
    </div>
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>运营商</span>
            <el-select v-model="value" placeholder="请选择运营商">
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
            <span>加盟商</span>
            <el-select v-model="value" placeholder="请选择加盟商">
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
            <span>车辆编号</span>
            <el-input v-model="value" placeholder="请输入车辆编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>电池imei</span>
            <el-input v-model="value" placeholder="请输入电池imei"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>电池编号</span>
            <el-input v-model="value" placeholder="请输入电池编号后6位"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>电池厂商</span>
            <el-input v-model="value" placeholder="请输入电池厂商"></el-input>
          </div>
        </el-col>

        <el-col :span="24">
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
    </div>

    <!-- 编辑 -->
    <el-dialog :title="dialogtitle" width="35%" :visible.sync="dialogForm">
      <el-form :model="form" class="Operation">
        <el-form-item label="操作方式" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio :label="1">单个添加</el-radio>
            <el-radio :label="2">批量添加</el-radio>
            <el-radio :label="3">批量修改</el-radio>
          </el-radio-group>
        </el-form-item>

        
        <el-form-item label="大区" v-if="form.resource=='1' || form.resource=='2' || form.resource=='3'" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择大区">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加盟商" v-if="form.resource=='1' || form.resource=='2' || form.resource=='3'" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择加盟商">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电池imei" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-input v-model="value" placeholder="请输入电池imei"></el-input>
        </el-form-item>
        <el-form-item label="电池厂商" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-input placeholder="请输入电池厂商" v-model="input2"></el-input>
        </el-form-item>
        <el-form-item label="电池容量" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-input placeholder="请输入电池容量" v-model="input2">
            <template slot="append">vh</template>
          </el-input>
        </el-form-item>
        <el-form-item label="电池描述" v-if="form.resource=='1'" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.textarea"></el-input>
        </el-form-item>
        <el-form-item
          label="电池信息文件"
          v-if="form.resource=='2' || form.resource=='3'"
          class="upload-create"
          :label-width="formLabelWidth"
        >
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
        <el-form-item
          label="电池信息文件"
          v-if="form.resource=='5'"
          class="upload-create"
          :label-width="formLabelWidth"
        >
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
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "betterylist",
  data() {
    return {
      query: {},
      value2: "",
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
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      formLabelWidth: "120px",
      dialogtitle: "",
      dialogForm: false
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleCreate() {
      this.dialogtitle = "添加电池";
      this.dialogForm = true;
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
  width: 195px;
}
.betterylist-container .Operation /deep/ .el-input,
.el-textarea {
  width: 300px;
}
</style>