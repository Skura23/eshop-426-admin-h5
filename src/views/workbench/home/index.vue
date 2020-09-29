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
            url: '/workbench/banchuan-manage',
            title: '板川产品',
            icon: 'apps-o'
          },
          {
            url: '/workbench/selfrun-manage',
            title: '自营产品',
            icon: 'apps-o'
          },
          {
            url: '/workbench/order-manage',
            title: '订单管理',
            icon: 'apps-o'
          },
          {
            url: '/workbench/prepay-order',
            title: '预付订单',
            icon: 'apps-o'
          },
          {
            url: '/workbench/case-manage',
            title: '案例管理',
            icon: 'newspaper-o'
          },
          {
            url: '/workbench/cashout',
            title: '佣金提现',
            icon: 'newspaper-o'
          },
          {
            url: '/workbench/turnover',
            title: '营业额',
            icon: 'newspaper-o'
          },
          {
            url: '/workbench/afterSale',
            title: '售后管理',
            icon: 'newspaper-o'
          },
          // {
          //   url: '/workbench/radar',
          //   title: '天眼雷达',
          //   icon: 'aim'
          // },
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