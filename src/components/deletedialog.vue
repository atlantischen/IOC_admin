<template>
    <el-dialog
  title="操作确认"
  :visible="DeletedialogShow"
  width="20%"
  :destroy-on-close="true"
  @close="$emit('update:DeletedialogShow',false)"
  >
    <div style=" text-align:center;font-size:20px">
      <svg-icon icon-class="gantan"  style="font-size:20px;color:#FFA800"/>
     确认删除改园区</div>
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" type="info" @click="$emit('update:DeletedialogShow',false)">取 消</el-button>
    <el-button size="mini" type="primary" @click="handleClick">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import {deleteParkManage} from "@/api/basicServices.js";

export default {
    props:{
      DeletedialogShow:{
        type:Boolean
      },
      id:{
        type:String

      } 
    },
    data() {
      return {
      };
    },

    methods: {
        handleClick(){
          console.log(this.id);
          deleteParkManage({ids:this.id}).then(res=>{
            console.log(res);
            if(res.code=="200"){
              this.$message({ message: res.msg, type: 'success',})
              this.$emit('init',{limit:'10',page:'1',queryMode:'page'})
              this.$emit('update:DeletedialogShow',false)

            }
          })
        }
    }
  

}
</script>

<style>

</style>