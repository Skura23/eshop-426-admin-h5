<!-- home -->
<template>
  <div class="app-container page-cashout-detail">
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="tradeType"
        :options="tradeTypeOpts"
      />
    </van-dropdown-menu>
    <div class="_1">

    </div>
    <div class="_2 bb">
      <div
        class="_2_0 font16"
        @click="popShow=true"
      >
        {{dateData.currentDate|formatDate}}
        <van-icon name="arrow-down" />
      </div>
      <div class="_2_1 mt10 font12 cl-gray">
        支出¥1110.63 收入¥8769.77
      </div>
    </div>
    <div class="_3">
      <van-list
        v-model="listLoading"
        :finished="listFinished"
        finished-text="暂无更多数据"
        error-text="请求失败，点击重新加载"
        @load="loadList"
      >
        <div
          class="_card bb"
          v-for="(item, index) in 3"
          :key="index"
        >
          <div class="font16 clearfix">
            <div class="fl">扫二维码付款-某某店</div>
            <div class="fr">-20.00</div>
          </div>
          <div class="font12 cl-gray mt10">4月27日 08:55</div>
        </div>
      </van-list>
    </div>

    <van-popup v-model="popShow">
      <van-datetime-picker
        :value="dateData.currentDate"
        @confirm="confirmDate"
        @cancel="popShow=false"
        type="year-month"
        title="选择年月"
        :min-date="dateData.minDate"
        :max-date="dateData.maxDate"
        :formatter="formatter"
      />
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
        tradeType: 0,
        tradeTypeOpts: [{
            text: '全部商品',
            value: 0
          },
          {
            text: '新款商品',
            value: 1
          },
          {
            text: '活动商品',
            value: 2
          },
        ],
        dateData: {
          minDate: new Date(2020, 0, 1),
          maxDate: new Date(2025, 10, 1),
          currentDate: new Date(),
        },
        popShow: false,

        dataList: [],
        page: 1,
        total: 0,
        listLoading: false,
        listFinished: false,
      }

    },
    filters: {
      formatDate(date) {
        let str
        return str = `${date.getFullYear()}年${date.getMonth()}月`
      },
    },
    computed: {

    },
    created() {

    },
    mounted() {},

    methods: {
      confirmDate(val) {
        this.popShow = false;
        this.dateData.currentDate = val
      },
      typeOptChange(val) {
        this.page = 1
        this.dataList = []
        this.loadList()
      },
      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`;
        }
        return val;
      },
      loadList() {
        api.find_cases_list({
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
  .app-container.page-cashout-detail {
    background-color: #fff;

    ._2 {
      padding: 3.9vw;
    }

    ._3 {
      padding: 0 9.6vw;

      ._card {
        padding: 6vw 0;
      }
    }
  }
</style>