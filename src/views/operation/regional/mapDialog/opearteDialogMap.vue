<template>
  <div class="FromMapDialog">
    <el-dialog :title="dialogtitle" width="40%" class="FromMap" :visible.sync="dialogFormVisible">
      <el-row :gutter="24">
        <el-form ref="form" :model="form" :rules="rules">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="大区" :label-width="formLabelWidth" prop="largeAreaId">
                <el-select
                  v-model="form.largeAreaId"
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
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="加盟商" :label-width="formLabelWidth" prop="franchiseeId">
                <el-select
                  v-model="form.franchiseeId"
                  clearable
                  placeholder="请选择加盟商"
                  @change="changeFranchisee"
                >
                  <el-option
                    v-for="item in allianceOptions"
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
                <el-input v-model="form.regionName" autocomplete="off" />
              </el-form-item>
            </div>
          </el-col>
          <el-col v-if="areaType=='operate'" :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="调度费" :label-width="formLabelWidth" prop="dispatchFee">
                <el-input v-model="form.dispatchFee" v-number="2" autocomplete="off" />
              </el-form-item>
            </div>
          </el-col>

          <el-col v-if="areaType=='operate'" :span="24">
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
          <el-col v-if="areaType=='stop'" :span="24">
            <div class="grid-content bg-purple">
              <el-form-item label="区域配置说明：" class="bg-size-color" :label-width="formLabelWidth">
                <ol>
                  <li>禁行区域是政府监管红线不能触碰,也可以用作某些特定区域方便管理车辆,如果禁行区域与运营区域重叠,禁行区域权重更大,会覆盖实际运营区域。</li>
                  <li>设置时请注意隧道口等特别区域要扩大范围，避免用户误入。</li>
                  <li>车辆进入用户可见禁行区域时会语音提醒用户，如果用户进入实际禁行区域10秒后车辆被断电，并在用户端强制弹窗提示，当用户点击用户端“返回绿色骑行区域”时ACC通电3分钟，回到运营区域恢复正常状态。</li>
                </ol>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-form-item :label-width="formLabelWidth">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane
                    v-for="(item, index) in tabsList"
                    :key="index"
                    :label="item.label"
                    :name="item.name"
                  />
                </el-tabs>
                <component
                  :is="componentName"
                  ref="MapRegion"
                  v-loading="mapLading"
                  :tabsactive="Tabsactive"
                  :is-edit="true"
                  @markerRegion="markerRegion"
                  @isdrawData="isdrawData"
                />
              </el-form-item>
            </div>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="saveLoading" @click="tapSave">保 存</el-button>
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
import number from '@/directive/input-filter'
import { allRegion, allianceListByRegionId } from '@/api/region'
import {
  findPositionModelList,
  forbiddenRegionfindPositionModelList,
  findById,
  forbiddenRegionfindById
} from '@/api/operationRegional'
export default {
  name: 'Aamp',
  directives: { number },
  props: {
    dialogtitle: {
      type: String,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    },
    // 区域类型   operate 运营区域  stop 禁行区域
    areaType: {
      type: String,
      default: 'operate'
    }
  },
  data() {
    return {
      componentName: 'Amap',
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      activeName: 'Visible',
      tabsList: [
        { label: '用户可见区域', name: 'Visible' },
        { label: '实际区域', name: 'Actual' }
      ],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        largeAreaId: '',
        franchiseeId: '',
        regionName: '',
        dispatchFee: '',
        seeingRegionModelList: [], // 用户区域的经纬度列表
        actualRegionModelList: [] // 实际区域的经纬度列表
      },
      rules: {
        largeAreaId: [
          { required: true, message: '请选择大区', trigger: 'change' }
        ],
        franchiseeId: [
          { required: true, message: '请选择加盟商', trigger: 'change' }
        ],
        regionName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' }
        ],
        dispatchFee: [
          { required: true, message: '请输入调度费', trigger: 'blur' }
        ]
      },
      Tabsactive: false,
      mapLading: false,
      saveLoading: false,
      _drawData: []
    }
  },
  watch: {
    isdrawData: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
      },
      deep: true
    }
  },
  mounted() {
    // 查询大区
    this.getallianList()
  },
  methods: {
    // 运营区域数据绘制
    amapData(data, id) {
      this.Maploading = true
      const amap = this.$refs.MapRegion
      // 清理地图
      amap.clearMap()

      // 绘制其他已有(运营/禁行)区域
      const seeArr = []
      const actArr = []
      for (const n of data) {
        // seeArr.push(n.seeingRegionModelList);
        actArr.push(n.actualRegionModelList)
      }
      amap.blackArr = actArr
      amap.drawMapArr({
        dataList: actArr,
        polygonSetting: {
          strokeColor: '#000',
          fillColor: '#000',
          strokeWeight: 0
        }
      })
      // 绘制当前禁行区
      if (this.areaType == 'stop') {
        forbiddenRegionfindById({ id }).then(res => {
          console.log(res)
          if (res.code == 0) {
            amap.setCenter(res.data.seeingRegionModelList[0])
            this.drawEdit(
              res.data.seeingRegionModelList,
              res.data.actualRegionModelList
            )
            this.Maploading = false
          }
        })
      }
      // 绘制当前运营区域
      if (this.areaType == 'operate') {
        findById({ id }).then(res => {
          if (res.code == 0) {
            amap.setCenter(res.data.seeingRegionModelList[0])
            this.drawEdit(
              res.data.seeingRegionModelList,
              res.data.actualRegionModelList
            )
            this.Maploading = false
          }
        })
      }
    },

    // 修改表单的数据
    changeForm(row) {
      console.log(row, 'rowrowrowrow')
      if (row.largeAreaId) {
        this.allianValue(row.largeAreaId)
      }
      this.form.id = row.id
      this.form.largeAreaId = row.largeAreaId
      this.form.franchiseeId = row.franchiseeId
      this.form.regionName = row.regionName
      this.form.dispatchFee = row.dispatchFee
      this.form.seeingRegionModelList = row.seeingRegionModelList
      this.form.actualRegionModelList = row.actualRegionModelList
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
    clearValue() {
      this.allianceOptions = []
    },
    // 获取到大区的id去请求加盟商
    allianValue(value) {
      this.form.franchiseeId = ''
      this.allianceOptions = []
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptions = res.data
          }
        })
        .catch(() => {})
    },
    // 加盟商id查询已有区域并进行绘制(这里绘制所有已有)
    changeFranchisee() {
      // 运营区域
      if (this.areaType == 'operate') {
        findPositionModelList({
          largeAreaId: this.form.largeAreaId,
          franchiseeId: this.form.franchiseeId,
          operateRegionId: -1
        }).then(res => {
          console.log(res)
          if (res.code == 0) {
            const amap = this.$refs.MapRegion
            const seeArr = []
            const actArr = []
            for (const n of res.data) {
              // seeArr.push(n.seeingRegionModelList);
              actArr.push(n.actualRegionModelList)
            }
            console.log(seeArr, actArr)

            amap.clearMap()
            amap.blackArr = actArr
            amap.drawMapArr({
              dataList: actArr,
              polygonSetting: {
                strokeColor: '#000',
                fillColor: '#000',
                strokeWeight: 0
              }
            })
            amap.ifSeeOrAct()
          }
        })
      }
      // 禁行区域
      if (this.areaType == 'stop') {
        forbiddenRegionfindPositionModelList({
          largeAreaId: this.form.largeAreaId,
          franchiseeId: this.form.franchiseeId,
          forbiddenRegionId: -1
        }).then(res => {
          console.log(res)
          if (res.code == 0) {
            const amap = this.$refs.MapRegion
            const seeArr = []
            const actArr = []
            for (const n of res.data) {
              // seeArr.push(n.seeingRegionModelList);
              actArr.push(n.actualRegionModelList)
            }
            console.log(seeArr, actArr)

            amap.clearMap()
            amap.blackArr = actArr
            amap.drawMapArr({
              dataList: actArr,
              polygonSetting: {
                strokeColor: '#000',
                fillColor: '#000',
                strokeWeight: 0
              }
            })
            amap.ifSeeOrAct()
          }
        })
      }
    },

    // 编辑状态下绘制该区域地图
    drawEdit(seeArr = [], actArr = []) {
      const amap = this.$refs.MapRegion
      this.Tabsactive = false // 切换到用户可见区域
      this.activeName = 'Visible' // 切换到用户可见区域
      this.form.seeingRegionModelList = seeArr.concat([])
      this.form.actualRegionModelList = actArr.concat([])
      amap.Mapobject.seeingRegion.seeingRegionModelList = seeArr.concat([])
      amap.Mapobject.actualRegion.seeingRegionModelList = actArr.concat([])
      // 格式转换
      const path = actArr.concat([])
      for (const i in path) {
        if (!Array.isArray(path[i])) {
          path[i] = [path[i].lng, path[i].lat]
        }
      }
      console.log(path)
      // 存储实际区域数据(可见区域在绘制的时候使用了target,会在绘制时存,所以这里不用存seeingRegion)
      amap.Mapobject.actualRegion.markerarr = path
      amap.drawMapArr({
        isEdit: true,
        dataList: [seeArr],
        target: 'seeingRegion',
        drawType: 'edit',
        polygonSetting: {
          fillColor: '#67c23a',
          strokeColor: '#67c23a'
        },
        polylineSetting: {
          strokeColor: '#67c23a'
        }
      })
      this.Maploading = false
    },
    markerRegion(v) {
      if (this.Tabsactive) {
        this.form.actualRegionModelList = v
      } else {
        this.form.seeingRegionModelList = v
      }
      console.log(this.form, '编辑完成用户可见区域点击提交传递到from')
    },
    // 实际区域可见区域切换
    handleClick(tab, event) {
      // console.log(tab,event,'11111111')
      const _drawData = this._drawData || []
      if (this.activeName == 'Actual') {
        if (this.form.seeingRegionModelList.length < 3) {
          this.mapLading = true
          this.$notify.error({
            title: '错误',
            message: '请完善用户可见区域'
          })
          return
        }
        this.mapLading = false
        if (_drawData.length > 0 && this.Tabsactive == false) {
          this.mapLading = true
          this.$notify.error({
            title: '错误',
            message: '请完善用户可见区域'
          })
          return
        }
        this.Tabsactive = true
      } else {
        this.mapLading = false
        if (_drawData.length > 0 && this.Tabsactive == true) {
          this.mapLading = true
          this.$notify.error({
            title: '错误',
            message: '请完善实际区域'
          })
          return
        }
        this.Tabsactive = false
      }
    },
    // 绘制数据监听
    isdrawData(v) {
      console.log(v, 'isdrawData')
      this._drawData = v
    },
    // 点击保存
    tapSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.dialogtitle)
          console.log(this.form)
          if (
            this.form.actualRegionModelList.length >= 4 &&
            this.form.seeingRegionModelList.length >= 4
          ) {
            this.saveLoading = true
            this.$emit('handleSub', this.form)
          } else {
            console.log(
              this.form.actualRegionModelList,
              this.form.seeingRegionModelList
            )
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
    }
  }
}
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
