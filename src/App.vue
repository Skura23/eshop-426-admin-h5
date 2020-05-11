<template>
  <div
    class="app"
    id="app"
  >
    <TopBar
      :title="$route.meta.title"
      v-show="!$route.meta.noTopbar"
    ></TopBar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- tabbar -->
    <TabBar></TabBar>

  </div>
</template>
<script>
  import TabBar from '@/components/TabBar'
  import TopBar from '@/components/TopBar'

  export default {
    name: 'App',
    components: {
      TabBar,
      TopBar
    },
    created() {},
  }
</script>
<style lang="scss"></style>