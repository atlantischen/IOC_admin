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
      <span>选择角色</span>
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
        rowKey="ShuBiOrderNo"
        v-loading="dLoading"
        :data="dataList"
        element-loading-text="Loading"
        height="430"
        stripe
        fit
        row-key="id"
        @select="handChange"
        @select-all="handallChange"
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
        <el-table-column prop="name" label="角色名称" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="角色编码" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.code || '-'}}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.remark || '-' }}
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
import { userRoleApi } from "@/api/userMgt";
import { getDiffArr, getComArr, getIds } from "@/utils/method.js";
export default {
  name: "selectObj",
  props: {
    _show: {
      type: Boolean
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
      defalutIds: [],
      addIds: [],
      delIds: [],
      pageObjSave: null,
      //
      currentPage: 1,
      pageSize: 10,
      total: 0,
      _datas: null,
      flag: false
    };
  },
  watch: {
    _show: {
      handler: function(n) {
        this.Visible = n;
      }
    }
  },
  methods: {
    getList() {
      this.dataList = [];
      this.dLoading = true;
      userRoleApi({
        limit: this.pageSize,
        page: this.currentPage,
        queryMode: "page",
        userId: this._datas.id,
        name: this.searchContent
      }).then(r => {
        if (r.code == 200) {
          this.dataList = r.data;
          this.total = r.total;
          if (!this.pageObjSave) {
            // 自定义每页存储（add：新增，del: 已默认中需删除de，df：默认）
            this.pageObjSave = [];
            for (let i = 0; i < Math.ceil(this.total / this.pageSize); i++) {
              this.pageObjSave[i] = {
                add: [],
                del: [],
                df: [],
                alls: []
              };
            }
          } else {
            //   this.flag = true;
            //   let _a = (this.addIds = this.pageObjSave[this.currentPage - 1][
            //     "add"
            //   ]);
            //   this.defalutIds = this.pageObjSave[this.currentPage - 1]["df"];
            //   this.delIds = this.pageObjSave[this.currentPage - 1]["del"];
            //   //
            //   console.log(this.addIds);
            //   if (
            //     this.addIds.length > 0 &&
            //     this.defalutIds.length == 0 &&
            //     this.delIds.length == 0
            //   ) {
            //     // 加
            //     console.log("//////////add");
            //     console.log(_a.length);
            //     _a.forEach(r => {
            //       console.log("//////////pppppppppppppppp");
            //       console.log(r);
            //       // this.$refs.tableRef.toggleRowSelection(r, this.flag);
            //       this.$nextTick().then(() => {
            //         this.$refs.tableRef.toggleRowSelection(r, true);
            //       });
            //       console.log("//////////pppppppppppppppp2");
            //     });
            //   } else if (
            //     this.addIds.length > 0 &&
            //     this.defalutIds.length > 0 &&
            //     this.delIds.length == 0
            //   ) {
            //     console.log("//////////add+df");
            //     let _ad = getDiffArr(this.defalutIds, this.addIds);
            //     _ad.forEach(r => {
            //       // this.$refs.tableRef.toggleRowSelection(r, this.flag);
            //       this.$nextTick().then(() => {
            //         this.$refs.tableRef.toggleRowSelection(r, true);
            //       });
            //     });
            //   } else if (
            //     this.defalutIds.length >= 0 &&
            //     this.addIds.length >= 0 &&
            //     this.delIds.length >= 0
            //   ) {
            //     // 加，减，默认
            //     console.log("///////////df");
            //     this.defalutIds.forEach(r => {
            //       // this.$refs.tableRef.toggleRowSelection(r, this.flag);
            //       this.$nextTick().then(() => {
            //         this.$refs.tableRef.toggleRowSelection(r, true);
            //       });
            //     });
            //   } else {
            //     console.log("///////////------");
            //   }
            //   this.flag = false;
          }
          // 初始化每页默认复现
          this.defalutIds = [];
          if (
            r.data &&
            this.pageObjSave[this.currentPage - 1].df.length == 0 &&
            this.pageObjSave[this.currentPage - 1].add.length == 0 &&
            this.pageObjSave[this.currentPage - 1].del.length == 0
          ) {
            console.log("111111111");
            r.data.forEach(r => {
              if (r.choice.toString() == "true") {
                this.defalutIds.push(r);
                this.$nextTick().then(() => {
                  this.$refs.tableRef.toggleRowSelection(r, true);
                });
              }
            });
            this.pageObjSave[this.currentPage - 1].df = this.defalutIds;
            this.pageObjSave[this.currentPage - 1].alls = this.defalutIds;
          } else {
            console.log("22222");
            this.dataList.forEach(_o => {
              this.pageObjSave[this.currentPage - 1]["alls"].forEach(_t => {
                if (_o.id == _t.id) {
                  console.log("----", _o);
                  this.$nextTick(() => {
                    this.$refs.tableRef.toggleRowSelection(_o, true);
                  });
                }
              });
            });
          }
          console.log(this.pageObjSave);
        }
      });
      this.dLoading = false;
    },
    close() {
      this.reset();
      this.Visible = false;
      this.pageObjSave = null;
      this.$emit("close", "close");
      this.pageSize = 10
      this.currentPage = 1
    },
    reset() {
      this.toggleSelection();
      this.pageObjSave = [];
      for (let i = 0; i < Math.ceil(this.total / this.pageSize); i++) {
        this.pageObjSave[i] = {
          add: [],
          del: [],
          df: []
        };
      }
    },

    sure() {
      console.log(this.pageObjSave);
      let allAdds = [],
        alldels = [];
      for (let i = 0; i < this.pageObjSave.length; i++) {
        console.log(this.pageObjSave[i].add);
        allAdds.push(...this.pageObjSave[i].add);
        alldels.push(...this.pageObjSave[i].del);
      }
      console.log(allAdds);
      this.$confirm("确认修改选择角色？", "操作确认", {
        type: "warning"
      })
        .then(_ => {
          userRoleApi(
            {
              userId: this._datas.id,
              addRoleIds: `${getIds(allAdds)}`,
              deleteRoleIds: `${getIds(alldels)}`
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
        })
        .catch(_ => {});
    },
    toggleSelection(rows) {
      this.defalutIds = [];
      if (rows) {
        rows.forEach(r => {
          if (r.choice.toString() == "true") {
            this.defalutIds.push(r);
            this.$nextTick().then(() => {
              this.$refs.tableRef.toggleRowSelection(r);
            });
          }
        });
      } else {
        this.$refs.tableRef.clearSelection();
      }
    },
    handChange(s, r) {
      this.pageObjSave[this.currentPage - 1]["alls"] = s;
      this.handlerSet(s);
    },
    handallChange(s) {
      this.pageObjSave[this.currentPage - 1]["alls"] = s;
      this.handlerSet(s);
    },
    handlerSet(_a) {
      if (_a.length > 0) {
        this.addIds = this.pageObjSave[this.currentPage - 1][
          "add"
        ] = getDiffArr(_a, this.defalutIds);
        let _b = getComArr(_a, this.defalutIds);
        this.delIds = this.pageObjSave[this.currentPage - 1][
          "del"
        ] = getDiffArr(_b, this.defalutIds);
      } else {
        this.addIds = this.pageObjSave[this.currentPage - 1]["add"] = [];
        this.delIds = this.pageObjSave[this.currentPage - 1][
          "del"
        ] = this.defalutIds;
      }
      console.log("===this.pageObjSave", this.pageObjSave);
    },
    handleSelectionChange(val) {
      console.log("===all", val);
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
