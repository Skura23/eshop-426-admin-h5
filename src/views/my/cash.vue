<!-- home -->
<template>
  <div class="app-container page-my-cash">
    <div class="m-card mt _wra">
      <p class="font12 cl-gray">
        累计佣金（元）
      </p>
      <div class="_0 mt">
        <span class="font20">
          {{dataset.account}}
        </span>
        <span
          class="cl-blue"
          @click="$router.push('/workbench/cashout/detail')"
        >
          收支明细
        </span>
      </div>
      <van-divider />
      <div class="_1 cl-gray">
        <span>已提现¥{{dataset.withdraw}}</span>
        <span class="ml">预估收入¥{{dataset.amount}}</span>
      </div>
      <!-- <div class="_2 mt">
        <van-button
          round
          type="info"
          size="large"
        >提现</van-button>
      </div> -->
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
        dataset: {}
      }

    },

    computed: {},
    created() {
      api.auth_account({}).then((res) => {
        this.dataset = res.data
      })
    },
    mounted() {},

    methods: {}
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-my-cash {
    ._wra {
      margin-top: 3vw;
      padding: 6vw 3.7vw;
      box-sizing: border-box;

      ._0 {
        @include flexbox()
      }
    }
  }
</style>