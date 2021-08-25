<template>
  <el-dialog
    class="dLog"
    title=""
    :visible.sync="Visible"
    width="40%"
    @close="close"
    :destroy-on-close="true"
  >
    <div slot="title" class="header-title">
      <i class="iconfont icon-jiaosepeizhi"></i>
      <span>选择对象</span>
    </div>
    <div class="selectObj dLog_content">
      <div class="selectObj_h x_c">
        <el-input
          class="k_input"
          placeholder="名称"
          v-model="searchContent"
        ></el-input
        ><i class="el-icon-search" @click="getList()"></i>
      </div>
      <el-table
        ref="tableRef"
        class="TabelThree"
        v-loading="dLoading"
        :data="dataList"
        element-loading-text="Loading"
        height="400"
        stripe
        fit
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" label="选择" width="55">
          <template slot="header">
            <span>选择</span>
          </template>
        </el-table-column>
        <el-table-column label="No." type="index" width="60">
          <template slot-scope="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.phone }}
          </template>
        </el-table-column>
      </el-table>
      <PageT
        :min="true"
        :between="true"
        :layout="['current', 'size', 'total', 'pager']"
        :_currentPage="currentPage"
        :_pageSize="pageSize"
        :_total="total"
        @size="sizeChange"
        @current="currentChange"
      />
    </div>

    <span slot="footer" class="dialog-footer xy_c">
      <button class="max_bt_gy" @click="reset">取消</button>
      <button class="max_bt_df" @click="sure">确认</button>
    </span>
  </el-dialog>
</template>

<script>
import { roleUserApi } from "@/api/role";
export default {
  name: "selectObj",
  props: {
    _show: {
      type: Boolean
    },
    // _datas: {
    //   typeof: Object,
    //   default: () => {}
    // },
    _type: {
      type: String
    }
  },
  data() {
    return {
      searchContent: "",
      Visible: false,
      dLoading: false,
      dataList: null,
      selectedIds: null,
      //
      currentPage: 1,
      pageSize: 10,
      total: 0,
      _datas: null
    };
  },
  watch: {
    _show: {
      handler: function(n) {
        this.Visible = n;
      },
      immediate: false
    }
    // _datas: {
    //   handler: function(n) {
    //     this.ruleForm = JSON.parse(JSON.stringify(this._datas));
    //   },
    //   deep: true
    // }
  },
  methods: {
    getList() {
      this.dLoading = true;
      roleUserApi({
        limit: this.pageSize,
        page: this.currentPage,
        queryMode: "page",
        roleId: this._datas.id,
        username: this.searchContent
      }).then(r => {
        if (r.code == 200) {
          this.total = r.total;
          this.dataList = r.data;
          this.toggleSelection(r.data);
          this.dLoading = false;
        }
      });
    },
    close() {
      this.reset();
      this.Visible = false;
      this.$emit("close", "close");
    },
    reset() {
      this.toggleSelection();
    },

    sure() {
      if (this.selectedIds && this.selectedIds.length > 0) {
        roleUserApi(
          {
            roleId: this._datas.id,
            addUserIds: this.selectedIds,
            deleteUserIds: this.selectedIds
          },
          "put"
        ).then(r => {
          if (r.code == 200) {
            this.$message.success("操作成功！");
            this.$emit("refresh");
            this.close();
          } else {
            this.$message.error("操作失败！");
          }
        });
      } else {
        this.$message.error("没有选中任何对象！");
        this.close();
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(r => {
          if (r.choice.toString() == "true") {
            this.$nextTick().then(() => {
              this.$refs.tableRef.toggleRowSelection(r);
            });
          }
        });
      } else {
        console.log("222");
        this.$refs.tableRef.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.selectedIds = val;
      console.log(val);
    },
    sizeChange(v) {
      this.pageSize = v;
      this.getList();
    },
    currentChange(v) {
      this.currentPage = v;
      this.getList();
    }
  }
};
</script>

<style scoped lang="scss">
.dLog {
  ::v-deep .el-dialog__body {
    padding: 25px 20px;
  }
}
.selectObj {
  .selectObj_h {
    justify-content: flex-end;
    padding: 5px 20px;
    background: #f9f9f9;
    .k_input {
      width: 250px;
    }
    .el-icon-search {
      font-size: 24px;
      margin-left: 15px;
      cursor: pointer;
    }
  }
}
.TabelThree {
}
.pageTool {
  padding: 20px;
}
</style>
