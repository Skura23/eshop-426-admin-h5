<!-- home -->
<template>
  <div class="app-container page-cashout-detail page-turnover-bill">
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="tradeType"
        :options="tradeTypeOpts"
        @change="typeOptChange"
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
        支出 ¥{{dataset.out}}, 收入 ¥{{dataset.in}}
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
          v-for="(item, index) in dataList"
          :key="index"
        >
          <div class="font16 clearfix">
            <div class="fl">{{item.remark}}</div>
            <div class="fr">{{(item.type==1?'+':'-') + item.amount}}</div>
          </div>
          <div class="font12 cl-gray mt10">{{item.add_time}}</div>
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
        tradeType: '',
        tradeTypeOpts: [{
            text: '全部交易类型',
            value: ''
          },
          {
            text: '订单',
            value: 'order'
          },
          {
            text: '提现',
            value: 'cash'
          },
        ],
        dateData: {
          minDate: new Date(2020, 0, 1),
          maxDate: new Date(2025, 10, 1),
          currentDate: new Date(),
        },
        popShow: false,

        dataList: [],
        dataset: {},
        page: 1,
        total: 0,
        listLoading: false,
        listFinished: false,
      }

    },
    filters: {
      formatDate(date) {
        let str
        return str = `${date.getFullYear()}年${date.getMonth()+1}月`
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
        api.auth_account_detail({
          page: this.page,
          order_type: this.tradeType
        }).then((res) => {
          // loadListCb(res) {
          if (res.code == 9999) {
            this.page++
            this.total = res.data.total

            this.dataList = this.dataList.concat(res.data.list)
            this.dataset = res.data

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
  .app-container.page-cashout-detail.page-turnover-bill {
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