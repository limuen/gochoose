<template>
  <div class="mochaitmo-container">
    <div class="create-button">
      <!-- <el-button type="primary" @click="handleCreate" icon="el-icon-edit">新增运维员</el-button> -->
    </div>
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select v-model="listQuery.regionId" clearable @change="allianValue" placeholder="请选择大区">
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
            <el-select v-model="listQuery.allianceId" clearable @change="getdutyList" placeholder="请选择加盟商">
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
            <el-select
              clearable
              v-model="listQuery.areaId"
              placeholder="请选择责任区域"
            >
              <el-option
                v-for="item in areaOptions"
                :key="item.id"
                :label="item.regionName"
                :value="item.id"
              ></el-option>
          </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>姓名</span>
            <el-input v-model="listQuery.operationName" clearable placeholder="请输入姓名"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>电话</span>
            <el-input v-model="listQuery.operationPhone" clearable placeholder="请输入电话"></el-input>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary"  @click="handleFilter">查询</el-button>
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
        <el-table-column prop="operationName" label="联系人" align="center"></el-table-column>
        <el-table-column prop="operationPhone" label="联系电话"  align="center"></el-table-column>
        <el-table-column prop="roleModelList" label="运维角色" align="center">
           <template slot-scope="scope">
             <el-tag
              style="margin-right:5px;"
              v-for="item in scope.row.roleModelList"
              :key="item.index"
              effect="dark"
              :type=" item.roleName | roleName"
             >{{item.roleName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="维修部件" label="派单状态" align="center"></el-table-column>
        <el-table-column prop="dutyModelList" label="责任区域" align="center"></el-table-column>
        <el-table-column prop="allianceName" label="所属加盟商" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleedit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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

    <!-- 新增编辑运维 -->
    <!-- <el-dialog :title="dialogtitle" width="35%" :visible.sync="dialogFormVisible">
      <el-form :model="form">
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
        </el-form-item>
        <el-form-item label="运维角色" :label-width="formLabelWidth">
          <el-checkbox-group v-model="duty" @change="changeCheckAll">
            <el-checkbox v-for="item in addproduct" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="开启派单" :label-width="formLabelWidth">
          <el-select v-model="value" placeholder="请选择开启派单">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="派单时间" :label-width="formLabelWidth">
            <el-time-picker
              is-range
              arrow-control
              v-model="value2"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注说明" :label-width="formLabelWidth">
          <el-input v-model="form.name" type="textarea" show-password autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import {
  allRegion,
  allianceListByRegionId,

} from "@/api/region";
import {
  queryManagerListPage
} from '@/api/mochaitmo';
import { findByLargeFranchisee } from "@/api/responsibility";
export default {
  name: "mochaitmo",
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      areaOptions: [], // 责任区域
      listQuery: {
        regionId: "",
        allianceId: "",
        areaId: "",
        operationName: "",
        operationPhone: "",
        current: 1,
        size: 10
      },
      total: 0,
      loading: false,
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
      dialogtitle: ""
    };
  },
  mounted() {
    // 查询大区
    this.getallianList()
    // 获取列表
    this.getList()
  },
  filters: {
      roleName(name){
        const roleMap = {
          '维修员': "danger",
          '调度员': "warning",
          '找车员': "info",
          '换电员': "success"
        };
        return roleMap[name];
      },
    },
  methods: {
    // 查询大区
    getallianList() {
      allRegion().then(res => {
        if (res.code == 0) {
          this.AllianOptions = res.data;
        }
      }).catch(() => {});
    },
    
    // 获取到大区的id去请求加盟商
    allianValue(value) {
      this.listQuery.allianceId = "";
      this.listQuery.areaId = ""
      allianceListByRegionId({ regionId: value }).then(res => {
        if (res.code == 0) {
          this.allianceOptions = res.data;
        }
      }).catch(() => {});
    },
    // 通过大区id和加盟商id获取责任区域
    getdutyList(value) {
      this.listQuery.areaId = ""
      findByLargeFranchisee({
        largeAreaId: this.listQuery.regionId,
        franchiseeId: value
      }).then(res => {
        if (res.code == 0) {
          this.areaOptions = res.data;
        }
      }).catch(() => {});
    },
    
    // 获取列表
    getList() {
      this.loading = true;
      // const roleMap = {
      //     "维修员": "danger",
      //     "调度员": "warning",
      //     "找车员": "info",
      //     "换电员": "success"
      //   };
      queryManagerListPage(this.listQuery).then(res=>{
        console.log(res,'11111')
        if(res.code == 0){
          this.total = res.data.total;
          this.tableData = res.data.rows;
          // res.data.rows.forEach(item=>{
          //   item.roleModelList.forEach(el=>{
          //     if(roleMap[el.roleName]){
          //       this.tagsType = roleMap[el.roleName]
          //     }
          //   })
          // })
          this.loading = false;

        }
      }).catch(() => {});
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
    // 选择附加产品
    changeCheckAll(value) {
      // this.form.addProducts = value.join(',')
      // console.log(this.form.addProducts,'this.form.addProducts')
    },
  }
};
</script>

<style lang="scss" scoped>
.mochaitmo {
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
    }
    .page-excel {
      display: flex;
      justify-content: space-between;
    }
  }
}
.mochaitmo-container .search-container /deep/ .el-input {
  width: 200px;
}
</style>