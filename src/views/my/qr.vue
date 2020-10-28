<!-- home -->
<template>
  <div class="app-container page-card-qr ">
    <div class="m-card auto0 _card b-b">
      <div class="_top">
        <van-image
          width="18vw"
          height="18vw"
          radius="1.3vw"
          fit="cover"
          :src="dataset.head_img"
        />
        <div class="_r ml">
          <div class="font14">{{dataset.username}}</div>
          <div class="mt10 font12">{{dataset.group_name}}</div>
          <div class="mt10 font12 cl-gray">{{dataset.label}}</div>
        </div>
      </div>
      <van-divider />
      <div class="_bot">
        <div class="_d0">
          <img
            style="vertical-align: bottom;width:4vw;"
            :src="require('@/assets/imgs/13.png')"
            alt=""
          > 手机 {{dataset.phone}}
        </div>
        <div class="_d1">
          <div
            class=" re"
            style="height:100%"
          >
            <img
              src="@/assets/imgs/12.png"
              class=" v-h-center"
              style="width:56vw"
              alt=""
            >
            <div
              class="v-h-center bac-whi"
              style="width:47vw;height:47vw;"
            >
              <van-image
                width="100%"
                height="100%"
                fit="cover"
                :src="dataset.code_href"
              />
            </div>

          </div>
        </div>
      </div>
    </div>

<div class="mt"></div>
    <div
      class="auto0 "
      style="width: 73vw;"
    >
      <van-button
        type="info"
        class="mb10"
        block
        style="border-radius:2vw;"
        color="#447ABF"
        @click="getPoster"
      >长按保存图片</van-button>
    </div>


    <van-popup
      v-model="posterShow"
      class="tc"
    >
      <img
        :src="posterUrl"
        alt=""
        style="width:83vw;"
      >
      <van-button
        type="info"
        class="mb10"
        color="#447ABF"

      >长按图片保存到本地</van-button>
    </van-popup>
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
        dataset: {},
        posterShow: false,
        posterUrl: '',
      }

    },

    computed: {},
    created() {
      api.auth_factory_card({
      }).then((res) => {
        this.dataset = res.data
      })
    },
    mounted() {},

    methods: {
      
      getPoster() {
        Toast.loading({
          message: '图片生成中...',
          forbidClick: true,
          duration: 0
        });
        api.auth_factory_code({
        }).then((res) => {
          this.showShare = false
          this.posterShow = true
          this.posterUrl = res.data.url
          Toast.clear()
        })
      },
    }
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-card-qr {
    ._card {
      margin-top: 10vw;
      width: 73vw;
      padding: 4vw;
      padding-bottom: 0;

      ._top {
        @include flexbox();
        justify-content: flex-start;

        ._r {
          text-align: left;
        }
      }

      ._bot {
        ._d1 {
          height: 70vw;
        }
      }
    }
  }
</style>