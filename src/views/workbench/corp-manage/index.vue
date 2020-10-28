<template>
  <div class="app-container">
    <p
      style="height:8.8vw;line-height:8.8vw;color:#777777;"
      class="tc bac-whi font16"
    >
      门店员工列表
    </p>
    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="暂无更多数据"
      error-text="请求失败，点击重新加载"
      @load="loadList"
    >
      <div
        class="m-card m-card-corp"
        v-for="(item, idx) in dataList"
        :key="idx"
      >
        <div>{{idx+1}}</div>
        <div>
          <van-image
            width="10.9vw"
            height="10.9vw"
            :src="item.headimgurl"
            radius="10"
            fit="cover"
          />
        </div>
        <div style="width:54vw;">
          <div>
            <span class="font16">{{item.username}}</span> &nbsp;
            <!-- <span class="font10 cl-gray ">{{item.desc}}</span> -->
          </div>
          <div class="mt10 cl-gray">
            {{item.group_name}} 电话:{{item.phone}}
          </div>
        </div>
        <div>
          <div>
            <van-button
              type="primary"
              round
              size="mini"
              class="btn-blue"
              @click="lockOrUnlock(item)"
            >{{item.status==1?'冻结':'恢复'}}</van-button>
          </div>
          <div class="mt5">
            <van-button
              type="primary"
              round
              size="mini"
              class="btn-blue"
              :disabled="item.status==2"
              @click="edit(item)"
            >修改</van-button>
          </div>
        </div>
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
      console.log(this.$route, 'corp-mana');
    },

    methods: {
      edit(item) {
        this.$router.push(`./corp-manage/detail?type=edit&auth_id=${item.auth_id}`)
      },
      lockOrUnlock(item) {
        api.auth_change_status({
          auth_id:item.auth_id,
          status:item.status==1?2:1
        }).then((res) => {
          utils.editCb(res,() => {
            this.page = 1
            this.dataList = []

            this.loadList()
          })
        })
      },
      loadList() {
        api.h5_this_auth_list({
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

  .app-container {

    .m-card-corp {
      display: flex;
      @include flexbox();
      padding: 3.5vw;
      box-sizing: border-box;
      margin-top: 3.5vw;
    }
  }
</style>