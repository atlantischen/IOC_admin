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
        :class="_type === 'add' ? 'icon-tianjia' : 'icon-shenqingguanli'"
      ></i>
      <span>{{ _type === "add" ? "添加" : "编辑" }}字典类别</span>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item class="count_item" label="类别名称" prop="name">
        <el-input
          placeholder="请输入类别名称"
          v-model="ruleForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item class="count_item" label="类别编码" prop="code">
        <el-input
          placeholder="请输入类别编码"
          v-model="ruleForm.code"
        ></el-input>
      </el-form-item>
      <el-form-item class="count_item" label="排序值" prop="sort">
        <el-input placeholder="请输入排序值" v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item class="count_item" label="备注" prop="remark">
        <el-input
          type="textarea"
          placeholder="请输入内容"
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
import { adminDictApi2, adminDictApi } from "@/api/dict";
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
      rules: {
        name: [{ required: true, message: "请输入类别名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入类别编码", trigger: "blur" }],
        value: [{ required: true, message: "请输入排序值", trigger: "blur" }]
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
            adminDictApi2({ ...this.ruleForm }).then(r => {
              if (r.code == 200) {
                this.$message.success("新增成功！");
                this.$emit("refresh");
                this.close();
              } else {
                this.$message.error("新增失败！");
              }
            });
          } else {
            adminDictApi2({ ...this.ruleForm }, "put").then(r => {
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
