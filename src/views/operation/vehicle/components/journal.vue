<template>
  <div class="journal-container">
    <div class="create-button">
      <el-button type="primary" @click="handleCreate" icon="el-icon-edit">创建运维单</el-button>
    </div>
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select v-model="value" placeholder="请选择大区">
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
            <span>责任区</span>
            <el-select v-model="value" placeholder="请选择责任区">
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
            <span>运维方式</span>
            <el-select v-model="value" placeholder="请选择运维方式">
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
            <span>运维员</span>
            <el-select v-model="value" placeholder="请选择运维员姓名">
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
            <span>运维手机</span>
            <el-input v-model="value" placeholder="请输入运维手机"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>维修部件</span>
            <el-select v-model="value" placeholder="请选择维修部件">
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
            <span>处理结果</span>
            <el-select v-model="value" placeholder="请选择处理结果">
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
            <span>处理时效</span>
            <el-select v-model="value" placeholder="请选择处理时效">
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
            <span>运维单号</span>
            <el-input v-model="value" placeholder="请输入运维单号"></el-input>
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
            <span>评分</span>
            <el-select v-model="value" placeholder="请选择评分">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <span>派单时间</span>
            <el-date-picker
              v-model="value2"
              type="datetimerange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="margin-right: 20px;"
            ></el-date-picker>
            <el-button plain @click="Thisweek">本周</el-button>
            <el-button plain @click="Thismonth">本月</el-button>
            <el-button plain @click="Thisquarter">本季度</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="searchform">查询</el-button>
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

    <!-- 编辑新增 -->
    <el-dialog :title="dialogtitle" width="35%" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="Operation">
        <el-form-item label="车辆编号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="运维工序" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择运维工序">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维修部件" :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="运维员" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择运维员">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维修结果" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结果评分" :label-width="formLabelWidth">
          <el-input v-model="form.name" type="number" step="0.01" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细信息" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="form.textarea"></el-input>
        </el-form-item>
        <el-form-item label="运维图片" :label-width="formLabelWidth">
          <el-upload 
            action="#" 
            list-type="picture-card" 
            :limit="1"  
            :auto-upload="false"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="报修记录" :label-width="formLabelWidth" class="checkbox-content">
          <div>
            <input type="checkbox" id="jilu"/>
            <label for="jilu">
                  <ul>
                    <li>报修单号</li>
                    <li>来源</li>
                    <li>故障</li>
                    <li>详情</li>
                  </ul>
            </label>
          </div>
          <div>
            <input type="checkbox" id="jilu1"/>
            <label for="jilu1">
               <ul>
                    <li>报修单号</li>
                    <li>来源</li>
                    <li>故障</li>
                    <li>详情</li>
                  </ul>
            </label>
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
import { getDay,transTime,getDate } from '@/utils/index.js'
export default {
  name: "journal",
  data() {
    return {
      query: {},
      value2: "",
      dialogtitle: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
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
      checkList: ["选中且禁用", "复选框 A"],
      dialogFormVisible: false,
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
    };
  },
  mounted(){
    console.log('进来了')
  },
  methods: {
    // 搜索
    searchform() {
      console.log(this.value2)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    // 获取本周
    Thisweek(){
      let week = transTime(new Date())
      let date =  getDay('week',week)
      console.log(date,'date')
      // start 
      let start = `${date[0]} 00:00:00`
      // end
      let end = `${date.slice(-1)} 23:59:59`
      this.value2 = [start, end]
      // fgetDate(month,)
    },
    // 获取本月
    Thismonth() {
      let month = transTime(new Date())
      let date =  getDay('month',month)
      console.log(date,'date')
      console.log(date[0],date.slice(-1),'1111')
      // start 
      let start = `${date[0]} 00:00:00`
      // end
      let end = `${date.slice(-1)} 23:59:59`
      this.value2 = [start, end]
      console.log(this.value2)
    },
    // 获取季度
    Thisquarter() {
      let quarter = transTime(new Date())
      let date =  getDay('quarter',quarter)
      console.log(date,'date')
      // start 
      let start = `${date[0]} 00:00:00`
      // end
      let end = `${date.slice(-1)} 23:59:59`
      this.value2 = [start, end]
    },
    // 创建
    handleCreate() {
      this.dialogtitle = "创建运维单";
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.journal {
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
            width: 70px;
            text-align: right;
            line-height: 36px;
            margin-right: 10px;
          }
        }
      }
    }
    .Operation{
      .checkbox-content{
        ul{
          margin: 0;
          padding: 0;
          list-style: none;
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
.journal-container .search-container /deep/ .el-input {
  width: 195px;
}
.journal-container .Operation /deep/ .el-input,
.el-textarea {
  width: 300px;
}
.Operation .checkbox-content /deep/ .el-form-item__content input[type="checkbox"]{
    margin-top: 14px;
    margin-right: 15px;
}
.Operation .checkbox-content /deep/ .el-form-item__content{
  display: flex;
}
.Operation .checkbox-content /deep/ .el-form-item__content>div{
  display: flex;
  margin-right: 20px;
  background: #ccc;
  padding: 10px;
}
.journal-container /deep/ .el-dialog{
  margin: 0 auto 50px;
}
</style>