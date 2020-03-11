<template>
  <div class="sibility-container">
    <div class="create-button">
      <el-button type="primary" @click="handleCreate" icon="el-icon-edit">添加责任区域</el-button>
    </div>
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>运营商</span>
            <el-select v-model="value" placeholder="请选择状态">
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
            <el-select v-model="value" placeholder="请选择状态">
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
            <span>区域名称</span>
            <el-input v-model="value" placeholder="请输入区域名称"></el-input>
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
              <el-button type="text" @click="handleedit(scope.row.id)">
                忽略
              </el-button>
              <el-button type="text" @click="handleedit(scope.row.id)">
                设为待处理
              </el-button>
              <el-button type="text" @click="handleedit(scope.row.id)">
                工单指派
              </el-button>
              <el-button type="text" @click="handleedit(scope.row.id)">
                运维日志
              </el-button>
              <el-button type="text" @click="handleedit(scope.row.id)">
                给奖励
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-container">
          <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="query.currentPage"
            @current-change="getTrainingList"
          ></el-pagination> -->
          <el-pagination
              background
              align="left"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
          </el-pagination>
      </div>


    <!-- 添加修改责任区域 -->
    <el-dialog :title="dialogtitle" class="sibilityform" :visible.sync="dialogForm">
      <el-row :gutter="24">
        <el-form :model="form">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="大区" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择大区">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="加盟商" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选择加盟商">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="区域名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="区域配置说明：" class="bg-size-color" :label-width="formLabelWidth">
                设备是否出区域，以实际区域为准。
                <span>用户可见区域</span>请比实际区域稍小一点。必须先画完用户可见区域才能画
                <span>实际区域</span>。
                <div>
                  注意: 在地图中画完区域后，必须点击
                  <span>完成</span>按钮。
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item :label-width="formLabelWidth">
                <div class="gdmap"></div>
              </el-form-item>
            </div>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
      <div slot="footer" class="dialog-footer" align="left" style="margin-top:20px;padding:0px 15px;">
        说明:
        责任区域，本加盟商其它区域的车辆如果进入此区域，运维消息会推送给对应的运维员与此区域管理员APP。
      </div>
    </el-dialog>


  </div>
</template>

<script>
export default {
  name: "sibility",
  data() {
    return {
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
      checkList: ['选中且禁用','复选框 A'],
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
      dialogForm: false,
      dialogtitle: "",
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
        this.dialogtitle = "新增责任区域";
        this.dialogForm = true;
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
      .gdmap{
        width:100%;
        height: 400px;
      }
    }
  }
}
.sibility-container .search-container /deep/ .el-input {
  width: 195px;
}
.sibility-container /deep/ .page-container{
    justify-content: flex-start;
}
</style>