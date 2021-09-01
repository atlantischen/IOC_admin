<template>
  <!-- 数据字典 -->
  <div class="all_dataD">
    <div id="dataD">
      <section class="dataD_left ">
        <div class="d_header x_c">
          <button class="min_bt_df" @click="addEditDicTypeFun('add')">
            添加
          </button>
          <button class="min_bt_gy" @click="addEditDicTypeFun('edit')">
            编辑
          </button>
          <button class="min_bt_gy" @click="addEditDicTypeFun('del')">
            删除
          </button>
        </div>
        <div class="d_content mBar">
          <el-table
            class="TabelOne"
            v-loading="dLoading"
            :data="dataDList"
            element-loading-text="Loading"
            :row-class-name="tableRowClassName"
            @row-click="clickItem"
            border
            fit
          >
            <el-table-column
              align="center"
              label="编号"
              type="index"
              width="60"
            >
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="名称"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.name || '-'}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="code"
              label="编码"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                {{ scope.row.code || '-'}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </section>
      <section class="dataD_right">
        <div class="d_header x_c">
          <el-input
            class="k_input"
            placeholder="请输入搜索内容"
            v-model="searchContent"
          ></el-input>
          <button class="md_bt_gy" @click="addEditDicItemFun('search')">
            查询
          </button>
          <button class="md_bt_df" @click="addEditDicItemFun('clear')">
            清空
          </button>
          <button class="md_bt_df bt_last" @click="addEditDicItemFun('add')">
            添加
          </button>
        </div>
        <div class="d_content mBar">
          <el-table
            class="TabelOne"
            v-loading="dLoading"
            :data="dataDItemList"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column
              align="center"
              label="编号"
              type="index"
              width="60"
            >
              <template slot-scope="scope">
                <span>{{
                  (currentPage - 1) * pageSize + scope.$index + 1
                }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="name" label="字典名称">
              <template slot-scope="scope">
                {{ scope.row.name || '-'}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="sort" label="字典选项值">
              <template slot-scope="scope">
                {{ scope.row.sort || '-'}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="dictCode" label="字典编码">
              <template slot-scope="scope">
                {{ scope.row.dictCode || '-'}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="remark" label="备注">
              <template slot-scope="scope">
                {{ scope.row.remark || '-'}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="code" label="操作">
              <div class="xy_c" slot-scope="scope">
                <button
                  @click="addEditDicItemFun('edit', scope.row)"
                  class="_bule"
                >
                  编辑
                </button>
                <button
                  @click="addEditDicItemFun('del', scope.row)"
                  class="_red"
                >
                  删除
                </button>
              </div>
            </el-table-column>
          </el-table>
          <PageT
            :_currentPage="currentPage"
            :_pageSize="pageSize"
            :_total="total"
            @size="sizeChange"
            @current="currentChange"
          />
        </div>
      </section>
    </div>
    <DicType
      :_datas="editDatas"
      :_type="dicTypeT"
      :_show="showDicTypeD"
      @close="addEditDicTypeFun"
      @refresh="initD"
    />
    <DicItem
      ref="dicItemRef"
      :_datas="itemDatas"
      :_type="dicItemT"
      :_show="showDicItemD"
      @close="addEditDicItemFun"
      @refresh="getChilds"
    />
  </div>
</template>

<script>
import DicType from "./components/dicType.vue";
import DicItem from "./components/dicItem.vue";
import {
  adminDictApi,
  adminDictItemApi,
  adminDictApiInfo,
  adminDictItemApiInfo
} from "@/api/dict";
export default {
  name: "dataDictionary",
  components: { DicType, DicItem },
  data() {
    return {
      dataDList: null,
      dataDItemList: null,
      slectCode: null,
      dLoading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      currentPage2: 1,
      pageSize2: 10,
      total2: 0,
      //
      showDicTypeD: false,
      dicTypeT: "add",
      editDatas: {},
      //
      showDicItemD: false,
      dicItemT: "add",
      itemDatas: {},
      searchContent: null
    };
  },
  created() {
    this.initD();
  },
  mounted() {},
  methods: {
    initD() {
      adminDictApi({
        limit: "",
        name: "",
        page: "",
        queryMode: "list"
      }).then(r => {
        if (r.code == 200) {
          this.dataDList = r.data;
          this.slectCode = r.data[0].code;
          this.getChilds(r.data[0]);
        }
      });
    },
    getChilds(r) {
      adminDictItemApi({
        limit: this.pageSize,
        dictCode: r.code || r.dictCode,
        name: "",
        page: this.currentPage,
        queryMode: "page"
      }).then(r => {
        if (r.code == 200) {
          this.dataDItemList = r.data;
          this.total = r.total;
        }
      });
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.code === this.slectCode) {
        return "table-actived";
      }
      return "";
    },
    clickItem(row) {
      this.slectCode = row.code;
      this.getChilds(row);
    },
    addEditDicTypeFun(type) {
      switch (type) {
        case "add":
          this.showDicTypeD = true;
          this.editDatas = {};
          this.dicTypeT = type;
          break;
        case "edit":
          let _id = this.dataDList.filter(r => {
            if (r.code === this.slectCode) {
              return r;
            }
          })[0].id;
          adminDictApiInfo({ id: _id }).then(r => {
            if (r.code == 200) {
              this.editDatas = r.data;
              this.dicTypeT = type;
              this.showDicTypeD = true;
            } else {
              this.$message.error("获取详情失败！");
            }
            this.initD();
          });
          break;
        case "close":
          this.showDicTypeD = false;
          this.editDatas = {};
          this.dicTypeT = null;
          break;
        default:
          let a = this.dataDList.filter(r => {
            if (r.code === this.slectCode) {
              return r;
            }
          })[0];
          this.$confirm("确认删除“" + a.name + "”字典项吗？", "操作确认", {
            type: "warning"
          })
            .then(_ => {
              if (this.dataDItemList.length == 0) {
                adminDictApi({ ids: a.id }, "delete").then(r => {
                  if (r.code == 200) {
                    this.$message.success("删除成功！");
                  } else {
                    this.$message.error("删除失败！");
                  }
                  this.initD();
                });
              } else {
                this.$message.info("当前类别下有数据项，不能删除！");
              }
            })
            .catch(_ => {});
          break;
      }
    },
    addEditDicItemFun(type, val) {
      this.$refs.dicItemRef.parkTypeList = this.dataDList;
      switch (type) {
        case "add":
          this.showDicItemD = true;
          this.itemDatas = { dictCode: this.slectCode };
          this.editDatas.dictCode = this.slectCode;
          this.dicItemT = type;
          break;
        case "edit":
          adminDictItemApiInfo({ id: val.id }).then(r => {
            if (r.code == 200) {
              this.itemDatas = r.data;
              this.dicItemT = type;
              this.showDicItemD = true;
            } else {
              this.$message.error("获取详情失败！");
            }
          });
          break;
        case "close":
          this.showDicItemD = false;
          this.itemDatas = {};
          this.dicItemT = null;
          break;
        case "search":
          adminDictItemApi({
            limit: this.pageSize,
            dictCode: this.slectCode,
            name: this.searchContent,
            page: this.currentPage,
            queryMode: "page"
          }).then(r => {
            if (r.code == 200) {
              this.dataDItemList = r.data;
              this.total = r.total;
            }
          });
          break;
        case "clear":
          this.searchContent = null;
          adminDictItemApi({
            limit: this.pageSize,
            dictCode: this.slectCode,
            name: "",
            page: this.currentPage,
            queryMode: "page"
          }).then(r => {
            if (r.code == 200) {
              this.dataDItemList = r.data;
            }
          });
          break;
        default:
          this.$confirm(
            "确认删除“" + val.name + "”字典数据项吗？",
            "操作确认",
            {
              type: "warning"
            }
          )
            .then(_ => {
              adminDictItemApi({ ids: val.id }, "delete").then(r => {
                if (r.code == 200) {
                  this.$message.success("删除成功！");
                } else {
                  this.$message.error("删除失败！");
                }
                this.initD();
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

<style scoped lang="scss">
.all_dataD {
}
#dataD {
  // margin: 22px 54px 0 48px;
  width: 100%;
  height: calc(100vh - 150px);
  display: flex;
  background: #fff;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
  .d_header {
    width: 100%;
    height: 55px;
    padding: 0 12px;
    background: #f7f8fa;
    border-bottom: 2px solid #d4d4d4;
    overflow-x: auto;
  }
  .d_content {
    height: calc(100% - 55px);
    padding: 34px 15px 30px 12px;
    overflow-y: scroll;
  }
  .dataD_left {
    width: 325px;
    height: 100%;
    border-right: 2px solid #d4d4d4;
    .d_header {
      button {
        margin-right: 6px;
      }
    }
  }
  .dataD_right {
    width: calc(100% - 325px);
    height: 100%;
    .d_header {
      justify-content: flex-end;
      padding: 0 24px 0 12px;
      button {
        margin-left: 15px;
      }
      .bt_last {
        margin-left: 100px;
      }
    }
    .d_content {
      padding-right: 20px;
    }
  }
}
</style>
