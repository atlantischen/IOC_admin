<template>
  <!-- 用户管理 -->
  <div id="userManage" class="container">
    <div class="header ">
      <div class="timer">
          <span>
            <span class="title" style="margin-left:0px">用户姓名 </span>
            <el-input
              class="k_input"
              placeholder="请输入用户姓名"
              v-model="username"
            ></el-input
            ><i></i>
          </span>
          <span>
            <span class="title">园区名称</span>
            <el-select
              class="w_160"
              v-model="campusName"
              placeholder="请选择类型"
            >
              <el-option
                v-for="item in allStatus"
                :key="item.campusName"
                :label="item.campusName"
                :value="item.campusName"
              >
              </el-option>
            </el-select>
          </span>
          <span>
            <span class="title">登录时间</span>
            <el-date-picker
             class="my_datePicker"
              v-model="startTime"
              type="datetime"
              :clearable="false"
              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期时间"
            >
            </el-date-picker>
            <i></i>至<i></i>
            <el-date-picker
             class="my_datePicker"
              v-model="endTime"
              type="datetime"
              :clearable="false"

              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </span>
          <button class="md_bt_gy title" @click="initD()">
            查询
          </button>
      </div>
    </div>
    <div class="a_content">
      <el-table
        class="TabelTwo"
        v-loading="dLoading"
        :data="dataList"
        element-loading-text="Loading"
        stripe
        fit
      >
        <el-table-column align="center" label="序号" type="index" width="60">
          <template slot-scope="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="用户名"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.username || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="campusName"
          label="园区名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.campusName  || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="gmtCreate"
          label="登录时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.gmtCreate || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="ip"
          label="IP地址"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.ip || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="brower"
          label="浏览器"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span >
              {{ scope.row.brower }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <PageT
        :between="true"
        :_currentPage="currentPage"
        :_pageSize="pageSize"
        :_total="total"
        @size="sizeChange"
        @current="currentChange"
      />
    </div>
  </div>
</template>

<script>
import { LogManagement } from "@/api/menu";
import { getParkManageList } from "@/api/basicServices";
export default {
  name: "userManage",
  data() {
    return {
      startTime: "",
      endTime: "",
      username: "",
      campusName:'',
      searchPhone: "",
      allStatus: [],
      pageSize: 10,
      total: 0,
      currentPage: 1,
      dLoading: false,
      dataList: [],
      showD: false,
      showSelectRole: false,
      showRestPw: false,
      dType: "add",
      editDatas: {},
      PowerIds: null,
      userInfo: null
    };
  },
  created() {
    this.initD();
    this.ParkD()
  },
  methods: {
    initD(val) {
      this.dLoading = true;
      LogManagement({
        campusName:this.campusName,
        logType:1,
        startTime: this.startTime,
        endTime: this.endTime,
        limit: this.pageSize,
        page: this.currentPage,
        campusName: this.campusName,
        queryMode: "page",
        username: this.username
      }).then(r => {
        if (r.code == 200) {
          this.dataList = r.data;
          this.total = r.total;
          this.dLoading = false;
        }
      });
    },
    ParkD(){
      getParkManageList({
        limit:1000,
        page: 1,
        queryMode: "page",
      }).then(r => {
        if (r.code == 200) {
          this.allStatus = r.data;
        }
      });
    },
    sizeChange(v) {
      this.pageSize = v <= 0 ? 10 : v;
      this.initD();
    },
    currentChange(v) {
      this.currentPage = v <= 0 ? 1 : v;
      this.initD();
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  position: relative;   
  margin-bottom: 10px;
  i {
      padding: 0 5px;
    }
  .title {
    margin:0 10px 0 10px;
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
