<template>
  <div class="tabContainer">
     <el-tabs v-model="activeName" @tab-click="handleClick" class="Manage">
      <el-tab-pane label="开发者平台" name="developer"  class="tabContainer_de">
        <DeveloPer
        />
    </el-tab-pane>
      <el-tab-pane label="园区管理平台" name="park">
        <ParkPlat
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DeveloPer from "./components/DeveloPer.vue";
import ParkPlat from "./components/ParkPlat.vue";
  export default {
    components: { DeveloPer, ParkPlat },
    data() {
      return {
        activeName: 'developer'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="scss" scoped>
.tabContainer {
  width: 92%;
  height: calc(100% - 110px);
  .el-tabs__nav-scroll{
    border-bottom:1px solid #fff !important;
  }
  .tabContainer_de{
  }
}

.tabContainer{
  margin: 10px 0 0 60px;
}
</style>