<template>
  <div>
    <van-tabbar
      fixed
      route
    >
      <van-tabbar-item
        to="/"
        icon="chat-o"
      >
        消息
      </van-tabbar-item>
      <van-tabbar-item
        to="/client"
        icon="friends-o"
      >
        客户
      </van-tabbar-item>
      <van-tabbar-item
        to="/workbench/home"
        icon="chart-trending-o"
        v-show="showWorkbench"
      >
        工作台
      </van-tabbar-item>
      <van-tabbar-item
        to="/find"
        icon="browsing-history-o"
      >
        发现
      </van-tabbar-item>
      <van-tabbar-item
        to="/my"
        icon="user-o"
      >
        我的
      </van-tabbar-item>
    </van-tabbar>
    <!--  <van-tabbar fixed v-model="active" @change="onChange">
      <van-tabbar-item  to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item  to="/about" icon="user-o">关于我</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: 'TabBar',
    data() {
      return {
        active: 0,
        showWorkbench: true,
      }
    },
    created() {
      api.tms_auth_rule({}).then((res) => {
        if (res.data.length==0) {
          this.showWorkbench = false
        }
      })
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>