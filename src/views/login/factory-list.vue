<!-- home -->
<template>
  <div class="app-container page-factory-list">
    <van-notice-bar>
      请选择门店以完成登录
    </van-notice-bar>

    <!-- <van-tabs
      @change="changeTab"
      v-model="active"
    >
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.class_name"
        sticky
      >

      </van-tab>
    </van-tabs>
     -->

    <!-- <div class="mt10">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        :clearable="true"
        @clear="clearSear"
        @search="sear"
      />
    </div>

    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="暂无更多数据"
      error-text="请求失败，点击重新加载"
      @load="loadList"
    > -->

    <!-- </van-list> -->


    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell
          :title="item.factory_name"
          clickable
          @click="chooseShop(item)"
          v-for="(item, index) in list"
          :key="index"
        >
          <template #right-icon>
            <van-radio :name="item.factory_id" />
          </template>
        </van-cell>

      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
  import utils from '@/utils/index' // get token from cookie

  import api from '@/api/api'
  import globals from '@/utils/globals' // get token from cookie
  // import wx from 'weixin-js-sdk'

  import Cookies from 'js-cookie'
  import {
    setToken
  } from '@/utils/auth' // get token from cookie

  import {
    ImagePreview
  } from 'vant';
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        radio: '',
        list: [],
        // tabList: [],
        // active: 0,
        // keyword: '',
        // dataList: [],
        // page: 1,
        // total: 0,
        // listLoading: false,
        // listFinished: false,
      }

    },

    computed: {},
    created() {
      this.list = this.$route.params.list
      this.open_id = this.$route.params.open_id
    },
    mounted() {
      console.log('mounted');

    },

    methods: {
      chooseShop(item) {
        this.radio = item.factory_id
        api.login_by_open_id({
          root_factory_id: 1,
          factory_id: this.radio,
          open_id: this.open_id
        }).then((res) => {
          if (res.code == 9999) {
            setToken(res.data.response.token)
            Cookies.set('eshop-426-admin-h5_userinfo', res.data.response)
            Toast({
              message: '登录成功!',
              duration: 1200,
              onClose: () => {
                utils.jumpTo('/')
              }
            })
          } else {
            Toast(res.info)
          }
        })
      },


      clearSear() {
        this.changeTab()
      },
      sear() {
        this.dataList = []
        this.page = 1
        this.loadList()
      },
      changeTab(data) {
        this.dataList = []
        this.page = 1
        this.keyword = ''
        this.loadList()
      },
      loadList() {
        api.find_cases_list({
          class_id: this.active,
          keywords_like: this.keyword,
          page: this.page
        }).then((res) => {
          // loadListCb(res) {
          if (res.code == 9999) {
            this.page++
            this.total = res.data.total

            this.dataList = this.dataList.concat(res.data.list)

            // 加载状态结束
            this.listLoading = false;

            // 数据全部加载完成
            if (this.dataList.length >= this.total) {
              this.listFinished = true;
            }
          }
          // }
        })
      },
    }
  }
</script>
<style
  lang="scss"
  scoped
>
  $red: #f90250;
  $cardpad: 4vw;

  .app-container.page-factory-list {

    .m-card {
      box-sizing: border-box;
      padding: $cardpad;
      margin-top: 3.5vw;
    }

    ._card2 {
      ._t {
        display: flex;
        justify-content: space-between;
        align-items: center;

        ._l {
          display: flex;
          align-items: center;

          img {
            width: 6.6vw;
            height: 6.6vw;
            border-radius: 50%;
          }
        }

        ._r {
          color: $red;
        }
      }

      ._m {
        margin-top: 2vw;
        display: flex;

        ._l img {
          width: 21.3vw;
        }

        ._mid {
          padding-left: 2vw;
          flex: 1 1 auto;

          p {
            margin: 0;
            margin-top: 2.2vw;

            &._p1,
            &._p2 {
              opacity: 0.7;
            }
          }
        }

        ._r {
          padding-left: 2vw;
        }
      }

      ._b {
        ._b-t {
          text-align: right;
          font-size: 4vw;

          span {
            font-size: 2.4vw;
          }
        }

        ._b-b {
          display: flex;
          justify-content: space-between;
          font-size: 3vw;
          margin-top: 2vw;

          ._btn0,
          ._btn1 {
            justify-content: flex-end;
          }

          ._btn0 {}

          ._btn1 {
            margin-left: 2vw;
            background: $red;
            color: #fff;
          }
        }
      }
    }
  }
</style>