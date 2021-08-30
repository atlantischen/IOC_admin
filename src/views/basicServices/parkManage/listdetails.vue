<template>
  <div class="container">
    <div class="header">
      <el-tabs
        class="el-tabs"
        v-model="activeName"
        @tab-click="handleClick"
        ref="tabs"
      >
        <el-tab-pane label="机构列表" name="first">
          <MechanismList></MechanismList>
          </el-tab-pane>
        <el-tab-pane label="用户列表" name="second">用户列表</el-tab-pane>
        <el-tab-pane label="角色列表" name="third">角色列表</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import MechanismList from './components/mechanismList.vue'
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  components:{MechanismList},
  watch: {
    activeName() {
      this.resetTabActivePosition(this.$refs.tabs.$el);
    }
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
  },
  created() {
      this.$nextTick(() => {
          this.resetTabActivePosition(this.$refs.tabs.$el)
      });
  },
};
</script>
<style lang="scss">
.el-tabs__nav {
  height: 35px;
}
.el-tabs__item {
  padding: 0;
  margin: 0 10px;
  background: linear-gradient(0deg, #aabed0, #778ea9);
  color: #fff;
  text-align: center;
  width: 80px !important;
  height: 25px !important;
  line-height: 25px;
  border: 1px solid rgba(255, 255, 255, 0.19);
  border-radius: 3px;
}
.el-tabs__item:hover{
  color: #fff;
}  
.el-tabs__item.is-active {
  color: #fff;
  background: linear-gradient(0deg, #009afb, #0ec6ee);
}
</style>
<style lang="scss" scoped>
.container {
  .header {
    .el-tabs {
    }
  }
}
</style>
