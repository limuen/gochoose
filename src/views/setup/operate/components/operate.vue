<template>
  <div class="permission-form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="姓名" prop="Rolename">
        <el-input v-model="ruleForm.Rolename"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="登陆密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-select v-model="ruleForm.roles" clearable filterable placeholder="请选择角色">
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.value"
            :value="item.label"
          ></el-option>
        </el-select>
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
        phone: "",
        password: "",
        roles: "",
        status: 0,
        permission: []
      },
      rules: {
        Rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,
            message: "密码必须包含数字、字母，6-12位",
            trigger: "blur"
          }
        ],
        roles: [{ required: true, message: "请选择角色", trigger: "change" }]
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
      },
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
      ], // 角色
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