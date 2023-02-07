<template>
  <div class="tc bg">
    <div class="bg1">
      <div class="pt-140">
        <span class="title">1 个人都在用的测试项目页面</span>
      </div>
      <div class="pt-30">
        <span class="content">免费使用、无需下载、海量资源、即拿即用</span>
      </div>
      <div class="mt-30">
        <qwButton text="免费使用" @click="toView"></qwButton>
      </div>
    </div>
    <div class="bg2">
      <img class="vue-img" src="../../assets/logo.png" />
    </div>
    <div class="bg3">
      <img src="https://assets.website-files.com/5bff8886c3964a992e90d465/5c0080fe9e397d3325abcf93_hero-1.svg" alt="" class="img1" style="will-change: transform; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
      <img src="https://assets.website-files.com/5bff8886c3964a992e90d465/5c00fa0eb8b0816e1a10dfe6_hero-2.svg" alt="" class="img2" style="will-change: transform; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
      <img src="https://assets.website-files.com/5bff8886c3964a992e90d465/5c001deda8e61a2c3ad905e5_hero-4.svg" alt="" class="img3" style="will-change: transform; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">
      <img src="https://assets.website-files.com/5bff8886c3964a992e90d465/5c00fa3ad82b40e853c9952f_hero-3.svg" alt="" class="img4" style="will-change: transform; transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;">

      <div class="mt-100">
        <qwButton text="功能待完善" @click="toUndefine"></qwButton>
      </div>
    </div>
    <div class="bg4">
    </div>
    <!-- <img @click="toView" src="../../assets/logo.png">
    <div>当前为首页</div> -->
  </div>
</template>

<script>
export default {
  name: 'view',
  data() {
    return {

    }
  },
  mounted() {
    this.getHeight()
  },
  methods: {
    getHeight() {
      console.log('window====>', window)
    },
    toView() {
      this.$router.push({
        name: 'view'
      })
    },
    toUndefine() {
      this.$router.push({
        name: 'page404'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg{
    .bg1{
      position: absolute;
      top: 0;
      left: 0;
      right: 0%;
      width: auto;
      height: 1000px;
      background-image: url('https://img.js.design/assets/img/63281b5e14c2eaf1ee5ca279.png#a17af251f81e8f69c66006c2218ca6c6');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .bg2{
      height: 250px;
      position: absolute;
      top: 900px;
      left: 0;
      right: 0%;
      background-color: rgba(0, 193, 227, 1);
      .vue-img{
        z-index: 3;
        position: relative;
        height: 600px;
        width: 600px;
        top: -410px;
      }
    }

    .bg3{
      z-index: 2;
      height: 800px;
      left: 0;
      right: 0%;
      width: auto;
      position: absolute;
      top: 1150px;
      background-color: #ECFEFF;
      .img1{
        position: absolute;
        right: -8%;
        bottom: -2%;
        width: 50%;
        max-height: 108vh;
        max-width: 810px;
      }
      .img2{

        position: absolute;
        left: 2.3%;
        top: 1%;
        width: 29%;
        max-height: 52vh;
        max-width: 480px;
        min-width: 330px;
      }
      .img3 {
        position: absolute;
        top: -9%;
        right: 18%;
        width: 19%;
        max-height: 50vh;
        max-width: 290px;
        min-width: 240px;
      }
      .img4{

        position: absolute;
        left: 8%;
        bottom: -1%;
        width: 22%;
        max-height: 52vh;
        max-width: 400px;
        min-width: 320px;
      }
    }

    .bg4{
    }
  }
</style>