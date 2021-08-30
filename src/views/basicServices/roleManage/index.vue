<template>
  <!-- 角色管理 -->
  <div id="roleManage" class="comStyles">
    <div class="header_btns x_c">
      <div class="hb_left">
        <div>
          <span>
            机构名称 <i></i>
            <el-input
              class="k_input"
              placeholder="请输入机构名称"
              v-model="searchContent"
            ></el-input
            ><i></i>
            <button class="md_bt_gy" @click="initD('search')">
              查询
            </button>
          </span>
        </div>
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
      <PageT
        :between="true"
        :_currentPage="currentPage"
        :_pageSize="pageSize"
        :_total="total"
        @size="sizeChange"
        @current="currentChange"
      />
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
      ref="rolePowerRef"
      :roleInfo="roleInfo"
      :_datas="PowerIds"
      :_type="dType"
      :_show="showRolePower"
      @close="handleFun"
    />
    <SelectObj
      ref="SelectObjRef"
      :_datas="roleInfo"
      :_type="dType"
      :_show="showSelectObj"
      @close="handleFun"
      @refresh="initD"
    />
  </div>
</template>

<script>
import { getTrue, addLevel } from "@/utils/method";
import { adminRoleApi, adminRoleInfoApi, roleMenuApi } from "@/api/role";
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
      editDatas: {},
      PowerIds: null,
      roleInfo: null
    };
  },
  created() {
    this.initD();
  },
  methods: {
    initD() {
      this.dLoading = true;
      adminRoleApi({
        limit: this.pageSize,
        name: this.searchContent,
        page: this.currentPage,
        queryMode: "page"
      }).then(r => {
        if (r.code == 200) {
          this.dataList = r.data;
          this.total = r.total;
          this.dLoading = false;
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
          this.roleInfo = val;
          this.$refs.rolePowerRef.checkStrictly = true;
          roleMenuApi({ roleId: val.id }).then(r => {
            if (r.code == 200) {
              this.$refs.rolePowerRef.menuDatas = [
                {
                  name: "全部",
                  title: "全部",
                  id: "all",
                  children: addLevel(r.data)
                }
              ];
              this.PowerIds = getTrue(r.data, "choice");
            }
          });
          break;
        case "obj":
          this.dType = t;
          this.showSelectObj = true;
          this.$refs.SelectObjRef._datas = val;
          this.$refs.SelectObjRef.currentPage = 1;
          this.$refs.SelectObjRef.getList();
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
        case "close":
          this.showD = false;
          this.showRolePower = false;
          this.showSelectObj = false;
          break;
        case "search":
          this.pageSize = 10;
          this.currentPage = 1;
          this.initD();
          break;
        default:
          // val.name
          this.$confirm("确认删除该角色吗？", "操作确认", {
            type: "warning"
          })
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
      }
    },
    sizeChange(v) {
      this.pageSize = v;
      this.initD();
    },
    currentChange(v) {
      this.currentPage = v;
      this.initD();
    }
  }
};
</script>

<style lang="scss" scoped>
#roleManage {
}
</style>
