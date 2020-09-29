<!-- home -->
<template>
  <div :class="['app-container', active==0 && 'whi-bg','page-client-detail']">
    <van-tabs v-model="active">
      <van-tab
        title="互动"
        style="padding:4vw"
      >
        <el-timeline>
          <el-timeline-item
            placement="top"
            v-for="(activity, index) in list"
            :key="index"
            :timestamp="activity.add_time_desc"
          >
            {{activity.log_detail}}
          </el-timeline-item>
        </el-timeline>
      </van-tab>
      <van-tab
        title="资料"
        class="_detail"
      >
        <div class="mt"></div>
        <div class="m-card ov">
          <div>
            <div class="_top">
              <img
                class="bor99"
                :src="info.headimgurl"
                alt=""
                style="width:10vw;height:10vw;"
              >
              <span class="ml10">
                {{info.member_name}}
              </span>

            </div>
            <div class="">
              <van-cell-group>
                <van-field
                  v-model="info.member_name"
                  label="姓名"
                  placeholder="请输入姓名"
                />
                <van-field
                  v-model="info.phone"
                  label="授权手机"
                  placeholder="请输入手机号"
                />
                <van-field
                  v-model="location"
                  label="地区"
                  placeholder="选择地区"
                  @click="areaPopshow=true"
                  class=""
                />
                <van-field
                  v-model="info.address_info.area_detail"
                  label="详细地址"
                  placeholder="请输入地址"
                />
              </van-cell-group>
            </div>
          </div>
        </div>
        <div class="tc">
          <van-button
            type="info"
            class="mt"
            style="width:94vw"
            @click="save"
          >保 存</van-button>

        </div>
      </van-tab>
    </van-tabs>

    <van-popup
      v-model="areaPopshow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-area
        title=""
        :area-list="areaList"
        @confirm="setArea"
        @cancel="areaPopshow=false"
      />
    </van-popup>
  </div>
</template>

<script>
  import api from '@/api/api'
  import areaList from '@/utils/area' // get token from cookie
  import utils from '@/utils/index' // get token from cookie


  export default {
    data() {
      return {
        active: 0,
        member_id: '',
        list: [],
        info: {
          address_info: {

          }
        },
        areaCodes: {},
        areaList,
        areaPopshow: false,
        location: '',
      }

    },

    computed: {},
    created() {
      this.member_id = this.$route.query.member_id
      api.member_dealer_log({
        member_id: this.member_id
      }).then((res) => {
        this.list = res.data.list
      })

      api.member_detail({
        member_id: this.member_id
      }).then((res) => {
        this.info = res.data
        if (!this.info.address_info) {
          this.info.address_info = {}
        } else {
          this.areaCodes = this.info.address_info
          this.location = this.info.address_info.province_name +
            this.info.address_info.city_name +
            this.info.address_info.area_name
        }
      })
    },
    mounted() {},

    methods: {
      setArea(data) {
        console.log(data, 'setArea');
        this.areaCodes = {
          province_id: data[0].code,
          area_id: data[1].code,
          city_id: data[2].code,
        }
        let str = ""
        for (let i = 0; i < data.length; i++) {
          const elem = data[i];
          str += elem.name
        }
        this.location = str
        this.areaPopshow = false
      },
      save() {
        api.member_edit({
          member_id: this.member_id,
          member_name: this.info.member_name,
          address_info: {
            ...this.areaCodes,
            area_detail: this.info.address_info.area_detail,
          }

        }).then((res) => {
          utils.editCb(res, () => {
            this.$router.go(-1)
          })
        })
      },
    }
  }
</script>
<style lang="scss">
  .app-container.page-client-detail {
    min-height: 100vh;

    &.whi-bg {
      background-color: #fff;
    }

    .el-timeline-item__content {
      padding: 4vw;
      background-color: #f1f1f1;
      border-radius: 1.3vw;
    }

    ._detail {
      ._top {
        @include flexbox();
        padding: 10px 16px;
        justify-content: flex-start;
      }
    }
  }
</style>