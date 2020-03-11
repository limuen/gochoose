<template>
  <div class="permission-form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="角色名称" prop="Rolename">
        <el-input v-model="ruleForm.Rolename"></el-input>
      </el-form-item>
      <el-form-item label="状态" class="formitem">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
        <div class="ruleForm-Tips">如果禁用，则当前角色下的店员权限全部会禁止使用</div>
      </el-form-item>
      <el-form-item label="可用权限">
        <el-tree
          v-model="ruleForm.permission"
          :data="undertakeData"
          show-checkbox
          node-key="companyId"
          :props="defaultProps"
          :check-strictly="false"
          ref="tree"
          @check-change="handleCheckChange"
          :default-expanded-keys="this.defaultData"
          :default-checked-keys="this.defaultData"
          style="width: 200px"
        ></el-tree>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlesavePer">保存</el-button>
        <router-link to="/setup/permission/index">
          <el-button type="info">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      ruleForm: {
        Rolename: "",
        status: 0,
        permission: []
      },
      rules: {
        Rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      },
      undertakeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ], //可承接公司树
      defaultData: [],
      //识别tree的参数
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  // 获取数据
  async mounted() {
    if (this.isEdit) {
      console.log("init,编辑获取数据", this.$route.query.id);
    }
  },
  methods: {
    // 选择tree树
    handleCheckChange() {
      this.defaultData = this.$refs.tree.getCheckedKeys();
      this.ruleForm.permission = this.defaultData;
      console.log(this.ruleForm.permission);
    },
    // 保存
    handlesavePer() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // console.log(this.ruleForm,'111111')
          if (this.isEdit) {
            console.log(this.isEdit, "编辑");
          } else {
            console.log(this.isEdit, "新增");
          }
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
</style>