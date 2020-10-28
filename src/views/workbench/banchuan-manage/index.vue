<!-- home -->
<template>
  <div class="app-container page-banchuan">
    <div class="">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        :clearable="true"
        @clear="clearSear"
        @search="sear"
      />
    </div>
    <van-list
      class="mt10"
      v-model="listLoading"
      :finished="listFinished"
      finished-text="没有更多了"
      @load="loadList"
    >
      <van-card
        num=""
        :price="item.price_show"
        :origin-price="item.market_price"
        desc=""
        :title="item.goods_name"
        :thumb="item.goods_image[0]"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <!-- <template #tags>
          <van-tag
            plain
            type="danger"
          >标签</van-tag>
          <van-tag
            plain
            type="danger"
          >标签</van-tag>
        </template> -->
        <template #footer>
          <div class="clearfix mt10">
            <div class="fl ">
              <van-switch
                v-model="item.l_putaway"
                @change="updownGoods(item)"
                size="5vw"
              />
              <span
                class="ml10"
                style="vertical-align: super;"
              >
                {{item.l_putaway?'已上架':'已下架'}}
              </span>
            </div>

            <div
              class="fr mt5"
              @click="toDetail(item)"
            >
              <span>点击编辑</span>
              <van-icon
                name="arrow"
                style="vertical-align: text-top;"
              />
            </div>

          </div>
        </template>
      </van-card>
    </van-list>

  </div>
</template>

<script>
  import {
    Toast
  } from 'vant';
  import Vue from 'vue'

  import api from '@/api/api'
  import globals from '@/utils/globals' // get token from cookie
  export default {
    data() {
      return {
        dataList: [],
        keyword: '',
        page: 1,
        total: 0,
        listLoading: false,
        listFinished: false,
      }

    },

    computed: {},
    created() {

    },
    mounted() {},

    methods: {
      toDetail(item) {
        this.$router.push(`./banchuan-manage/detail?goods_id=${item.goods_id}&type=edit`)
      },
      updownGoods(item) {
        console.log(item, 'updownGoods');
        item.putaway = item.l_putaway ? 1 : 2
        api.factory_basic_goods_putaway({
          putaway: item.putaway,
          goods_id: item.goods_id,
        }).then((res) => {

        })
        // item
      },
      localizeData() {
        for (let i = 0; i < this.dataList.length; i++) {
          let elem = this.dataList[i];
          Vue.set(elem, 'l_putaway', elem.putaway == 1)
        }
      },
      loadList() {
        api.factory_basic_goods_list({
          keywords_like: this.keyword,
          page: this.page
        }).then((res) => {
          // loadListCb(res) {
          if (res.code == 9999) {
            this.page++
            this.total = res.data.total

            this.dataList = this.dataList.concat(res.data.list)
            this.localizeData()

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
      clearSear() {
        this.dataList = []
        this.page = 1
        this.keyword = ''
        this.loadList()
      },
      sear() {
        this.dataList = []
        this.page = 1
        this.loadList()
      },
    }
  }
</script>
<style lang="scss">
  .app-container.page-banchuan {
    .van-card {
      background-color: #fff;

      .van-card__footer {
        text-align: unset;
      }

      .van-card__price {
        color: red;
      }

      .van-card__num {
        display: none;
      }
    }
  }
</style>