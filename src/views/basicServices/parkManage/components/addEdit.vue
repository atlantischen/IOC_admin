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
        <el-form-item label="机构名称" prop="username">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="机构类型">
          <el-select v-model="formData.type" placeholder="请选择活动区域">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="formData.contacts"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="机构位置" class="form_select">
          <el-select v-model="formData.building"  @change="buildingChange" placeholder="请选择楼栋">
            <el-option
              v-for="item in buildingOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-select v-model="formData.floor" @change="floorChange" placeholder="请选择楼层">
            <el-option
              v-for="item in floorOptions"
              :key="item.id"
              :label="item.floor"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-select v-model="formData.houseId" @change="roomChange" placeholder="请选择房号">
            <el-option
              v-for="item in roomOptions"
              :key="item.id"
              :label="item.houseName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入住时间">
          <el-date-picker
            v-model="formData.inDate"
            :clearable="false"
            type="datetime"
             value-format="yyyy-MM-dd hh:mm:ss"
            class="datePicker my_datePicker"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入住状态">
          <el-select v-model="formData.checkIn" placeholder="请选择活动区域">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer  ">
        <button class="max_bt_gy" @click="$emit('update:addDialogShow', false)">
          取消
        </button>
        <button class="max_bt_df" @click="submitForm">确认</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getHouse,getRoom,getParkSelect,getOrganization } from "@/api/basicServices.js";


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
      totalData:{},
      buildingOptions:[],
      floorOptions:[],
      roomOptions:[],
      options:[],
      typeOptions:[],
      statusOptions:[],
      rules: {
        name: [{ required: true, message: "请输入园区名称", trigger: "blur" }]
      },
 
    };
  },
  // watch:{
  //   'formData.building':{
  //     handler:function (n) {
  //       // if(n) this.formData.floor=''
  //     }
  //   }
  // },

  methods: { 
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          console.log(this.formData,'checkIn');
          if (this.type === "add") {
            getOrganization({...this.formData}).then(res=>{
              console.log(res,'res');
               if(res.code==="200"){

              // this.$message({ message: res.msg,
              // type: 'success',})
              // this.$emit('init',{limit:'10',page:'1',queryMode:'page'})
          
            }
            })
          } else if (this.type === "edit") {
            //  updateParkManage({...this.formData}).then(res=>{
            //   if(res.code==="200"){
            //     this.$message({ message: res.msg ,
            //     type: 'success',})
            //     this.$emit('init',{limit:'10',page:'1',queryMode:'page'})
            //     this.$emit('update:dialogShow', false)
            //   }
            // })
          }
          this.$emit("update:addDialogShow", false);

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    init() {
      let id = this.$route.query.id;
      getHouse({ campusId: id }).then(res => {
        res.data.forEach(item => {
          this.buildingOptions.push(item.building);
        });
          this.totalData=res.data
      });
       getParkSelect({ queryMode: "list", dictCode: "organization_type" }).then( res => {
          this.typeOptions = res.data;
     
        }
      );
        getParkSelect({ queryMode: "list", dictCode: "check_in" }).then( res => {
        
          this.statusOptions = res.data;
        }
      );
    },
    buildingChange(v){
      this.totalData.forEach(item=>{
        if(v===item.building){
          this.floorOptions=[...item.floors]
        }
      })
      this.formData.floor=null
      this.formData.houseId=null

      // console.log(this.formData.floor);
    },

    floorChange(v){
      console.log(v);
      getRoom({buildingId:v}).then(res=>{
        this.roomOptions=res.data
      })
      this.formData.houseId=null
      this.$forceUpdate()
    },
     roomChange(){
      this.$forceUpdate()

    }
   
  },
  created() {
    this.init()
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
.datePicker {
  width: 100% !important;
  .el-input__prefix {
    height: 30px;
    left: 90%;
  }
}
.my_footer {
  .el-dialog__footer {
    padding: 70px 0;
  }
}
.form_select {
  .el-form-item__content {
    display: flex;
  }
}

.el-input__suffix {
  right: 0;
}
.el-input--suffix .el-input__inner {
  padding-right: 22px;
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

      .el-select {
        width: 100%;
      }
    }
    .el-form-item__content {
      width: 300px !important;
      display: flex;
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
