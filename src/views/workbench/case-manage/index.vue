<!-- home -->
<template>
  <div class="app-container page-case">
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
    <div class="mt10">
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

        </div>
        <div class="_btns clearfix">
          <van-row
            type="flex"
            justify="center"
            class="_row"
          >
            <van-col
              span="12"
              class="tc"
              @click="delCase(item, index)"
            >
              <van-icon name="delete" /> 删除
            </van-col>
            <span class="font16 cl-gray">|</span>
            <van-col
              span="12"
              class="tc"
              @click="editCase(item)"
            >
              <van-icon name="edit" /> 改动
            </van-col>
          </van-row>
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
        tabList: [],
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
      delCase(item, idx) {
        this.dataList.splice(idx, 1)
        api.cases_change({
          status: 2,
          case_id: item.case_id
        }).then((res) => {})
      },
      editCase(item) {
        this.$router.push(`./case-manage/modi?type=edit&case_id=${item.case_id}`)
      },
      clearSear() {
        this.changeTab()
      },
      sear() {
        this.dataList = []
        this.page = 1
        this.loadList()
      },
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
  .app-container.page-case {
    .m-postcard {
      padding-bottom: 0;
    }
  }
</style>