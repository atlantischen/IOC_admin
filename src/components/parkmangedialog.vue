<template>
  <div class="container">
    <el-dialog
      title="提示"
      :visible="dialogShow"
      width="60%"
      :destroy-on-close="true"
      @close="$emit('update:dialogShow', false)"
      custom-class="dialog"
    >
      <div slot="title" class="header-title">
        <span class="svg-container">
          <svg-icon :icon-class="formData.icon" />
        </span>
        <span>{{formData.title}}</span>
      </div>
      <el-form
        ref="form"
        class="el_form"
        :model="form"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <el-form-item label="类型">
          <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="父级园区">
         <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="园区级别">
          <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        </el-form-item
        ><el-form-item label="园区地址">
          <el-input v-model="form.name"></el-input> </el-form-item
        ><el-form-item label="状态">
           <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
          </el-form-item
        >
        <el-form-item label="经纬度">
          <el-input v-model="form.name"></el-input>
          <div class="dingwei">
             <a href="http://api.map.baidu.com/lbsapi/getpoint/?qq-pf-to=pcqq.c2c" target="_blank" rel="noopener noreferrer">
                <svg-icon icon-class="dingwei"  style="font-size:26px">
             </svg-icon >
               </a>
          </div>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
            type="textarea"
            :autosize="{ minRows: 8, maxRows: 8 }"
            v-model="form.desc"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="$emit('update:dialogShow', false)">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogShow: {
      type: Boolean
    },
    formData:{
      type: Object

    }
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },

  methods: {}
};
</script>
<style lang="scss">
.el-textarea__inner {
  resize: none !important;
}
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
      .el-select{
        width: 100%;
      }
    }
    .el-form-item__content {
      width: 300px !important;
    }
  }
  .dialog-footer{
   .el-button--primary{
     margin-left: 60px;
   }
  }
  .dingwei{
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    &>a{
      display: flex;
    align-items: center;
    }
    
  }
}
</style>
