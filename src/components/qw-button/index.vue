<template>
  <el-button class="qw-button" :type="type" :size="size" @click="clickFn" :disabled="disabled">
    {{ text }}
    <slot name="text"></slot>
  </el-button>
</template>

<script>
export default {
  name: 'qwButton',
  props: {
    // 按钮文案
    text: {
      type: String,
      default: ''
    },
    // 按钮大小
    size: {
      type: String,
      default: ''
    },
    // 按钮类型
    type: {
      type: String,
      default: 'primary'
    },
    // 按钮是否隐藏
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    clickFn() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>