<template>
  <div>
    <router-view :key="key" />

  </div>

</template>

<script>
export default {
  components:{

  },
  computed: {
    key() {
      return this.$route.meta.activeMenu
    }
  }
};
</script>

