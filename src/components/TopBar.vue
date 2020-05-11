<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      :placeholder ="true"
    />
  </div>
</template>

<script>
  export default {
    name: 'TopBar',
    props: [
      'title'
    ],
    data() {
      return {

      }
    },
    methods: {
      onClickLeft() {
        console.log(this.$router,'this.$router');
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