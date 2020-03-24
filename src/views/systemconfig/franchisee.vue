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
        <el-table-column prop="address" label="联系地址" align="center">
          <template slot-scope="scope">{{scope.row.provinceCityCounty+scope.row.address}}</template>
        </el-table-column>
        <el-table-column prop="areaList" label="运营区域" align="center">
          <template slot-scope="scope">
            <div
              v-for="(item,index) in scope.row.areaList"
              :key="item.index"
            >{{index+1}}-{{item.allianceCityName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="electrombileCount" label="车辆数量" width="150" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200" fixed="right">
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
    <el-dialog :title="dialogtitle" width="35%" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="大区" prop="regionId">
          <el-select v-model="form.regionId" placeholder="请选择大区">
            <el-option
              v-for="item in AllianOptions"
              :key="item.allianceId"
              :label="item.allianceName"
              :value="item.allianceId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加盟地区" class="addredss-select">
          <!-- :prop="`${index}allianceCity`"
            :rules="[
              { required: true, message: '请选择省市县', trigger: 'change'}
            ]" -->
          <el-form-item
            style="margin-bottom:20px;"
            v-for="(item,index) in form.areaList"
            :key="index"
            
          >
            <el-select
              v-model="item.allianceProvince"
              placeholder="请选择省"
              clearable
              @change="handleChooseProvinces($event,index)"
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            <el-select
              v-model="item.allianceCity"
              placeholder="请选择市"
              clearable
              @change="handleChooseCity($event,index)"
            >
              <el-option
                v-for="item in cityList[index]"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            <el-select v-model="item.allianceCounty" placeholder="请选择区" clearable>
              <el-option
                v-for="item in areaList[index]"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            <el-button 
              type="danger" 
              v-if="form.areaList.length != 1" 
              icon="el-icon-delete" 
              circle 
              style="margin-left:10px;"
              @click="handledeleteindex(index)"
            ></el-button>
          </el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="addDomain" circle></el-button>
        </el-form-item>
        <el-form-item label="编号前缀" prop="numberPrefix">
          <el-input
            v-model="form.numberPrefix"
            placeholder="根据地区固定电话编码后三位设置，如：杭州571"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="押金设置" prop="setCash">
          <el-input
            v-model="form.setCash"
            type="number"
            placeholder="请输入整数数字，如：199，若无请输入0"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="骑行余额" prop="rideBalance">
          <el-input
            v-model="form.rideBalance"
            type="number"
            placeholder="输入的数字必须大于或等于0的整数，如：3"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="透支金额" prop="overdraftBalance">
          <el-input
            v-model="form.overdraftBalance"
            type="number"
            placeholder="0代表不可透支，请输入整数负数，如：-3"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="加盟商名称" prop="allianceName">
          <el-input v-model="form.allianceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="allianceContact">
          <el-input v-model="form.allianceContact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input v-model="form.contactPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" prop="servicePhone">
          <el-input v-model="form.servicePhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" class="addredss-select" prop="province">
          <el-select
            v-model="form.province"
            placeholder="请选择省"
            clearable
            @change="handleChooseProvincesRadio"
          >
            <el-option
              v-for="item in provinceList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.city"
            placeholder="请选择市"
            clearable
            @change="handleChoosecityRadio"
          >
            <el-option
              v-for="item in cityListRadio"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
          <el-select v-model="form.county" placeholder="请选择区" clearable>
            <el-option
              v-for="item in areaListRadio"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码">
          <el-input v-model="form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitform">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryByCode
} from '@/api/publicapi';
import { 
  allianceListByRegionId,
  allianceList,
  createalliance
} from "@/api/franchisee";
export default {
  name: "franchisee",
  data() {
    var validateareaList = (rule, value, callback) => {
      console.log(rule,value)
      // if (value.allianceProvince !="" && value.allianceCity !="" && value.allianceCounty !="" ) {
      //   callback();
      // } else {
        
      //   callback(new Error("请选择加盟地区"));
      // }
    };
    return {
      AllianOptions: [], // 查询大区
      listQuery: {
        allianceId: "",
        allianceName: "",
        current: 1,
        size: 10
      },
      tableData: [],
      total: 0,
      loading: true,
      dialogFormVisible: false,
      provinceOptions: [], //多选新增加盟商省
      cityList: [[]], //多选新增加盟商市
      areaList: [[]], //多选新增加盟商县
      provinceList: [], //省
      cityListRadio: [], //市
      areaListRadio: [], //县
      form: {
        regionId: "",
        areaList: [
          {
            allianceProvince: "",
            allianceCity: "",
            allianceCounty: ""
          }
        ],
        numberPrefix: "",
        setCash: "",
        rideBalance: "",
        overdraftBalance: "",
        allianceName: "",
        allianceContact: "",
        contactPhone: "",
        servicePhone: "",
        province: "",
        city: "",
        county: "",
        address: "",
        provinceCityCounty: "",
        password: ""
      },
      rules: {
        regionId: [
          { required: true, message: "请选择大区", trigger: "change" }
        ],
        areaList: [
          { required: true, validator: validateareaList, trigger: "change" }
        ],
        numberPrefix: [
          { required: true, message: "请输入编号前缀", trigger: "blur" }
        ],
        setCash: [
          { required: true, message: "请输入押金设置", trigger: "blur" }
        ],
        rideBalance: [
          { required: true, message: "请输入骑行余额", trigger: "blur" }
        ],
        overdraftBalance: [
          { required: true, message: "请输入透支余额", trigger: "blur" }
        ],
        allianceName: [
          { required: true, message: "请输入加盟商名称", trigger: "blur" }
        ],
        allianceContact: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        contactPhone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        servicePhone: [
          { required: true, message: "请输入客服电话", trigger: "blur" }
        ],
        province: [
          { required: true, message: "请选择联系地址", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      dialogtitle: ""
    };
  },
  mounted() {
    // 查询大区下的加盟商（搜索下拉用）
    this.getallianList();
    // 获取加盟商表格
    this.getList();
    // 获取城市
    this.getprovinces()
  },
  methods: {
    // 查询大区下的加盟商（搜索下拉用）
    getallianList() {
      allianceListByRegionId().then(res => {
        console.log(res, "11111");
        if (res.code == 0) {
          this.AllianOptions = res.data;
        }
      });
    },
    // 获取加盟商表格
    getList() {
      allianceList(this.listQuery).then(res => {
        if (res.code == 0) {
          this.total = res.data.total;
          this.tableData = res.data.rows;
          this.loading = false;
        }
      });
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
    handleCreate() {
      this.dialogtitle = "新增加盟商";
      this.dialogFormVisible = true;
    },
    // 新增加盟地区
    addDomain() {
      this.form.areaList.push({
          allianceProvince: "",
          allianceCity: "",
          allianceCounty: ""
      });
    },
    // 新增加盟地区删除
    handledeleteindex(index){
      this.form.areaList.splice(index, 1);
      this.cityList.splice(index,1)
      this.areaList.splice(index,1)
    },
    // 获取加盟商新增下拉列表数据
    getLocalList({parent:params}, name,index) {
      queryByCode({parent:params}).then(res => {
        if (res.code == 0) {
          console.log(index,res.data,'----------')
          if(name == 'cityOptions'){
            this.$set(this.cityList, index, res.data || [] )
          }else if(name == 'areaOptions'){
            this.$set(this.areaList, index, res.data || [] )
          }else{
            this[name] = res.data || []
          }
        }
      });
    },
    // 获取省
    getprovinces() {
      this.getLocalList({parent: 0}, "provinceOptions", 0);
      this.getProvincesList({parent: 0}, "provinceList")
    },
    // 根据省获取市
    handleChooseProvinces(v,cityIndex) {
      this.form.areaList.forEach((item,index)=>{
        this.form.areaList[cityIndex].allianceCity = "";
        this.form.areaList[cityIndex].allianceCounty = "";
      })
      console.log(v,cityIndex)
      this.getLocalList({parent: v}, "cityOptions", cityIndex);
    },
    // 根据市区获取县
    handleChooseCity(v,areaIndex) {
      this.form.areaList.forEach((item,index)=>{
        this.form.areaList[areaIndex].allianceCounty = "";
      })
      console.log(v,areaIndex)
      this.getLocalList({ parent: v }, "areaOptions",areaIndex);
    },
    // 新增地址
    getProvincesList({parent:params}, name) {
      queryByCode({parent:params}).then(res => {
        if (res.code == 0) {
          if (this[name]) {
              this[name] = res.data;
            }
        }
      });
    },
    // 根据省获取市
    handleChooseProvincesRadio(v) {
      console.log(v,'111111')
      this.form.city = "";
      this.form.county = "";
      this.getProvincesList({ parent: v }, "cityListRadio");
    },
    // 根据市区获取县
    handleChoosecityRadio(v) {
      this.form.county = "";
      this.getProvincesList({ parent: v }, "areaListRadio");
    },
    submitform() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // alert("submit!");
          // console.log(this.form,'11111111')
          createalliance(this.form).then(res=>{

          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.franchisee {
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
.franchisee-container .search-container /deep/ .el-input {
  width: 200px;
}
.franchisee-container .addredss-select /deep/ .el-select > .el-input {
  width: 160px;
}
.franchisee-container /deep/ .el-dialog {
  margin: 0 auto 50px;
}
.franchisee-container .form /deep/ .el-input,
.el-textarea {
  width: 400px;
}
</style>