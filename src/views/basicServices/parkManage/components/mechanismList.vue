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
        <el-table-column label="机构类型" prop="campusName" width="150">
        </el-table-column>
        <el-table-column label="机构地址" prop="campusNumber" width="150">
        </el-table-column>
        <el-table-column label="入住状态" prop="campusName" width="150">
        </el-table-column>
        <el-table-column label="入住时间" prop="phone" width="150">
        </el-table-column>
        <el-table-column label="联系人" width="120" prop="campusTypeCh">
        </el-table-column>
        <el-table-column label="联系电话" width="120" prop="campusRanksCh">
        </el-table-column>
        <el-table-column label="创建人" width="120" prop="parentName">
        </el-table-column>
        <el-table-column label="创建时间" width="150" prop="creatorName">
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
    ></AddEdit>
  </div>
</template>

<script>
import { getMechanismList } from "@/api/basicServices";
import AddEdit from "./addEdit.vue";
export default {
  data() {
    return {
      input: "",
      tableData: [],

      formData: {
        campusId: this.$route.query.id,
        limit: 10,
        page: 1,
        queryMode: "page",
        organizationName: ""
      },
      addDialogShow: true,
      type: ""
    };
  },
  components: { AddEdit },

  methods: {
    init() {
      console.log(this.formData);
      getMechanismList(this.formData).then(res => {
        if (res.code === "200") this.tableData = res.data;
      });
    },
    queryClick() {
      this.formData.organizationName = this.input;
      this.init();
    },
    addOrEdit(val) {
      this.formData = {};
      this.type = val;
      this.addDialogShow = !this.addDialogShow;
    }
  },
  created() {
    this.init();
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
