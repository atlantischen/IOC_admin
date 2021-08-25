<template>
  <div class="pageTool" :class="{ p_between: between, min_style: min }">
    <div class="xy_c">
      <el-pagination layout="slot" v-if="isInclude('current')">
        <span
          >第
          <input
            class="pg_input"
            v-model.number="currentPage"
            @change="handleCurrentChange(currentPage)"
          />页</span
        >
      </el-pagination>
      <el-pagination layout="slot" v-if="isInclude('size')">
        <span>
          每页<input
            class="pg_input"
            v-model.number="pageSize"
            @change="handleSizeChange(pageSize)"
          />
        </span>
      </el-pagination>
      <el-pagination layout="total" :total="total" v-if="isInclude('total')">
      </el-pagination>
    </div>
    <div class="xy_c">
      <el-pagination
        v-if="isInclude('pager')"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout=" slot, prev, pager, next"
      >
        <button
          class="bt_actived btn-first"
          v-if="isInclude('last')"
          @click="handleCurrentChange(1)"
        >
          首页
        </button>
      </el-pagination>
      <el-pagination layout="slot" v-if="isInclude('next')">
        <button
          class="bt_df"
          @click="handleCurrentChange(Math.ceil(total / pageSize))"
        >
          末页
        </button>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageT",
  props: {
    layout: {
      type: Array,
      default: () => ["current", "size", "total", "last", "pager", "next"]
    },
    _currentPage: {
      type: Number
    },
    _pageSize: {
      type: Number
    },
    _total: {
      type: Number
    },
    between: {
      type: Boolean,
      default: false
    },
    min: false
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  watch: {
    _currentPage: {
      handler: function(n) {
        this.currentPage = n;
      }
      // immediate: false
    },
    _pageSize: {
      handler: function(n) {
        this.pageSize = n;
      }
      // immediate: false
    },
    _total: {
      handler: function(n) {
        this.total = n;
      }
      // immediate: false
    }
  },
  computed: {},
  methods: {
    isInclude(v) {
      return this.layout.includes(v);
    },
    handleSizeChange(v) {
      this.pageSize = v <= 0 ? 10 : v;
      this.$emit("size", v);
    },
    handleCurrentChange(v) {
      this.currentPage = v <= 0 ? 1 : v;
      this.$emit("current", v);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/index.scss";
.pageTool {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #252525;
  & > div {
    ::v-deep.el-pagination {
      display: flex;
      align-items: center;
      .el-pagination__total {
        color: #252525;
        font-weight: bold;
      }
      .el-pagination__rightwrapper {
        display: flex;
      }
      button {
        @include w_h(60px, 25px);
        line-height: 25px;
        padding: 0;
      }
      .bt_actived {
        @include btn_color(#0695e5, #1da6df);
      }
      .bt_df,
      .btn-prev,
      .btn-next {
        @include btn_color(#69809e, #889eb6);
      }
      .btn-first {
        margin: 0 15px 0 20px;
      }
      .btn-next {
        margin-left: 15px;
      }
      .el-pager {
        li {
          min-width: 25px;
          height: 25px;
          background: #bbbbbb;
          border-radius: 50%;
          color: #fff;
          padding: 0;
          margin-left: 15px;
          &.active {
            background: #008aff;
          }
        }
      }
      .pg_input {
        width: 30px;
        border: 1px solid #d4d4d4;
        text-align: center;
        border-radius: 2px;
        padding: 2px 0;
        margin: 0 3px;
      }
    }
  }
}
.p_between {
  justify-content: space-between;
}
.min_style {
  & > div {
    ::v-deep.el-pagination {
      button {
        @include w_h(30px, 25px);
        line-height: 25px;
        padding: 0;
      }
    }
  }
}
</style>
