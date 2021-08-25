<template>
    <el-pagination
    class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout=" jumper, sizes,total, prev, pager, next"
      :total="total">
    </el-pagination>
</template>

<script>
export default {
  name:'pagination',
    props: {
    total: {
      type:Number,
      // required:true,
    },
  },
    data() {
        return {
            currentPage:1,
            // paginationTotal:1
        }
    },
     methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
}
</script>

<style lang="scss">
.pagination{
    margin-top: 20px;
    text-align: right;
    .el-pagination__jump,.el-pagination__sizes,.el-pagination__total{
        float: left;
        margin: 0 20px 0 0;
    }
}
</style>