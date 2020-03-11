<template>
  <div class="cardrecharge-container">
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>退款状态</span>
            <el-select v-model="value" placeholder="请选择退款状态">
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
            <span>渠道</span>
            <el-select v-model="value" placeholder="请选择渠道">
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
            <span>用户昵称</span>
            <el-input v-model="value" placeholder="请输入用户昵称"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>用户电话</span>
            <el-input v-model="value" placeholder="请输入用户电话"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>打款单号</span>
            <el-input v-model="value" placeholder="请输入打款单号"></el-input>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <span>打款时间</span>
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
            <el-button plain>本周</el-button>
            <el-button plain>本月</el-button>
            <el-button plain>本季度</el-button>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple">
            <span>退款时间</span>
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
            <el-button plain>本周</el-button>
            <el-button plain>本月</el-button>
            <el-button plain>本季度</el-button>
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
              <el-button type="text" @click="handleedit(scope.row.id)">
                编辑
              </el-button>
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
          ></el-pagination> -->
          <span>总金额：433元，已退款：30元，收益：403元</span>
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
      <div>
        <i class="el-icon-folder-opened excel-blue"></i>
        <span>导出excel</span>
      </div>
    </div>
    

  </div>
</template>

<script>
export default {
  name: "cardrecharge",
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
    };
  },
  methods: {
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.cardrecharge {
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
      .editPrice{
        .el-input:nth-child(2),.el-select,.el-input:nth-child(3){
            margin-left: -4px;
        }
        }
    }
    .page-excel{
      display: flex;
      justify-content: space-between;
      .page-container{
          >span{
              line-height: 32px;
              font-size: 14px;
              margin-right: 10px;
          }
      }
      &>div:nth-child(2){
        margin-top: 25px;
        color: #20a0ff;
        cursor: pointer;
      }
    }
    
  }
}
.cardrecharge-container .search-container /deep/ .el-input {
  width: 195px;
}
</style>