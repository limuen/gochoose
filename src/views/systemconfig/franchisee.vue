<template>
  <div class="franchisee-container">
    <div class="create-button">
        <el-button type="primary" @click="handleCreate" icon="el-icon-edit">添加加盟商</el-button>
    </div>  
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select v-model="listQuery.allianceId" placeholder="请选择大区">
              <el-option
                v-for="item in AllianOptions"
                :key="item.allianceId"
                :label="item.allianceName"
                :value="item.allianceId"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <span>加盟商名称</span>
            <el-input v-model="listQuery.allianceName" placeholder="请输入加盟商名称"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
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
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column prop="allianceName" label="加盟商名称" width="200" align="center"></el-table-column>
        <el-table-column prop="regionName" label="所属大区" align="center"></el-table-column>
        <el-table-column prop="运维方式" label="车辆编号前缀" align="center"></el-table-column>
        <el-table-column prop="allianceContact" label="联系人" align="center"></el-table-column>
        <el-table-column prop="contactPhone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="address" label="联系地址" align="center"></el-table-column>
        <el-table-column prop="provinceCityCounty" label="运营区域" align="center"></el-table-column>
        <el-table-column prop="electrombileCount" label="车辆数量" width="150" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleedit(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
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
    </div>

    <!-- 新增修改加盟商管理 -->
    <el-dialog :title="dialogtitle" width="40%" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="form">
        <el-form-item label="大区" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择加盟商">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="加盟地区" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择加盟地区">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <i class="el-icon-refresh"></i> -->
        </el-form-item>
        <el-form-item label="编号前缀" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="押金设置" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="骑行余额" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="透支金额" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" :label-width="formLabelWidth">
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
import {
  allianceListByRegionId,
  allianceList
} from '@/api/franchisee';
export default {
  name: "franchisee",
  data() {
    return {
      AllianOptions: [], // 查询大区
      listQuery: {
        allianceId: "",
        allianceName: "",
        current	: 1,
        size: 10,
      },
      tableData: [],
      total: 0,
      loading: true,
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
  mounted() {
    // 查询大区下的加盟商（搜索下拉用）
    this.getallianList()
    // 获取加盟商表格
    this.getList()
  },
  methods: {
    // 查询大区下的加盟商（搜索下拉用）
    getallianList() {
      allianceListByRegionId().then(res=>{
        console.log(res,'11111')
        if(res.code == 0){
          this.AllianOptions = res.data;
        }
      })
    },
    // 获取加盟商表格
    getList() {
      allianceList(this.listQuery).then(res=>{
        console.log(res,'=============')
         if(res.code == 0){
          this.total = res.data.total;
          this.tableData = res.data.rows;
          this.loading = false;
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.current = 1;
      this.listQuery.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(val,'1111')
      this.listQuery.current = val;
      this.getList()
    },
    handleFilter() {
      this.listQuery.current = 1;
      this.getList()
    },
    handleCreate() {
      this.dialogtitle = "新增加盟商"
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
.franchisee {
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
    .page-excel {
      display: flex;
      justify-content: space-between;
    }
  }
}
.franchisee-container .search-container /deep/ .el-input {
  width: 200px;
}
.franchisee-container .addredss-select /deep/ .el-select>.el-input{
  width: 160px;
}
.franchisee-container /deep/ .el-dialog{
  margin: 0 auto 50px;
}
.franchisee-container .form /deep/ .el-input,.el-textarea {
  width: 300px;
}
</style>