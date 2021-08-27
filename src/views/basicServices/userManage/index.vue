<template>
  <!-- 用户管理 -->
  <div id="userManage" class="comStyles">
    <div class="header_btns x_c">
      <div class="hb_left">
        <div>
          <span>
            <label class="_n">创建时间</label>
            <el-date-picker
              class="w_200"
              v-model="startTime"
              type="datetime"
              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd hh:mm"
              placeholder="选择日期时间"
            >
            </el-date-picker>
            <i></i>至<i></i>
            <el-date-picker
              class="w_200"
              v-model="endTime"
              type="datetime"
              format="yyyy-MM-dd hh:mm"
              value-format="yyyy-MM-dd hh:mm"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </span>
          <span>
            <label class="_n">用户姓名 </label>
            <el-input
              class="k_input"
              placeholder="请输入用户姓名"
              v-model="searchName"
            ></el-input
            ><i></i>
          </span>
          <button class="md_bt_gy" @click="initD()">
            查询
          </button>
        </div>
        <div>
          <span>
            <label class="_n">联系电话 </label>
            <el-input
              class="k_input w_160"
              placeholder="请输入联系电话"
              v-model="searchPhone"
            ></el-input>
          </span>
          <span>
            <label class="_n">状态</label>
            <el-select
              class="w_160"
              v-model="slectStatus"
              placeholder="请选择类型"
            >
              <el-option
                v-for="item in allStatus"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
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
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="姓名"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.username || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="gender"
          label="性别"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.gender == 0 ? "男" : "女" || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="联系电话"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.phone || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="dept"
          label="部门"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.dept || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="position"
          label="职位"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.position || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="enabled"
          label="账号状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span :class="scope.row.enabledCh == '已激活' ? '' : '_grey'">{{
              scope.row.enabledCh
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="creatorId"
          label="创建人"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.creatorId || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="gmtCreate"
          width="150"
          label="创建时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.gmtCreate || "-" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span :class="scope.row.statusCh == '启用' ? '_yg' : '_red'">
              {{ scope.row.statusCh }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作" width="300"
          ><div class="x_c_sb" slot-scope="scope">
            <button @click="handleFun('edit', scope.row)" class="_bule">
              编辑
            </button>
            <button @click="handleFun('noUse', scope.row)" class="_bule">
              禁用
            </button>
            <button @click="handleFun('del', scope.row)" class="_red">
              删除
            </button>
            <button @click="handleFun('resetPW', scope.row)" class="_bule">
              重置密码
            </button>
            <button @click="handleFun('role', scope.row)" class="_bule">
              角色
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
    <SelectRole
      ref="selectRoleRef"
      :_datas="PowerIds"
      :_type="dType"
      :_show="showSelectRole"
      @close="handleFun"
    />
    <ResetPW
      ref="restPwRef"
      :_type="dType"
      :_datas="userInfo"
      :_show="showRestPw"
      @close="handleFun"
      @refresh="initD"
    />
  </div>
</template>

<script>
import { getTrue, addLevel } from "@/utils/method";
import { adminUserApi, cgStatusApi, userDetailApi } from "@/api/userMgt";
import AddEdit from "./components/addEditUser.vue";
import SelectRole from "./components/selectRole.vue";
import ResetPW from "./components/resetPW.vue";
export default {
  name: "userManage",
  components: { AddEdit, SelectRole, ResetPW },
  data() {
    return {
      startTime: "",
      endTime: "",
      searchName: "",
      searchPhone: "",
      slectStatus: "",
      allStatus: [
        {
          name: "全部",
          value: ""
        },
        {
          name: "禁用",
          value: 0
        },
        {
          name: "启用",
          value: 1
        }
      ],
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
  },
  methods: {
    initD(val) {
      this.dLoading = true;
      adminUserApi({
        startTime: this.startTime,
        endTime: this.endTime,
        limit: this.pageSize,
        page: this.currentPage,
        phone: this.searchPhone,
        queryMode: "page",
        status: this.slectStatus,
        username: this.searchName
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
        case "resetPW":
          this.dType = t;
          this.showRestPw = true;
          this.userInfo = val;
          break;
        case "role":
          this.dType = t;
          this.showSelectRole = true;
          this.$refs.selectRoleRef._datas = val;
          this.$refs.selectRoleRef.currentPage = 1;
          this.$refs.selectRoleRef.getList();
          break;
        case "noUse":
          this.$confirm(
            "确认" + (val.status == 1 ? "禁" : "启") + "用该用户吗？"
          )
            .then(_ => {
              cgStatusApi({ id: val.id }).then(r => {
                if (r.code == 200) {
                  this.initD();
                  this.$message.success(
                    (val.status == 1 ? "禁" : "启") +
                      "用“" +
                      val.username +
                      "”用户成功！"
                  );
                } else {
                  this.$message.success("处理失败！");
                }
              });
            })
            .catch(_ => {});
          break;
        case "edit":
          this.showD = true;
          this.dType = t;
          userDetailApi({ id: val.id }).then(r => {
            if (r.code == 200) {
              this.editDatas = r.data;
            }
          });
          break;
        case "del":
          this.$confirm("确认删除“" + val.username + "”用户吗？")
            .then(_ => {
              adminUserApi({ id: val.id }, "DELETE").then(r => {
                if (r.code == 200) {
                  this.initD();
                  this.$message.success("删除成功！");
                }
              });
            })
            .catch(_ => {});
          break;
        default:
          this.showD = false;
          this.showSelectRole = false;
          this.showRestPw = false;
          break;
      }
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
#userManage {
}
</style>
