<template>
  <div
    class="app"
    id="app"
  >
    <TopBar
      :title="$route.meta.title"
      :name="$route.name"
      v-show="!$route.meta.noTopbar"
    ></TopBar>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- tabbar -->
    <TabBar></TabBar>

  </div>
</template>
<script>
  import Cookies from 'js-cookie'

  import utils from '@/utils/index' // get token from cookie
  import {
    getToken,
    setToken
  } from '@/utils/auth' // get token from cookie
  import globals from '@/utils/globals' // get token from cookie

  import TabBar from '@/components/TabBar'
  import TopBar from '@/components/TopBar'
  import api from '@/api/api'
  console.log(api, 'api');
  export default {
    name: 'App',
    components: {
      TabBar,
      TopBar
    },
    mounted() {
      // setTimeout(() => {
      //   console.log(this.$route.name);
      // }, 1000);
    },
    created() {
      // 如果地址栏带code参数则加上#后重新跳转

      // api.authorization({
      //   redirect_uri: '123',
      //   dealer_id: '1'
      // }).then((res) => {

      // })

      // {
      //   "apiName": "login_by_open_id",
      //   "v": "tms_login",
      //   "info": {
      //     "open_id": "oeCN0vwjvKR1EfbdnFOuSq-_8wCU",
      //     "dealer_id": 1,
      //     "factory_id": 1
      //   }
      // }


      // api.wei_xin_check_login({
      //   "root_factory_id": 1
      // }).then((res) => {
      //   console.log(res, 'login_by_open_id');
      //   // globals.userInfo = res.data.response
      //   if (res.data.shop_code == 9999) {
      //     setToken(res.data.response.token)
      //   }else if (res.data.shop_code == 3100) {
      //     // 去登录
      //   }
      // })
      // setToken('cd950abce00826a50eadabcc243a085e')

      let loginProcess = () => {
        let href = window.location.href;
        if (href.includes("?code")) {
          let arr = href.split('?')

          // 如果无#, 重新跳转到带#地址
          if (!arr[0].includes("#")) {
            arr[0] = arr[0] + '#'
            let url = location.origin + location.pathname + '#' + location.search
            window.location.href = url
          } else {
            // 如果有#, 则获取code

            let obj = utils.param2Obj(href)
            console.log(obj, 'href');
            api.wei_xin_check_login({
              root_factory_id: 1,
              wei_xin_code: obj.code,
            }).then((res) => {
              if (res.data.tms_code == 3100) {
                this.$router.push(`/login?open_id=${res.data.open_id}`)
              } else if (res.data.tms_code == 3500) {
                // 登陆成功
                setToken(res.data.response.token)
                Cookies.set('eshop-426-client-h5_userinfo', {
                  ...res.data.response,
                  open_id: res.data.response.open_id
                })
                this.$router.push({
                  path: `/login/factory-list`,
                  name: "factory-list",
                  params: {
                    list: res.data.response,
                    open_id: res.data.open_id,
                  }
                })
              } else if (res.data.code == 9999) {
                // 登陆成功
                setToken(res.data.response.token)
                console.log(res.data, 'wei_xin_check_login', 'xx');
                // alert(JSON.stringify(res.data))
                Cookies.set('eshop-426-client-h5_userinfo', {
                  ...res.data.response,
                  open_id: res.data.response.open_id
                })
                // 获取token后刷新页面, 否则会出现其他接口无token异步执行的问题
                this.$router.go(0)
              }

            })
          }

        } else {
          api.authorization({
            redirect_uri: '/',
            root_factory_id: 1,
          }).then((res) => {
            let url = res.data.url
            // url = url.replace('redirect_uri=', 'redirect_uri=http://127.0.0.1:9021')
            // url = url.replace('crm.metujia.com', '127.0.0.1:9021')
            window.location.href = url
          })
        }
      }

      if (getToken()) {
        // 根据接口返回判断token是否过期
        api.member_referrer_list({}).then((res) => {
          if (res.code == 9998) {
            loginProcess()
          }
        })
      } else {
        loginProcess()
      }

    },
  }
</script>


<style lang="scss"></style>