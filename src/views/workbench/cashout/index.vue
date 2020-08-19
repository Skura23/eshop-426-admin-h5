<!-- home -->
<template>
  <div class="app-container page-cashout">
    <div class="_top re">
      <div
        class="ab"
        style="top:6.5vw;right:2.9vw;opacity: 0.74;"
        @click="toDetail"
      >
        余额明细
      </div>
      <div class="tc">
        <div class="font14">总资金（元）</div>
        <div class="mt10 font18">0.09</div>
      </div>
    </div>
    <div class="_bot tc">
<van-button type="primary" size="large" color="#457ac0" style="margin-top:20vw;" class="mt">提现到余额</van-button>
<van-button type="default" size="large"  class="mt" >充值</van-button>
    </div>
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

    methods: {
      toDetail() {
        this.$router.push('./cashout/detail')
      },
    }
  }
</script>
<style
  lang="scss"
  scoped
>
  .app-container.page-cashout {
    ._top {
      height: 50.5vw;
      background-color: #457ac0;
      color: #fff;
      @include flexbox();
      justify-content: center;
    }
    .van-button--large{
      width: 87.7vw;
    }
  }
</style>