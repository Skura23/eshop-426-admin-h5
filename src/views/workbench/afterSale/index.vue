<!-- home -->
<template>
  <div class="app-container page-afterSale">
    <van-tabs
      @change="changeTab"
      v-model="active"
    >
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.title"
        :name="item.name"
        sticky
      >
        <!-- {{item}} -->
      </van-tab>
    </van-tabs>
    <!-- <div class="mt10">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        :clearable="true"
        @clear="clearSear"
        @search="sear"
      />
    </div> -->

    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="暂无更多数据"
      error-text="请求失败，点击重新加载"
      @load="loadList"
    >
      <div
        class="_card2 m-card f14 bac-whi "
        v-for="(item, index) in dataList"
        :key="index"
      >
        <!-- thumb goods(title total optiontitle price) -->
        <div class="_t clearfix">
          <!-- <div class="_l">
          <img
            class="_head"
            src="http://placehold.jp/99ccff/003366/250x150.png"
            alt
          >&nbsp;&nbsp;
          <span>麦宝心品</span>&nbsp;&nbsp;
          <img
            style="width:2vw;height: auto;"
            src="https://github.com/Skura23/mb-mobile-home/blob/master/src/assets/images/1.png?raw=true"
            alt
          >
        </div> -->
          <div class="_r fr">{{item.status_desc}}</div>
        </div>
        <div
          class="_m"
          v-for="(item1, index1) in item.goods"
          :key="index"
        >
          <div class="_l">
            <van-image
              width="20vw"
              height="20vw"
              fit="cover"
              style="border-radius:3vw;"
              :src="item1.goods_image[0]"
            />
          </div>
          <div class="_mid">
            <p
              class="_p0 font16"
              style="marginTop:0;"
            >{{item1.goods_name}}</p>
            <p class="_p1">{{item1.option_name}}</p>
          </div>
          <div class="_r">
            <div class="font16">￥{{item1.price}}</div>
            <div style="text-align:right;margin-top: 2.2vw;">×{{item1.num}}</div>
          </div>
        </div>
        <div class="_b">
          <div class="_b-t">
            <!-- <span>共{{item.amount}}件商品 合计：</span>￥{{item.pay_amount}} -->
            <div class="_b-t-l">
              <!-- <van-image
                round
                width="6.7vw"
                height="6.7vw"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
              /> -->
              {{item.member_name}}的订单
            </div>
            <div class="_b-t-r">
              实付 ￥<span class="font16"> {{item.real_amount}}</span>
            </div>
          </div>
          <!-- <div class="_b-b">
            <div></div>
            <div>
              <div class="u-btn _btn1">申请退款</div>
            </div>
          </div> -->
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import api from '@/api/api'
  import globals from '@/utils/globals' // get token from cookie

  import {
    ImagePreview
  } from 'vant';
  import {
    Toast
  } from 'vant';


  export default {
    data() {
      return {
        tabList: [{
            title: '全部',
            name: ''
          },
          {
            title: '待审核',
            name: 'check_pending'
          },
          {
            title: '已审核',
            name: 'checked'
          },
        ],
        keyword: '',
        dataList: [],
        active: '',
        page: 1,
        total: 0,
        listLoading: false,
        listFinished: false,
      }

    },

    computed: {},
    created() {

    },
    mounted() {

    },

    methods: {
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
        api.tms_order_refund_list({
          check_type: this.active,
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

  .app-container.page-afterSale {

    .m-card {
      box-sizing: border-box;
      padding: $cardpad;
      margin-top: 3.5vw;
    }

    ._card2 {
      ._t {
        /* display: flex;
        justify-content: space-between;
        align-items: center; */

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

            &._p0 {
              @include textoverflow(2);
            }

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
          @include flexbox();

          span {}
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