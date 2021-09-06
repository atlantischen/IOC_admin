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
        <span>{{idType==='campusId'?'园区':'机构'}}权限分配</span>
      </div>
      <div class="box">
        <div class="radio_i">
          <el-radio-group v-model="radio" @change="selectRadio">
            <el-radio v-model="radio" label="1">服务</el-radio>
            <el-radio v-model="radio" label="2">菜单</el-radio>
          </el-radio-group>
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
      </div>
      <span slot="footer" class="dialog-footer">
        <button
          class="max_bt_gy"
          @click="$emit('update:permissionShow', false)"
        >
          取消
        </button>
        <button class="max_bt_df" @click="sure">确认</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTrue, addLevel } from "@/utils/method";
import { saveMenuApp } from "@/api/basicServices.js";
export default {
  props: {
    permissionShow: {
      type: Boolean
    },
    power: {
      typeof: Object,
      default: () => {}
    },
    roleInfo: {
      type: Object
    },
     idType: {
      type: String
    }

  },
  data() {
    return {
      radio: "1",
      checkStrictly: false,
      menuDatas: [],
      defaultProps: {
        children: "children",
        label: "title"
      },
      resetKeys: null,
      defaultKeys: [],
      data: [],
      appIds: null,
      menuIds: null
    };
  },
  watch: {
    power: {
      handler: function(n, o) {
        if (n) {
          this.radio = "1";
          this.initData(this.power.app);
          console.log(this.power.app,this.power.menu);
          if(this.power.app){
           this.appIds = getTrue(this.power.app, "choice").join(",");
            this.menuIds = '';

          }else if(this.power.menu){
          this.menuIds = getTrue(this.power.menu, "choice").join(",");
           this.appIds = '';

          }else if(this.power.app && his.power.app){
            this.appIds = getTrue(this.power.app, "choice").join(",");
            this.menuIds = getTrue(this.power.menu, "choice").join(",");
          } else{
              this.appIds =''
              this.menuIds =''
          }
            // this.appIds = getTrue(this.power.app, "choice");
            // this.menuIds = getTrue(this.power.menu, "choice");
            
         
        }
      },
      immediate: true
    }
  },

  methods: {
    handleChange(obj, keys) {
      let _a = keys.checkedKeys;
      this.checkStrictly = false;
      let _i = _a.indexOf("all");
      if (_i > -1) {
        _a.splice(_i, 1);
      }
      this.resetKeys = keys.checkedKeys;
    },
    initData(val) {
      this.data = [
        {
          name: "全部",
          title: "全部",
          id: "all",
          children: addLevel(val)
        }
      ];
      console.log(val,'val');
      this.defaultKeys = getTrue(val, "choice");
      this.resetKeys = this.defaultKeys;
    },
    selectRadio(v) {

      switch (v) {
        case "1":
          if (this.power.app && this.power.app.length != 0) {
            this.initData(this.power.app);
          } else {
            this.data = [];
          }
          break;
        case "2":
          if (this.power.menu && this.power.menu.length != 0) {
            this.initData(this.power.menu);
          } else {
            this.data = [];
          }
          break;
        default:
          break;
      }
    },
    sure() {
      this.$confirm(
        "确认修改“" +(this.idType==='campusId'?this.roleInfo.campusName:this.roleInfo.name ) + "”园区权限？",
        "操作确认",
        {
          type: "warning"
        }
      )
        .then(_ => {
          console.log(this.radio);
          console.log(this.resetKeys,this.menuIds);

          switch (this.radio) {
         

            case "1":
              this.$emit('save',{
                  appIds: this.resetKeys.join(","),
                  menuIds: this.menuIds,
                  [this.idType]: this.roleInfo.id
              })
              break;
            case "2":
                this.$emit('save',{
                  menuIds: this.resetKeys.join(","),
                  appIds: this.appIds,
                  [this.idType]: this.roleInfo.id
              })
              break;

            default:
              break;
          }
          this.$emit("update:permissionShow", false);
        })
        .catch(_ => {});
    }
  },
  created() {
    // console.log('wwwwww',this.power);
    //  this.initData(this.power.app);
  }
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
