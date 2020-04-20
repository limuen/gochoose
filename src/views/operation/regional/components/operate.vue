<template>
  <div class="operate-container">
    <div class="create-button">
      <el-button type="primary" icon="el-icon-edit" @click="handleCreate">添加运营区域</el-button>
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
            <el-select v-model="listQuery.franchiseeId" clearable placeholder="请选择加盟商">
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
            <el-input v-model="listQuery.regionName" placeholder="请输入区域名称" />
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
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="regionName" label="区域名称" align="center" />
        <el-table-column prop="parkSpotNum" label="停车点" align="center" />
        <el-table-column prop="dispatchFee" label="调度费" align="center" />
        <el-table-column prop="franchiseeName" label="加盟商" align="center" />
        <el-table-column prop="largeAreaName" label="大区" align="center" />
        <el-table-column label="操作" align="center" width="250" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleMapcomponent(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" @click="handleSeeRegion(scope.row)">区域</el-button>
            <!-- <el-button type="primary" size="mini" @click="handleMapcomponent(scope.row)">组件</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
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

    <operateDialog
      ref="operateDialog"
      :is-edit="isEdit"
      :dialogtitle="dialogtitle"
      @handleSub="handleSub"
    />

    <OpearteModelList v-if="dialogtitle=='运营区域'" ref="OpearteModelList" :dialogtitle="dialogtitle" />

    <opearteDialogMap
      v-if="dialogtitle=='编辑运营区域'"
      ref="opearteDialogMap"
      :is-edit="isEdit"
      :dialogtitle="dialogtitle"
      @handleSub="handleSub"
    />
    <opearteDialogMap
      v-if="dialogtitle=='新建运营区域'"
      ref="opearteDialogMapNew"
      :is-edit="isEdit"
      :dialogtitle="dialogtitle"
      @handleSub="handleSub"
    />
  </div>
</template>

<script>
import AMap from 'AMap'
import {
  OpearteListPage,
  createRegional,
  findById,
  updateRegion,
  findPositionModelList
} from '@/api/operationRegional'
import { allRegion, allianceListByRegionId } from '@/api/region'
import operateDialog from '../mapDialog/operateDialog'
import OpearteModelList from '../mapDialog/OpearteModelList'
import opearteDialogMap from '../mapDialog/opearteDialogMap'
export default {
  name: 'Operate',
  components: {
    operateDialog,
    OpearteModelList,
    opearteDialogMap
  },
  data() {
    return {
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      listQuery: {
        largeAreaId: '',
        franchiseeId: '',
        regionName: '',
        current: 1,
        size: 10
      },
      total: 0,
      tableData: [],
      loading: false,
      isEdit: false,
      // isFullscreen: false,
      // isFullscreenmap: false,
      // dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        textarea: ''
      },
      formLabelWidth: '120px',
      dialogtitle: '',
      dialogForm: false,
      activeName: 'Visible',
      maplading: true,
      mapActuallading: true,
      searchAddress: '', // 地址
      location: '', // 地图搜索定位
      // 地图1
      map: null,
      marker: null, // marker
      polyline: null,
      polygon: null,
      // 折线坐标,所有的点位都存在这
      markarr: [],
      markers: [],
      polylines: [],
      polygonActual: null, // 初始化第二个地图渲染第一个地图画过的区域
      isActive: false, // 全屏
      result: [],
      // 地图2
      mapActual: null,
      viewok: false,
      markerActual: null, // marker
      polylineActual: null,
      polygonact: null,
      // 地图2折线坐标,所有的点位都存在这
      markarrActual: [],
      markersActual: [],
      polylinesActual: [],
      isActiveActual: false // 全屏
    }
  },
  watch: {},
  mounted() {
    // 查询大区
    this.getallianList()
    // 获取列表
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      this.loading = true
      OpearteListPage(this.listQuery)
        .then(res => {
          console.log(res, '11111')
          if (res.code == 0) {
            this.total = res.data.total
            this.tableData = res.data.rows
            this.loading = false
          }
        })
        .catch(() => {})
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
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
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
    // 编辑
    handleMapcomponent(row) {
      this.dialogtitle = ''
      // 强制刷新组件
      setTimeout(() => {
        this.dialogtitle = '编辑运营区域'
        this.isEdit = false
        findPositionModelList({
          largeAreaId: row.largeAreaId,
          franchiseeId: row.franchiseeId,
          operateRegionId: row.id
        }).then(res => {
          if (res.code == 0) {
            this.$refs.opearteDialogMap.dialogFormVisible = true
            this.$nextTick(() => {
              this.$refs.opearteDialogMap.amapData(res.data, row.id)
              this.$refs.opearteDialogMap.changeForm(row)
            })
          }
        })
        // findById({ id: row.id }).then(res => {
        //   if (res.code == 0) {
        //     console.log(res.data);

        //     this.$refs.opearteDialogMap.dialogFormVisible = true;
        //     this.$nextTick(() => {
        //       this.$refs.opearteDialogMap.drawEdit(
        //         [res.data.actualRegionModelList],
        //         [res.data.seeingRegionModelList]
        //       );
        //       console.log("22222222222222222")
        //       this.$refs.opearteDialogMap.changeForm(row)
        //     });
        //   }
        // });
      })
    },
    // 创建
    handleCreate() {
      this.dialogtitle = ''
      // 强制刷新组件
      setTimeout(() => {
        this.dialogtitle = '新建运营区域'
        this.$nextTick(() => {
          this.$refs.opearteDialogMapNew.dialogFormVisible = true
        })
      })
    },
    // 查看区域
    handleSeeRegion(row) {
      console.log(row, '运行区域')
      this.dialogtitle = '运营区域'
      findPositionModelList({
        largeAreaId: row.largeAreaId,
        franchiseeId: row.franchiseeId,
        operateRegionId: row.id
      })
        .then(res => {
          this.$refs.OpearteModelList.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs.OpearteModelList.amapData(res.data, row.id, '运营区域')
          })
        })
        .catch(() => {})
    },
    // 表单提交
    handleSub(form) {
      console.log(form, '提交参数')
      const data = form
      // console.log(this.isEdit);
      if (this.dialogtitle == '编辑运营区域') {
        updateRegion(data)
          .then(res => {
            console.log(res, '1111111')
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
              })
              this.$refs.opearteDialogMap.saveLoading = false
              this.$refs.opearteDialogMap.dialogFormVisible = false
              this.getList()
            }
          })
          .catch(err => {
            this.$refs.opearteDialogMap.saveLoading = false
            // this.$refs.mydialog.close();
            // this.$message.error(err.message);
          })
      } else {
        createRegional(data)
          .then(res => {
            console.log(res, '1111111')
            if (res.code == 0) {
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success'
              })
              this.$refs.opearteDialogMapNew.saveLoading = false
              this.$refs.opearteDialogMapNew.dialogFormVisible = false
              this.getList()
            }
          })
          .catch(err => {
            this.$refs.opearteDialogMapNew.saveLoading = false
            // this.$refs.mydialog.close();
            // this.$message.error(err.message);
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.operate {
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
  }
}
.operate-container .search-container /deep/ .el-input {
  width: 195px;
}
.operate-container /deep/ .page-container {
  justify-content: flex-start;
}
</style>
