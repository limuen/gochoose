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
            <span>活动名称</span>
            <el-input v-model="value" placeholder="请输入标题"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
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

    <!-- 添加修改新分享 -->
    <el-dialog :title="dialogtitle" width="35%" :visible.sync="dialogForm">
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
        <el-form-item label="分享类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.resource">
            <el-radio :label="1">行程分享</el-radio>
            <el-radio :label="2">邀请好友</el-radio>
          </el-radio-group>
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
        <el-form-item label="分享图片" :label-width="formLabelWidth">
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
        </el-form-item>
        <el-form-item label="分享内容" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="3" placeholder="请输入分享内容" v-model="form.textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="dialogForm = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "share",
  data() {
    return {
      query: {},
      value1: "",
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
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 新增分享
    handleCreate() {
      this.dialogtitle = "新增分享活动";
      this.dialogForm = true;
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
.share-container /deep/ .el-dialog{
  margin: 0 auto 50px;
}
</style>