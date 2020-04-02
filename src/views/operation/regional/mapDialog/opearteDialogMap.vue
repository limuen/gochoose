<template>
  <div class="FromMapDialog">
    <el-dialog :title="dialogtitle" width="40%" class="FromMap" :visible.sync="dialogFormVisible">
      <el-row :gutter="24">
        <el-form :model="form" ref="form" :rules="rules">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="大区" :label-width="formLabelWidth" prop="largeAreaId">
                <el-select
                  v-model="form.largeAreaId"
                  clearable
                  @change="allianValue"
                  placeholder="请选择大区"
                  @clear="clearValue"
                >
                  <el-option
                    v-for="item in AllianOptions"
                    :key="item.regionId"
                    :label="item.regionName"
                    :value="item.regionId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="加盟商" :label-width="formLabelWidth" prop="franchiseeId">
                <el-select v-model="form.franchiseeId" clearable placeholder="请选择加盟商">
                  <el-option
                    v-for="item in allianceOptions"
                    :key="item.allianceId"
                    :label="item.allianceName"
                    :value="item.allianceId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="区域名称" :label-width="formLabelWidth" prop="regionName">
                <el-input v-model="form.regionName" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="调度费" :label-width="formLabelWidth" prop="dispatchFee">
                <el-input v-model="form.dispatchFee" v-number="2" autocomplete="off"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item
                label="区域配置说明："
                class="bg-size-color"
                :label-width="formLabelWidth"
                required
              >
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
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane
                    :label="item.label"
                    :name="item.name"
                    v-for="(item, index) in tabsList"
                    :key="index"
                  >
                  </el-tab-pane>
                </el-tabs>
                <component 
                    :is="componentName" 
                    :strokeColor="strokeColor" 
                    :Tabsactive="Tabsactive"
                    @markerRegion="markerRegion"
                    v-loading="mapLading"
                    ref="MapRegion"
                ></component>
              </el-form-item>
            </div>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">保 存</el-button>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
        align="left"
        style="margin-top:20px;padding:0px 15px;"
      >
        说明:
        运营区域，是指把一个加盟商的车辆限制在多个区域内进行借还，用户在区域外还车会产生区域外调度费，一个加盟商可以设置多个运营区域。
      </div>
    </el-dialog>
  </div>
</template>

<script>
import number from "@/directive/input-filter";
import { allRegion, allianceListByRegionId } from "@/api/region";
export default {
  props: {
    dialogtitle: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  directives: { number },
  name: "Aamp",
  data() {
    return {
      componentName: "Amap",
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      activeName: "Visible",
      tabsList: [
        { label: "用户可见区域", name: "Visible" },
        { label: "实际区域", name: "Actual" }
      ],
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        largeAreaId: "",
        franchiseeId: "",
        regionName: "",
        dispatchFee: "",
        seeingRegionModelList: [], //用户区域的经纬度列表
        actualRegionModelList: [], //实际区域的经纬度列表
      },
      rules: {
        largeAreaId: [
          { required: true, message: "请选择大区", trigger: "change" }
        ],
        franchiseeId: [
          { required: true, message: "请选择加盟商", trigger: "change" }
        ],
        regionName: [
          { required: true, message: "请输入区域名称", trigger: "blur" }
        ],
        dispatchFee: [
          { required: true, message: "请输入调度费", trigger: "blur" }
        ]
      },
      Tabsactive: false,
      strokeColor: "#67c23a",
      mapLading: false,
    };
  },
  mounted() {
    // 查询大区
    this.getallianList()
  },
  methods: {
    // 查询大区
    getallianList() {
      allRegion()
        .then(res => {
          if (res.code == 0) {
            this.AllianOptions = res.data;
          }
        })
        .catch(() => {});
    },
    clearValue() {
      this.allianceOptions = [];
    },
    // 获取到大区的id去请求加盟商
    allianValue(value) {
      this.form.franchiseeId = "";
      this.allianceOptions = [];
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptions = res.data;
          }
        })
        .catch(() => {});
    },
    markerRegion(v) {
        console.log(v,'子组件传递出来的用户可见区域')
        this.form.seeingRegionModelList = v;
        console.log(this.form,'编辑完成用户可见区域点击提交传递到from')
    },
    handleClick(tab, event) {
      console.log(tab, "弹窗里面的tab切换");
      if(this.activeName == "Actual"){
          if(this.form.seeingRegionModelList.length <= 3){
              this.mapLading = true;
              this.$notify.error({
                title: '错误',
                message: '请完善用户可见区域'
              });
          }else{
              this.$refs.MapRegion.clickTwo()
              this.mapLading = false;
              this.Tabsactive = true;
          }
      }else{
          this.$refs.MapRegion.clickOn()
          this.Tabsactive = false;
          this.mapLading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.FromMapDialog {
  .FromMap {
    .bg-size-color {
      span {
        color: red;
      }
    }
  }
}
</style>