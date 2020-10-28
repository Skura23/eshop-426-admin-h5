<!-- home -->
<template>
  <div class="app-container page-my">
    <div class="ab _bac">

    </div>
    <div class="_cont">
      <div class="_wra0">
        <img
          :src="dataset.headimgurl"
          class="_i bor99 ml10"
          alt=""
        >
        <div class="ml10 font18">
          <div class="">{{dataset.username}}</div>
          <div class="_r_1 mt10">当前店铺 {{dataset.factory_name}}</div>
        </div>
      </div>
      <div
        class="_wra1 m-card "
        @click="toCash"
      >
        <div class="_top">
          <span class="font18">推广奖励</span>
          <span>
            <van-icon name="arrow" />
          </span>
        </div>
        <div class="_bot mt tc font14" style="margin-top:14vw">
          <div>
            <div>{{dataset.withdraw}}</div>
            <div class="mt5 cl-gray" style="margin-top:7.7vw">已提现(元)</div>
          </div>
          <!-- <div>
            <div>{{dataset.account}}</div>
            <div class="mt5 cl-gray">余额(元)</div>
          </div> -->
          <div>
            <div>{{dataset.estimate_amount}}</div>
            <div class="mt5 cl-gray" style="margin-top:7.7vw">预计收入(元)</div>
          </div>
          <div>
            <div>{{dataset.amount}}</div>
            <div class="mt5 cl-gray" style="margin-top:7.7vw">累计收入(元)</div>
          </div>
        </div>
      </div>
      <div class="_wra2  font18">
        <div
          class="_top "
          @click="$router.push('/my/goods')"
        >
          <span>推广商品</span>
          <span>
            <van-icon name="arrow" />
          </span>
        </div>
        <div
          class="_top "
          @click="showPromoImg"
        >
          <span>推广码</span>
          <span>
            <van-icon name="arrow" />
          </span>
        </div>
        <div
          class="_top "
          @click="$router.push('/my/cashoutbind')"
        >
          <span>提现绑定</span>
          <span>
            <van-icon name="arrow" />
          </span>
        </div>
        <div
          class="_top "
          @click="$router.push('/my/card-edit')"
        >
          <span>个人名片</span>
          <span>
            <van-icon name="arrow" />
          </span>
        </div>
      </div>
    </div>

    <van-popup v-model="showPop">
      <img
        :src="popImgUrl"
        alt=""
        style="width:70vw"
      >
    </van-popup>
  </div>
</template>

<script>
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie

  import api from '@/api/api'
  import {
    Toast, Dialog
  } from 'vant';

  export default {
    data() {
      return {
        dataset: {},
        showPop: false,
        popImgUrl: ''
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
      showPromoImg() {
        

        api.auth_factory_code({}).then((res) => {
          if (res.code == 9999) {
            Toast.clear()
            this.$router.push(`/my/qr?open_id=${res.data.open_id}`)
          } else if (res.code == 9100) {
            Toast.clear()
            this.showPop = false
            Dialog.alert({
              message: res.info,
            }).then(() => {
              // on close
            });
          }
        })
      },
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
    overflow: auto;
    ._bac {
      background-color: $cl-blue;
      height: 38vw;
      width: 100%;
      z-index: -1;
    }

    ._cont {
      margin-top: 5.5vw;
      padding: 5.9vw 3vw;
    }

    ._wra0 {
      @include flexbox();
      justify-content: flex-start;
      /* align-content: center; */
      color: #fff;

      ._i {
        width: 17vw;
        height: 17vw;
      }

      ._r_1 {
        opacity: 0.7;
      }
    }

    ._wra1 {
      width: 100%;
      padding: 3.9vw 4.5vw;
      border-radius: 1.5vw;
      box-sizing: border-box;
      margin-top: 5.7vw;

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
        margin-bottom: 8.3vw;
      }
    }
  }
</style>