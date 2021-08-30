<template>
  <div class="container">
    <el-dialog
      title="提示"
      :visible="dialogShow"
      width="60%"
      :destroy-on-close="true"
      @close="$emit('update:dialogShow', false)"
      custom-class="my_dialog"
    >
      <div slot="title" class="header-title">
        <span class="svg-container">
          <svg-icon :icon-class="type == 'add' ? 'xinzeng' : 'bianji'" />
        </span>
        <span>{{ type == "add" ? "新增" : "编辑" }}</span>
      </div>
      <el-form
        ref="formData"
        class="el_form"
        :model="formData"
        :rules="rules"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="园区名称" prop="campusName">
          <el-input v-model="formData.campusName"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="formData.campusNumber"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="formData.campusType" placeholder="请选择活动区域">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父级园区">
          <el-select
            v-model="formData.parentName"
            clearable
            placeholder="请选择"
            @clear="handleClear"
            ref="selectUpResId"
            @change="selectchange"
          >
            <el-option
               style="height:auto" 
              hidden
              key="upResId"
              :value="formData.parentName"
              :label="formData.parentName"
            >
            </el-option>

            <el-tree
              :data="treeList"           
              :expand-on-click-node="false"
              :check-on-click-node="true"
              :default-expand-all="true"
              @node-click="handleNodeClick"
            >
            </el-tree>
          </el-select>
          <!-- <el-select  popper-class="select_item"  :popper-append-to-body="false" :value="formData.parentName"  placeholder="请选择" ref="selectTree1">
            <el-option style="height:auto" :value="formData.parentId" :label="formData.parentName" class="option">
                  <el-tree
                      :data="treeList"
                      :expand-on-click-node="false"
                      :check-on-click-node="false"
                      :default-expand-all="true"
                      @node-click="handleNodeClick"
                      node-key="ids">
                  </el-tree>
              </el-option>
          </el-select> -->
          <!-- <el-select v-model="formData.parentName" placeholder="请选择活动区域">
            <el-option
            v-for="item in parentPark"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </el-select> -->
        </el-form-item>
        <el-form-item label="园区级别">
          <el-select
            v-model="formData.campusRanks"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="item in campusRanks"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select> </el-form-item
        ><el-form-item label="园区地址">
          <el-input v-model="formData.address"></el-input> </el-form-item
        ><el-form-item label="状态">
          <el-select
            v-model="formData.campusStatus"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="经纬度">
          <el-input v-model="formData.location"></el-input>
          <div class="dingwei">
            <a
              href="http://api.map.baidu.com/lbsapi/getpoint/?qq-pf-to=pcqq.c2c"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg-icon icon-class="dingwei" style="font-size:26px"> </svg-icon>
            </a>
          </div>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 8 }"
            v-model="formData.remark"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer ">
        <button class="max_bt_gy"  @click="$emit('update:dialogShow', false)">取消</button>
      <button class="max_bt_df" @click="submitForm">确认</button>

      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getParkSelect,
  updateParkManage,
  getParentPark,
  addParkManage
} from "@/api/basicServices.js";

export default {
  props: {
    dialogShow: {
      type: Boolean
    },
    formData: {
      type: Object
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      campusRanks: [],
      typeOptions: [],
      options: [],
      parentPark: [],
      rules: {
        campusName: [
          { required: true, message: "请输入园区名称", trigger: "blur" }
        ]
      },
      treeLabel: "",
      treeList: null
    };
  },

  methods: {
    initSelect() {
      getParkSelect({ queryMode: "list", dictCode: "campus_type" }).then(
        res => {
          this.options = res.data;
        }
      );
      getParkSelect({ queryMode: "list", dictCode: "campus_status" }).then(
        res => {
          this.typeOptions = res.data;
        }
      );
      getParkSelect({ queryMode: "list", dictCode: "campus_ranks" }).then(
        res => {
          this.campusRanks = res.data;
        }
      );
      getParentPark({ limit: "10", page: "5", queryMode: "tree" }).then(res => {
        // console.log(res);
        this.treeList = res.data;
      });
    },
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          if (this.type === "add") {
            addParkManage({...this.formData}).then(res=>{
               if(res.code==="200"){
              this.$message({ message: res.msg,
              type: 'success',})
              this.$emit('init',{limit:'10',page:'1',queryMode:'page'})
              this.$emit('update:dialogShow', false)
            }
            })
          } else if (this.type === "edit") {
             updateParkManage({...this.formData}).then(res=>{
              if(res.code==="200"){
                this.$message({ message: res.msg ,
                type: 'success',})
                this.$emit('init',{limit:'10',page:'1',queryMode:'page'})
                this.$emit('update:dialogShow', false)
              }
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleNodeClick(node) {
      // node.id 是你所选中的ID
      // treeLabel展示在外界的中文名

      this.formData.parentName = node.label;
      this.formData.parentId = node.id;
      this.$set(this.formData, this.formData.parentName, node.label)
      this.$set(this.formData, this.formData.parentId, node.id)
      // this.$forceUpdate()
      this.$refs.selectUpResId.blur(); //让select失去焦点关闭下拉框
    },
    handleClear(){
      this.formData.parentName = '';
      this.formData.parentId = '';
       this.$set(this.formData, this.formData.parentId, '')

       this.$set(this.formData, this.formData.parentName, '')
      // this.$forceUpdate()

    },
    selectchange(){
      console.log('121212');
    }
    
  },
  created() {
    this.initSelect();
  }
};
</script>
<style lang="scss">
.el-textarea__inner {
  resize: none !important;
}
.select_item {
  position: absolute !important;
  left: 0 !important;
}
// .el-select-dropdown__item {
//   height: auto;
//   font-weight: normal;
// }
// .el-select-dropdown__item.selected {
//   height: auto;
//   font-weight: normal;
// }
.el-select-dropdown__item {
  background-color: #fff !important;
}
// .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
//   content: '';
// }
// .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__content:after{
//   position: absolute;
//   top: 4px;
//   right: -12px;
//   font-size: 16px;
//   content: '*';
//   color: #F56C6C;
// }
//

//   .dialog {
//   .el-dialog__body {
//     padding:40px  65px;
//     color: #fff;
//   }
// }
</style>
<style lang="scss" scoped>
.container {
  .el_form {
    padding: 0 45px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item {
      width: 40%;
      position: relative;
      .el-form-item__label {
        text-align: center !important;
      }
      .el-textarea {
        width: 942px;
        .el-textarea__inner {
          resize: none !important;
        }
      }
      .el-select {
        width: 100%;
      }
    }
    .el-form-item__content {
      width: 300px !important;
    }
  }
  .dialog-footer {
    .el-button--primary {
      margin-left: 60px;
    }
  }
  .dingwei {
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    & > a {
      display: flex;
      align-items: center;
    }
  }
}
</style>
