<template>
  <el-dialog

  :visible="dialogVisible"
  width="50%"
  custom-class="el_dialog my_dialog"
    :destroy-on-close="true"
    @close="close"
    @open="openDialog"
  >
   <div slot="title" class="header-title">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <span>我的信息</span>
      </div>
  <el-form ref="form" :model="form"  :rules="rules"  label-width="80px">
  <el-form-item label="姓名" prop="username">
  
    <el-col :span="24"> <el-input v-model="form.username"></el-input></el-col>
  </el-form-item>
  <el-form-item label="性别" prop="gender">
     <el-col :span="24">
    <el-select  v-model="form.gender" placeholder="请选择活动区域">
      <el-option 
        v-for="item in genderOpaction"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      </el-option>
    </el-select>
    </el-col>
  </el-form-item>
   <el-form-item label="用户头像"  >
    <el-col :span="24"> 
        <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-error="handleAvatarError"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="form.avatar" :src="form.avatar" class="avatar">
        <el-avatar v-else  :size="100" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
        <div slot="tip"  class="el-uploads">上传图片</div>

        <div slot="tip" style="color:red" class="el-upload__tip">（建议选择尺寸大小不超过300K的JPG/PNG图片）</div>
      </el-upload>
    </el-col>
  </el-form-item>
   <el-form-item label="手机号"  prop="phone">
   
    <el-col :span="24"> <el-input v-model="form.phone"></el-input></el-col>
  </el-form-item>

</el-form>
  

  <span slot="footer" class="dialog-footer">
    <button  class="md_bt_df" @click="submitForm('form')">确 定</button>
  </span>
</el-dialog>
</template>

<script>
import { getToken } from '@/utils/auth'
import {
  setUserInfo
} from "@/api/user.js";
import {getParkSelect} from "@/api/basicServices.js";
export default {
      props:{
        dialogVisible:{
          type:Boolean
        }
      },
     data() {
      return {
      uploadImage:process.env.VUE_APP_BASE_API+'/api/v1/admin/account/profile',
      myHeaders:{Authorization:getToken()},
      genderOpaction:[
           {
            label:'保密',
            value:0
          },
          {
            label:'男',
            value:1
          },
           {
            label:'女',
            value:2
          } 
      ],
       rules: {
          name: [
             { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
          ],
         
        },
      multipartFile:null

      };
    },
    computed:{
      form(){
         return this.$store.state.user.userInfo;
      }
        
    },
    methods: {
      openDialog(){
        // this.$forceUpdate()
        // console.log(this.form);
        console.log('打开');

      },
    close() {
      this.$refs.form.resetFields();
        console.log(this.form);

      this.$emit("update:dialogVisible", false);
    },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let fd = new FormData();//通过form数据格式来传
            fd.append("multipartFile",this.multipartFile); 
            fd.append("username",this.form.username); 
            fd.append("phone",this.form.phone); 
            fd.append("gender",this.form.gender); 
            fd.append("id",this.form.id); 
            setUserInfo(fd).then(res=>{
              if(res.code==="200"){
                this.$message.success(res.msg)
              this.$emit("update:dialogVisible", false);
              
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleUpload(f){
        // let formdata = new FormData()
        //     formdata.append('image', f.file)
            
      },
      handleAvatarSuccess(res, file) {
        console.log(file,'file');
        this.multipartFile=file.raw

        this.form.avatar = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG= file.type === 'image/png';
        const isPG=(isJPG||isPNG)
        const isLt2M = file.size /1024< 300;;
        if (!isPG) {
          this.$message.error('上传头像图片只能是JPG或PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过300k!');
        }
       
        return isPG  && isLt2M;
      },
      handleAvatarError(e){
        console.log(e);
      }
    },
    created() {
      console.log(this.form);
       getParkSelect({ queryMode: "list", dictCode: "gender" }).then( res => {

          // this.genderOpaction = res.data;
        }
      );
    },
}
</script>
<style lang="scss">
.el_dialog{
   .el-dialog__footer{
  border-top: 0.5px solid #ccc;
  padding: 20px;
    }
  .el-form-item__label{
    position: relative;
    text-align: left;
  }
    .el-form-item__label::after{
  content: '';
  position: absolute;
  left: -30%;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
   background: #00FFD8;
  border: 1px solid #6A8095;
  border-radius: 50%;
  // margin-left: 50px;
}
.el-form-item__error{
  top: 40px;

}

}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    padding: 10px;
    line-height: 1;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-uploads{
    width: 124px;
    text-align: center;
  }

</style>
<style lang="scss" scoped>

.el-select{
  width: 100%;
}
.el-form-item{
  width: 50%;
  margin: 20px auto;
}

</style>