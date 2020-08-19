<!-- home -->
<template>
  <div class="app-container page-selfrun-class">
    <!-- <div class="">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        :clearable="true"
        @clear="clearSear"
        @search="sear"
      />
    </div> -->

    <div class="_classes">
      <van-tree-select
        :items="items"
        :active-id.sync="activeId"
        :main-active-index.sync="activeIndex"
        @click-item='selClass'
      />
    </div>
  </div>
</template>

<script>
  import _ from "lodash";

  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        items: [],
        activeId: '',
        activeIndex: '',
        prevPage: {},
      }
    },

    computed: {},
    created() {
      let {
        class_1,
        class_2,
        page: prevPage
      } = this.$route.params
      this.prevPage = prevPage
      api.h5_use_class_list({}).then((res) => {
        this.items = res.data
        // this.item.forEach(element => {
        //   if (element.children) {
        //     element.children = utils.renameKeyName(element.children, 'value', 'id')
        //   }
        // });
        console.log(this.items, 'h5_use_class_list');

        this.activeIndex = this.items.findIndex(p => p.id == class_1)
        this.activeId = class_2
      })
    },
    mounted() {},

    methods: {
      selClass(ev) {
        console.log(this.prevPage.temp, 'selClass');
        this.prevPage.temp.class_id = [this.items[this.activeIndex]['id'], this.activeId]
        this.prevPage.temp.class_name = this.items[this.activeIndex].text+'-'+ev.text
        this.$router.back()
      },
    }
  }
</script>
<style
  lang="scss"
  scoped
>
  .app-container.page-selfrun-class {}
</style>