<template>
  <div class="container">
    <div class="header">
      <div class="timer">
        <span class="title">创建时间</span>
        <el-date-picker
          v-model="searchData.value"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <el-input
        class="input"
        v-model="searchData.input"
        placeholder="请输入内容"
      ></el-input>
      <el-button type="primary" @click="queryClick">查询</el-button>
      <div class="type">
        <span class="title">园区类型</span>
        <el-select v-model="searchData.parkType" @change="setParkType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <span style="margin-left: 10px; font-size: 12px"
          >(类型数据从数据字典进行加载)</span
        >
      </div>
      <div class="tate">
        <span class="title">状态</span>
        <el-select v-model="searchData.status" @change="setParkStatus" placeholder="请选择">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addClick"
        >新增</el-button
      >
          <el-button type="primary" icon="el-icon-circle-close" @click="Reset"
        >重置</el-button
      >
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        class="table"
        :header-cell-class-name="headerStyle"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        style="width: 100%"
      >
        <el-table-column label="序号" width="80" >
         <template slot-scope="scope">
          <span>{{scope.$index+1}}</span>
         </template>
        </el-table-column>
        <el-table-column label="园区编号" prop="campusNumber" width="150">
        </el-table-column>
        <el-table-column label="园区名称" prop="campusName" width="180">
        </el-table-column>
        <el-table-column label="类型" width="150" prop="campusTypeCh">
        </el-table-column>
        <el-table-column label="园区级别" width="150" prop="campusRanksCh">
        </el-table-column>
        <el-table-column label="父级园区" width="150" prop="parentName">
        </el-table-column>
        <el-table-column label="创建人" width="100" prop="creatorName">
        </el-table-column>
        <el-table-column label="创建时间" width="180" prop="gmtCreate">
        </el-table-column>
        <el-table-column label="状态" width="120" prop="campusStatusCh">
        </el-table-column>
        <el-table-column label="默认园区" width="100" prop="defaultCampus">
          <template slot-scope="scope">
              <el-button  :type="scope.row.defaultCampus==='1'?'primary':'info'" size="mini" @click="handleDefault(scope.row.id)"
              >默认</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleDelete(scope.row)"
              >删除</el-button
            >
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" @click="handleDistribution(scope.row)"
              >权限分配</el-button
            >
            <el-button
              size="mini"
              @click="handleDetails(scope.$index, scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Pagination :total="paginationTotal"></Pagination>
    <Parkmangedialog  :dialogShow.sync="dialogShow" :type="type"  :formData="formData" @init="init" />
    <Deletedialog :DeletedialogShow.sync="DeletedialogShow" :id="id" @init="init" ></Deletedialog>
  </div>
</template>

<script>
import { getParkManageList,getParkSelect,defaultParkManage } from "@/api/basicServices.js";
import Pagination from "@/components/pagination.vue";
import Parkmangedialog from "@/components/parkmangedialog.vue";
import Deletedialog from "@/components/deletedialog.vue";
export default {
  data() {
    return {
      options: [],
      tableData: [],
      typeOptions:[],
      searchData:{
          value: [],
          input: "",
          parkType:'',
          status: "",
      },
      id:null,
      type:'add',
      paginationTotal:null,
      dialogShow:false,
      DeletedialogShow:false,
      formData:{
        name:'',
        num:'',
        type:'',
        parentName:'',
        campusRanks:'',
        address:'',
        campusStatus:'',
        latitude:'',
        remarks:''
      },

      
    };
  },
  components: { Pagination,Deletedialog,Parkmangedialog },
  methods: {
    // 删除
    handleDelete(row) {
      this.DeletedialogShow=!this.DeletedialogShow
      this.id= row.id
    },
    // 编辑
    handleEdit(row){
      this.dialogShow=!this.dialogShow
      this.type='edit'
       this.formData={...row}
    },
    // 新增信息
    addClick(){
      this.type='add'
      this.dialogShow=!this.dialogShow
      this.formData={}
    },
    headerStyle({ row, rowIndex }) {
      return "header_style";
    },
    init(params){
      const {limit,page,queryMode,campusName,status,campusType,startTime,endTime} = params
         getParkManageList({ limit,page,queryMode,campusName,status,campusType,startTime,endTime}).then(
          res => {
            if (res.code === "200") {
              this.tableData = res.data;
              this.paginationTotal=res.total
            }
          }
    );
    },
    getParkType(){
      getParkSelect({queryMode:'list',dictCode:'campus_type'}).then(res=>{
        this.options=res.data
      })
       getParkSelect({queryMode:'list',dictCode:'campus_status'}).then(res=>{
        this.typeOptions=res.data
      })
    },
    queryClick(){
      if(this.searchData.value){
      this.init({limit:'10',page:'1',queryMode:'page',startTime:this.searchData.value[0],endTime:this.searchData.value[1],campusName:this.searchData.input})
      }else{
       this.init({limit:'10',page:'1',queryMode:'page',campusName:this.searchData.input})
      }

    },
    setParkType(){
      this.init({limit:'10',page:'1',queryMode:'page',campusType:this.searchData.parkType})
    },
    setParkStatus(){
      this.init({limit:'10',page:'1',queryMode:'page',campusType:this.searchData.status})

    },
    Reset(){
        this.searchData={}
        this.init({limit:'10',page:'1',queryMode:'page'})
    },
    handleDefault(id){
      defaultParkManage({id:id}).then(res=>{
      if(res.code==='200'){
       this.init({limit:'10',page:'1',queryMode:'page'})
      }
      })
    },
    setdialog(val){
      this.DeletedialogShow=val
    }


  },
  created() {
      this.init({limit:'10',page:'1',queryMode:'page'})
      this.getParkType()
   
  }
};
</script>
<style lang="scss">
.table {
  .el-table__header-wrapper {
    border-radius: 5px;
    background: linear-gradient(0deg, #aabed0, #778ea9);
  }
}
.header_style {
  color: #fff;
  background: linear-gradient(0deg, #aabed0, #778ea9);
}
</style>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
  .title {
    margin-right: 10px;
  }
  .input {
    width: 200px;
  }
}
</style>
