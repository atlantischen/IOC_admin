<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <img src="@img/TOUXIANG.png" alt="" />
      </div>

      <el-form-item class="el_form" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入您的手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item class="el_form" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <p class="forget_p">忘记密码了吗?</p>
      <el-button
        :loading="loading"
        type="primary"
        class="btn"
        @click.native.prevent="handleLogin"
        >登 录</el-button
      >

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
    <p class="desc">Copyright © www.qixin.com, All Rights Reserved.</p>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="40%"
      @close="handleClose"
      :destroy-on-close="true"
    >
      <div slot="title" class="header-title">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <span>账号激活</span>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item class="count_item" label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item class="count_item" label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code"></el-input>
          <el-button class="yz_btn" :disabled="disabled" @click="sendcode">{{
            btntxt
          }}</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click="handleActivation"
          >激 活</el-button
        >
        <el-button
          type="info"
          size="medium"
          @click="centerDialogVisible = false"
          >退 出</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCode, getActivateAccount } from "@/api/user.js";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的手机号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      centerDialogVisible: false,
      loginForm: {
        username: "17621210366", //19924919999
        password: "919999"
      },
      disabled: false,
      time: 5,
      btntxt: "获取验证码",
      ruleForm: {
        name: "",
        phone: "",
        code: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(res => {
              console.log(res, "res");
              switch (res.code) {
                case "A0203":
                  this.centerDialogVisible = true;
                  console.log("未激活");
                  break;
                default:
                  this.$router.push({ path: "/" });
                  break;
              }
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    sendcode() {
      this.time = 5;
      if (this.ruleForm.phone != "") {
        this.timer();
        getCode({ phone: this.ruleForm.phone }).then(res => {
          console.log(res, "res");
          if (res.code === "200") {
            this.$message({
              message: res.data,
              type: "success",
              duration: 1 * 1000
            });
          }
        });
      }
    },
    //发送手机验证码倒计时
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.btntxt = this.time + "秒";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    handleActivation() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const { phone, code } = this.ruleForm;
          console.log(phone, code);
          getActivateAccount({ phone: phone, vCode: code }).then(res => {
            if (res.code == "200") {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1 * 1000
              });
              this.$router.push({ path: "/" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    handleClose() {
      this.$refs.ruleForm.resetFields();
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .login-form {
    .el-input input {
      color: $cursor;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el_form {
    border: 1px solid #d8d8d8;
    background: $cursor;
    border-radius: 5px;
    color: #454545;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: #454545;
        height: 47px;
        caret-color: #454545;
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $cursor inset !important;
          // -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el_form {
      .el-form-item__content {
        display: flex;
        align-items: center;
      }
      .el-input__inner:focus {
        outline: none;
        border-color: #409eff;
      }
    }
  }

  .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 200px);
    max-width: calc(100% - 30px);
    .el-dialog__header {
      .header-title {
        display: flex;
        align-items: center;
        font-size: 16px;
      }
      border-bottom: 0.5px solid #ccc;
      .svg-container {
        padding: 0;
        width: 25px;
      }
    }
  }
  .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
  .demo-ruleForm {
    .el-input {
      color: #000 !important;
      width: 65%;
    }
    .el-form-item__content {
      display: flex;
    }

    .yz_btn {
      margin-left: 20px;
    }
  }
  .el-dialog__footer {
    text-align: center;
    .el-button--info {
      margin-left: 55px;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;

  overflow: hidden;
  display: flex;
  align-items: center;
  background-image: url("~@img/BJ.png");
  background-size: 100% 100%;
  .login-form {
    position: relative;
    width: 420px;
    height: 510px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
    padding: 0 40px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    position: relative;
    padding: 6px 5px 6px 15px;
    color: #008aff;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .svg-container::after {
    position: absolute;
    content: "";
  }
  .title-container {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 46px 0;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .forget_p {
    font-size: 0.15rem /* 12/80 */;
    text-align: right;
    margin-bottom: 42px;
    cursor: pointer;
  }
  .btn {
    width: 340px;
    height: 50px;
    background: linear-gradient(0deg, #009afb, #0ec6ee);
    border: 1px solid rgba(255, 255, 255, 0.19);
    box-shadow: 0px 0px 3px 0px rgba(13, 83, 169, 0.6),
      0px 2px 8px 0px rgba(45, 133, 215, 0.55);
    border-radius: 3px;
    font-size: 16px;
  }
  .desc {
    position: fixed;
    font-size: 12px;
    color: #fff;
    left: 50%;
    transform: translateX(-50%);
    bottom: 55px;
  }
}
</style>
