<!-- home -->
<template>
  <div class="app-container page-my">
    <div class="ab _bac">

    </div>
    <div class="_cont">
      <div class="_wra0">
        <img
          :src="dataset.headimgurl"
          class="_i bor99"
          alt=""
        >
        <div class="ml10">
          <div class="">{{dataset.username}}</div>
          <div class="_r_1 mt10">当前店铺 {{dataset.factory_name}}</div>
        </div>
      </div>
      <div
        class="_wra1 m-card "
        @click="toCash"
      >
        <div class="_top">
          <span>推广奖励</span>
          <span>
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="_bot mt tc font10">
          <div>
            <div>{{dataset.withdraw}}</div>
            <div class="mt5 cl-gray">已提现(元)</div>
          </div>
          <div>
            <div>{{dataset.account}}</div>
            <div class="mt5 cl-gray">余额(元)</div>
          </div>
          <div>
            <div>{{dataset.estimate_amount}}</div>
            <div class="mt5 cl-gray">预计收入(元)</div>
          </div>
          <div>
            <div>{{dataset.amount}}</div>
            <div class="mt5 cl-gray">累计收入(元)</div>
          </div>
        </div>
      </div>
      <div class="_wra2 m-card " @click="$router.push('/my/goods')">
        <div class="_top">
          <span>推广商品</span>
          <span>
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
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
        dataset:{}
      }

    },

    computed: {},
    created() {
      api.auth_account({}).then((res) => {
        this.dataset = res.data
      })
    },
    mounted() {},

    methods: {
      toCash() {
        this.$router.push('/my/cash')
      },
    }
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-my {
    ._bac {
      background-color: $cl-blue;
      height: 26vw;
      width: 100%;
      z-index: -1;
    }

    ._cont {
      padding: 5.9vw 7.2vw;
    }

    ._wra0 {
      @include flexbox();
      justify-content: flex-start;
      /* align-content: center; */
      color: #fff;

      ._i {
        width: 14.7vw;
        height: 14.7vw;
      }

      ._r_1 {
        opacity: 0.7;
      }
    }

    ._wra1 {
      width: 100%;
      padding: 3.9vw 4.5vw;
      border-radius: 6.7vw;
      box-sizing: border-box;
      margin-top: 2vw;

      ._top {
        @include flexbox();
      }

      ._bot {
        @include flexbox();
      }
    }

    ._wra2 {
      width: 100%;
      padding: 2.7vw 4.5vw;
      box-sizing: border-box;
      margin-top: 4vw;

      ._top {
        @include flexbox();
      }
    }
  }
</style>