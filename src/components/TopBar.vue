<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="config.onClickRight"
      :placeholder="true"
    >
      <template
        #right
        v-if="this.name === 'case-manage'"
      >
        {{config['right-text']}}
        <van-icon name="add-o" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
  export default {
    name: 'TopBar',
    props: [
      'title',
      'name'
    ],
    data() {
      return {
        configMap: {
          'case-manage': {
            onClickRight:()=> {
              console.log('case-manage click');
              this.$router.push('./case-manage/modi')
            },
            'right-text': '案例发布',
          }
        },
        config: {}
      }
    },
    beforeUpdate() {
      console.log(this.name, 'created');
      if (this.configMap[this.name]) {
        this.config = this.configMap[this.name]
      } else {
        this.config = {
          'right-text': '',
          onClickRight() {

          }
        }
      }
    },
    methods: {
      onClickLeft() {
        console.log(this.$router, 'this.$router');
        this.$router.back()
      },
      onClickRight() {

      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>