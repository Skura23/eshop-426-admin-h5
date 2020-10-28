<template>
  <!-- {backgroundImage: 'url('+bgImages[0]+')'} -->
  <div class="login">
    <div class="_box tc">
      <div class="re _d _d0">
        <van-cell-group>
          <van-field
            v-model="d_form.tele"
            placeholder="请输入手机号"
            :border="true"
          >
            <template #left-icon>
              <img
                src="@/assets/imgs/86.png"
                class="_i"
                alt=""
              >
            </template>
          </van-field>
        </van-cell-group>
      </div>
      <div class="re _d _d2 mt">
        <van-cell-group>
          <van-field
            v-model="imgCode"
            placeholder="请输入图形验证码"
          >
            <template #left-icon>
              <img
                src="@/assets/imgs/87.png"
                class="_i"
                alt=""
              >
            </template>
          </van-field>
        </van-cell-group>
        <div
          class="v-center _vertibtn ab"
          :class="{'_dis':!f_canSendCode}"
          @click="updCodeImgUrl"
        >
          <img
            :src="codeImgUrl"
            @click="updCodeImgUrl"
            alt=""
          >
        </div>
      </div>
      <div class="re _d _d1 mt">
        <van-cell-group>
          <van-field
            v-model="d_form.code"
            placeholder="请输入短信验证码"
          >
            <template #left-icon>
              <img
                src="@/assets/imgs/87.png"
                class="_i"
                alt=""
              >
            </template>
          </van-field>
        </van-cell-group>
        <div
          class="u-btn v-center _vertibtn ab"
          :class="{'_dis':!f_canSendCode}"
          @click="getCode"
          style="background-color: transparent;
            border: 1px solid #ff7728;color: #ff7728;"
        >{{f_canSendCode ? '获取验证码' : codeTime+'s'}}</div>
      </div>
      <p class="_p1 cl-whi re mt10">
        &nbsp;&nbsp;
        <img
          src=""
          v-show="!d_form.read"
          alt
        >
        <img
          src=""
          v-show="d_form.read"
          alt
        >
        <!-- <span
          style="opacity: 0.5;color: #535353"
          class=" i-b"
        >
          <van-checkbox
            v-model="readChecked"
            icon-size="3.5vw"
          >&nbsp;&nbsp; 我已阅读并接受服务条款</van-checkbox>
        </span> -->
        <!-- <span
          class="ab _mask"
          @click="toggleRead"
        ></span> -->
      </p>
      <div
        class="_btn u-btn"
        @click="login"
      >绑&nbsp;&nbsp;定</div>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'

  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import {
    setToken
  } from '@/utils/auth' // get token from cookie

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    name: "cashoutbind",
    data() {
      return {
        openid: '',
        chosenFacId: '',
        // data
        // form data
        d_form: {
          tele: "",
          code: "",
          read: false
        },
        codeTime: 60,
        timer: {},
        // flag
        f_canSendCode: true,
        codeImgUrl: '',
        imgCode: '',
        codeImgSuffix: '',
        readChecked: false,
        // f_showNav: false
      };
    },
    created() {
      this.openid = this.$route.query.open_id
      if (!this.openid) {
        this.openid = Cookies.get('eshop-426-client-h5_userinfo').open_id
      }
      console.log('created');


    },
    mounted() {
      console.log('mounted');
      this.updCodeImgUrl()
    },
    updated() {
      console.log('login updated');

    },
    methods: {
      updCodeImgUrl() {
        this.codeImgSuffix = parseInt(Math.random() *
          1000000)
        this.codeImgUrl = globals.curBaseUrl + '/verification_code_cache?image_code=' + this.codeImgSuffix
      },
      // 获取验证码
      getCode() {
        if (!this.f_canSendCode) {
          return false;
        }
        // &mobile=15375222420
        if (!this.d_form.tele) {
          Toast("请填写手机号");
          return false;
        }
        if (!this.imgCode) {
          Toast("请输入图形验证码");
          return false;
        }

        api.send_phone_message({
          verify_code: this.imgCode,
          image_code: this.codeImgSuffix,
          phone: this.d_form.tele,
          root_factory_id: 1,
        }).then((res) => {
          console.log(res, "verifycode");
          if (res.code == 9999) {
            this.disableSend();
            // this.updCodeImgUrl()
          } else {
            Toast(res.info)
          }
        })

      },
      login() {
        if (!this.loginCheck()) {
          return false;
        }
        api.bind_shop({
          phone: this.d_form.tele,
          phone_code: this.d_form.code
        }).then((res) => {
          utils.editCb(res, () => {
            this.$router.back()
          })
        })
      },
      // 切换阅读条款
      toggleRead() {
        this.d_form.read = !this.d_form.read;
      },
      loginCheck() {
        if (!this.d_form.tele) {
          Toast("请填写手机号");
          return false;
        }
        if (!this.imgCode) {
          Toast("请填写图形验证码");
          return false;
        }
        if (!this.d_form.code) {
          Toast("请填写短信验证码");
          return false;
        }
        // if (!this.readChecked) {
        //   Toast("请接受服务条款");
        //   return false;
        // }
        return true
        // if (!this.d_form.read) {
        //   this.$toasted.show("请同意服务条款");
        //   return false;
        // }
      },
      // 禁用验证码发送
      disableSend() {
        this.f_canSendCode = false;
        this.timer = setInterval(() => {
          this.codeTime--;
        }, 1000);
      }
    },

    watch: {
      codeTime(newVal, oldVal) {
        // ...
        if (newVal == 0) {
          clearInterval(this.timer);
          this.f_canSendCode = true;
          this.codeTime = 60
        }
      },
      chosenFacId(newVal, oldVal) {
        if (newVal) {
          console.log(this.chosenFacId, 'this.chosenFacId');
          api.factory_register({
            open_id: this.openid,
            root_factory_id: 1,
            phone: this.d_form.tele,
            factory_id: this.chosenFacId,
            phone_code: this.d_form.code
          }).then((res) => {
            if (res.code == 9999) {
              setToken(res.data.response.token)
              Cookies.set('eshop-426-client-h5_userinfo', res.data.response)
              Toast({
                message: '登录成功!',
                duration: 1200,
                onClose: () => {
                  this.$router.replace(`/mall`)
                }
              })
            } else {
              Toast(res.info)
            }
          })
        }
      }
    }
  };
</script>

<style
  scoped
  lang='scss'
>
  .login {
    input::placeholder {
      color: #535353;
    }

  }


  $mt: 3vw;

  .mt {
    margin-top: $mt;
  }

  .login {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center top;
    left: 0;
    top: 0;

    ._i {
      width: 5vw;
    }

    .van-cell-group,
    .van-cell {
      background-color: transparent;
    }

    .van-hairline--top-bottom::after {
      border-bottom: 1px solid #bbbaba;
    }

    ._box {
      width: 77vw;
      margin: 0 auto;
      margin-top: 31vw;

      ._d {
        input {
          all: unset;
          position: absolute;
          left: 20%;
          top: 48%;
          transform: translateY(-50%);
          text-align: left;
          color: #fff;
        }

        &._d2 {
          ._vertibtn {

            font-size: 0;
            right: 0;
            height: 100%;
            width: 30vw;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        &._d1 {
          ._vertibtn {
            top: 47.1%;
            right: 1vw;
            height: 5.3vw;
            background: #fff;
            border: none;
            padding-left: 4vw;
            padding-right: 4vw;

            &._dis {
              color: #c1b9b9;
            }
          }

          input {
            top: 49%;
          }
        }

        ::placeholder {
          /* Most modern browsers support this now. */
          /* color: #fff; */
        }
      }

      ._p1 {
        text-align: left;

        ._mask {
          width: 100%;
          height: 100%;
          display: block;
          left: 0;
          top: 0;
        }

        img {
          width: 4.4vw;
          vertical-align: bottom;
        }
      }

      ._btn {
        margin-top: 13.3vw;
        font-size: 4.8vw;
        color: #fff;
        background: #447ABF;
        width: 100%;
        box-sizing: border-box;
        padding-top: 3vw;
        padding-bottom: 3vw;
      }
    }
  }
</style>