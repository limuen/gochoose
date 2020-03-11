<template>
  <div class="permission-container">
    <div class="permission-content">
      <div class="permission-search">
        <div>
          <el-input v-model="query.title" placeholder="请输入角色名称" style="width:200px;"></el-input>
          <el-select v-model="query.createName" clearable filterable placeholder="请选择创建人">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="query.status" clearable filterable placeholder="请选择状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" @click="getTrainingList" style="margin-left:10px">查询</el-button>
          <el-button plain @click="handleCancel">清空</el-button>
        </div>
        <router-link to="/setup/permission/create">
          <el-button type="primary" icon="el-icon-plus">添加新角色</el-button>
        </router-link>
      </div>

      <el-row>
        <el-button type="primary" @click="handleEnable">启用</el-button>
        <el-button type="warning" @click="handleProhibit">禁用</el-button>
        <el-button type="danger" @click="handleDeleteArray">删除</el-button>
      </el-row>

      <div class="permission-table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :header-cell-style="{background:'#EBEFF4'}"
        >
          <el-table-column type="selection" width="60"  align="center"></el-table-column>
          <el-table-column label="角色名称" width="200" align="center">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="员工数量" width="120" align="center"></el-table-column>
          <el-table-column prop="address" label="创建人"  align="center"></el-table-column>
          <el-table-column prop="address" label="添加时间"  align="center"></el-table-column>
          <el-table-column prop="address" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="text">
                <router-link :to="{ path:'/setup/permission/edit', query: { id: scope.row.name } }">编辑</router-link>
            </el-button>
            <el-button type="text" style="color:#ff1010" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>
      </div>

       <div class="page-container">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :current-page.sync="query.currentPage"
                @current-change="getTrainingList"
            ></el-pagination>
        </div>


    </div>
  </div>
</template>

<script>
export default {
  name: "permission",
  data() {
    return {
      // 查询参数
      query: {
        currentPage: 1,
        pageSize: 10,
        title: "",
        createName: "",
        status: ""
      },
      total: 0,
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
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [], // 表格多选
    };
  },
  methods: {
    // 点击查询
    getTrainingList() {
      console.log(this.query, "查询参数");
    },
    // 清空参数
    handleCancel() {
      this.query = {
        title: "",
        createName: "",
        status: ""
      }
    },
    // 表格多选
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    handleDelete(id) {
      this.$confirm("此操作将删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteTraining(this.$qs.stringify({ id }))
            .then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getTrainingList();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    // 启用
    handleEnable() {
      if(this.multipleSelection.length) {

      }else {
        this.$message({
          message: "请先选择要启用的数据",
          type: "warning"
        });
      }
    },
    // 禁用
    handleProhibit() {
      if(this.multipleSelection.length) {

      }else {
        this.$message({
          message: "请先选择要禁用的数据",
          type: "warning"
        });
      }
    },
    // 删除
    handleDeleteArray() {
      if(this.multipleSelection.length) {

      }else {
        this.$message({
          message: "请先选择要删除的数据",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.permission {
  &-container {
    background-color: #ffffff;
    padding: 10px;
    margin: 20px;
    .permission-content {
      padding: 10px;
      .permission-search {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 20px;
      }
      .permission-table {
        margin-top: 20px;
      }
    }
  }
}
</style>