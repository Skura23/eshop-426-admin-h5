<!-- home -->
<template>
  <div class="app-container page-">
    <van-cell
      title="零钱"
      icon="balance-pay"
      value="￥ 100"
      is-link
      to="/workbench/cashout"
    />
    <van-cell
      title="营业额"
      icon="cash-on-deliver"
      value="￥ 100"
      is-link
      to="/workbench/turnover/detail"
    />
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

      }

    },

    computed: {},
    created() {

    },
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