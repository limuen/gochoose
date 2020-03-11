<template>
  <div class="region-container">
    <div class="create-button">
        <el-button type="primary" @click="handleCreate" icon="el-icon-edit">新增区域管理</el-button>
    </div>  
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="5">
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
        <el-col :span="5">
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
        <el-col :span="14">
          <div class="grid-content bg-purple">
            <span>地区选择</span>
            <el-select
              v-model="provinceId"
              placeholder="请选择省"
              clearable
              @change="getAreaList($event,'province')"
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="cityId"
              placeholder="请选择市"
              clearable
              @change="getAreaList($event,'city')"
            >
              <el-option
                v-for="item in cityOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select v-model="areaId" placeholder="请选择区" clearable>
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>负责人</span>
            <el-input v-model="value" placeholder="请输入负责人"></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>电话</span>
            <el-input v-model="value" placeholder="请输入电话"></el-input>
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

    <!-- 新增修改区域管理 -->
    <el-dialog :title="dialogtitle" width="40%" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="form">
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
        <el-form-item label="责任区域" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择责任区域">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <i class="el-icon-refresh"></i>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" class="addredss-select" :label-width="formLabelWidth">
          <el-select
              v-model="provinceId"
              placeholder="请选择省"
              clearable
              @change="getAreaList($event,'province')"
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select
              v-model="cityId"
              placeholder="请选择市"
              clearable
              @change="getAreaList($event,'city')"
            >
              <el-option
                v-for="item in cityOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select v-model="areaId" placeholder="请选择区" clearable>
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注说明" :label-width="formLabelWidth">
          <el-input v-model="form.name" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
      </div>
    </el-dialog>



  </div>
</template>

<script>
export default {
  name: "region",
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
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
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
      this.dialogtitle = "新增区域管理"
      this.dialogFormVisible = true;
    },
    getAreaList(val, key, editInit = true) {
      if (key == "province" && editInit) {
        this.form.cityId = "";
        this.form.areaId = "";
        this.cityOptions = [];
        this.areaOptions = [];
      }
      if (key == "city" && editInit) {
        this.form.areaId = "";
        this.areaOptions = [];
      }
      if (!val) return;
      let keyMap = {
        init: "provinceOptions",
        province: "cityOptions",
        city: "areaOptions"
      };
      let query = key === "init" ? { level: 1 } : { pid: val };

    //   queryArea(query)
    //     .then(res => {
    //       this[keyMap[key]] = res.data;
    //     })
    //     .catch(() => {});
    },
  }
};
</script>

<style lang="scss" scoped>
.region {
  &-container {
    .create-button{
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
    }
    i {
      cursor: pointer;
      font-size: 18px;
      margin-left: 15px;
      &:hover {
          color: #5cb6ff;
      }
    }
    .page-excel {
      display: flex;
      justify-content: space-between;
    }
  }
}
.region-container .search-container /deep/ .el-input {
  width: 185px;
}
.region-container .addredss-select /deep/ .el-select>.el-input{
  width: 160px;
}
.region-container .form /deep/ .el-input,.el-textarea {
  width: 300px;
}
</style>