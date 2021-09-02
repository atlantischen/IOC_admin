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
     确认删除该机构</div>
  <span slot="footer" class="dialog-footer">
        <button class="max_bt_gy"  @click="$emit('update:DeletedialogShow',false)">取消</button>
      <button class="max_bt_df" @click="handleClick">确认</button>
  </span>
</el-dialog>
</template>

<script>
import {deleteOrganization} from "@/api/basicServices.js";

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

            // let res= JSON.stringify(this.id)
          deleteOrganization(this.id).then(res=>{
            if(res.code=="200"){
                console.log(res);
              this.$message({ message: res.msg, type: 'success',})
              this.$emit('initData',{
                  campusId: this.$route.query.id,
                  limit: 10,
                  page: 1,
                  queryMode: "page",
                  organizationName: ""
                })
              this.$emit('update:DeletedialogShow',false)
            }
          })
        }
    }
  

}
</script>

<style>

</style>