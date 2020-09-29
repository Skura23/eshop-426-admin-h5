<!-- home -->
<template>
  <div class="app-container page-turnover-detail">
    <div class="m-card _d0 font14">
      <div class="tc">
        <div class="">收入累计（元）</div>
        <div class="mt10 font18 bold">{{dataset.total_finance.business}}</div>
      </div>
      <div class="_bot">
        <div class="_cell">
          <div>
            本月确认收货
          </div>
          <div class="mt10">
            ¥ {{dataset.total_finance.complete_amount}}
          </div>
        </div>
        <div class="_cell">
          <div class="">上月确认收货</div>
          <div class="mt10">¥ {{dataset.total_finance.last_complete_amount}}</div>
        </div>
        <div class="_cell">
          <div class="">待确认收货</div>
          <div class="mt10">¥ {{dataset.total_finance.un_enter_amount}}</div>
        </div>
      </div>
    </div>
    <div class="m-card _d1">
      <div class="cl-blue bold font18 _tit">今日概况</div>
      <div class="_cont">
        <div class="_cell">
          <div>今日订单金额</div>
          <div class="_1">¥{{ dataset.today_finance.order_amount }}</div>
        </div>
        <div class="_cell">
          <div>今日发货金额</div>
          <div class="_1">¥{{ dataset.today_finance.deliver_amount }}</div>
        </div>
        <div class="_cell">
          <div>今日订单完成金额</div>
          <div class="_1">¥{{ dataset.today_finance.complete_amount }}</div>
        </div>
        <div class="_cell">
          <div>今日客户佣金</div>
          <div class="_1">¥{{ dataset.today_finance.member_commission }}</div>
        </div>
        <div class="_cell">
          <div>今日水电工佣金</div>
          <div class="_1">¥{{ dataset.today_finance.plumber_commission }}</div>
        </div>
        <div class="_cell">
          <div>今日设计师佣金</div>
          <div class="_1">¥{{ dataset.today_finance.stylist_commission }}</div>
        </div>
        <div class="_cell">
          <div>今日手续费</div>
          <div class="_1">¥{{ dataset.today_finance.fee }}</div>
        </div>
        <div class="_cell">
          <div>今日收入</div>
          <div class="_1">¥{{ dataset.today_finance.business }}</div>
        </div>
      </div>
    </div>
    <div class="m-card _d1">
      <div class="cl-blue bold font18 _tit">本月概况</div>
      <div class="_cont">
        <div class="_cell">
          <div>本月订单金额</div>
          <div class="_1">¥{{dataset.month_finance.order_amount}}</div>
        </div>
        <div class="_cell">
          <div>本月发货金额</div>
          <div class="_1">¥{{dataset.month_finance.deliver_amount}}</div>
        </div>
        <div class="_cell">
          <div>本月订单完成金额</div>
          <div class="_1">¥{{dataset.month_finance.complete_amount}}</div>
        </div>
        <div class="_cell">
          <div>本月客户佣金</div>
          <div class="_1">¥{{dataset.month_finance.member_commission}}</div>
        </div>
        <div class="_cell">
          <div>本月水电工佣金</div>
          <div class="_1">¥{{dataset.month_finance.plumber_commission}}</div>
        </div>
        <div class="_cell">
          <div>本月设计师佣金</div>
          <div class="_1">¥{{dataset.month_finance.stylist_commission}}</div>
        </div>
        <div class="_cell">
          <div>本月手续费</div>
          <div class="_1">¥{{dataset.month_finance.fee}}</div>
        </div>
        <div class="_cell">
          <div>本月收入</div>
          <div class="_1">¥{{dataset.month_finance.business}}</div>
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
        dataset: {
          month_finance: {},
          today_finance: {},
          total_finance: {}
        },
      }

    },

    computed: {},
    created() {
      api.factory_finance({}).then((res) => {
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
  .app-container.page-turnover-detail {
    .m-card {
      border-radius: 0;
      margin-top: 3vw;
    }

    ._d0 {
      padding: 8.1vw 3vw;
      margin-top: 3vw;

      ._bot {
        margin-top: 6vw;

        ._cell {
          display: inline-block;
          width: 33%;
          border-left: 1px solid #dad5d5;
          text-align: center;

          &:first-child {
            border-left: none;
          }
        }
      }
    }

    ._d1,
    ._d2 {
      ._tit {
        padding: 3.2vw;
        padding-bottom: 0;
      }

      ._cont {
        padding: 5.8vw;

        ._cell {
          font-size: 3.7vw;
          display: inline-block;
          width: 50%;
          margin-bottom: 8vw;

          &:nth-child(7),
          &:nth-child(8) {
            margin-bottom: 0;
          }

          ._1 {
            font-size: 5.6vw;
            font-weight: bold;
            margin-top: 2vw;
            color: $cl-blue;
          }
        }
      }
    }
  }
</style>