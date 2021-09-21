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
      <i class="iconfont icon-mimazhongzhi"></i>
      <span>修改登录密码</span>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名:">
        <span v-if="_datas"
          >{{ _datas.username }}({{ _datas.phone || "-" }})</span
        >
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input
          placeholder="请输入新密码"
          v-model="ruleForm.password"
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
import { cgPasswordApi } from "@/api/userMgt";
export default {
  name: "addEditDicType",
  props: {
    _show: {
      type: Boolean
    },
    _type: {
      type: String
    },
    _datas: {
      typeof: Object,
      default: () => {}
    }
  },
  data() {
    return {
      Visible: false,
      ruleForm: {},
      rules: {
        password: [{ required: true, message: "请输入新密码", trigger: "blur" }]
      }
    };
  },
  watch: {
    _show: {
      handler: function(n) {
        this.Visible = n;
      },
      immediate: false
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
          cgPasswordApi({ id: this._datas.id, ...this.ruleForm }).then(r => {
            if (r.code == 200) {
              this.$message.success("修改成功！");
              // this.$emit("refresh");
              this.close();
            } else {
              this.$message.error("修改失败！");
            }
          });
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
