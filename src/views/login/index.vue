<template>
  <!-- {backgroundImage: 'url('+bgImages[0]+')'} -->
  <div class="login">
    <div class="_box tc">
      <div class="re _d _d0">
        <van-cell-group>
          <van-field
            v-model="d_form.tele"
            placeholder="请输入账号"
          />
        </van-cell-group>
      </div>
      <div class="re _d _d1 mt">
        <van-cell-group>
          <van-field
            v-model="d_form.password"
            type="password"
            placeholder="请输入密码"
          />
        </van-cell-group>
        <!-- <div
          class="u-btn v-center _vertibtn ab"
          :class="{'_dis':!f_canSendCode}"
          @click="getCode"
        >{{f_canSendCode ? '获取验证码' : codeTime+'s'}}</div> -->
      </div>
      <p class="_p1 cl-whi re">
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
        <!-- <span style="opacity: 0.5;">&nbsp;&nbsp; 我已阅读并接受</span>服务条款 -->
        <span
          class="ab _mask"
          @click="toggleRead"
        ></span>
      </p>
      <div
        class="_btn u-btn"
        @click="login"
      >登&nbsp;&nbsp;录</div>
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
    name: "Login",
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
        f_canSendCode: true
        // f_showNav: false
      };
    },
    created() {
      this.openid = this.$route.query.open_id
      console.log('created');



    },
    mounted() {
      console.log('mounted');

    },
    updated() {
      console.log('login updated');

    },
    methods: {
      // 获取验证码
      getCode() {
        if (!this.f_canSendCode) {
          return false;
        }
        // &mobile=15375222420
        if (!this.d_form.tele) {
          this.$toasted.show("请填写手机号");
          return false;
        }
        // g.$ajax
        //   .get(g.url + "&r=account.verifycode&temp=quickLogin&imgcode=0", {
        //     params: {
        //       mobile: this.d_form.tele
        //     }
        //   })
        //   .then(res => {
        //     // handle success
        //     console.log(res, "verifycode");
        //     this.disableSend();
        //     // _list = res.data.result.list;
        //     // this.d_orderList = pickData(_list);
        //     // console.log(this.d_orderList);
        //   })
        //   .catch(error => {
        //     // handle error
        //     console.log(error);
        //   })
        //   .then(() => {
        //     // always executed
        //   });
      },
      login() {
        if (!this.loginCheck()) {
          return false;
        }
        console.log(this.d_form, 'this.d_form');
        api.tms_login({
          root_factory_id: 1,
          open_id: this.openid,
          phone: this.d_form.tele,
          password: this.d_form.password,
        }).then((res) => {
          if (res.data.tms_code == 9999) {
            setToken(res.data.response.token)
            Cookies.set('eshop-426-admin-h5_userinfo', res.data.response)

            Toast({
              message: '注册成功',
              duration: 1500,
              onClose: () => {
                utils.jumpTo('/')
              }
            })
          } else if (res.data.tms_code == 3500) {
            Toast({
              message: '请选择注册门店',
              duration: 1500,
              onClose: () => {
                this.$router.push({
                  path: `./factory-list`,
                  name: "factory-list",
                  params: {
                    list: res.data.response,
                    open_id: res.data.open_id,
                  }
                })
              }
            })
          }
        })
      },
      // 切换阅读条款
      toggleRead() {
        this.d_form.read = !this.d_form.read;
      },
      loginCheck() {
        if (!this.d_form.tele) {
          Toast("请填写手机号");
        }
        // if (!this.d_form.code) {
        //   this.$toasted.show("请填写验证码");
        //   return false;
        // }
        // if (!this.d_form.read) {
        //   this.$toasted.show("请同意服务条款");
        //   return false;
        // }
        return true;
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
        }
      },
    }
  };
</script>

<style
  scoped
  lang='scss'
>
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

        &._d1 {
          ._vertibtn {
            top: 47.1%;
            right: 1vw;
            height: 8.3vw;
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
        background: #f90251;
        width: 100%;
        box-sizing: border-box;
        padding-top: 3vw;
        padding-bottom: 3vw;
      }
    }


  }
</style>