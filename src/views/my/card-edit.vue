<!-- card -->
<template>
  <div class="app-container page-cardedit">
    <div class="_wra0 tc ">
      <div
        class="borr i-b ov re u-box-s"
        style="width:91.2vw; height: 44.5vw"
      >
        <div
          class="_l tc cl-gray re"
          style="height: 100%;overflow:auto"
        >
          <div
            style="font-size:10vw;margin-top:15vw;"
            class=""
          >+</div>
          <div class="">上传图片</div>
          <div
            class="ab"
            style="top:0;left:0;height: 100%;width:100%"
            @click="triggerUpl0"
          >
            <van-image
              width="100%"
              height="100%"
              fit="cover"
              v-show="fileList0[0]"
              :src="fileList0[0] && fileList0[0].url"
            />
          </div>

          <van-uploader
            v-model="fileList0"
            upload-text="上传图片"
            :after-read="afterRead0"
            @delete="deleteImg0"
            style="display:none;"
          />
        </div>
        <!-- <div class="">
          <van-uploader
            v-model="fileList0"
            :max-count="1"
            :after-read="afterRead0"
          />
        </div> -->
        <div
          class="ab _r"
          style="top:0;right:0;height: 100%;"
        >
          <img
            src='@/assets/imgs/1.png'
            class=""
            style="height: 100%;"
            alt=""
          >
          <div class="_texts0 ab">
            <div class="">
              <input
                type="text"
                placeholder="请输入姓名"
                v-model="dataset.card_full_name"
              >
            </div>
            <div class="">
              <input
                class="mt10"
                type="text"
                placeholder="请输入职位"
                v-model="dataset.card_position"
              >
            </div>

          </div>
          <div class="_texts1 ab">
            <input
              type="text"
              placeholder="请输入电话号码"
              v-model="dataset.card_phone"
            >
          </div>
          <!-- <van-image
            fit="cover"
            class="u-box-s "
            :src="require('@/assets/imgs/1.png')"
          /> -->
        </div>

      </div>
    </div>

    <div class="_wra1">
      <div class="_d1 mt">
        <van-uploader
          v-model="fileList1"
          max-count="1"
          upload-text="上传图片"
          :after-read="afterRead1"
          @delete="deleteImg1"
        />
        <!-- <van-image
          width="100%"
          height="50vw"
          fit="cover"
          radius="2.7vw"
          :src="require('@/assets/imgs/78.png')"
        /> -->
      </div>

      <div class="_d2 mt">
        <div class="_t">
          <van-icon
            name="idcard"
            size="5vw"
            style="vertical-align: middle;"
          />
          <span class="ml5">
            自我推荐
          </span>
        </div>
        <div class="_c bac-whi borr mt10">
          <!-- {{dataset.intro}} -->

          <van-field
            v-model="dataset.intro"
            rows="2"
            autosize
            type="textarea"
            placeholder="请填写自我推荐"
          />
        </div>
      </div>

      <div class="_d3 mt">
        <div class="_t">
          <img
            src="@/assets/imgs/9.png"
            style="width:4vw;vertical-align: bottom;"
            alt=""
          >
          <span class="ml10">印象标签</span>
        </div>
        <div class="_c " style="margin-top:2vw">
          <star-input-tag v-model="dataset.tag_list" />
          <!-- <div
            class="i-b _c-i bac-whi borr mr10 mt10"
            v-for="(item, index) in dataset.tag_list"
            :key="index"
          >
            {{item.tag_name}} <span class="cl-gray ml5 mr5">|</span>
            <van-icon
              size="4.6vw"
              style="vertical-align: bottom;"
              name="good-job-o"
              v-if="item.is_like==2"
              @click="likeTag(item)"
            />
            <van-icon
              size="4.6vw"
              style="vertical-align: bottom;"
              name="good-job"
              v-if="item.is_like==1"
              @click="likeTag(item)"
            />
          </div> -->
        </div>
      </div>

      <div class="_d4 mt">
        <div class="_t">
          <img
            src="@/assets/imgs/8.png"
            style="width:5.5vw;vertical-align: bottom;"
            alt=""
          >
          <span class="ml10">照片墙</span>
        </div>
        <div class="_c mt10">
          <van-uploader
            v-model="fileList2"
            max-count="4"
            upload-text="上传图片"
            :after-read="afterRead2"
            @delete="deleteImg2"
          />
        </div>
      </div>

    </div>

    <div
      class="auto0 mt"
      style="width:70vw;margin-top:3vw;"
    >
      <van-button
        round
        type="info"
        block
        @click="save"
      >保 存</van-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  import starInputTag from '@/components/Tag'

  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        dataset: {},
        fileList0: [],
        fileList1: [],
        fileList2: [],
      }
    },
    components: {
      starInputTag
    },
    computed: {},
    created() {
      api.card_detail({}).then((res) => {
        this.dataset = res.data;
        this.dataset.tag_list = res.data.tag || []
        this.dataset.image_1 = [res.data.image_1] || []
        this.dataset.image_2 = [res.data.image_2] || []
        this.dataset.photo_wall = res.data.photo_wall || []

        this.fileList0 = this.dataset.image_1.map((v) => {
          return {
            url: v
          }
        })
        this.fileList1 = this.dataset.image_2.map((v) => {
          return {
            url: v
          }
        })
        this.fileList2 = this.dataset.photo_wall.map((v) => {
          return {
            url: v
          }
        })
      })
    },
    mounted() {},

    methods: {
      triggerUpl0() {
        let inputDOM = document.querySelector('._wra0 input[type="file"]');
        inputDOM.click()
      },
      save() {
        api.card_edit({
          ...this.dataset,
          image_1: this.fileList0.map(v => v.url)[0],
          image_2: this.fileList1.map(v => v.url)[0],
          photo_wall: this.fileList2.map(v => v.url),
        }).then((res) => {
          utils.editCb(res, () => {
            this.$router.back()
          })
        })
      },
      deleteImg0(file, detail) {
        // console.log(detail, 'delete');
        // this.fileList0.splice(detail.index, 1)
      },
      deleteImg1(file, detail) {
        // console.log(detail, 'delete');
        // this.fileList1.splice(detail.index, 1)
      },
      deleteImg2(file, detail) {
        // console.log(detail, 'delete');
        // this.fileList2.splice(detail.index, 1)
      },
      afterRead0(file) {
        //文件读取完成后的回调函数
        let content = file.file;
        //创建一个新的FormData
        let formData = new FormData();
        // upload这个名字是后台给的
        formData.append("image", content);
        //获取formdata表单所有的数据
        console.log(formData.getAll(""));
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
          // this.fileList0[0] = {
          //   url: res.data.data[0].all_path
          // }
          this.fileList0 = [{
            url: res.data.data[0].all_path
          }]
          console.log(this.fileList0, 'this.fileList0');
          // console.log(res.config.headers);
        });
      },
      afterRead1(file) {
        //文件读取完成后的回调函数
        let content = file.file;
        //创建一个新的FormData
        let formData = new FormData();
        // upload这个名字是后台给的
        formData.append("image", content);
        //获取formdata表单所有的数据
        console.log(formData.getAll(""));
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
          this.fileList1[this.fileList1.length - 1] = {
            url: res.data.data[0].all_path
          }
          console.log(this.fileList1, 'this.fileList1');
          // console.log(res.config.headers);
        });
      },
      afterRead2(file) {
        //文件读取完成后的回调函数
        let content = file.file;
        //创建一个新的FormData
        let formData = new FormData();
        // upload这个名字是后台给的
        formData.append("image", content);
        //获取formdata表单所有的数据
        console.log(formData.getAll(""));
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
          this.fileList2[this.fileList2.length - 1] = {
            url: res.data.data[0].all_path
          }
          console.log(this.fileList2, 'this.fileList2');
          // console.log(res.config.headers);
        });
      }
    }
  }
</script>


<style lang="scss">
  .app-container.page-cardedit {
    .van-uploader {
      width: 100%;

      .van-uploader__wrapper {
        width: 100%;

        .van-uploader__upload {
          width: 100%;
          height: 50vw;
        }
      }

      .van-uploader__preview {
        width: 100%;
        height: 50vw;

        .van-uploader__preview-image {
          width: 100%;
          height: 50vw;
        }
      }
    }


    ._wra0 {
      margin-top: 1.5vw;

      ._l {
        width: 44vw;
        background-color: #fff;
      }

      ._r {
        ._texts0 {
          top: 12vw;
          left: 12vw;
        }

        ._texts1 {
          top: 28vw;
          left: 28vw;
        }

        input {
          width: 25vw;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid gray;
        }
      }
    }

    ._wra1 {
      padding: 0 4.4vw;

      /* padding-bottom:  */
      ._more {
        color: #2b2a2a;
        opacity: 0.83;
        margin: 4.5vw 0;

        ._a {
          @include flexbox();
        }


      }

      ._b {
        @include flexbox();


      }

      ._d0 {
        @include flexbox();

        ._d0-r-t {
          font-size: 7.5vw;
          color: #000;
        }
      }

      ._d2 {
        input {
          background-color: transparent;
          border: none;
          border-bottom: 1px solid gray;
        }

        ._c {
          padding: 4.5vw 3.5vw;
        }
      }

      ._d3 {


        .el-tag {
          border: none;
          background-color: #fff;
          color: #535353;
          margin-top: 2vw;
        }

        .button-new-tag {
          margin-top: 2vw;
        }

        ._c-i {
          padding: 2vw;

        }
      }
    }

    ._card-share {
      @include flexbox();
      height: 100%;
      text-align: center;
      justify-content: space-around;

      ._l {}
    }
  }
</style>