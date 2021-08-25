<template>
  <el-dialog
    class="dLog selectRoleP"
    title=""
    :visible.sync="Visible"
    width="40%"
    @close="close"
    :destroy-on-close="true"
  >
    <div slot="title" class="header-title">
      <i class="iconfont icon-quanxianshezhi"></i>
      <span>选择角色权限</span>
    </div>
    <!-- <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="角色说明">
        <el-input
          placeholder=""
          type="textarea"
          v-model="ruleForm.remark"
        ></el-input>
      </el-form-item>
    </el-form> -->
    <div class="dLog_content ">
      <div class="radios">
        <el-radio-group
          class="radiosGroup"
          v-model="radioIndex"
          @change="selectR"
        >
          <el-radio :label="0">菜单</el-radio>
          <el-radio :label="1">备选项</el-radio>
        </el-radio-group>
      </div>
      <div class="radios_tree mBar">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps"
        >
        </el-tree>
      </div>
    </div>
    <span slot="footer" class="dialog-footer xy_c">
      <button class="max_bt_gy" @click="reset">取消</button>
      <button class="max_bt_df" @click="sure">确认</button>
    </span>
  </el-dialog>
</template>

<script>
import { adminRoleApi2 } from "@/api/role";
export default {
  name: "selectRolePower",
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
      radioIndex: 0,
      Visible: false,
      data: [
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
      ],
      defaultProps: {
        children: "children",
        label: "label"
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
      // this.$refs.ruleForm.resetFields();
    },
    sure() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this._type === "add") {
            adminRoleApi2({ ...this.ruleForm }).then(r => {
              if (r.code == 200) {
                this.$message.success("新增成功！");
                this.$emit("refresh");
                this.close();
              } else {
                this.$message.error("新增失败！");
              }
            });
          } else {
            adminRoleApi2({ ...this.ruleForm }, "put").then(r => {
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
    },
    selectR(val) {
      console.log(val);
    }
  }
};
</script>

<style scoped lang="scss">
.dLog {
  ::v-deep .el-dialog__body {
    padding: 25px 20px;
  }
}
.dLog_content {
  ::v-deep.radios {
    padding: 15px 20px;
    background: #f9f9f9;
    .el-radio__input.is-checked .el-radio__inner {
      background: transparent;
    }
    .el-radio__inner {
      width: 18px;
      height: 18px;
      border-color: #409eff;
    }
    .el-radio__inner::after {
      width: 8px;
      height: 8px;
      background: #409eff;
    }
  }
  .radios_tree {
    height: 300px;
    overflow-y: auto;
    padding: 10px 30px;
  }
}
</style>
