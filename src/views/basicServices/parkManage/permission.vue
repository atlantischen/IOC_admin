<template>
  <div class="container">
    <el-dialog
      title="提示"
      :visible="permissionShow"
      width="50%"
      :destroy-on-close="true"
      @close="$emit('update:permissionShow', false)"
      custom-class="dialog"
    >
      <div slot="title" class="header-title">
        <span class="svg-container">
          <svg-icon icon-class="quanxian" />
        </span>
        <span>园区权限分配</span>
      </div>
      <div class="box">
        <div class="radio_i">
          <el-radio v-model="radio" label="1">菜单</el-radio>
          <el-radio v-model="radio" label="2">服务</el-radio>
        </div>
        <div class="radios_tree mBar">
          <el-tree
            :data="data"
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
        <!-- <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
           >
            </el-tree> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <button
          class="max_bt_gy"
          @click="$emit('update:permissionShow', false)"
        >
          取消
        </button>
        <button class="max_bt_df">确认</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    permissionShow: {
      type: Boolean
    }
  },
  data() {
    return {
      radio: "1",
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
                  label: "三级 1-1-2",
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
      ]
    };
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.container {
  .box {
    border: 1px solid #bbbbbb;
    ::v-deep.radio_i {
      height: 47px;
      padding-left: 20px;
      background: #f9f9f9;
      line-height: 47px;
      .el-radio__input.is-checked .el-radio__inner {
      background: transparent;
    }
        .el-radio__inner {
      width: 18px ;
      height: 18px ;
      border-color: #409eff;
    }
    .el-radio__inner::after {
      width: 8px;
      height: 8px;
      background: #409eff;
    }
    }
   

    .radios_tree {
      height: 400px;
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
  .dialog-footer {
    .el-button--primary {
      margin-left: 60px;
    }
  }
}
</style>
