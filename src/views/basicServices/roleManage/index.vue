<template>
  <!-- 角色管理 -->
  <div id="roleManage">
    <div class="header_btns x_c">
      <div class="">
        机构名称 <i></i>
        <el-input
          class="k_input"
          placeholder="请输入机构名称"
          v-model="searchContent"
        ></el-input
        ><i></i>
        <button class="md_bt_gy" @click="initD(searchContent)">
          查询
        </button>
      </div>
      <button class="md_bt_df" @click="handleFun('add')">
        <i class="el-icon-plus"></i> 新增
      </button>
    </div>
    <div class="a_content">
      <el-table
        class="TabelTwo"
        v-loading="dLoading"
        :data="dataList"
        element-loading-text="Loading"
        height="680"
        stripe
        fit
      >
        <el-table-column align="center" label="序号" type="index" width="60">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="角色名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="userCount"
          label="关联用户数"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.userCount }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="角色说明"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.remark }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="创建人"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="belongType"
          label="创建时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.belongType }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作"
          ><div class="x_c_sb" slot-scope="scope">
            <button @click="handleFun('power', scope.row)" class="_bule">
              权限
            </button>
            <button @click="handleFun('obj', scope.row)" class="_bule">
              用户
            </button>
            <button @click="handleFun('edit', scope.row)" class="_bule">
              编辑
            </button>
            <button @click="handleFun('del', scope.row)" class="_red">
              删除
            </button>
          </div>
        </el-table-column>
      </el-table>
      <div class="pageTool">
        <el-pagination layout="slot">
          <span
            >第
            <input
              class="pg_input"
              v-model.number="currentPage"
              @change="handleCurrentChange(currentPage)"/>页
            <i style="padding: 0 10px;"></i>
            每页<input
              class="pg_input"
              v-model.number="pageSize"
              @change="handleSizeChange(pageSize)"
          /></span>
        </el-pagination>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout=" total, slot, prev, pager, next"
          :total="total"
        >
          <button class="bt_actived btn-first" @click="handleCurrentChange(1)">
            首页
          </button>
        </el-pagination>
        <el-pagination layout="slot">
          <button
            class="bt_df"
            @click="handleCurrentChange(Math.ceil(total / pageSize))"
          >
            末页
          </button>
        </el-pagination>
      </div>
    </div>
    <AddEdit
      ref="addEditRef"
      :_datas="editDatas"
      :_type="dType"
      :_show="showD"
      @close="handleFun"
      @refresh="initD"
    />
    <RolePower
      ref="addEditRef"
      :_datas="editDatas"
      :_type="dType"
      :_show="showRolePower"
      @close="handleFun"
      @refresh="initD"
    />
    <SelectObj
      ref="addEditRef"
      :_datas="editDatas"
      :_type="dType"
      :_show="showSelectObj"
      @close="handleFun"
      @refresh="initD"
    />
  </div>
</template>

<script>
import { adminRoleApi, adminRoleInfoApi } from "@/api/role";
import AddEdit from "./components/addEditRole.vue";
import RolePower from "./components/selectRolePower.vue";
import SelectObj from "./components/selectObj.vue";
export default {
  name: "roleManage",
  components: { AddEdit, RolePower, SelectObj },
  data() {
    return {
      searchContent: "",
      pageSize: 10,
      total: 0,
      currentPage: 1,
      dLoading: false,
      dataList: [],
      showD: false,
      showRolePower: false,
      showSelectObj: false,
      dType: "add",
      editDatas: {}
    };
  },
  created() {
    this.initD();
  },
  methods: {
    initD(val) {
      adminRoleApi({
        limit: "",
        name: val ? val : "",
        page: "",
        queryMode: "page"
      }).then(r => {
        if (r.code == 200) {
          this.dataList = r.data;
        }
      });
    },
    handleFun(t, val) {
      switch (t) {
        case "add":
          this.showD = true;
          this.dType = t;
          this.editDatas = {};
          break;
        case "power":
          this.showRolePower = true;
          this.dType = t;
          break;
        case "obj":
          this.showSelectObj = true;
          this.dType = t;
          break;
        case "edit":
          this.showD = true;
          this.dType = t;
          adminRoleInfoApi({ id: val.id }).then(r => {
            if (r.code == 200) {
              this.editDatas = r.data;
            }
          });
          break;
        case "del":
          this.$confirm("确认删除“" + val.name + "”角色吗？")
            .then(_ => {
              adminRoleApi({ ids: val.id }, "DELETE").then(r => {
                if (r.code == 200) {
                  this.initD();
                  this.$message.success("删除成功！");
                }
              });
            })
            .catch(_ => {});
          break;
        case "close":
          this.showD = false;
          break;
        case "look":
          if (val.type === "jpg") {
            window.open(
              "https://img0.baidu.com/it/u=103721101,4076571305&fm=26&fmt=auto&gp=0.jpg"
            );
          } else {
            // 除图片，其它实现下载
          }
          this.dType = t;
          break;
        default:
          this.$confirm("确认删除该附件？")
            .then(_ => {
              // this.$message.success("删除成功！");
            })
            .catch(_ => {});
          break;
      }
    },
    handleSizeChange(v) {
      this.pageSize = v <= 0 ? 10 : v;
      this.initD();
    },
    handleCurrentChange(v) {
      this.currentPage = v <= 0 ? 1 : v;
      this.initD();
    }
  }
};
</script>

<style lang="scss" scoped>
#roleManage {
  .header_btns {
    justify-content: space-between;
    margin: 20px 53px 20px 57px;
    i {
      padding: 0 5px;
    }
  }
  .a_content {
    width: calc(100%-110px);
    margin: 20px 53px 20px 57px;
    :deep(.TabelTwo) {
    }
  }
}
</style>
