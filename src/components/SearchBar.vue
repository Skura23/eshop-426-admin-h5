<!-- home -->
<template>
  <van-search
    v-model="value"
    :placeholder="placeholder"
    :clearable="true"
    @search="onSearch"
    @cancel="onCancel"
    @focus="onFocus"
    @input="$emit('input', $event.target.checked)"
  />
</template>

<script>
  export default {
    name:'SearchBar',
    model: {
      prop: 'value',
      event: 'input'
    },
    props: {
      placeholder: String,
      searchCb: Function,
    },
    data() {
      return {

      }

    },

    computed: {},

    mounted() {},

    methods: {

    }
  }
</script>
<style
  lang="scss"
  scoped
>

</style>