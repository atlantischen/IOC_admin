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
    <div class="dLog_content ">
      <div class="radios">
        <el-radio-group
          class="radiosGroup"
          v-model="radioIndex"
          @change="selectR"
        >
          <el-radio :label="0">菜单</el-radio>
        </el-radio-group>
      </div>
      <div class="radios_tree mBar">
        <el-tree
          :data="menuDatas"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :default-checked-keys="defaultKeys"
          :check-strictly="checkStrictly"
          :props="defaultProps"
          @check="handleChange"
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
import { roleMenuApi } from "@/api/role";
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
    },
    roleInfo: {
      type: Object
    }
  },
  data() {
    return {
      radioIndex: 0,
      Visible: false,
      checkStrictly: false,
      menuDatas: [
        {
          id: 1,
          label: "111",
          mLevel: 1,
          children: [
            {
              id: 2,
              label: "2222",
              mLevel: 2,
              children: [
                {
                  id: 3,
                  label: "3333",
                  mLevel: 3,
                  children: [
                    {
                      id: 4,
                      label: "44444",
                      mLevel: 4,
                      children: [
                        {
                          id: 5,
                          label: "55555",
                          mLevel: 5
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      defaultKeys: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      resetKeys: null
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
      handler: function(n, o) {
        this.defaultKeys = [];
        this.defaultKeys = this._datas;
      },
      deep: true
    }
  },
  created() {},
  methods: {
    close() {
      this.Visible = false;
      this.$emit("close", "close");
      this.menuDatas = []
    },
    reset() {
      this.close();
    },
    sure() {
      this.$confirm(
        "确认修改“" + this.roleInfo.name + "”角色权限？",
        "操作确认",
        {
          type: "warning"
        }
      )
        .then(_ => {
          roleMenuApi(
            { menuIds: this.resetKeys.join(","), roleId: this.roleInfo.id },
            "put"
          ).then(r => {
            if (r.code == 200) {
              this.$message.success("编辑成功！");
              this.close();
            } else {
              this.$message.error("编辑失败！");
            }
          });
        })
        .catch(_ => {});
    },
    handleChange(obj, keys) {
      // console.log(obj, keys);
      console.log("111111");
      let _a = keys.halfCheckedKeys;
      this.checkStrictly = false;
      let _i = _a.indexOf("all");
      if (_i > -1) {
        _a.splice(_i, 1);
      }
      this.resetKeys = keys.checkedKeys.concat(_a);
    },
    selectR(val) {
      // console.log(val);
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/iconfont/iconfont.css";
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
    ::v-deep .el-tree {
      .el-checkbox {
        margin-left: 5px;
      }
      .el-checkbox__inner::before {
        top: 8px;
      }
      .el-checkbox__inner {
        width: 18px;
        height: 18px;
        border-radius: 3px;
        overflow: hidden;
        &::after {
          width: 4px;
          height: 8px;
          top: 2px;
          left: 6px;
        }
      }
      .el-icon-caret-right {
        color: #000;
        font-size: 15px;
      }
      .el-icon-caret-right::before {
        content: "\e6d9";
      }
      .el-tree-node__expand-icon.expanded {
        transform: rotate(180deg);
      }
      .is-expanded {
        .el-icon-caret-right::before {
          content: "\e6d8";
        }
      }
      .el-tree-node__expand-icon {
        color: #000;
      }
      .el-tree-node__expand-icon.is-leaf {
        color: #000;
        cursor: default;
      }
      .el-tree-node__children {
        .el-tree-node__children {
          .el-tree-node__children {
            .el-tree-node__children {
              .el-icon-caret-right::before {
                font-family: "iconfont" !important;
                content: "\ea18";
                color: #000;
              }
            }
          }
        }
      }
    }
  }
}
</style>
