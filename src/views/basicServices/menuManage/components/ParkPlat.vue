<template>
  <div class="ParkPlat">
    <div>
      园区管理平台
    </div>
  </div>
</template>

<script>
export default {
  name: "ParkPlat",
  props: {
    _show: {
      type: Boolean
    },
    _datas: {
      typeof: Object,
      default: () => {}
    },
    _type: {
      type: String
    }
  },
  // props: ["_show", "_datas", "_type"],
  data() {
    return {
      
    };
  },
  watch: {
    
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
.ParkPlat {
}
</style>
