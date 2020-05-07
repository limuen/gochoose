<template>
  <div class="carlist-container">
    <div class="create-button">
      <el-button
        type="primary"
        @click="handleCreate"
        icon="el-icon-edit"
        v-permission="button.carmanag_carmanag_manage_addcar"
      >添加车辆</el-button>
    </div>
    <div class="search-container">
      <el-row :gutter="24">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>大区</span>
            <el-select
              v-model="listQuery.electrombileRegionId"
              @change="allianValue"
              clearable
              placeholder="请选择大区"
            >
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
            <el-select
              v-model="listQuery.electrombileAllianceId"
              @change="getdutyList"
              clearable
              placeholder="请选择加盟商"
            >
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
            <el-select clearable v-model="listQuery.dutyAreaId" placeholder="请选择责任区域">
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
            <span>租赁状态</span>
            <el-select v-model="listQuery.rentStatus" placeholder="请选择租赁状态">
              <el-option label="空闲中" :value="0"></el-option>
              <el-option label="租赁中" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>锁车状态</span>
            <el-select v-model="listQuery.lockElectrombileState" placeholder="请选择锁车状态">
              <el-option label="已上锁" :value="0"></el-option>
              <el-option label="未上锁" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>收费模式</span>
            <el-select v-model="value" placeholder="请选择收费模式">
              <el-option label="标准" :value="0"></el-option>
              <el-option label="老师" :value="1"></el-option>
              <el-option label="学生" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>-->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆状态</span>
            <el-select clearable v-model="listQuery.electrombileStatus" placeholder="请选择车辆状态">
              <el-option
                v-for="item in carStatusList"
                :key="item.id"
                :label="item.dataValue"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>运营状态</span>
            <el-select clearable v-model="listQuery.operationState" placeholder="请选择运营状态">
              <el-option
                v-for="item in operationStates"
                :key="item.value"
                :label="item.type"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车型</span>
            <el-select v-model="value" placeholder="请选择车型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>-->

        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>未使用车辆</span>
            <el-input placeholder="请输入未使用车辆" v-model="listQuery.unusedElectrombile">
              <template slot="append">小时内</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>未归还车辆</span>
            <el-input placeholder="请输入未归还车辆" v-model="listQuery.noReturnElectrombile">
              <template slot="append">小时内</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>报警开关</span>
            <el-select clearable v-model="listQuery.alarmSwitch" placeholder="请选择报警开关">
              <el-option label="开" :value="0"></el-option>
              <el-option label="关" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>剩余里程小于</span>
            <el-input placeholder="请输入剩余里程小于" v-model="listQuery.residueEndurance">
              <template slot="append">km</template>
            </el-input>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>GPS丢星</span>
            <el-input placeholder="请输入GPS丢星" v-model="input2">
              <template slot="append">天</template>
            </el-input>
          </div>
        </el-col>-->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>剩余电量小于</span>
            <el-input placeholder="请输入剩余电量小于" v-model="listQuery.residueElectric">
              <template slot="append">%</template>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>运营区域</span>
            <el-select clearable v-model="listQuery.isInArea" placeholder="请选择运营区域内外">
              <el-option label="内" :value="0"></el-option>
              <el-option label="外" :value="1"></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="24">
          <div class="grid-content bg-purple" style="color: red;font-size: 14px;">
              以下信息填写后上面查询条件不生效
          </div>
        </el-col>-->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>车辆编号</span>
            <el-input clearable v-model="listQuery.electrombileNumber" placeholder="请输入车辆编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <span>设备IMEI</span>
            <el-input clearable v-model="listQuery.equipmentImel" placeholder="请输入设备IMEI"></el-input>
          </div>
        </el-col>

        <el-col :span="12">
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
        v-loading="loading"
        :header-cell-style="{background:'#EBEFF4'}"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="electrombileNumber" width="150" label="车辆编号" align="center"></el-table-column>
        <el-table-column prop="operationState	" label="运维方式" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.operationState | operationState}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="rentStatus" label="出租状态" align="center">
          <template slot-scope="scope">
            <div>{{scope.row.rentStatus | rentStatus}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="electrombileStatus" label="车辆状态" align="center">
          <template slot-scope="scope">
            <el-tag
              style="margin-right:5px;"
              effect="dark"
              :type=" scope.row.electrombileStatus | electrombileStatusType"
            >{{scope.row.electrombileStatus | electrombileStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="equipmentImel" width="150" label="设备IMEI" align="center"></el-table-column>
        <el-table-column prop="equipmentSim" label="SIM卡号" width="150" align="center"></el-table-column>
        <el-table-column prop="enduranceMileage" label="总续航里程" width="150" align="center"></el-table-column>
        <el-table-column prop="residueEndurance" label="剩余里程" align="center"></el-table-column>
        <el-table-column prop="residueElectric" label="剩余电量" align="center"></el-table-column>
        <el-table-column prop="lastCustomerId" width="150" label="当前/最后用户" align="center"></el-table-column>
        <el-table-column prop="lastUseTime" label="时间" width="200" align="center"></el-table-column>
        <el-table-column prop="dutyArea" label="运营区域" width="200" align="center">
          <template slot-scope="scope">
            <div
              v-for="(item,index) in scope.row.dutyArea"
              :key="item.index"
            >{{index+1}}-{{item.areaName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="electrombileAllianceName" label="归属加盟商" width="200" align="center"></el-table-column>
        <el-table-column prop="electrombileRegionName" width="150" label="大区" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="360" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-permission="button.carmanag_carmanag_manage_location"
              @click="handleLocation(scope.row)"
            >定位</el-button>
            <el-button
              type="text"
              v-permission="button.carmanag_carmanag_manage_order"
              @click="handleGoRouter(scope.row)"
            >订单</el-button>
            <el-button
              type="text"
              v-permission="button.carmanag_carmanag_manage_locus"
              @click="handletrajectory(scope.row)"
            >轨迹</el-button>
            <el-button type="text" v-permission="button.carmanag_carmanag_manage_repairrd">维修记录</el-button>
            <el-button type="text" v-permission="button.carmanag_carmanag_manage_exqrcode">
              <a
                :href="`/api/electrombile/createQrCode?electrombileId=${scope.row.electrombileId}`"
                download="二维码"
              >二维码下载</a>
            </el-button>
            <el-button
              type="text"
              v-permission="button.carmanag_carmanag_manage_details"
              @click="handleDetail(scope.row)"
            >详情</el-button>
            <el-button
              type="text"
              v-permission="button.carmanag_carmanag_manage_edit"
              @click="handleedit(scope.row)"
            >编辑</el-button>
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
      <div>
        <i class="el-icon-folder-opened excel-blue"></i>
        <span>导出excel</span>
      </div>
    </div>

    <!-- 编辑 -->
    <el-dialog :title="dialogtitle" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="form" class="form" ref="form" :rules="rules" label-width="120px">
        <el-form-item label="添加方式">
          <el-radio-group v-model="resource" @change="handleChangeRadio">
            <el-radio :label="1">单量添加</el-radio>
            <el-radio :label="2">批量添加</el-radio>
            <el-radio :label="3">批量修改</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="批量添加" v-if="resource=='2'" class="upload-create">
          <el-upload
            class="upload-add"
            drag
            :action="serverUrl"
            multiple
            ref="upload"
            :limit="1"
            :file-list="fileList"
            :on-success="handleAvatarSuccess"
            accept=".xlsx, .xls"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
          <div>
            <div>
              Excel模板：
              <a href style="color:#1890ff;">点击下载</a>
            </div>
            <h3>注意事项:</h3>
            <ol>
              <li>车辆编号信息，不需要加盟商前缀</li>
              <li>如果系统中已存在相同的*车辆编号*、*IMEI*，将无法入库，系统会将会提示错误信息。</li>
            </ol>
          </div>
        </el-form-item>
        <el-form-item
          label="大区"
          v-if="resource == '1' || this.isUpload"
          :key="`${resource}electrombileRegionId`"
          prop="electrombileRegionId"
        >
          <el-select
            v-model="form.electrombileRegionId"
            ref="reginoName"
            clearable
            @change="allianValuedialog"
            placeholder="请选择大区"
          >
            <el-option
              v-for="item in AllianOptionsDialog"
              :key="item.regionId"
              :label="item.regionName"
              :value="item.regionId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="加盟商"
          v-if="resource=='1'  || this.isUpload"
          :key="`${resource}electrombileAllianceId`"
          prop="electrombileAllianceId"
        >
          <el-select
            v-model="form.electrombileAllianceId"
            ref="allianceName"
            @change="getdutyListDialog"
            placeholder="请选择加盟商"
          >
            <el-option
              v-for="item in allianceOptionsDialog"
              :key="item.allianceId"
              :label="item.allianceName"
              :value="item.allianceId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运营区域" v-if="resource=='1' || this.isUpload" prop="dutyArea2">
          <el-select
            v-model="form.dutyArea2"
            ref="dutyObj"
            @change="changeDutyName"
            multiple
            placeholder="请选择责任区域"
          >
            <el-option
              v-for="(item,index) in bilityOptions"
              :key="index"
              :label="item.regionName"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆编号" v-if="resource=='1'" prop="electrombileNumber">
          <el-input v-model="form.electrombileNumber" placeholder="请输入车辆编号"></el-input>
        </el-form-item>
        <el-form-item label="报警开关" v-if="resource=='1'  || this.isUpload ">
          <el-select v-model="form.alarmSwitch" placeholder="请选择报警开关">
            <el-option label="开" :value="0"></el-option>
            <el-option label="关" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运营状态" v-if="resource=='1' || this.isUpload" prop="operationState">
          <el-select v-model="form.operationState" placeholder="如果车辆已投放市场请选择 运营中">
            <el-option label="运营中" :value="0"></el-option>
            <el-option label="未运营" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="车型" v-if="resource=='1'" prop="electrombileType">
          <el-select v-model="form.electrombileType" placeholder="请选择车型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="低里程报警" v-if="resource=='1'" prop="electrombileUndercharge">
          <el-input placeholder="请输入低里程报警" v-model="form.electrombileUndercharge">
            <template slot="append">km</template>
          </el-input>
        </el-form-item>
        <el-form-item label="标准计费" v-if="resource=='1'  || this.isUpload" prop="normBilling">
          <el-select v-model="form.normBilling" placeholder="请选择标准计费">
            <el-option
              v-for="item in chargeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特权计费" v-if="resource=='1' || this.isUpload" prop="specialBilling">
          <el-select v-model="form.specialBilling" placeholder="请选择特权计费">
            <el-option
              v-for="item in chargeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备IMEI" v-if="resource=='1'" prop="equipmentImel">
          <el-input v-model="form.equipmentImel" placeholder="请输入设备IMEI"></el-input>
        </el-form-item>
        <el-form-item label="设备SIM" v-if="resource=='1'" prop="equipmentSim">
          <el-input v-model="form.equipmentSim" placeholder="请输入设备SIM"></el-input>
        </el-form-item>
        <el-form-item label="设备IMEI2" v-if="resource=='1'">
          <el-input placeholder="请输入设备IMEI2" v-model="form.equipmentImel2"></el-input>
        </el-form-item>
        <el-form-item label="设备SIM2" v-if="resource=='1'">
          <el-input placeholder="请输入设备SIM2" v-model="form.equipmentSim2"></el-input>
        </el-form-item>
        <el-form-item label="备注" v-if="resource=='1' || this.isUpload">
          <el-input type="textarea" :rows="3" placeholder="请输入备注" v-model="form.remark"></el-input>
        </el-form-item>

        <el-form-item label="批量修改" v-if="resource=='3'" class="upload-create">
          <el-upload
            class="upload-add"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
          <div>
            <div>
              Excel模板：
              <a href style="color:#1890ff;">点击下载</a>
            </div>
            <h3>注意事项:</h3>
            <ol>
              <li>
                系统会根据*车辆编号*，修改此车相应的数据车辆编号必须是完整车辆编号，
                <span>不能缺少车辆前辍，建议从车辆列表导出Excel</span>。
              </li>
              <li>只需填写需要修改的信息栏，不想修改的信息请留空，如果*车辆编号*不存在，系统将会提示报错。</li>
              <li>
                如果填写了*续航(km)*，系统会自动执行里程重置操作，
                <span>提醒：可以从【车辆管理】-【车辆列表】导出需要修改的车辆，对Excel进行修改后再利用此功能上传Excel,或者直接下载模板文件，填写*车辆编号* 和 你想修改的信息列</span>。
              </li>
            </ol>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center" v-if="resource=='1'">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitform">确 定</el-button>
      </div>
      <div slot="footer" class="dialog-footer" align="center" v-if="resource=='2'">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitformUpload">确 定</el-button>
      </div>
      <div slot="footer" class="dialog-footer" align="center" v-if="resource=='3'">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitform">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 详情弹窗 -->
    <div v-if="this.drawerId != ''">
      <drawer ref="drawer" :drawerId="drawerId"></drawer>
    </div>

    <!-- 定位弹窗 -->
    <div v-if="this.LocationId != ''">
      <Location ref="Location" :LocationId="LocationId" />
    </div>

    <!-- 轨迹弹窗 -->
    <div v-if="this.trajectoryId != ''">
      <trajectory ref="trajectory" @handleqkId="handleqkId" :trajectoryId="trajectoryId" />
    </div>
  </div>
</template>

<script>
import drawer from "../drawer";
import { allRegion, allianceListByRegionId } from "@/api/region";
import { findByLargeFranchisee } from "@/api/responsibility";
import { CarselectByPid } from "@/api/publicapi";
import {
  carListPage,
  carInsert,
  carUpdate,
  carByelectrombileId,
  importElectrombile,
  createQrCode,
  batchcarInsert
} from "@/api/car";
import { chargeFranchisee } from "@/api/charge";
import Location from "../carmanagDialog/Location";
import trajectory from "../carmanagDialog/trajectory";
import { operateRegionfindByLargeFranchisee } from "@/api/operationRegional";
import permission from "@/directive/permission";
export default {
  name: "carlist",
  directives: { permission },
  components: {
    drawer,
    Location,
    trajectory
  },
  data() {
    return {
      button: {
        carmanag_carmanag_manage_addcar: "carmanag_carmanag_manage_addcar",
        carmanag_carmanag_manage_location: "carmanag_carmanag_manage_location",
        carmanag_carmanag_manage_order: "carmanag_carmanag_manage_order",
        carmanag_carmanag_manage_locus: "carmanag_carmanag_manage_locus",
        carmanag_carmanag_manage_repairrd: "carmanag_carmanag_manage_repairrd",
        carmanag_carmanag_manage_exqrcode: "carmanag_carmanag_manage_exqrcode",
        carmanag_carmanag_manage_details: "carmanag_carmanag_manage_details",
        carmanag_carmanag_manage_edit: "carmanag_carmanag_manage_edit"
      },
      drawerId: "",
      AllianOptions: [], // 查询大区
      allianceOptions: [], // 加盟商
      areaOptions: [], //责任区域单选
      carStatusList: [], // 车辆状态
      AllianOptionsDialog: [], // 查询大区
      allianceOptionsDialog: [], // 加盟商
      bilityOptions: [], //责任区域
      chargeList: [], //收费标准
      operationStates: [
        { value: 0, type: "运营中" },
        { value: 1, type: "未运营" }
      ],
      listQuery: {
        electrombileRegionId: "",
        electrombileAllianceId: "",
        dutyAreaId: "",
        rentStatus: "",
        lockElectrombileState: "",
        electrombileStatus: "",
        unusedElectrombile: "",
        noReturnElectrombile: "",
        isInArea: "",
        operationState: "",
        alarmSwitch: "",
        residueEndurance: "",
        residueElectric: "",
        electrombileNumber: "",
        equipmentImel: "",
        current: 1,
        size: 10
      },
      isEdit: false,
      total: 0,
      loading: false,
      tableData: [],
      resource: 1,
      form: {
        electrombileRegionId: "",
        electrombileRegionName: "",
        electrombileAllianceId: "",
        electrombileAllianceName: "",
        dutyArea: [],
        dutyArea2: [],
        electrombileNumber: "",
        operationState: "",
        alarmSwitch: "",
        electrombileUndercharge: "",
        normBilling: "",
        specialBilling: "",
        equipmentImel: "",
        equipmentSim: "",
        equipmentImel2: "",
        equipmentSim2: "",
        remark: "",
        excelKey: ""
      },
      indexs: [],
      dialogtitle: "",
      dialogFormVisible: false,
      rules: {
        electrombileRegionId: [
          { required: true, message: "请选择大区", trigger: "change" }
        ],
        electrombileAllianceId: [
          { required: true, message: "请选择加盟商", trigger: "change" }
        ],
        dutyArea2: [
          { required: true, message: "请选择运营区域", trigger: "change" }
        ],
        electrombileNumber: [
          { required: true, message: "请输入车辆编号", trigger: "blur" }
        ],
        operationState: [
          { required: true, message: "请选择运营状态", trigger: "change" }
        ],
        normBilling: [
          { required: true, message: "请选择标准计费", trigger: "change" }
        ],
        specialBilling: [
          { required: true, message: "请选择特权计费", trigger: "change" }
        ],
        equipmentImel: [
          { required: true, message: "请输入设备IMEI", trigger: "blur" }
        ],
        equipmentSim: [
          { required: true, message: "请输入设备SIM", trigger: "blur" }
        ]
      },
      LocationId: "",
      trajectoryId: "",
      serverUrl: "/api/electrombile/importElectrombile", //上传地址
      fileList: [],
      isUpload: false // 控制变量
    };
  },
  filters: {
    operationState(key) {
      const operationStateMap = {
        0: "运营中",
        1: "未运营"
      };
      return operationStateMap[key];
    },
    rentStatus(key) {
      const rentStatusMap = {
        0: "空闲中",
        1: "租赁中"
      };
      return rentStatusMap[key];
    },
    electrombileStatus(key) {
      const electrombileStatusMap = {
        0: "正常",
        1: "正常、区域外",
        2: "离线",
        3: "离线、断电",
        4: "离线、区域外",
        5: "离线、断电、区域外"
      };
      return electrombileStatusMap[key];
    },
    electrombileStatusType(key) {
      const electrombileStatusTypeMap = {
        0: "success",
        1: "warning",
        2: "info",
        3: "danger",
        4: "danger",
        5: "danger"
      };
      return electrombileStatusTypeMap[key];
    }
  },
  // watch: {
  //   resource: function(newValue, oldValue) {
  //     console.log(newValue, oldValue);
  //     if (newValue !== oldValue) {
  //       this.$nextTick(() => {
  //         if (this.$refs.form !== undefined) {
  //           this.$refs.form.resetFields();
  //         }
  //       });
  //     }
  //   }
  // },
  mounted() {
    // 查询大区
    this.getallianList();
    this.getallianListDialog();
    // 获取车辆状态
    this.getCarStatus();
    // this.listQuery.current = +this.$route.query.current || 1;
    // this.listQuery.size = +this.$route.query.size || 10;
    this.getList();
  },
  methods: {
    handleChangeRadio(value) {
      if (value) {
        this.isUpload = false;
        this.form = {
          electrombileRegionId: "",
          electrombileRegionName: "",
          electrombileAllianceId: "",
          electrombileAllianceName: "",
          dutyArea: [],
          dutyArea2: [],
          electrombileNumber: "",
          operationState: "",
          alarmSwitch: "",
          electrombileUndercharge: "",
          normBilling: "",
          specialBilling: "",
          equipmentImel: "",
          equipmentSim: "",
          equipmentImel2: "",
          equipmentSim2: "",
          remark: ""
        };
      }
      // if(value == 1){
      //   this.$refs.form.resetFields()
      // }
    },
    // 获取车辆状态
    getCarStatus() {
      CarselectByPid({ pid: 6 }).then(res => {
        if (res.code == 0) {
          this.carStatusList = res.data;
        }
      });
    },
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
    getallianListDialog() {
      allRegion()
        .then(res => {
          if (res.code == 0) {
            this.AllianOptionsDialog = res.data;
          }
        })
        .catch(() => {});
    },
    // 获取到大区的id去请求加盟商
    allianValue(value) {
      this.listQuery.electrombileAllianceId = "";
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptions = res.data;
          }
        })
        .catch(() => {});
    },
    allianValuedialog(value) {
      this.$nextTick(() => {
        this.form.electrombileRegionName = this.$refs.reginoName.selectedLabel;
      });
      this.bilityOptions = [];
      this.form.electrombileAllianceId = "";
      this.form.dutyArea = [];
      this.form.dutyArea2 = [];
      this.chargeList = [];
      this.form.normBilling = "";
      this.form.specialBilling = "";
      allianceListByRegionId({ regionId: value })
        .then(res => {
          if (res.code == 0) {
            this.allianceOptionsDialog = res.data;
          }
        })
        .catch(() => {});
    },
    getdutyListDialog(value) {
      this.$nextTick(() => {
        this.form.electrombileAllianceName = this.$refs.allianceName.selectedLabel;
      });
      this.form.dutyArea = [];
      this.form.dutyArea2 = [];
      this.chargeList = [];
      this.form.normBilling = "";
      this.form.specialBilling = "";
      operateRegionfindByLargeFranchisee({
        largeAreaId: this.form.electrombileRegionId,
        franchiseeId: value
      })
        .then(res => {
          if (res.code == 0) {
            this.bilityOptions = res.data;
          }
        })
        .catch(() => {});
      chargeFranchisee({
        largeAreaId: this.form.electrombileRegionId,
        franchiseeId: value
      })
        .then(res => {
          if (res.code == 0) {
            console.log(res, "收费标准");
            this.chargeList = res.data;
            console.log(this.chargeList, "收费标准");
          }
        })
        .catch(() => {});
    },
    // 通过大区id和加盟商id获取责任区域
    getdutyList(value) {
      this.listQuery.areaId = "";
      findByLargeFranchisee({
        largeAreaId: this.listQuery.regionId,
        franchiseeId: value
      })
        .then(res => {
          if (res.code == 0) {
            this.areaOptions = res.data;
          }
        })
        .catch(() => {});
    },
    // 定位
    handleLocation(row) {
      console.log(row, "定位");
      this.LocationId = row.electrombileId;
      this.$nextTick(() => {
        this.$refs.Location.dialogFormVisible = true;
        this.$refs.Location.initMap();
      });
    },
    // 详情
    handleDetail(row) {
      console.log(row, "详情");
      this.drawerId = row.electrombileId;
      this.$nextTick(() => {
        this.$refs.drawer.drawer = true;
        this.$refs.drawer.getDetail();
      });
    },
    // 获取列表
    getList() {
      this.loading = true;
      carListPage(this.listQuery)
        .then(res => {
          if (res.code == 0) {
            this.total = res.data.total;
            this.tableData = res.data.rows;
            this.loading = false;
          }
        })
        .catch(() => {});
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
    handletrajectory(row) {
      console.log(row, "定位");
      this.trajectoryId = row.equipmentImel;
      this.$nextTick(() => {
        this.$refs.trajectory.dialogFormVisible = true;
        this.$refs.trajectory.initMap();
      });
    },
    // 新增
    handleCreate() {
      this.dialogtitle = "添加车辆";
      this.dialogFormVisible = true;
      this.isEdit = false;
      this.fileList = [];
      this.form.dutyArea = [];
      this.form.remark = "";
      this.form.equipmentImel2 = "";
      this.form.equipmentSim2 = "";
      this.form.excelKey = "";
      this.resource = 1;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    handleqkId(value) {
      this.trajectoryId = "";
    },
    // 编辑
    handleedit(row) {
      this.dialogtitle = "修改车辆";
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.dialogding = true;
      carByelectrombileId({
        electrombileId: row.electrombileId
      }).then(res => {
        console.log(res, "通过id查询");
        if (res.code == 0) {
          // 获取加盟商
          allianceListByRegionId({
            regionId: res.data.electrombileRegionId
          }).then(res => {
            if (res.code == 0) {
              this.allianceOptionsDialog = res.data;
            }
          });
          // 大区id和加盟商id获取运营区域
          operateRegionfindByLargeFranchisee({
            largeAreaId: res.data.electrombileRegionId,
            franchiseeId: res.data.electrombileAllianceId
          }).then(res => {
            if (res.code == 0) {
              this.bilityOptions = res.data;
            }
          });
          // 获取收费设置
          chargeFranchisee({
            largeAreaId: res.data.electrombileRegionId,
            franchiseeId: res.data.electrombileAllianceId
          })
            .then(res => {
              if (res.code == 0) {
                this.chargeList = res.data;
              }
            })
            .catch(() => {});
          this.indexs = [];
          res.data.dutyArea.forEach((item, index) => {
            this.indexs.push(index);
          });
          this.form = Object.assign(this.form, res.data);
          this.form.dutyArea2 = this.indexs;
          this.form.dutyArea = [];
          this.dialogding = false;
        }
      });
    },
    handleGoRouter(row) {
      console.log(row, "handleGoRouter");
      this.$router.push({
        path: "/order/orderrecord",
        query: {
          electrombileNumber: row.electrombileNumber
          // current: this.listQuery.current,
          // size: this.listQuery.size
        }
      });
    },
    // 责任区域id和name存起来
    changeDutyName(index) {
      this.indexs = [];
      this.$nextTick(() => {
        this.indexs = index;
      });
    },
    submitform() {
      if (this.isEdit) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.form.dutyArea = [];
            this.indexs.forEach(index => {
              const areaId = this.bilityOptions[index];
              this.form.dutyArea.push({
                areaId: areaId.id,
                areaName: areaId.regionName
              });
            });
            carUpdate(this.form)
              .then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "修改成功",
                    type: "success"
                  });
                  this.getList();
                  this.form.dutyArea = [];
                  this.form.remark = "";
                  this.form.equipmentImel2 = "";
                  this.form.equipmentSim2 = "";
                  this.dialogFormVisible = false;
                }
              })
              .catch(() => {});
          } else {
            return false;
          }
        });
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.form.dutyArea = [];
            this.indexs.forEach(index => {
              const areaId = this.bilityOptions[index];
              this.form.dutyArea.push({
                areaId: areaId.id,
                areaName: areaId.regionName
              });
            });
            carInsert(this.form)
              .then(res => {
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "创建成功",
                    type: "success"
                  });
                  this.getList();
                  this.form.dutyArea = [];
                  this.form.remark = "";
                  this.form.equipmentImel2 = "";
                  this.form.equipmentSim2 = "";
                  this.dialogFormVisible = false;
                  console.log(this.form, "提交完成的form");
                }
              })
              .catch(() => {});
          } else {
            return false;
          }
        });
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file, "1111111");
      if (res.code == 0) {
        this.isUpload = true;
        this.form.excelKey = res.data.excelKey;
      }
    },
    submitformUpload() {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log(this.form, "上传提交的表单");
            importElectrombile(this.form)
              .then(res => {
                console.log(res, "上传提交的表单成功函数");
              })
              .catch(() => {});
            this.form.dutyArea = [];
            this.indexs.forEach(index => {
              const areaId = this.bilityOptions[index];
              this.form.dutyArea.push({
                areaId: areaId.id,
                areaName: areaId.regionName
              });
            });
            batchcarInsert(this.form)
              .then(res => {
                console.log(res, "哈哈哈哈哈");
                if (res.code == 0) {
                  this.$notify({
                    title: "成功",
                    message: "创建成功",
                    type: "success"
                  });
                  this.getList();
                  this.form.dutyArea = [];
                  this.form.remark = "";
                  this.form.equipmentImel2 = "";
                  this.form.equipmentSim2 = "";
                  this.form.excelKey = ""
                  this.dialogFormVisible = false;
                  console.log(this.form, "提交完成的form");
                }else{
                  this.$notify.error({
                    title: '错误',
                    message: res.data
                  });
                }
              })
              .catch(() => {});
          } else {
            return false;
          }
        });
      
    }
  }
};
</script>

<style lang="scss" scoped>
.carlist {
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
            width: 100px;
            text-align: right;
            line-height: 36px;
            margin-right: 10px;
          }
        }
      }
    }
    .upload-create {
      h3,
      ol {
        margin: 0px;
        padding: 0px;
        line-height: 20px;
      }
      ol {
        margin-left: 15px;
        span {
          color: red;
        }
      }
    }
    .page-excel {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      & > div:nth-child(2) {
        margin-top: 25px;
        color: #20a0ff;
      }
    }
  }
}
.carlist-container .search-container /deep/ .el-input {
  width: 230px;
}
.carlist-container .form /deep/ .el-input,
.el-textarea {
  width: 350px;
}
.carlist-container /deep/ .el-dialog {
  margin: 0 auto 50px;
}
</style>