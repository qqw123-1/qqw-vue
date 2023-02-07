<template>
  <div>
    <qw-error-page
      :errMsg="errMsg"></qw-error-page>
  </div>
</template>

<script>
export default {
  name: 'noPage',
  data() {
    return {
      count: 5,
      errMsg: '页面访问错误，5秒后返回首页。'
    }
  },
  mounted() {
    setTimeout(() => {
      this.$router.push({
        name: 'index'
      })
    }, 5000)
  },
  methods: {
  }
}
</script >

<style lang="scss" scoped>
  .font{
    color: red;
    margin-bottom: 50px;
  }
</style>