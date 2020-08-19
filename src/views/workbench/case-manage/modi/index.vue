<!-- home -->
<template>
  <div class="app-container page-case-modi">
    <div class="_wra bac-whi">
      <div class="clearfix">
        <div
          class="fl font16"
          @click="cancelModi"
        >取消</div>
        <div class="fr">
          <van-button
            type="primary"
            size="small"
            class="btn-blue"
            @click="submit"
          >发 布</van-button>
        </div>
      </div>

      <van-field
        v-model="message"
        rows="3"
        autosize
        label=""
        type="textarea"
        placeholder="这一刻的想法..."
      >

      </van-field>

      <van-uploader
        v-model="fileList"
        :max-count="9"
        class="mt10"
        :after-read="afterRead"
        @delete="deleteImg"
      />
      <div>
        <span
          class="cl-blue font16"
          @click="f_catePop = true"
        >
          选择分类
        </span>
        <span>
          {{cate.class_name}}
        </span>
      </div>

      <van-popup
        v-model="f_catePop"
        position="bottom"
      >
        <van-picker
          title="选择分类"
          show-toolbar
          :columns="columns"
          :default-index="defaultIndex"
          @confirm="onCateConfirm"
        />
      </van-popup>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    Toast
  } from 'vant';
  import api from '@/api/api'
  import globals from '@/utils/globals' // get token from cookie
  export default {
    data() {
      return {
        fileList: [],
        columns: [],
        cateList: [],
        cate: {},
        f_catePop: false,
        message: '',
        type: '',
        defaultIndex: ''
      }
    },

    computed: {},
    created() {
      this.type = this.$route.query.type
      this.case_id = this.$route.query.case_id
      let getCateList = (cb) => {
        api.case_class_list({}).then((res) => {
          console.log(res, 'case_class_list');
          this.cateList = res.data.list
          this.columns = res.data.list.map(v => v.class_name)
          cb && cb(res)
        })
      }

      if (this.type == 'edit') {
        api.cases_detail({
          case_id: this.case_id
        }).then((res) => {
          let images = res.data.image
          this.fileList = images.map((v) => {
            return {
              url: v
            }
          })
          this.message = res.data.content
          let class_id = res.data.class_id
          this.cate = {
            class_id,
          }
          getCateList((res) => {
            this.defaultIndex = res.data.list.findIndex((v) => {
              return v.class_id == class_id
            })
            this.cate.class_name = res.data.list.find(v => {
              return v.class_id == class_id
            }).class_name
          })
        })
      } else {
        getCateList()
      }

    },
    mounted() {},

    methods: {
      onCateConfirm(val, idx) {
        this.cate = this.cateList[idx]
        this.f_catePop = false
      },
      submit() {
        if (this.type == 'edit') {
          api.cases_edit({
            case_id: this.case_id,
            class_id: this.cate.class_id,
            image: this.fileList.map(v => v.url),
            content: this.message
          }).then((res) => {
            if (res.code == 9999) {
              Toast({
                message: res.info,
                onClose: () => {
                  this.$router.back()
                }
              })
            } else {
              Toast({
                message: res.info,
              })
            }
          })
        } else {
          api.cases_create({
            class_id: this.cate.class_id,
            image: this.fileList.map(v => v.url),
            content: this.message
          }).then((res) => {
            if (res.code == 9999) {
              Toast({
                message: res.info,
                onClose: () => {
                  this.$router.back()
                }
              })
            } else {
              Toast({
                message: res.info,
              })
            }
          })
        }

      },
      cancelModi() {
        this.$router.back()
      },
      deleteImg(file, detail) {
        // console.log(detail, 'delete');
        // this.fileList.splice(detail.index, 1)
      },
      afterRead(file) {
        //文件读取完成后的回调函数
        let content = file.file;
        //创建一个新的FormData
        let formData = new FormData();
        // upload这个名字是后台给的
        formData.append("image", content);
        //获取formdata表单所有的数据
        console.log(formData.getAll(""));
        // axios
        //   .post(
        //服务器上传地址
        //     `http://xxxxxxxxxxxx`,
        //服务器需要的数据，此处是formdata表单
        //     formData,（名字是后台参数确定的）
        //如果默认请求头是json，需要改一下请求头数据格式
        //     {
        //       "Content-Type": "multipart/form-data"
        //     }
        //   )
        //   .then(res => {
        //     console.log(res);
        //     console.log(res.config.headers);
        //   });
        axios({
          method: "post",
          //服务器上传地址
          url: `${globals.curBaseUrl}/upload`,
          data: formData, //（名字是后台接口参数确定的）
          headers: {
            // 修改请求头
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          console.log(res, this.fileList, 'upload');
          this.fileList[this.fileList.length - 1] = {
            url: res.data.data[0].all_path
          }
          console.log(this.fileList, 'this.fileList');
          // console.log(res.config.headers);
        });
      }
    }
  }
</script>
<style lang="scss">
  .app-container.page-case-modi {
    ._wra {
      padding: 3.2vw;
    }

    .van-field__label {
      display: none;
    }
  }
</style>