<template>
  <div class="container">
    <div class="header">
      <span class="mr">机构名称</span>
      <el-input
        class="k_input mr"
        v-model="input"
        placeholder="请输入内容"
      ></el-input>
      <button class="max_bt_gy mr" @click="queryClick">查询</button>
      <button class="max_bt_gy mr" @click="resetClick">重置</button>
      <button class="max_bt_df mr" @click="addOrEdit('add')">
        <i class="el-icon-circle-plus-outline"></i>
        新增信息
      </button>
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
        <el-table-column label="机构名称" prop="name" width="180">
        </el-table-column>
        <el-table-column label="机构类型" prop="organizationTypeCh" width="150">
        </el-table-column>
        <el-table-column label="机构地址" prop="houseId" width="150">
        </el-table-column>
        <el-table-column label="入住状态" prop="checkInCh" width="150">
        </el-table-column>
        <el-table-column label="入住时间" prop="inDate" width="150">
        </el-table-column>
        <el-table-column label="联系人" width="120" prop="contacts">
        </el-table-column>
        <el-table-column label="联系电话" width="120" prop="phone">
        </el-table-column>
        <el-table-column label="创建人" width="120" prop="creatorId">
        </el-table-column>
        <el-table-column label="创建时间" width="150" prop="gmtCreate">
        </el-table-column>
        <el-table-column label="操作" prop="gmtCreate">
          <template slot-scope="scope">
            <el-button class="mr" type="text" @click="handleDelete(scope.row)"
              >删除</el-button
            >
            <el-button class="mr" type="text" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              class="mr"
              @click="handleDistribution(scope.row)"
              >权限分配</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddEdit
      :addDialogShow.sync="addDialogShow"
      :formData="formData"
      :type="type"
      @initData="init"
    ></AddEdit>
    <Delete :DeletedialogShow.sync='DeletedialogShow' :id="id" @initData="init"></Delete>
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
import { getMechanismList } from "@/api/basicServices";
import AddEdit from "./addEdit.vue";
import Delete from "./delete.vue";
export default {
  data() {
    return {
      type:'',
      input: "",
      tableData: [],
      initData: {},
      addDialogShow: false,
      DeletedialogShow:false,
      id:null,
      formData:{},
      currentPage: 1,
      pageSize:10,
      total: 0,
    };
  },
  components: { AddEdit,Delete },

  methods: {
    init(data) {
      // this.initData={
      //   campusId: this.$route.query.id,
      //   limit: this.pageSize,
      //   page: this.currentPage,
      //   queryMode: "page",
      //   organizationName: this.input
      // }
      console.log(this.initData);
      getMechanismList(data).then(res => {
        if (res.code === "200") {
          this.tableData = res.data;
          this.total=res.total
        }
      });
    },
    queryClick() {

      this.init({
        campusId: this.$route.query.id,
        limit: this.pageSize,
        page: this.currentPage,
        queryMode: "page",
        organizationName: this.input
      });
    },
    resetClick(){

      this.init({
         campusId: this.$route.query.id,
        limit: 10,
        page: 1,
        queryMode: "page",
        organizationName: ''
      });
      this.pageSize=10
      this.currentPage=1
    },
    addOrEdit(val) {
      // this.initData = {};
      this.formData = {};
      this.type = val;
      this.addDialogShow = !this.addDialogShow;
    },
    handleDelete(row){
      this.DeletedialogShow=true
      this.id =row.id
    },
    handleEdit(row){
      this.type = 'edit';
      this.formData = { ...row };
      console.log(this.formData );
      this.addDialogShow = !this.addDialogShow;

    },
    sizeChange(v) {
      this.pageSize = v <= 0 ? 10 : v;
      console.log(this.pageSize);
      this.init({
          campusId: this.$route.query.id,
        limit: this.pageSize,
        page: this.currentPage,
        queryMode: "page",
        organizationName: this.input
      });
    },
    currentChange(v) {
      this.currentPage = v <= 0 ? 1 : v;
      this.init({
          campusId: this.$route.query.id,
          limit: this.pageSize,
          page: this.currentPage,
          queryMode: "page",
          organizationName: this.input
      });
    }
    
  },
  created() {
    this.init({
        campusId: this.$route.query.id,
        limit: 10,
        page: 1,
        queryMode: "page",
        organizationName: this.input
    });
  }
};
</script>
<style></style>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;

  .mr {
    margin-right: 20px;
  }
}
</style>
