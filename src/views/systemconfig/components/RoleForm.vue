<template>
  <div class="content">
    <el-container style="width: 50%; border: 1px solid #eee" :style="contentStyleObj">
      <!-- <el-aside style="background-color: white;border-right: 1px solid #eee;margin-bottom: 0px" width="45%">
        <div>
          <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="80px">
            <el-form-item label="角色名称" prop="role_name">
              <el-input v-model="roleForm.role_name" />
            </el-form-item>
            <el-form-item label="角色描述" prop="desc">
              <el-input v-model="roleForm.desc" rows="4" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('roleForm')">保 存</el-button>
              <el-button @click="resetForm('roleForm')">重 置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-aside>-->
      <el-aside
        style="background-color: white;border-right: 1px solid #eee;margin-bottom: 0px"
        v-loading="treeloading"
        width="100%"
      >
        <div class="auth-btn">
          <el-tag>路由权限</el-tag>
        </div>
        <el-tree
          style="display:block;marin:auto;"
          ref="routerTree"
          :data="routers"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :props="defaultProps"
          :check-strictly="true"
          @check-change="getCheckRouters"
        />
        <el-button
          type="primary"
          style="display:block;margin:20px auto;"
          @click="submitForm('roleForm')"
        >提 交</el-button>
      </el-aside>
      <!-- <el-aside style="background-color: white;border-right: 1px solid #eee;margin-bottom: 0px" width="50%">
        <div class="auth-btn" style="padding-bottom: 5px;"><el-tag>按钮权限</el-tag></div>
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;" />
        <el-checkbox-group v-model="roleForm.buttons" @change="handleCheckedButtonsChange">
          <el-checkbox v-for="button in buttons" :key="button.button_id" :label="button.button_id">{{ button.title }}</el-checkbox>
        </el-checkbox-group>
      </el-aside>-->
    </el-container>
  </div>
</template>

<script>
// import { getSystemButtonAll } from '@/api/button'
import { getAdminRouterTree, authorization } from "@/api/admin-router";
// import { getRole, createRole, updateRole } from '@/api/role'
// import { Message } from 'element-ui'
export default {
  name: "RoleForm",
  // inject: ['reload'],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      contentStyleObj: {
        height: ""
      },
      roleForm: {
        ruleId: "",
        routers: [],
        buttons: []
      },
      rules: {
        role_name: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请输入角色描述", trigger: "blur" }]
      },
      routers: [],
      treeloading: true,
      treedata: [],
      defaultProps: {
        children: "children",
        label: "descr"
      },
      checkAll: false,
      buttons: [],
      isIndeterminate: true
    };
  },
  watch: {
    buttons(newVal, oldVal) {
      if (
        newVal.length === this.roleForm.buttons.length &&
        newVal.length !== 0
      ) {
        this.checkAll = true;
        this.isIndeterminate = false;
      }
    },
    "roleForm.buttons"(newVal, oldVal) {
      if (newVal.length === this.buttons.length) {
        this.checkAll = true;
        this.isIndeterminate = false;
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    // 获取树
    const ruleId = this.$route.query.id;
    this.roleForm.ruleId = this.$route.query.id;
    console.log(ruleId);
    getAdminRouterTree({ ruleId: ruleId }).then(res => {
      console.log(res, "11111111");
      if (res.code == 0) {
        this.routers = res.data.routers;
        let menus = res.data.menuList;
        let buttons = res.data.buttonList;
        this.treedata = menus.concat(buttons)
        this.$nextTick(()=>{
          this.$refs.routerTree.setCheckedNodes(this.treedata)
        })
        this.treeloading = false;
        this.routers.forEach(item => {
          if (item.children.length) {
            item.children.forEach(element => {
              if (element.children.length) {
                element.children.forEach(key => {
                  key["level"] = 3;
                });
              }
            });
          }
        });
      }
    });
  },
  methods: {
    getHeight() {
      this.contentStyleObj.height = window.innerHeight - 120 + "px";
    },
    submitForm(formName) {
      console.log(this.roleForm, "roleForm");
      authorization({
        menus: this.roleForm.routers,
        buttons: this.roleForm.buttons,
        ruleId:this.roleForm.ruleId
      }).then(res=>{
        console.log(res,'1111111')
        if(res.code == 0){
          this.$notify({
            title: '成功',
            message: '分配权限成功',
            type: 'success'
          });
          this.$router.push({
            path: "/systemconfig/role"
          });
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 选中路由权限
    getCheckRouters() {
      //一级二级
      this.roleForm.routers = this.$refs.routerTree.getCheckedNodes().filter(item=>{
        return item.level !== 3
      }).map(item=> item.id);
      //三级
      this.roleForm.buttons = this.$refs.routerTree.getCheckedNodes().filter(item=>{
        return item.level == 3
      }).map(item=> item.id);
    },
    handleCheckAllChange(val) {
      if (val) {
        const buttonIds = this.buttons.map(item => {
          return item.button_id;
        });
        this.roleForm.buttons = buttonIds;
      } else {
        this.roleForm.buttons = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedButtonsChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.buttons.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.buttons.length;
    }
  },
  destroy() {
    window.removeEventListener("resize", this.getHeight);
  }
};
</script>

<style scoped>
.auth-btn {
  text-align: center;
  padding: 10px;
}
.el-checkbox {
  width: 100%;
}
</style>
