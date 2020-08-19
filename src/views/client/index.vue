<!-- home -->
<template>
  <div class="app-container page-client">
    <div class="">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        :clearable="true"
        @clear="clearSear"
        @search="sear"
      />

      <div class="_sort">
        <p
          class="tc bac-whi font16 bb mt10"
          style="height: 11.4vw; line-height: 11.4vw; color: rgb(119, 119, 119);"
        > 所有客户 </p>
        <!-- <div
        class=""
        style="padding: 0 2vw;height: 11.4vw; line-height: 11.4vw;"
      > -->
        <van-dropdown-menu class="re">
          <van-dropdown-item
            v-model="orderOpt"
            :options="orderOpts"
            @change="sortChange"
          />
          <div class="ab _r">共{{this.total}}名客户</div>
        </van-dropdown-menu>
        <!-- </div> -->
      </div>

      <van-list
        v-model="listLoading"
        :finished="listFinished"
        finished-text="暂无更多数据"
        @load="loadList"
        style="margin-top: 2.7vw;"
      >
        <div
          class="_card"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="_up">
            <div class="_top bb">
              最近活动：{{item.activity_time}}
            </div>
            <div
              class="_mid flex"
              @click="$router.push(`/client/detail?member_id=${item.member_id}`)"
            >
              <img
                :src="item.headimgurl"
                class="_img"
                alt=""
              >
              <div class="_r">
                <div class="">{{item.member_name}}</div>
                <div class="font12 cl-gray mt10">未关联商机阶段</div>
              </div>
            </div>
          </div>
          <div class="_bot">
            <van-row
              type="flex"
              justify="center"
              class="_row"
              @click="$router.push(`/home/chat?object_id=${item.member_id}`)"
            >
              <van-col
                span="12"
                class="tc"
              >
                <van-icon
                  name="chat-o"
                  size="5vw"
                /> 发消息
              </van-col>
              <span class="font16 cl-gray">|</span>
              <van-col
                span="12"
                class="tc"
                @click="goTel()"
              >
                <van-icon
                  name="phone-o"
                  size="5vw"
                /> <a :href="`tel:${item.phone}`">打电话</a>

              </van-col>
            </van-row>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'

  export default {
    data() {
      return {
        orderOpts: [{
            text: '正序',
            value: 'asc'
          },
          {
            text: '倒序',
            value: 'desc'
          },
          {
            text: '最后活动时间',
            value: ''
          },
        ],
        orderOpt: '',
        keyword: '',
        list: [],
        total: 0,
        page: 1,
        listLoading: false,
        listFinished: false,
      }

    },

    computed() {

    },
    created() {
      // this.getList()
    },
    mounted() {},

    methods: {
      sortChange() {
        console.log(this.orderOpt, 'orderOpt');
        this.getList(this.loadListCb)
      },
      loadList() {
        this.getList((res) => {
          // console.log(this, 'loadList');
          this.loadListCb(res)
        })
      },
      loadListCb(res) {
        if (res.code == 9999) {
          this.page++
          this.total = res.data.total

          this.list = this.list.concat(res.data.list)

          // 加载状态结束
          this.listLoading = false;

          // 数据全部加载完成
          if (this.list.length >= this.total) {
            this.listFinished = true;
          }
        }
      },
      getList(cb) {
        api.member_referrer_list({
          keywords_like: this.keyword,
          page: this.page,
          page_size: 10,
          order_sort: this.orderOpt,
          order_by: 'activity_time'
        }).then((res) => {
          cb && cb(res)
        })
      },
      clearSear() {
        this.keyword = ''
        this.page = 1
        this.list = []
        this.getList(this.loadListCb)
      },
      sear() {
        this.page = 1
        this.list = []
        this.getList(this.loadListCb)
      },
    }
  }
</script>
<style lang="scss">
  .app-container.page-client {

    ._sort {
      .van-dropdown-menu {
        height: 11.4vw;
      }

      .van-dropdown-menu__title {
        position: absolute;
        left: 0;
      }

      ._r {
        right: 2vw;
        top: 4vw;
      }
    }

    ._card {
      width: 94vw;
      margin: 0 auto;
      margin-bottom: 2.7vw;
      border-radius: 2.3vw;

      ._up {
        ._top {
          padding-left: 4vw;
          height: 11.4vw;
          line-height: 11.4vw;
        }

        ._mid {
          padding: 4vw;
          @include flexbox();
          justify-content: flex-start;

          ._img {
            width: 10.9vw;
            height: 10.9vw;
            border-radius: 1.3vw;
          }

          ._r {
            margin-left: 2vw;
          }
        }

        background-color: #fff;
      }

      ._bot {
        margin-top: 0.7vw;
        background-color: #fff;

        ._row {
          height: 11vw;
          align-items: center;

          .van-icon {
            vertical-align: bottom;
          }
        }
      }
    }
  }
</style>