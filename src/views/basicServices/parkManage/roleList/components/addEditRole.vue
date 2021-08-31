<template>
  <el-dialog
    class="dLog"
    title=""
    :visible.sync="Visible"
    width="40%"
    @close="close"
    :destroy-on-close="true"
  >
    <div slot="title" class="header-title">
      <i
        class="iconfont"
        :class="_type === 'add' ? 'icon-xinzeng' : 'icon-shenqingguanli'"
      ></i>
      <span>{{ _type === "add" ? "新增" : "修改" }}角色</span>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input
          placeholder="请输入角色名称"
          v-model="ruleForm.name"
        ></el-input
      ></el-form-item>
      <el-form-item label="角色说明">
        <el-input
          placeholder=""
          type="textarea"
          v-model="ruleForm.remark"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer xy_c">
      <button class="max_bt_gy" @click="reset">取消</button>
      <button class="max_bt_df" @click="sure">确认</button>
    </span>
  </el-dialog>
</template>

<script>
import { parkRoleApi2 } from "@/api/parkRole";
export default {
  name: "addEditDicType",
  props: {
    _show: {
      type: Boolean
    },
    _datas: {
      typeof: Object,
      default: () => {}
    },
    _type: {
      type: String
    }
  },
  // props: ["_show", "_datas", "_type"],
  data() {
    return {
      Visible: false,
      ruleForm: {},
      //
      rules: {
        name: [{ required: true, message: "请输入权限名称", trigger: "blur" }]
      }
    };
  },
  watch: {
    _show: {
      handler: function(n) {
        this.Visible = n;
      },
      immediate: false
    },
    _datas: {
      handler: function(n) {
        this.ruleForm = JSON.parse(JSON.stringify(this._datas));
      },
      deep: true
    }
  },
  methods: {
    close() {
      this.reset();
      this.Visible = false;
      this.$emit("close", "close");
    },
    reset() {
      this.$refs.ruleForm.resetFields();
    },
    sure() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this._type === "add") {
            parkRoleApi2({ ...this.ruleForm }).then(r => {
              if (r.code == 200) {
                this.$message.success("新增成功！");
                this.$emit("refresh");
                this.close();
              } else {
                // this.$message.error("新增失败！");
              }
            });
          } else {
            parkRoleApi2({ ...this.ruleForm }, "put").then(r => {
              if (r.code == 200) {
                this.$message.success("修改成功！");
                this.$emit("refresh");
                this.close();
              } else {
                this.$message.error("修改失败！");
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.dlog {
}
</style>
