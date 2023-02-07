<template>
  <div class="timeout-wrap pt-50">
    <el-row>
      <el-col :span="11" class="timeoutImg">
        <img :src="timeoutImg" />
      </el-col>
      <el-col :span="9" class="pt-20">
        <div  class="align-center right">
          <div class="pl-50">
            <div class="title">{{ errTitle }}</div>
            <div class="content mt-20" style="color: red;">
              {{ errMsg }}
            </div>
            <div class="mt-100" v-if="backBtn">
              <qw-button
                text="返回"
                size="mini"
                @click="click(item)"
              ></qw-button>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'qwErrorPage',
  props: {
    errTitle: {
      type: String,
      default: '温馨提示'
    },
    errMsg: {
      type: String,
      default: '页面访问错误'
    },
    backBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      timeoutImg: require("@/assets/image/error.png"),
      btns: [
        {
          autoWidth: false,
          type: 'primary',
          id: 'back',
          text: '返回'
        }
      ]
    }
  },
  created () {
  },
  methods: {
    /**
     * 底部按钮点击事件
     */
     click () {
      this.$router.push({
        name: 'index'
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.timeout-wrap{
  user-select: none;
  padding-bottom: 138px;
  .timeoutImg{
    text-align: right;
  }
  .font-title{
    color: #343332;
  }
  .right{
    height: 300px;
  }


}
</style>
