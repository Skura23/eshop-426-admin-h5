<template>
  <div class="dialogue">
    <section class="first-page hide">
      <p>过年了，避免不了的家族聚会中，久未见面的七大姑八大姨又出现了，想要和你“唠唠嗑”</p>
      <button>点击继续</button>
    </section>
    <section class="chat-page show-selector">
      <!-- <header>
        <div class="nav-back">
          <i class="icon icon-back"></i>
          <span>微信</span>
        </div>
        <h1>小肥羊</h1>
        <div class="nav-person">
          <i class="icon icon-person"></i>
        </div>
      </header> -->
      <main id="main">
        <div class="message-list">
          <div
            class="item-wra"
            v-for="(item, index) in msgList"
            :key="index"
          >

            <div class="tc mt10">
              <van-tag
                class="auto0"
                style=""
              >{{item.add_time}}</van-tag>
            </div>

            <div :class="['message-item', `message-item--${item.my==1? 'right':'left'}`]">

              <img
                class="avatar"
                :src="item.head_img"
                alt="头像"
              >
              <div class="message-bubble">{{item.info}}</div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <!-- <i class="icon icon-voice"></i> -->
        <input
          type="text"
          class="text-input"
          v-model="message"
        >
        <!-- <i class="icon icon-face"></i>
        <i class="icon icon-plus"></i> -->
        <van-button
          type="primary"
          class="ml5"
          size="small"
          @click="send"
          :disabled="!message"
        >发送</van-button>
      </footer>
      <!-- <div class="message-select">
            <div class="message-item message-item--right js-to-select" data-score="3">
                <img class="avatar" src="http://placehold.jp/99ccff/003366/250x150.png" alt="头像">
                <div class="message-bubble">我找了份工作</div>
            </div>
            <div class="message-item message-item--right js-to-select" data-score="-2">
                <img class="avatar" src="http://placehold.jp/99ccff/003366/250x150.png" alt="头像">
                <div class="message-bubble">离你宿舍很近</div>
            </div>
            <div class="message-item message-item--right js-to-select" data-score="1">
                <img class="avatar" src="http://placehold.jp/99ccff/003366/250x150.png" alt="头像">
                <div class="message-bubble">当我开始学会做蛋饼</div>
            </div>
        </div> -->
    </section>
    <div class="cover-tips hide">
      <div class="mask"></div>
      <div class="tips-container">
        <p class="tips-text">你真棒</p>
        <div class="tips-icons">
          <i class="icon icon-replay"></i>
          <i class="icon icon-share"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /*try {

        // this.ws = new WebSocket("ws://47.98.52.136:9810");//连接服务器
        this.ws = new WebSocket("ws://121.196.223.10:9820?dispatch_id=1");//连接服务器
        // 121.196.223.10
        this.ws.onopen = function (event) {
            console.log('已连接');

            // alert("已经与服务器建立了连接\r\n当前连接状态：" + this.readyState);
        };
        this.ws.onmessage = function (event) {
            // alert("接收到服务器发送的数据：\r\n" + event.data);

            _this.wsInfo = JSON.parse(event.data);
            console.log(_this.wsInfo);
        };
        this.ws.onclose = function (event) {
            // alert("已经与服务器断开连接\r\n当前连接状态：" + this.readyState);
        };
        this.ws.onerror = function (event) {
            alert("WebSocket异常！");
        };
    } catch (ex) {
        alert(ex.message);
    }*/

  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import Vue from 'vue' // get token from cookie

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        websocket: {},
        message: '',
        msgList: []
      }

    },

    computed: {},
    created() {
      this.object_id = this.$route.query.object_id

      let createSocket = (code) => {
        var wsServer = `ws://114.55.253.19:9820?socket_code=${code}`;
        this.websocket = new WebSocket(wsServer);
        var i = 0;
        this.websocket.onopen = function (evt) {
          // this.websocket.send(i);
          console.log("Connected to WebSocket server.");
        };

        this.websocket.onclose = function (evt) {
          console.log("Disconnected");
        };

        this.websocket.onmessage = (evt) => {
          console.log('Retrieved data from server: ', evt);
          api.auth_friend_red({
            object_id: this.object_id,
          }).then((res) => {

          })
          console.log(evt.data, 'onmessage');
          let data = JSON.parse(evt.data)
          if (!(data.detail.add_time + '').includes('-')) {
            data.detail.add_time = utils.getFormattedDate(data.detail.add_time)
          }
          this.msgList.push(data.detail)

          Vue.nextTick(function () {
            // DOM 更新了
            var div = document.getElementById('main');
            div.scrollTop = div.scrollHeight - div.clientHeight;
          })
        };

        this.websocket.onerror = function (evt, e) {
          console.log('Error occured: ' + evt.data);
        };
      }

      api.auth_friend_log({
        object_id: this.object_id
      }).then((res) => {
        createSocket(res.data.socket_code)
        this.msgList = res.data.list
        Vue.nextTick(function () {
          // DOM 更新了
          var div = document.getElementById('main');
          div.scrollTop = div.scrollHeight - div.clientHeight;
        })
      })


      api.auth_friend_red({
        object_id: this.object_id
      }).then((res) => {

      })

    },
    filters: {

    },
    mounted() {},

    methods: {
      // addMsg(from) {
      //   let data = {
      //     add_time: utils.getFormattedDate(),

      //   }
      //   if (from == 'send') {

      //   }
      // },
      send() {
        this.websocket.send(this.message);
        console.log(this.message, 'send');

        api.auth_friend_log_create({
          object_id: this.object_id,
          send_info: this.message
        }).then((res) => {
          let data = res.data
          if (!(data.add_time + '').includes('-')) {
            data.add_time = utils.getFormattedDate(data.add_time)
          }
          this.msgList.push(res.data)
          Vue.nextTick(function () {
            // DOM 更新了
            var div = document.getElementById('main');
            div.scrollTop = div.scrollHeight - div.clientHeight;
          })
        })
        // this.addMsg('send')


        this.message = ''
      },
    }
  }
</script>



<style lang="scss">
  .first-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    z-index: 100;

    button {
      border: 1px solid #ccc;
      padding: 6px 20px;
      border-radius: 5px;
      margin-top: 30px;
      background: transparent;
      margin-bottom: 50px;
    }
  }

  .first-page-text {
    padding: 0 20px;
  }

  header {
    height: 44px;
    background: #2b2b2b;
    color: #fff;
    vertical-align: middle;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 100%;
  }

  header {
    .nav-back {
      height: 100%;
      line-height: 44px;
      position: relative;
      width: 66px;
      font-size: 16px;
      font-weight: lighter;
      display: flex;
      align-items: center;
      padding-left: 8px;
    }

    .icon-back {
      height: 20px;
      width: 20px;
      background-image: url('../../assets/icon/back.svg');
    }

    h1 {
      font-size: 18px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .nav-person {
      padding-right: 8px;
    }

    .icon-person {
      width: 23px;
      height: 21px;
      background-image: url('../../assets/icon/person.svg');
      float: right;
    }
  }

  main {
    font-size: 16px;
    background-color: #fff;
    position: fixed;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow-y: auto;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .message-item {
    width: 100%;
    display: flex;
    margin-top: 8px;

    .avatar {
      width: 10vw;
      height: 10vw;
      margin: 0 10px;
    }
  }

  .message-bubble,
  .message-item--left {}

  .message-item--right {
    flex-direction: row-reverse;
  }

  .message-bubble {
    border: 1px solid #ddd;
    padding: 7px 10px;
    border-radius: 3px;
    max-width: 257px;
    position: relative;
  }

  .message-item--left .message-bubble {
    background-color: #fff;

    &::before {
      content: '';
      border-top: 1px solid #ddd;
      border-left: 1px solid #ddd;
      width: 10px;
      height: 10px;
      background: #fff;
      position: absolute;
      top: 14px;
      left: -6px;
      transform: rotate(-45deg);
      border-radius: 0 0 20px 0;
    }
  }

  .message-item--right .message-bubble {
    /* background-color: #afe56e;
  border-color: #7fb25a; */
    background-color: #9fe759;
    border-color: #87cd51;

    &::before {
      content: '';
      border-top: 1px solid #87cd51;
      border-left: 1px solid #87cd51;
      width: 10px;
      height: 10px;
      background-color: #9fe759;
      position: absolute;
      top: 14px;
      right: -6px;
      transform: rotate(135deg);
      border-radius: 0 0 20px 0;
    }
  }

  footer {
    padding: 2vw;
    position: fixed;
    bottom: 0;
    height: 50px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #f5f5f7;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    .icon {
      width: 28px;
      height: 28px;
      margin-left: 10px;

      &:last-child {
        margin-right: 10px;
      }
    }

    .text-input {
      flex: 1;
      height: 26px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background: #f5f5f5;
    }

    .icon-voice {
      background-image: url('../../assets/icon/voice.svg');
    }

    .icon-plus {
      background-image: url('../../assets/icon/plus-cycle.svg');
    }

    .icon-face {
      background-image: url('../../assets/icon/smile-face.svg');
    }
  }

  .message-select {
    height: 200px;
    bottom: -200px;
    position: fixed;
    width: 100%;
  }

  .show-selector {
    footer {
      bottom: 13vw;
    }

    main {
      // bottom: 250px;
    }

    .message-select {
      bottom: 0;
    }
  }

  footer,
  main {
    transition: bottom .3s;
  }



  .message-select {
    transition: bottom .3s;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;

    .message-item {
      display: flex;
      justify-content: center;
    }
  }

  /* cover-tips */

  .cover-tips {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .mask {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 100;
  }

  .hide {
    display: none;
  }

  .tips-container {
    width: 200px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    z-index: 101;
    display: flex;
    flex-direction: column;
    transform: translateY(-10%);
    padding: 20px;
  }

  .tips-text {
    width: 100%;
    line-height: 30px;
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
  }

  .tips-icons {
    display: flex;
    justify-content: space-around;
  }

  .icon-replay,
  .icon-share {
    width: 40px;
    height: 40px;
  }

  .icon-replay {
    background-image: url('../../assets/icon/replay.svg');
  }

  .icon-share {
    background-image: url('../../assets/icon/share.svg');
  }

  .item-wra {
    .van-tag {
      background-color: #f1f1f1;
      color: #828282;
    }
  }

  .message-list {
    padding-bottom: 15vw;
  }
</style>