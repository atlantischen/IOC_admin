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
        ><i class="el-icon-search"></i>
      </div>
      <el-table
        class="TabelThree"
        v-loading="dLoading"
        :data="dataList"
        element-loading-text="Loading"
        height="400"
        stripe
        fit
      >
        <el-table-column label="No." type="index" width="60">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.name }}
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
import { adminRoleApi2 } from "@/api/role";
export default {
  name: "selectObj",
  props: {
    _show: {
      type: Boolean
    },
    _datas: {
      typeof: Object,
      default: () => {}
    },
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
      //

      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  watch: {
    _show: {
      handler: function(n) {
        this.Visible = n;
      },
      immediate: false
    },
    _datas: {
      handler: function(n) {
        this.ruleForm = JSON.parse(JSON.stringify(this._datas));
      },
      deep: true
    }
  },
  methods: {
    close() {
      this.reset();
      this.Visible = false;
      this.$emit("close", "close");
    },
    reset() {
      this.$refs.ruleForm.resetFields();
    },
    sure() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this._type === "add") {
            adminRoleApi2({ ...this.ruleForm }).then(r => {
              if (r.code == 200) {
                this.$message.success("新增成功！");
                this.$emit("refresh");
                this.close();
              } else {
                this.$message.error("新增失败！");
              }
            });
          } else {
            adminRoleApi2({ ...this.ruleForm }, "put").then(r => {
              if (r.code == 200) {
                this.$message.success("修改成功！");
                this.$emit("refresh");
                this.close();
              } else {
                this.$message.error("修改失败！");
              }
            });
          }
        }
      });
    },
    sizeChange(v) {
      this.pageSize = v;
    },
    currentChange(v) {
      this.currentPage = v;
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
    }
  }
}
.TabelThree {
}
.pageTool {
  padding: 20px;
}
</style>
