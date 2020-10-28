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
        v-for="(item, index) in backList"
        class="cl-blue"
        :key="index"
        :icon="list[item.rule_key] && list[item.rule_key].icon"
        :text="list[item.rule_key] && list[item.rule_key].title"
        :to="list[item.rule_key] && list[item.rule_key].url"
      />
    </van-grid>
  </div>
</template>

<script>
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        list: {
          'corp-manage': {
            url: '/workbench/corp-manage',
            title: '管理企业',
            icon: 'manager-o'
          },
          'banchuan-manage': {
            url: '/workbench/banchuan-manage',
            title: '板川产品',
            icon: 'apps-o'
          },
          'selfrun-manage': {
            url: '/workbench/selfrun-manage',
            title: '自营产品',
            icon: 'goods-collect-o'
          },
          'order-manage': {
            url: '/workbench/order-manage',
            title: '订单管理',
            icon: 'orders-o'
          },
          'prepay-order': {
            url: '/workbench/prepay-order',
            title: '预付订单',
            icon: 'newspaper-o'
          },
          'case-manage': {
            url: '/workbench/case-manage',
            title: '案例管理',
            icon: 'notes-o'
          },
          cashout: {
            url: '/workbench/cashout/remainCashout',
            title: '余额提现',
            icon: 'cash-back-record'
          },
          turnover: {
            url: '/workbench/turnover/detail',
            title: '营业额',
            icon: 'balance-o'
          },
          afterSale: {
            url: '/workbench/afterSale',
            title: '售后管理',
            icon: 'after-sale'
          },
          // {
          //   url: '/workbench/radar',
          //   title: '天眼雷达',
          //   icon: 'aim'
          // },
        },
        backList: []
      }

    },
    created() {
      api.tms_auth_rule({

      }).then((res) => {
        this.backList = res.data
      })
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