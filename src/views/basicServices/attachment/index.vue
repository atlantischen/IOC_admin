<template>
  <!-- 附件管理 -->
  <div id="attachment" class="comStyles">
    <div class="header_btns x_c">
      <div class="hb_left"></div>
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
          label="附件名称"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="from"
          label="路径"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.from }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="size"
          label="大小"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.size }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="类型"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.type }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="belongType"
          label="所属类别"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.belongType }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="备注"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.remark }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="handler"
          label="操作人"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.handler }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="upTime"
          label="上传时间"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.upTime }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作"
          ><div class="xy_c" slot-scope="scope">
            <button @click="handleFun('edit', scope.row)" class="_bule">
              编辑
            </button>
            <button @click="handleFun('look', scope.row)" class="_bule">
              预览
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
  </div>
</template>

<script>
import AddEdit from "./components/addEdit.vue";
export default {
  name: "attachment",
  components: { AddEdit },
  data() {
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      dLoading: false,
      dataList: [
        {
          name: "8EEE-23400.jpg",
          from: "image/8EEE-23400.jpg",
          size: "100kb",
          type: "jpg",
          belongType: "应用服务附件",
          remark: "--",
          handler: "张展",
          upTime: "2021-06-18 18:00"
        },
        {
          name: "8EEE-23400.jpg",
          from: "image/8EEE-23400.jpg",
          size: "100kb",
          type: "jpg",
          belongType: "应用服务附件",
          remark: "--",
          handler: "张展",
          upTime: "2021-06-18 18:00"
        }
      ],
      showD: false,
      dType: "add",
      editDatas: {}
    };
  },
  methods: {
    initD() {
      // this.dataList = []
    },
    handleFun(t, val) {
      this.$refs.addEditRef.allTypes = [
        {
          value: 1,
          name: "应用服务附件"
        }
      ];
      switch (t) {
        case "add":
          this.showD = true;
          this.dType = t;
          this.editDatas = {};
          break;
        case "edit":
          this.showD = true;
          this.dType = t;
          this.editDatas = val;
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
          this.$confirm("确认删除该附件？", "操作确认", {
            type: "warning"
          })
            .then(_ => {
              // this.$message.success("删除成功！");
            })
            .catch(_ => {});
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
#attachment {
}
</style>
