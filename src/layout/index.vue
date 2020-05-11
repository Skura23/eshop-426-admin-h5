<template>
  <!-- 公用布局 -->
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }

    },

    computed: {},

    mounted() {},

    methods: {}
  }
</script>
<style
  lang="scss"
  scoped
>
  .app-container {}
</style>