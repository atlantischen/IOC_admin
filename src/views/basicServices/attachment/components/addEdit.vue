<template>
  <el-dialog
    class="dLog"
    title=""
    :visible.sync="Visible"
    width="40%"
    @close="close"
    :destroy-on-close="true"
  >
    <div slot="title" class="header-title">
      <i
        class="iconfont"
        :class="_type === 'add' ? 'icon-xinzeng' : 'icon-shenqingguanli'"
      ></i>
      <span>{{ _type === "add" ? "新增" : "修改" }}附件</span>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="所属类别" prop="types">
        <el-select
          :disabled="_type === 'edit'"
          v-model="ruleForm.belongType"
          placeholder="所属类别"
        >
          <el-option
            v-for="item in allTypes"
            :key="item.value"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <template v-if="_type === 'add'">
        <el-form-item label="文件选择" prop="file">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
             :on-change="handleFileChange" 
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <button class="md_bt_gy">选择文件</button>
          </el-upload>
        </el-form-item>
        <el-form-item label="重命名" prop="name">
          <el-input placeholder="" v-model="ruleForm.name"></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="附件名称" prop="name">
          <el-input placeholder="" v-model="ruleForm.name"></el-input
        ></el-form-item>
        <el-form-item label="附件路径" prop="from">
          <el-input
            placeholder=""
            :disabled="true"
            v-model="ruleForm.from"
          ></el-input>
        </el-form-item>
        <el-form-item label="附件备注" prop="remark">
          <el-input
            placeholder=""
            type="textarea"
            v-model="ruleForm.remark"
          ></el-input>
        </el-form-item>
      </template>
    </el-form>
    <span slot="footer" class="dialog-footer xy_c">
      <button class="max_bt_gy" @click="reset">取消</button>
      <button class="max_bt_df" @click="sure">确认</button>
    </span>
  </el-dialog>
</template>

<script>
import {adminDictApi2} from '@/api/dict'
export default {
  name: "addEditDicType",
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
      Visible: false,
      ruleForm: {},
      allTypes: [],
      //
      fileList: [
        // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ],
      rules: {
        file: [{ required: true, message: "请选择文件", trigger: "change" }]
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
      this.$refs.ruleForm.resetFields();
    },
    sure() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
            console.log(this.ruleForm);
          let fd = new FormData();//通过form数据格式来传
        console.log(fd);

        fd.append("multipartFile", this.ruleForm.file); //传文件
        console.log(fd.get('multipartFile'));
          // if (this._type === "add") {
          //   adminDictApi2({ ...this.ruleForm }).then(r => {
          //     if (r.code == 200) {
          //       this.$message.success("新增成功！");
          //       this.$emit("refresh");
          //       this.close();
          //     } else {
          //       this.$message.error("新增失败！");
          //     }
          //   });
          // } else {
          //   adminDictApi2({ ...this.ruleForm }, "put").then(r => {
          //     if (r.code == 200) {
          //       this.$message.success("修改成功！");
          //       this.$emit("refresh");
          //       this.close();
          //     } else {
          //       this.$message.error("修改失败！");
          //     }
          //   });
          // }
        }
      });
    },
    //
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleFileChange(file, fileList){
      if(fileList.length>0){
          this.ruleForm.file=file
          this.$refs.ruleForm.clearValidate() //清除图片文字校验

        // this.$refs.ruleForm.clearValidate() //清除图片文字校验
      }
      console.log(file, fileList);

    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, "操作确认", {
        type: "warning"
      });
    }
  }
};
</script>

<style scoped lang="scss">
.dlog {
}
</style>
