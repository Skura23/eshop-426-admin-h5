<!-- home -->
<template>
  <div class="app-container page-banchuan-detail font14">
    <van-swipe
      :loop="false"
      :width="'100vw'"
      :height="'100vw'"
    >
      <van-swipe-item
        v-for="(item, index) in goodsData.goods_image"
        :key="index"
      >
        <van-image
          :width="'100vw'"
          :height="'100vw'"
          fit="cover"
          :src="item"
        />
      </van-swipe-item>

    </van-swipe>
    <div class="_meta">
      <div class=" _price ov">
        <span>
          <van-icon name="edit" />
        </span>&nbsp;&nbsp;
        <span style="color:red">￥</span>&nbsp;&nbsp;
        <span
          class="font20"
          style="color:red"
        >{{goodsData.market_price}}</span>&nbsp;&nbsp;
        <span>价格</span>
      </div>
      <div class="mt10 font16">
        {{goodsData.goods_name}}
      </div>
    </div>
    <div
      class="_detail"
      v-html="goodsData.l_cont"
      style=""
    ></div>

    <div class="_editbtn tc">
      <van-button
        round
        type="info"
        size="small"
        style="width:75%"
        @click="showPop"
      >
        {{goodsData.putaway==1?'编辑价格':'立即上架'}}
      </van-button>
    </div>

    <van-popup
      v-model="popShow"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div
        class="_panel"
        v-if="goodsData.is_spec==1"
      >
        <div class="_t">
          <van-image
            :width="'30.5vw'"
            :height="'30.5vw'"
            fit="cover"
            :src="goodsData.goods_image[0]"
          />
          <div class="_guide ml10">
            <div>官方指导</div>
            <div
              style="color:red "
              class="mt5 "
            >售价：￥{{goodsData.official_price}}</div>
            <div class=" mt5">客户推广佣金：￥{{goodsData.official_member_commission}}</div>
            <div class="mt5">水电推广佣金：￥{{goodsData.official_plumber_commission}}</div>
            <div class="mt5">设计师推广佣金：￥{{goodsData.official_stylist_commission}}</div>
          </div>
        </div>
        <p class="font16">
          规格:
        </p>
        <div class="_m mt10">

          <div
            class="_row"
            v-for="(item, index) in goodsData.option_list"
            :key="index"
          >
            <van-row>
              <van-col
                span="6"
                class="tc"
              >
                <span
                  style=""
                  class="_lab i-b"
                >{{item.option_name}}</span>
              </van-col>
              <van-col span="9">
                <div></div>
                <div
                  style="color:red "
                  class="mt5 "
                >售价：￥{{item.official_price}}</div>
                <div class=" mt5">客户推广佣金：￥{{item.official_member_commission}}</div>
                <div class=" mt5">水电推广佣金：￥{{item.official_plumber_commission}}</div>
                <div class=" mt5">设计师推广佣金：￥{{item.official_stylist_commission}}</div>
              </van-col>
              <van-col span="9">
                <div>本店设置</div>
                <div
                  style="color:red "
                  class="mt5 "
                >售价: <input
                    type="text"
                    placeholder=""
                    v-model="item.price"
                  ></div>
                <div class=" mt5">
                  <input
                    type="text"
                    placeholder=""
                    v-model="item.member_commission"
                  >
                </div>
                <div class=" mt5">
                  <input
                    type="text"
                    placeholder=""
                    v-model="item.plumber_commission"
                  >
                </div>
                <div class=" mt5">
                  <input
                    type="text"
                    placeholder=""
                    v-model="item.stylist_commission"
                  >
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
        <div class="_b">
          <van-button
            size="small"
            type="info"
            @click="save"
          >保 存</van-button>
          <van-button
            size="small"
            type="info"
            @click="updownGoods()"
          >{{goodsData.putaway==1?'下':'上'}} 架</van-button>
        </div>
      </div>
      <div
        class="_panel"
        v-if="goodsData.is_spec==2"
      >
        <div class="_t">
          <van-image
            :width="'30.5vw'"
            :height="'30.5vw'"
            fit="cover"
            :src="goodsData.goods_image[0]"
          />

        </div>

        <div class="_m mt10">

          <div class="_row">
            <van-row gutter="1vw"> 
              <van-col
                span="12"
                class=""
              >
                <div>官方指导</div>
                <div
                  style="color:red "
                  class="mt10 "
                >售价：￥{{goodsData.official_price}}</div>
                <div class="mt10 ">客户推广佣金：￥{{goodsData.official_member_commission}}</div>
                <div class="mt10 ">水电推广佣金：￥{{goodsData.official_plumber_commission}}</div>
                <div class="mt10 ">设计师推广佣金：￥{{goodsData.official_stylist_commission}}</div>
              </van-col>
              <van-col span="12">
                <div>本店设置</div>
                <div
                  style="color:red "
                  class="mt10 "
                >
                  售价: <input
                    type="text"
                    placeholder=""
                    v-model="goodsData.price"
                  >
                </div>
                <div class="mt10 ">
                  客户推广佣金: <input
                    type="text"
                    placeholder=""
                    v-model="goodsData.member_commission"
                  >
                </div>
                <div class="mt10 ">
                  水电推广佣金: <input
                    type="text"
                    placeholder=""
                    v-model="goodsData.plumber_commission"
                  >
                </div>
                <div class="mt10 ">
                  设计师推广佣金: <input
                    type="text"
                    placeholder=""
                    v-model="goodsData.stylist_commission"
                  >
                </div>
              </van-col>

            </van-row>
          </div>
        </div>
        <div class="_b">
          <van-button
            size="small"
            type="info"
            @click="save"
          >保 存</van-button>
          <van-button
            size="small"
            type="info"
            @click="updownGoods()"
          >{{goodsData.putaway==1?'下':'上'}} 架</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import globals from '@/utils/globals' // get token from cookie


  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        type: '',
        goodsData: {
          goods_image: []
        },
        popShow: true
      }

    },

    computed: {},
    created() {
      this.type = this.$route.query.type
      this.goods_id = this.$route.query.goods_id
      api.factory_goods_detail({
        goods_id: this.goods_id
      }).then((res) => {
        this.goodsData = res.data
        this.unescapeCont()
      })
    },
    mounted() {},

    methods: {
      save() {
        api.factory_basic_goods_price_update(this.goodsData).then((res) => {
          Toast({
            message: res.info,
            onClose() {

            },
          })
        })
      },
      updownGoods() {
        let putaway = this.goodsData.putaway
        api.factory_basic_goods_putaway({
          goods_id: this.goodsData.goods_id,
          putaway: putaway == 1 ? 2 : 1,
        }).then((res) => {
          Toast(res.info)
          if (res.code == 9999) {
            this.goodsData.putaway = putaway == 1 ? 2 : 1
          }
        })
      },
      showPop() {
        this.popShow = true
      },
      unescapeCont() {
        let _cont = this.goodsData.goods_text;
        _cont = _cont
          .replace(_cont ? /&(?!#?\w+;)/g : /&/g, "&amp;")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&nbsp;/g, "");
        this.$set(this.goodsData, 'l_cont', _cont)
      }
    }
  }
</script>
<style lang="scss">
  .app-container.page-banchuan-detail {
    .van-col--12 {
      width: 50%;
      // padding: 0 4.5vw;
      div{
        height: 5.3vw;
        line-height: 5.3vw;
        input{
          width: 14.5vw;
          height: 4vw;
        }
      }
    }

    .van-swipe-item {
      height: 100vw;
    }

    ._detail img {
      width: 100%;
    }

    ._meta {
      padding: 5.3vw 3.2vw;
      background-color: #fff;
    }

    ._editbtn {
      box-sizing: border-box;
      width: 100%;
      background-color: #fff;
      position: fixed;
      bottom: 50px;
      padding: 2.4vw 12vw;
    }

    ._panel {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 3vw;

      ._lab {
        margin-top: 2vw;
        padding: 2vw 2.8vw;
        border-radius: 1.3vw;
        background-color: #f6f6f6;
      }

      ._t {
        @include flexbox();
        justify-content: flex-start;
      }

      ._m {
        border-top: 1px solid #ffeaea;
        border-bottom: 1px solid #ffeaea;
        // height: 50vw;
        overflow-y: scroll;

        ._row {
          padding: 3.5vw 2.5vw;
          border-bottom: 1px solid #ffeaea;
          // input {
          //   width: 27.6vw;
          //   height: 3.9vw;
          // }
        }
      }

      ._b {
        margin-top: 3.2vw;
        @include flexbox();
        justify-content: space-evenly;
      }
    }
  }
</style>