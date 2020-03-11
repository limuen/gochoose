<template>
  <div class="charge-container">
    <div class="create-button">
      <el-button type="primary" @click="handleCreate" icon="el-icon-edit">添加收费标准</el-button>
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
            <span>计费方式</span>
            <el-select v-model="value" placeholder="请选择计费方式">
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
            <el-button type="text" @click="handleedit(scope.row.id)">忽略</el-button>
            <el-button type="text" @click="handleedit(scope.row.id)">设为待处理</el-button>
            <el-button type="text" @click="handleedit(scope.row.id)">工单指派</el-button>
            <el-button type="text" @click="handleedit(scope.row.id)">运维日志</el-button>
            <el-button type="text" @click="handleedit(scope.row.id)">给奖励</el-button>
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
        :current-page.sync="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>

    <!-- 新增收费标准 -->
    <el-dialog :title="新增收费标准" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="运营商" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加盟商" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"  style="width:195px;" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="计费方式" :label-width="formLabelWidth">
            <el-radio-group v-model="form.resource">
            <el-radio label="按时间计费"></el-radio>
            <el-radio label="时间+里程计费"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="起步价" class="editPrice" :label-width="formLabelWidth">
            <el-input placeholder="请输入内容" type="number" v-model.number="input2">
                <template slot="append">元</template>
            </el-input>
            <el-input placeholder="请输入内容" type="number" v-model.number="input2">
                <template slot="append">分钟</template>
            </el-input>
        </el-form-item>
        <el-form-item class="forminfo" :label-width="formlabelinfo">
            预览：前 <span>2</span>分钟，收费 <span>0</span>元(不足 <span>2</span>分钟以 <span>2</span>分钟计费)
        </el-form-item>
        <el-form-item class="forminfo" :label-width="formlabelinfo">
          最低收费<span>0</span>元
        </el-form-item>
        <el-form-item label="基本单价" class="editPrice" :label-width="formLabelWidth">
          <el-input placeholder="请输入内容" step="0.01" type="number" v-model.number="input2">
                <template slot="append">元</template>
          </el-input>
          <el-input v-model="form.name" type="number" autocomplete="off"></el-input>
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="forminfo" :label-width="formlabelinfo">
          说明：超出 <span>2</span>分钟的时间，收 <span>1</span>元/ <span>15</span>分钟
        </el-form-item>
        <el-form-item class="forminfo" :label-width="formlabelinfo">
          说明：<span>1</span> 元/ <span>15</span> 分钟
        </el-form-item>
        <el-form-item label="里程单价" class="editPrice" :label-width="formLabelWidth">
          <el-input placeholder="请输入内容" step="1" type="number" v-model.number="input2">
                <template slot="append">元</template>
          </el-input>
          <el-input placeholder="请输入内容" type="number" v-model.number="input2">
                <template slot="append">千米</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最高限额" class="editPrice elselect-bg" :label-width="formLabelWidth">
          <el-input v-model="form.name" type="number" autocomplete="off"></el-input>
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input placeholder="请输入内容" step="1" type="number" v-model.number="input2">
                <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item class="forminfo" :label-width="formlabelinfo">
          注：最高限额金额设置为<span>0</span>时，将按照基本单价计费
        </el-form-item>
        <el-form-item class="forminfo" :label-width="formlabelinfo">
          说明：收 <span>2.5</span>元/ <span>2</span>千米
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
  name: "charge",
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
      formlabelinfo: "111px",
      dialogcustormer: false
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
      console.log("111");
      this.dialogFormVisible = true;
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
    .elselect-bg{
      .el-select{
        background: #F5F7FA;
      }
      
    }
    .editPrice{
      .el-input{
        width: 250px;
      }
      .el-input:nth-child(2),.el-select,.el-input:nth-child(3){
        margin-left: -4px;
      }
    }
    .forminfo{
      margin: 10px;
      
      span{
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
.charge-container .editPrice /deep/ .el-input .el-input__inner{
  border-radius: 0px;
}
.charge-container .editPrice /deep/ .el-input-group__append{
  border-radius: 0px;
}
.charge-container .elselect-bg /deep/ .el-select .el-input__inner{
  background: #F5F7FA;
}
.charge-container .forminfo  /deep/ .el-form-item__content{
  line-height: 20px;
  font-size: 12px;
}
</style>