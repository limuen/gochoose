<template>
  <div class="sibility-container">
    <div class="create-button">
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate">添加责任区域</el-button>
    </div>
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select
              v-model="listQuery.largeAreaId"
              clearable
              placeholder="请选择大区"
              @change="allianValue"
              @clear="clearValue"
            >
              <el-option
                v-for="item in AllianOptions"
                :key="item.regionId"
                :label="item.regionName"
                :value="item.regionId"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>加盟商</span>
            <el-select v-model="listQuery.franchiseeId" placeholder="请选择加盟商">
              <el-option
                v-for="item in allianceOptions"
                :key="item.allianceId"
                :label="item.allianceName"
                :value="item.allianceId"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>区域名称</span>
            <el-input v-model="value" placeholder="请输入区域名称" />
          </div>
        </el-col>
        <el-col :span="6">
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
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="regionName" label="区域名称" align="center" />
        <el-table-column prop="dutyName" label="负责人" align="center" />
        <el-table-column prop="franchiseeName" label="加盟商" align="center" />
        <el-table-column prop="largeAreaName" label="大区" align="center" />
        <el-table-column label="操作" align="center" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="tapEdit(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="tapArea(scope.row)">区域</el-button>
            <el-button type="primary" size="mini" @click="tapDelete(scope.row)">删除</el-button>
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
      ></el-pagination>-->
      <el-pagination
        background
        align="left"
        :current-page.sync="listQuery.current"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 添加修改责任区域 -->
    <el-dialog
      v-if="dialogFormVisible"
      :title="dialogtitle"
      class="sibilityform"
      :visible.sync="dialogForm"
    >
      <el-row :gutter="24">
        <el-form ref="form" :model="form" :rules="rules">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="大区" :label-width="formLabelWidth" prop="largeAreaId">
                <el-select v-model="form.largeAreaId" placeholder="请选择大区" @change="formallianValue">
                  <el-option
                    v-for="item in AllianOptions"
                    :key="item.regionId"
                    :label="item.regionName"
                    :value="item.regionId"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="加盟商" :label-width="formLabelWidth" prop="franchiseeId">
                <el-select v-model="form.franchiseeId" placeholder="请选择加盟商">
                  <el-option
                    v-for="item in formallianceOptions"
                    :key="item.allianceId"
                    :label="item.allianceName"
                    :value="item.allianceId"
                  />
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="区域名称" :label-width="formLabelWidth" prop="regionName">
                <el-input v-model="form.regionName" autocomplete="off" placeholder="请输入区域名称" />
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
                <div class="gdmap">
                  <component
                    :is="componentName"
                    ref="MapRegion"
                    v-loading="mapLading"
                    :tabsactive="false"
                    :is-edit="true"
                    @markerRegion="markerRegion"
                  />
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="tapSave">保 存</el-button>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
        align="left"
        style="margin-top:20px;padding:0px 15px;"
      >
        说明:
        责任区域，本加盟商其它区域的车辆如果进入此区域，运维消息会推送给对应的运维员与此区域管理员APP。
      </div>
    </el-dialog>

    <OpearteModelList v-if="dialogtitle=='运营区域'" ref="OpearteModelList" :dialogtitle="dialogtitle" />
  </div>
</template>

<script>
import { allRegion, allianceListByRegionId } from '@/api/region'
import {
  dutyParkQueryManagerListPage,
  dutyParkFindById,
  dutyParkInsert,
  dutyParkUpdate,
  dutyParkDelete,
  dutyParkFindPositionModelList
} from '@/api/operationRegional'
import OpearteModelList from '../mapDialog/OpearteModelList'
export default {
  name: 'Sibility',
  components: {
    OpearteModelList
  },
  data() {
    return {
      listQuery: {
        largeAreaId: '',
        franchiseeId: '',
        regionName: '',
        current: 1,
        size: 10
      },
      total: 0,
      mapLading: false,
      componentName: 'Amap',
      query: {},
      AllianOptions: [], // 大区数据
      allianceOptions: [], // 加盟商数据
      formallianceOptions: [], // 弹窗的加盟商数据
      value: '',
      tableData: [],
      checkList: ['选中且禁用', '复选框 A'],

      form: {
        largeAreaId: '',
        franchiseeId: '',
        regionName: '',
        actualRegionModelList: [] // 经纬度列表
      },
      formLabelWidth: '120px',
      dialogFormVisible: false, // dialog弹窗的显示开关(用来强制刷新弹窗v-if)
      dialogForm: false, // dialog弹窗的显示开关(element开关属性)
      dialogtitle: '', // dialog弹窗的标题
      // form校验规则
      rules: {
        largeAreaId: [
          { required: true, message: '请选择大区', trigger: 'change' }
        ],
        franchiseeId: [
          { required: true, message: '请选择加盟商', trigger: 'change' }
        ],
        regionName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    dialogForm: {
      handler(newValue, oldValue) {
        this.dialogFormVisible = this.dialogForm
      }
    }
  },
  mounted() {
    // 获取列表
    this.getList()
    // 查询大区
    this.getallianList()
  },
  methods: {
    // 获取列表
    getList() {
      dutyParkQueryManagerListPage(this.listQuery).then(res => {
        if (res.code == 0) {
          this.total = res.data.total
          this.tableData = res.data.rows
          this.loading = false
        }
      })
    },
    // 查询大区
    getallianList() {
      allRegion()
        .then(res => {
          if (res.code == 0) {
            this.AllianOptions = res.data
          }
        })
        .catch(() => {})
    },
    // 获取到大区的id去请求加盟商
    allianValue(value) {
      if (value == '') {
        return
      }
      this.listQuery.franchiseeId = ''
      this.allianceOptions = []
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptions = res.data
          }
        })
        .catch(() => {})
    },
    // 获取到大区的id去请求加盟商(弹窗里的)
    formallianValue(value) {
      this.form.franchiseeId = ''
      this.formallianceOptions = []
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.formallianceOptions = res.data
          }
        })
        .catch(() => {})
    },
    // 根据ID查询责任区域信息
    getArea(id) {},
    // 编辑
    tapEdit(v) {
      console.log(v)
      this.dialogtitle = '编辑责任区域'
      this.dialogForm = true

      // 查询当前大区的加盟商并把数据给到弹窗的select
      this.formallianValue(v.largeAreaId)
      // 修改form表单数据(显示当前数据)
      this.changeForm(v)

      // 查询本区域数据
      dutyParkFindById({ id: v.id }).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.Maploading = true
          const amap = this.$refs.MapRegion
          // 清理地图
          amap.clearMap()
          amap.setCenter(res.data.actualRegionModelList[0])
          amap.Mapobject.seeingRegion.seeingRegionModelList =
            res.data.actualRegionModelList.concat([])
          amap.drawMapArr({
            dataList: [res.data.actualRegionModelList],
            isEdit: true,
            target: 'seeingRegion'
          })
          this.form.actualRegionModelList = res.data.actualRegionModelList.concat([])
        }
      })
    },
    // 查看区域
    tapArea(row) {
      // console.log(row)
      this.dialogtitle = '运营区域'
      dutyParkFindPositionModelList({
        largeAreaId: row.largeAreaId,
        franchiseeId: row.franchiseeId,
        dutyParkId: row.id
      }).then(res => {
        this.$refs.OpearteModelList.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs.OpearteModelList.amapData(res.data, row.id, '责任区域')
        })
      })
    },
    // 删除
    tapDelete(v) {
      if (v.dutyId) {
        this.$notify.error({
          title: '错误',
          message: '请先解除绑定负责人'
        })
        return
      }
      dutyParkDelete({ id: v.id }).then(res => {
        if (res.code == 0) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
          this.tableData.splice(this.tableData.indexOf(v), 1)
        }
      })
    },
    // 保存
    tapSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.dialogtitle)
          console.log(this.form)
          if (this.form.actualRegionModelList.length >= 3) {
            this.submitData(this.form)
          } else {
            console.log(this.form.actualRegionModelList)
            this.$notify.error({
              title: '错误',
              message: '请完善区域'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 提交数据
    submitData(data) {
      if (this.dialogtitle == '新增责任区域') {
        dutyParkInsert(data)
          .then(res => {
            console.log(res, '1111111')
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              })
              // this.dialogFormVisible = false;
              this.dialogForm = false
              this.getList()
            }
          })
          .catch(err => {
            // this.$refs.mydialog.close();
            // this.$message.error(err.message);
          })
      } else {
        dutyParkUpdate(data)
          .then(res => {
            console.log(res, '1111111')
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
              })
              // this.dialogFormVisible = false;
              this.dialogForm = false
              this.getList()
            }
          })
          .catch(err => {
            // this.$refs.mydialog.close();
            // this.$message.error(err.message);
          })
      }
    },
    changeForm(v) {
      this.form.id = v.id || '' // 编辑时需要id  新增时会删除该属性
      this.form.largeAreaId = v.largeAreaId || ''
      this.form.franchiseeId = v.franchiseeId || ''
      this.form.regionName = v.regionName || ''
      this.form.actualRegionModelList = v.actualRegionModelList || []
    },
    handleSizeChange(val) {
      this.listQuery.current = 1
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getList()
    },
    // 查询
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    },
    clearValue() {
      this.allianceOptions = []
    },
    // 新建
    handleCreate() {
      this.dialogtitle = '新增责任区域'
      this.dialogFormVisible = true
      this.dialogForm = true
      this.changeForm({})
      delete this.form.id
    },
    markerRegion(v) {
      this.form.actualRegionModelList = v
      console.log(this.form, '编辑完成用户可见区域点击提交传递到from')
    }
  }
}
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
      .gdmap {
        width: 100%;
        height: 400px;
      }
    }
  }
}
.sibility-container .search-container /deep/ .el-input {
  width: 195px;
}
.sibility-container /deep/ .page-container {
  justify-content: flex-start;
}
</style>
