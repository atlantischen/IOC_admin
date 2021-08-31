<template>
  <div class="container">
    <div class="header">
      <div class="timer">
        <span class="title">创建时间</span>
       <el-date-picker
             class="my_datePicker"
              v-model="searchData.startTime"
              type="datetime"
              :clearable="false"
              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期时间"
            >
            </el-date-picker>
            <i></i> 至 <i></i>
            <el-date-picker
             class="my_datePicker"
              v-model="searchData.endTime"
              type="datetime"
              :clearable="false"

              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期时间"
            >
            </el-date-picker>
      </div>
      <el-input
        class="input "
        v-model="searchData.input"
        placeholder="请输入名称"
      ></el-input>
      <button class="md_bt_df" @click="queryClick">查询</button>
      <div class="type">
        <span class="title">园区类型</span>
        <el-select
          v-model="searchData.parkType"
          @change="setParkType"
          placeholder="请选择"
        >
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
        <el-select
          v-model="searchData.status"
          @change="setParkStatus"
          placeholder="请选择"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <button class="md_bt_df" @click="addClick">
        <i class="el-icon-circle-plus-outline"></i>
        新增
      </button>
      <button class="md_bt_df" @click="Reset">
        <i class="el-icon-circle-close"></i>
        重置
      </button>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        class="TabelTwo"
        stripe
        :header-cell-class-name="headerStyle"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        style="width: 100%"
      >
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
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
            <el-button
              :type="scope.row.defaultCampus === '1' ? 'primary' : 'info'"
              size="mini"
              @click="handleDefault(scope.row.id)"
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
              @click="handleDetails(scope.row)"
            >
              详情</el-button
            >
          </template>
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
    <!-- <Pagination :total="paginationTotal"></Pagination> -->
    <Parkmangedialog
      :dialogShow.sync="dialogShow"
      :type="type"
      :formData="formData"
      @init="init"
    />
    <Deletedialog
      :DeletedialogShow.sync="DeletedialogShow"
      :id="id"
      @init="init"
    ></Deletedialog>
    <Permission :permissionShow.sync="permissionShow"></Permission>
  </div>
</template>

<script>
import {
  getParkManageList,
  getParkSelect,
  defaultParkManage
} from "@/api/basicServices.js";
import Pagination from "@/components/pagination.vue";
import Parkmangedialog from "@/components/parkmangedialog.vue";
import Deletedialog from "@/components/deletedialog.vue";
import Permission from "./permission.vue";
export default {
  data() {
    return {
      options: [],
      tableData: [],
      typeOptions: [],
      searchData: {
        startTime:'',
        endTime:'',
        input: "",
        parkType: "",
        status: ""
      },
      id: null,
      type: "add",
      dialogShow: false,
      DeletedialogShow: false,
      permissionShow: false,
      formData: {
        name: "",
        num: "",
        type: "",
        parentName: "",
        campusRanks: "",
        address: "",
        campusStatus: "",
        latitude: "",
        remarks: ""
      },
      currentPage: 1,
      pageSize:10,
      total: 0,
    };
  },
  components: { Pagination, Deletedialog, Parkmangedialog, Permission },
  methods: {
    // 删除
    handleDelete(row) {
      this.DeletedialogShow = !this.DeletedialogShow;
      this.id = row.id;
    },
    // 编辑
    handleEdit(row) {
      this.dialogShow = !this.dialogShow;
      this.type = "edit";
      this.formData = { ...row };
    },
    // 权限分配
    handleDistribution(row) {
      this.permissionShow = true;
    },
    // 新增信息
    addClick() {
      this.type = "add";
      this.dialogShow = !this.dialogShow;
      this.formData = {};
    },
    headerStyle({ row, rowIndex }) {
      // return "header_style";
    },
    init(params) {
      const {
        limit,
        page,
        queryMode,
        campusName,
        campusStatus,
        status,
        campusType,
        startTime,
        endTime
      } = params;
      getParkManageList({
        limit,
        page,
        queryMode,
        campusName,
        status,
        campusType,
        campusStatus,
        startTime,
        endTime
      }).then(res => {
        if (res.code === "200") {
          this.tableData = res.data;
          this.total = res.total;
        }
      });
    },
    getParkType() {
      getParkSelect({ queryMode: "list", dictCode: "campus_type" }).then(
        res => {
          this.options = res.data;
        }
      );
      getParkSelect({ queryMode: "list", dictCode: "campus_status" }).then(
        res => {
          this.typeOptions = res.data;
        }
      );
    },
    queryClick() {
        this.init({
          limit: this.pageSize,
          page: this.currentPage,
          queryMode: "page",
          startTime: this.searchData.startTime,
          endTime: this.searchData.endTime,
          campusName: this.searchData.input
        });
    },
    setParkType() {
      this.init({
         limit: this.pageSize,
         page: this.currentPage,
          queryMode: "page",
          campusType: this.searchData.parkType
      });
    },
    setParkStatus() {
      this.init({
        limit: this.pageSize,
        page: this.currentPage,
        queryMode: "page",
        campusStatus: this.searchData.status
      });
    },
    Reset() {
      this.searchData = {};
      this.init({  limit: this.pageSize,
          page: this.currentPage, queryMode: "page" });
    },
    handleDefault(id) {
      defaultParkManage({ id: id }).then(res => {
        if (res.code === "200") {
          this.init({  limit: this.pageSize,
          page: this.currentPage, queryMode: "page" });
        }
      });
    },
    setdialog(val) {
      this.DeletedialogShow = val;
    },
    // 列表详情
    handleDetails(row) {
      console.log(row.id);
      this.$router.push({  path: '/parkManage/listdetails',  query: {id: row.id }});
    },
       sizeChange(v) {
      this.pageSize = v <= 0 ? 10 : v;
      console.log(this.pageSize);
      this.init({  limit: this.pageSize,
          page: this.currentPage, queryMode: "page" });
    },
    currentChange(v) {
      this.currentPage = v <= 0 ? 1 : v;
      this.init({  limit: this.pageSize,
          page: this.currentPage, queryMode: "page" });
    }
  },
  created() {
    this.init({  limit: this.pageSize,
          page: this.currentPage, queryMode: "page" });
    this.getParkType();
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
