<template>
  <div class="container">
    <el-dialog
      title="提示"
      :visible="permissionShow"
      width="50%"
      :destroy-on-close="true"
      @close="$emit('update:permissionShow', false)"
      custom-class="dialog"
    >
      <div slot="title" class="header-title">
        <span class="svg-container">
          <svg-icon icon-class="quanxian" />
        </span>
        <span>园区权限分配</span>
      </div>
      <div class="box">
          <div class="radio_i">
              <el-radio v-model="radio" label="1">菜单</el-radio>
            <el-radio v-model="radio" label="2">服务</el-radio>
          </div>
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
           >
            </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="$emit('update:permissionShow', false)"
          >取 消</el-button
        >
        <el-button type="primary" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>


export default {
  props: {
    permissionShow: {
      type: Boolean
    },
  },
  data() {
    return {
        radio:'1',
         data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
    };
  },

  methods: {}

};
</script>

<style lang="scss" scoped>
.container {
  .box{
      border: 1px solid #BBBBBB;
      .radio_i{
          height: 47px;
          padding-left: 20px;
          background: #F9F9F9;
          line-height: 47px;
      }
  }
   .dialog-footer {
    .el-button--primary {
      margin-left: 60px;
    }
  }
}
</style>
