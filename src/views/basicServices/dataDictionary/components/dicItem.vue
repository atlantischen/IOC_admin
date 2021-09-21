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
      <span>{{ _type === "add" ? "添加" : "编辑" }}字典数据项</span>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item class="count_item" label="类别名称" prop="dictCode">
        <el-select
          v-model="ruleForm.dictCode"
          :disabled="true"
          placeholder="请选择园区类型"
        >
          <el-option
            v-for="item in parkTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="count_item" label="字典名称" prop="name">
        <el-input placeholder="字典名称" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item class="count_item" label="字典选项值" prop="option">
        <el-input placeholder="字典选项值" v-model="ruleForm.option"></el-input>
      </el-form-item>
      <el-form-item class="count_item" label="字典编码" prop="value">
        <el-input
          placeholder="请输入字典编码"
          v-model="ruleForm.value"
        ></el-input>
      </el-form-item>
      <el-form-item class="count_item" label="排序值" prop="sort">
        <el-input placeholder="排序值" v-model="ruleForm.sort"></el-input>
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
import { adminDictItemApi, adminDictItemApi2 } from "@/api/dict";
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
  data() {
    return {
      Visible: false,
      parkTypeList: [],
      ruleForm: {
        sort: 0
      },
      rules: {
        dictCode: [
          { required: true, message: "请选择园区类型", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
        value: [{ required: true, message: "请输入字典编号", trigger: "blur" }]
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
      this.ruleForm = {}
      if (this._type === "edit") {
        this.ruleForm.dictCode = this._datas.dictCode
      }
    },
    sure() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this._type === "add") {
            adminDictItemApi2({
              ...this.ruleForm
            }).then(r => {
              if (r.code == 200) {
                this.$message.success("新增成功！");
              } else {
                this.$message.error("新增失败！");
              }
            });
          } else {
            adminDictItemApi2({ ...this.ruleForm }, "put").then(r => {
              if (r.code == 200) {
                this.$message.success("修改成功！");
              } else {
                this.$message.error("修改失败！");
              }
            });
          }
          this.close();
          this.$emit("refresh", this.ruleForm);
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
