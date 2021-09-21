<template>
  <div class="tabContainer">
     <el-tabs v-model="activeName" @tab-click="handleClick" class="Manage" ref="tabs">
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
    watch: {
      activeName() {
        this.resetTabActivePosition(this.$refs.tabs.$el);
      }
    },
    created() {
      this.$nextTick(() => {
        this.resetTabActivePosition(this.$refs.tabs.$el);
      });
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      resetTabActivePosition($el) {
      this.$nextTick(() => {
        const activeEl = $el.querySelector(".el-tabs__item.is-active");
        const lineEl = $el.querySelector(".el-tabs__active-bar");
        const style = getComputedStyle(activeEl);
        const pl = style.paddingLeft.match(/\d+/)[0] * 1;
        const pr = style.paddingRight.match(/\d+/)[0] * 1;
        const w = style.width.match(/\d+/)[0] * 1;
        lineEl.style.transform =
          "translateX(" + (activeEl.offsetLeft + pl) + "px)";
        lineEl.style.width = w - pl - pr + "px";
      });
    }
    }
  };
</script>
<style lang="scss">
.Manage{
    .el-tabs__nav {
      height: 35px;
    }
    .el-tabs__item {
      padding: 0;
      margin: 0 10px;
      background: linear-gradient(0deg, #aabed0, #778ea9);
      color: #fff;
      text-align: center;
      width: 100px !important;
      height: 25px !important;
      line-height: 25px;
      border: 1px solid rgba(255, 255, 255, 0.19);
      border-radius: 3px;
    }
    .el-tabs__item:hover {
      color: #fff;
    }
    .el-tabs__item.is-active {
      color: #fff;
      background: linear-gradient(0deg, #009afb, #0ec6ee);
    }
}

</style>
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