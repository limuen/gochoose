<template>
  <div class="vehiclelist-container">
    <div class="search-container">
      <el-form label-width="130px" :model="formLabelAlign">
        <el-row :gutter="24">
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="运营商">
                <el-select v-model="value" placeholder="请选择运营商">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="加盟商">
                <el-select v-model="value" placeholder="请选择加盟商">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-form-item label="型号名称">
                    <el-input v-model="formLabelAlign.name" placeholder="请输入型号名称"></el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="品牌">
                    <el-input v-model="formLabelAlign.name" placeholder="请输入品牌"></el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="脉冲">
                   <el-input placeholder="请输入脉冲" v-model="input2">
                        <template slot="append">个</template>
                    </el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="电池电压">
                   <el-input placeholder="请输入电池电压" v-model="input2">
                        <template slot="append">V</template>
                    </el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="保护电压">
                   <el-input placeholder="请输入保护电压" v-model="input2">
                        <template slot="append">V</template>
                    </el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="电流">
                   <el-input placeholder="请输入电流" v-model="input2">
                        <template slot="append">A</template>
                    </el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="功率">
                   <el-input placeholder="请输入功率" v-model="input2">
                        <template slot="append">W</template>
                    </el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="工作电压">
                   <el-input placeholder="请输入工作电压" v-model="input2">
                        <template slot="append">V</template>
                    </el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="最高速度">
                   <el-input placeholder="请输入最高速度" v-model="input2">
                        <template slot="append">km</template>
                    </el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="车轮半径">
                   <el-input placeholder="请输入车轮半径" v-model="input2">
                        <template slot="append">m</template>
                    </el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="电池类型">
                   <el-select v-model="value" placeholder="请选择电池类型">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="转把">
                   <el-select v-model="value" placeholder="请选择转把">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="传感器">
                   <el-select v-model="value" placeholder="请选择传感器">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="传感器磁珠个数">
                   <el-select v-model="value" placeholder="请选择传感器磁珠个数">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="蜂鸣器">
                   <el-select v-model="value" placeholder="请选择蜂鸣器">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="夜行灯">
                   <el-select v-model="value" placeholder="请选择夜行灯">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="夜行灯电压">
                   <el-input placeholder="请输入夜行灯电压" v-model="input2">
                        <template slot="append">V</template>
                    </el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="电池仓锁供电时长">
                   <el-input placeholder="请输入电池仓锁供电时长" v-model="input2">
                        <template slot="append">ms</template>
                    </el-input>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="控制器型号">
                   <el-select v-model="value" placeholder="请选择控制器型号">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="电机类型">
                    <el-radio label="高速"></el-radio>
                    <el-radio label="低速"></el-radio>
                </el-form-item>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-button type="primary" style="display:block;margin:auto;">提交</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "createvehicle",
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
      formLabelAlign: {}
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.createvehicle {
  &-container {
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
  }
}
</style>