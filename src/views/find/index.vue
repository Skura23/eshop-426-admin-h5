<!-- home -->
<template>
  <div class="app-container page-find">
    <img
      :src="require('@/assets/imgs/78.png')"
      width="100%"
      alt=""
    >
    <van-tabs @change="changeTab" v-model="active">
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.class_name"
        
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
        class="m-postcard"
        style="margin-top:5px;"
        v-for="(item,index) in dataList"
        :key="index"
      >
        <p class="_tit">
          <van-image
            round
            width="10vw"
            height="10vw"
            fit="cover"
            class="_img"
            :src="item.logo"
          />
          {{item.factory_name}}
        </p>
        <div class="mt _cont">
          <div class="_0">
            {{item.content}}
          </div>
          <div class="_1">
            <van-image
              width="23.3vw"
              height="23.3vw"
              style="margin-right:0.5vw;margin-bottom:0.5vw;"
              fit="cover"
              class="_img"
              :src="item1"
              v-for="(item1, index) in item.image"
              :key="index"
              @click="prevImg(item.image, index)"
            />

          </div>
          <div class="_2 clearfix">
            <div class="fl">
              <van-image
                round
                width="6vw"
                height="6vw"
                fit="cover"
                class="re _img"
                :style="{left: index!=0 && -6*+'px'}"
                :src="item.headimgurl"
                v-for="(item, index) in item.like_top_10"
                :key="index"
              />
              <span style="vertical-align: super;" v-if="item.like_num != 0">{{item.like_num}}人赞</span>
            </div>
            <div class="fr">

              <van-icon
                name="good-job"
                :color="item.is_like==0?'#9d9d9d':'red'"
                class="font16 ml5"
                @click="like(item)"
              />
              <van-icon
                name="share"
                class="font16 ml5"
              />
            </div>
          </div>
        </div>
        <div class="_comments borr clearfix mt10">
          <div
            v-for="(item, index) in item.comment_top_5"
            :key="index"
          >
            <span class="_name">{{item.object_name}}:</span>
            <span class="_cont ml5 ">{{item.comment}}</span>
          </div>
          <div
            class="_more"
            v-if="item.comment_surplus != 0"
            @click="showMoreComment(item)"
          >
            查看剩余{{item.comment_surplus}}条评论
          </div>
        </div>

        <div class="_add">
          <van-field
            v-model="item.l_comment"
            class="bb"
            center
            autosize
            type="textarea"
            row="1"
            label-width="7.5vw"
            placeholder="添加你的评论..."
          >
            <template #label>
              <van-image
                round
                width="6vw"
                height="6vw"
                fit="cover"
                class="re _img"
                style="left:-6px"
                src=""
              />
            </template>
            <template #button>
              <van-button
                size="small"
                type="primary"
                @click="addComment(item)"
                :disabled="item.l_dised"
              >发送</van-button>
            </template>
          </van-field>
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
        comment: '',
        tabList: [{
          class_name: '最新',
          class_id: 0
        }],
        keyword: '',
        dataList: [],
        active: 0,
        page: 1,
        total: 0,
        listLoading: false,
        listFinished: false,
      }

    },

    computed: {},
    created() {
      api.case_class_list({}).then((res) => {
        this.tabList = this.tabList.concat(res.data.list)
      })
    },
    mounted() {

    },

    methods: {
      prevImg(imgs, index) {
        ImagePreview({
          images: imgs,
          startPosition: index,
          onClose() {
            // do something
          },
        });
      },
      changeTab(data) {
        this.dataList = []
        this.page = 1
        this.loadList()
      },
      like(item) {

        api.auth_cases_like({
          case_id: item.case_id
        }).then((res) => {
          item.is_like = item.is_like == 0 ? 1 : 0
        })
      },
      showMoreComment(item) {
        api.cases_comment_list({
          case_id: item.case_id
        }).then((res) => {
          item.comment_top_5 = res.data.list
          item.comment_surplus = 0
        })
      },
      addComment(item) {
        item.l_dised = true
        api.auth_case_comment({
          case_id: item.case_id,
          comment: item.l_comment
        }).then((res) => {
          item.l_dised = false
          if (res.code == 9999) {
            console.log(globals, 'globals');
            Toast.success('评论成功');
            item.comment_top_5.unshift({
              object_name: globals.userInfo.username,
              comment: item.l_comment
            })
          } else {
            Toast.fail('评论失败');
          }
        })
      },
      loadList() {
        api.find_cases_list({
          class_id: this.active
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
  .app-container.page-find {
    .van-tab--active {
      font-size: 4.3vw;
    }

    .m-postcard {
      padding-bottom: 3.6vw;

      ._comments {
        padding: 3.3vw 4.3vw;
        background-color: #f5f5f5;

        div {
          margin-bottom: 2vw;

          &:last-child {
            margin-bottom: 0;

          }
        }

        ._name {
          color: #6d8090;
        }

        ._more {
          color: #9d9d9d;
        }
      }

      ._add {
        ._img {
          border: 1px solid #fff;
        }

        .van-cell {
          align-items: start;
        }
      }
    }
  }
</style>