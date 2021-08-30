<template>
  <div class="container">
    <el-dialog
      title="提示"
      :visible="addDialogShow"
      width="60%"
      :destroy-on-close="true"
      @close="$emit('update:addDialogShow', false)"
      custom-class="my_dialog my_footer"
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
        <el-form-item label="机构名称" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>   
        <el-form-item label="机构类型">
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
        <el-form-item label="联系人">
          <el-input v-model="formData.campusNumber"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formData.campusNumber"></el-input>
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

        </el-form-item>
        <el-form-item label="入住时间">
          <el-date-picker
            v-model="formData.campusNumber"
            :clearable="false"
            type= "datetime"
            class="datePicker my_datePicker"
            placeholder="选择日期时间">
          </el-date-picker>

          
          </el-form-item>
     <el-form-item label="入住状态">
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
      </el-form>
      <span slot="footer" class="dialog-footer  ">
        <button class="max_bt_gy"  @click="$emit('update:addDialogShow', false)">取消</button>
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
    addDialogShow: {
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
        name: [
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
          // if (this.type === "add") {
          //   addParkManage({...this.formData}).then(res=>{
          //      if(res.code==="200"){
          //     this.$message({ message: res.msg,
          //     type: 'success',})
          //     this.$emit('init',{limit:'10',page:'1',queryMode:'page'})
          //   
          //   }
          //   })
          // } else if (this.type === "edit") {
          //    updateParkManage({...this.formData}).then(res=>{
          //     if(res.code==="200"){
          //       this.$message({ message: res.msg ,
          //       type: 'success',})
          //       this.$emit('init',{limit:'10',page:'1',queryMode:'page'})
          //       this.$emit('update:dialogShow', false)
          //     }
          //   })
          // }
              this.$emit('update:addDialogShow', false)

            console.log(this.addDialogShow);
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

.el-select-dropdown__item {
  background-color: #fff !important;
}
.datePicker{
  width: 100% !important;
  .el-input__prefix {
    left: 90%;
  }
}
.my_footer {
  .el-dialog__footer{
  padding: 70px 0;

  }
}

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
