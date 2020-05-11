<!-- home -->
<template>
  <div class="app-container">
    <van-grid
      square
      :gutter="10"
      :column-num="3"
      class="mt10"
    >
      <van-grid-item
        v-for="(item, index) in list"
        class="cl-blue"
        :key="index"
        :icon="item.icon"
        :text="item.title"
        :to="item.url"
      />
    </van-grid>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[
          {
            url: '/workbench/corp-manage',
            title: '管理企业',
            icon: 'manager-o'
          },
          {
            url: '/workbench/corp-manage',
            title: '板川产品',
            icon: 'apps-o'
          },
        ]
      }

    },

    computed: {},

    mounted() {
      console.log('home');
    },

    methods: {}
  }
</script>
<style
  lang="scss"
  scoped
>
  .app-container {}
</style>