<template>
  <div class="container">
    <div class="header">
      <div class="timer">
        <span class="title">注册时间</span>
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

      <div style="margin:0 20px">
        <span class="title">用户姓名</span>

        <el-input
          class="input "
          v-model="searchData.input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div style="margin:0 20px">
        <span class="title">联系电话</span>
        <el-input
          class="input "
          v-model="searchData.input"
          placeholder="请输入内容"
        ></el-input>
      </div>
      <div class="btn">
        <button style="margin-right:20px" class="md_bt_df" @click="queryClick">
          查询
        </button>
        <button class="md_bt_df" @click="Reset">
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
        <el-table-column label="姓名" prop="campusName" width="180">
        </el-table-column>
        <el-table-column label="性别" width="180" prop="campusTypeCh">
        </el-table-column>
        <el-table-column label="联系电话" width="180" prop="campusRanksCh">
        </el-table-column>
        <el-table-column label="所属园区" width="180" prop="parentName">
        </el-table-column>
        <el-table-column label="最后一次登录时间" width="180" prop="creatorName">
        </el-table-column>
        <el-table-column label="注册时间"  prop="gmtCreate">
        </el-table-column>
      
      </el-table>
    </div>
  </div>
</template>

<script>
import {
  getParkManageList,
  getParkSelect,
  defaultParkManage
} from "@/api/basicServices.js";

export default {
  data() {
    return {
      options: [],
      tableData: [],
      typeOptions: [],
      searchData: {
        value: [],
        input: "",
        parkType: "",
        status: ""
      },
      id: null,
      type: "add",
      paginationTotal: null,
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
      }
    };
  },

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
      console.log("wwwwwwwww");
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
          this.paginationTotal = res.total;
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
      if (this.searchData.value) {
        this.init({
          limit: "10",
          page: "1",
          queryMode: "page",
          startTime: this.searchData.value[0],
          endTime: this.searchData.value[1],
          campusName: this.searchData.input
        });
      } else {
        this.init({
          limit: "10",
          page: "1",
          queryMode: "page",
          campusName: this.searchData.input
        });
      }
    },
    setParkType() {
      this.init({
        limit: "10",
        page: "1",
        queryMode: "page",
        campusType: this.searchData.parkType
      });
    },
    setParkStatus() {
      this.init({
        limit: "10",
        page: "1",
        queryMode: "page",
        campusStatus: this.searchData.status
      });
    },
    Reset() {
      this.searchData = {};
      this.init({ limit: "10", page: "1", queryMode: "page" });
    },
    handleDefault(id) {
      defaultParkManage({ id: id }).then(res => {
        if (res.code === "200") {
          this.init({ limit: "10", page: "1", queryMode: "page" });
        }
      });
    },
    setdialog(val) {
      this.DeletedialogShow = val;
    },
    // 列表详情
    handleDetails() {
      this.$router.push("/parkManage/listdetails");
    }
  },
  created() {
    this.init({ limit: "10", page: "1", queryMode: "page" });
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
