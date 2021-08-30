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
      <span>{{ _type === "add" ? "新增" : "修改" }}</span>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input
          placeholder="请输入联系电话"
          v-model="ruleForm.phone"
        ></el-input
      ></el-form-item>
      <el-form-item label="姓名" prop="username">
        <el-input
          placeholder="请输入用户姓名"
          v-model="ruleForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="ruleForm.gender" placeholder="请选择性别">
          <el-option
            v-for="item in genderList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门">
        <el-input
          placeholder="请输入部门名称"
          v-model="ruleForm.dept"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input
          placeholder="请输入职位名称"
          v-model="ruleForm.position"
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
import { checkPhone } from "@/utils/validate";
import { parkUserApi2 } from "@/api/parkUser";
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
      ruleForm: {},
      genderList: [
        {
          name: "保密",
          value: ""
        },
        {
          name: "男",
          value: "0"
        },
        {
          name: "女",
          value: "1"
        }
      ],
      rules: {
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          {
            type: "number",
            validator: checkPhone,
            message: "请输入有效手机号号码",
            trigger: ["blur", "change"]
          }
        ],
        username: [
          { required: true, message: "请输入用户姓名", trigger: "blur" }
        ]
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
            this.ruleForm.password = this.ruleForm.phone;
            parkUserApi2({ ...this.ruleForm }).then(r => {
              if (r.code == 200) {
                this.$message.success("新增成功！");
                this.$emit("refresh");
                this.close();
              } else {
                this.$message.error("新增失败！");
              }
            });
          } else {
            parkUserApi2({ ...this.ruleForm }, "put").then(r => {
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
