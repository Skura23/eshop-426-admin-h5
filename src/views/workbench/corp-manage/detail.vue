<!-- home -->
<template>
  <div class="app-container page-corp-detail">
    <div class="mt"></div>
    <van-form @submit="onSubmit">
      <div class="m-card ov">
        <div>
          <van-field
            input-align="right"
            v-model="staffData.username"
            name="姓名"
            label="姓名"
            placeholder="姓名"
            :rules="[{ required: true, message: '请填写姓名' }]"
          />

          <van-field
            input-align="right"
            v-model="staffData.phone"
            name="手机"
            label="手机"
            placeholder="手机"
            :rules="[{ required: true, message: '请填写手机' }]"
          />
          <van-field
            input-align="right"
            readonly
            clickable
            name="picker"
            :value="staffData.auth_type_text"
            label="员工属性"
            placeholder="点击选择员工属性"
            @click="showNaturePicker = true"
          />
          <van-field
            input-align="right"
            readonly
            clickable
            name="picker"
            :value="l_groupName"
            label="岗位"
            placeholder="点击选择岗位"
            @click="showPosPicker = true"
            v-if="staffData.group_id != 0"
          />
          <van-field
            input-align="right"
            name="允许分销"
            label="允许分销"
          >
            <template #input>
              <van-switch
                v-model="l_allowSplit"
                size="5vw"
              />
            </template>
          </van-field>
          <van-field
            input-align="right"
            v-model="staffData.commission_rate"
            name="分销比例"
            label="分销比例(%)"
            placeholder="分销比例(%)"
            type="number"
          />
        </div>
      </div>

      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>

    <van-popup
      v-model="showPosPicker"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="l_groupList"
        @confirm="posConfirm"
        @cancel="showPosPicker = false"
      />
    </van-popup>
    <van-popup
      v-model="showNaturePicker"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="natureList"
        @confirm="natureConfirm"
        @cancel="showNaturePicker = false"
      />
    </van-popup>

  </div>
</template>

<script>
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        showPosPicker: false,
        showNaturePicker: false,
        groupList: [],
        natureList: [{
            text: '正常员工',
            value: 'plumber'
          },
          {
            text: '水电工',
            value: 'normal'
          },
          {
            text: '设计师',
            value: 'stylist'
          },
        ],
        staffData: {},
        l_groupList: [],
        l_groupName: '',
        l_groupid: '',
        l_allowSplit: false,
        l_nature: ''
      }
    },

    computed: {},
    created() {
      this.type = this.$route.query.type
      this.auth_id = this.$route.query.auth_id
      api.h5_auth_detail({
        auth_id: this.auth_id
      }).then((res) => {
        this.staffData = res.data
        api.group_list().then((res) => {
          this.groupList = res.data.list
          console.log(this.groupList, 'this.groupList');
          this.l_groupList = this.groupList.map(v => v.group_name)
          this.modiData()
        })
      })



    },
    mounted() {},

    methods: {
      natureConfirm(val) {
        console.log(val, 'natureConfirm');
        this.staffData.auth_type = val.value
        this.staffData.auth_type_text = val.text
        this.showNaturePicker = false;
      },
      modiData() {
        this.l_allowSplit = this.staffData.is_commission == 1
        // this.l_pos = 
      },
      modiData2() {
        this.staffData.is_commission = this.l_allowSplit ? 1 : 2;
        this.staffData.group_id = this.l_groupid;
      },
      onSubmit(val) {
        this.modiData2()
        api.h5_auth_edit(this.staffData).then((res) => {
          utils.editCb(res, () => {
            console.log(this, 'editCb');
            this.$router.back()
          })
        })
      },
      posConfirm(value, idx) {
        console.log(value, idx, 'posConfirm');
        this.l_groupid = this.groupList[idx].group_id
        this.l_groupName = this.groupList[idx].group_name
        this.showPosPicker = false;
      },
    }
  }
</script>
<style
  lang="scss"
  scoped
>
  .app-container {}
</style>