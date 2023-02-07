<template>
  <div>
    <qw-error-page
      :errMsg="errMsg"></qw-error-page>
  </div>
</template>

<script>
export default {
  name: '404',
  data() {
    return {
      errMsg: '页面访问错误，错误码404。'
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
    font-size: 20px;
    color: red
  }
</style>