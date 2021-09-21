<template>
  <el-dialog
    :visible="passwordDialogVisible"
    width="50%"
    custom-class="el_dialog my_dialog"
    :destroy-on-close="true"
    @close="$emit('update:passwordDialogVisible', false)"
  >
    <div slot="title" class="header-title">
      <span class="svg-container">
        <svg-icon icon-class="user" />
      </span>
      <span>修改密码</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="原始密码"  prop="oldPassword">
        <el-col :span="24">
          <el-input type="password" v-model="form.oldPassword"></el-input
        ></el-col>
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-col :span="24"> <el-input type="password" v-model="form.newPassword"></el-input></el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-col :span="24"> <el-input type="password" v-model="form.confirmPassword"></el-input></el-col>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
          <button  class="md_bt_df" @click="submitForm('form')">确 定</button>

    </span>
  </el-dialog>
</template>

<script>
// import { getToken } from '@/utils/auth'
import {
  setPassword
} from "@/api/user.js";
export default {
      props:{
        passwordDialogVisible:{
          type:Boolean
        }
      },
     data() {
      var validatePass = (rule, value, callback) => {
        console.log(rule, value);
        if (value === '') {
          callback(new Error('请输入确认密码!'));
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        form:{
          oldPassword:'',
          newPassword:'',
          confirmPassword:'',
        },

    rules: {
          oldPassword: [
             { required: true, message: '请输入原始密码!', trigger: 'blur' },
          ],
          newPassword: [
            { required: true, message: '请输入新密码!', trigger: 'blur' },
          ],
          confirmPassword:[
            {validator: validatePass,required: true, trigger: 'blur' }
          ]

        },

      };
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form);
            setPassword(this.form).then(res=>{
              if(res.code==='200'){
               this.$message.success(res.msg);
               this.$emit('update:passwordDialogVisible', false)
               this.$refs[formName].resetFields();

              }

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

    }
}
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
.el-select {
  width: 100%;
}
.el-form-item {
  width: 50%;
  margin: 20px auto;
}
</style>
