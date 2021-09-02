<template>
  <div class="container">
    <div class="header">
      <div class="timer">
        <span class="title">注册时间</span>
            <el-date-picker
             class="my_datePicker"
              v-model="formData.startTime"
              type="datetime"
              :clearable="false"
              format="yyyy-MM-dd hh:mm"
              :picker-options="startTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择开始日期时间"
            >
            </el-date-picker>
            <i></i> 至 <i></i>
            <el-date-picker
             class="my_datePicker"
              v-model="formData.endTime"
              type="datetime"
              :clearable="false"
              :picker-options="endTime"
              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择结束日期时间"
            >
            </el-date-picker>
      </div>

      <div style="margin:0 20px">
        <span class="title">用户姓名</span>

        <el-input
          class="input "
          v-model="formData.username"
          placeholder="请输入姓名"
        ></el-input>
      </div>
      <div style="margin:0 20px">
        <span class="title">联系电话</span>
        <el-input
          class="input "
          v-model="formData.phone"
          placeholder="请输入联系电话"
        ></el-input>
      </div>
      <div class="btn">
        <button style="margin-right:20px" class="md_bt_df" @click="queryClick">
          查询
        </button>
        <button class="md_bt_df" @click="resetClick" >
          <i class="el-icon-circle-close"></i>
          重置
        </button>
      </div>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        class="TabelTwo"
        stripe
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        style="width: 100%"
      >
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="username" width="180">
        </el-table-column>
        <el-table-column label="性别" width="180" prop="campusTypeCh">
        </el-table-column>
        <el-table-column label="联系电话" width="180" prop="phone">
        </el-table-column>
        <el-table-column label="所属园区" width="180" prop="defaultCampusName">
        </el-table-column>
        <el-table-column label="最后一次登录时间" width="180" prop="loginTime">
        </el-table-column>
        <el-table-column label="注册时间"  prop="gmtCreate">
        </el-table-column>
      
      </el-table>
    </div>
      <PageT
        :between="true"
        :_currentPage="currentPage"
        :_pageSize="pageSize"
        :_total="total"
        @size="sizeChange"
        @current="currentChange"
      />
  </div>
</template>

<script>
import {
 getAppUser
} from "@/api/basicServices.js";

export default {
  data() {
    return {
           // 时间判断
        startTime: {
          disabledDate: time => {
            if (this.formData.endTime) {
              return (
                time.getTime() >  new Date(this.formData.endTime).getTime()
              )
            } else {
              // 不能小于当前日期
              return time.getTime() > Date.now() - 8.64e7// 加- 8.64e7则表示包当天
            }
          }
        },
        endTime: {
         disabledDate: time => {
            if (this.formData.startTime) {
              return (
                time.getTime() < new Date(this.formData.startTime).getTime()
              )
            } else {
              return time.getTime() > Date.now()- 8.64e7// 加- 8.64e7则表示包当天
            }
          }
        },
      options: [],
      tableData: [],
      typeOptions: [],
      id: null,
      formData: {
        limit: 10,
        page: 1,
        endTime: "",
        phone: "",
        startTime: "",
        username: "",
      },
      currentPage: 1,
      pageSize:10,
      total: 0,
    };
  },

  methods: {
    init(){
      this.formData.limit=this.pageSize
      this.formData.page=this.currentPage
      getAppUser(this.formData).then(res=>{
        this.tableData=res.data
        this.total = res.total
      })
    },
    queryClick() {
      this.init();
    },
    resetClick(){
      this.formData={
        limit: 1,
        page: 10,
        endTime: "",
        phone: "",
        startTime: "",
        username: "",
      }
      this.pageSize=10
      this.currentPage =1
      this.init();  
    },
    sizeChange(v) {
      this.pageSize = v <= 0 ? 10 : v;
      this.init();
    },
    currentChange(v) {
      this.currentPage = v <= 0 ? 1 : v;
      this.init();
    }
  },
  created() {
    this.init();
 
  }
};
</script>
<style lang="scss">
.el-input__inner {
  line-height: 30px;
  height: 30px;
}
.el-input__icon {
  line-height: 30px;
}
.el-date-editor .el-range__icon {
  line-height: 22px;
}
.el-range-separator {
  line-height: 22px !important;
}
</style>
<style lang="scss" scoped>
.header {
  display: flex;
  position: relative;
  // justify-content: space-around;
  // flex-wrap: wrap;
  margin-bottom: 10px;
  .title {
    margin-right: 10px;
  }
  .input {
    width: 200px;
  }
  .btn{
    position: absolute;
    right: 0;
  }
}
</style>
