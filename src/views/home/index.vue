<!-- home -->
<template>
  <div class="app-container page-order">
    <!-- <van-tabs @change="changeTab" v-model="active">
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.class_name"
       
        sticky
      >

      </van-tab>
    </van-tabs> -->

    <!-- <div class="mt10">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        :clearable="true"
        @clear="clearSear"
        @search="sear"
      />
    </div> -->
    <div
      class="tc bac-whi"
      style="padding:3vw"
    >全部对话</div>
    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="暂无更多数据"
      error-text="请求失败，点击重新加载"
      @load="loadList"
      class="mt5"
    >
      <div
        class="_box"
        v-for="(item, index) in dataList"
        :key="index"
        @click="toChat(item)"
      >
        <img
          :src="item.headimgurl"
          class="_ava borr"
          alt=""
        >
        <div class="_text">
          <div class="_0 font16">{{item.nick_name}}</div>
          <div class="_1 font12">
            <span
              class=""
              v-if="item.status==1"
            >[ 已读 ]</span>
            <span
              style="color:orange"
              v-if="item.status==2"
            >[ 未读 ]</span>
            {{item.info}}</div>
        </div>
        <div class="_date font12">{{item.add_time}}</div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import api from '@/api/api'
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie


  import {
    ImagePreview
  } from 'vant';
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        active: 0,
        keyword: '',
        dataList: [],
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
      toChat(item) {
        utils.jumpTo(`/home/chat?object_id=${item.object_id}`)
      },
      // clearSear() {
      //   this.changeTab()
      // },
      // sear() {
      //   this.dataList = []
      //   this.page = 1
      //   this.loadList()
      // },
      changeTab(data) {
        this.dataList = []
        this.page = 1
        this.keyword = ''
        this.loadList()
      },
      loadList() {
        api.auth_friend_list({

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

  .app-container {

    ._box {
      margin-bottom: 1.3vw;
      width: 100%;
      height: 14.7vw;
      box-sizing: border-box;
      padding: 2.5vw;
      background-color: #fff;
      @include flexbox();
      align-items: flex-start;

      ._ava {
        width: 9.3vw;
        height: 9.3vw;
      }

      ._text {
        flex: 1 1 auto;
        margin-left: 4vw;
        margin-right: 4vw;
        width: 61vw;
        @include textoverflow();
      }
    }

  }
</style>