<template>
  <div :class="[fixLabelAuto ? 'fix-label-width' : '']">
    <div ref="descriptions">
      <el-descriptions
        :column="column"
        :border="descBorder"
        :colon="colon"
        :class="[
          `el-descriptions-column${column}`,
          descBorder ? '' : 'has-no-border'
        ]"
      >
        <template slot="title">
          <div
            v-if="descriptionsTitle.label || descriptionsTitle.title"
            class="justify-start desc"
          >
            <div v-if="descriptionsTitle.label" class="desc-label">
              {{ descriptionsTitle.label }}：
            </div>
            <div v-if="descriptionsTitle.value" class="desc-ttile">
              {{ descriptionsTitle.value }}
            </div>
          </div>
        </template>
        <template v-for="(item, key, index) in descriptionsList">
          <el-descriptions-item v-if="calcHideItem(item)" :key="index" :span="item.span">
            <template slot="label">
              <div class="justify-end align-center">
                <div :style="{ width: `${labelWidth}` }">
                  {{ item.label }}
                  <p class="">{{ item.labelEn }}</p>
                </div>
              </div>
            </template>
            <template v-if="item.type === 'money'">
              <div translate="no">
                <div translate="no">{{ addComma(item.value) }}</div>
              </div>
            </template>
            <template v-else-if="item.type === 'time'">
              <div translate="no">
                {{ item.value ? getDate(item.value, item.format) : "" }}
              </div>
            </template>
            <template v-else-if="item.type === 'enum' && item.enum">
              {{ item.enum[item.value] ? item.enum[item.value] : item.value }}
            </template>
            <template v-else-if="item.type === 'chineseAmount'">
              <div translate="no">
                {{ getChinese(item.value) }}
              </div>
            </template>
            <template v-else-if="item.customer">
              <slot :name="item.slot || (item.key + 'Desc')" :itemData="item" />
            </template>
            <template v-else-if="item.type === 'link'">
              <span class="text-link" @click.stop="clickLink(item.value)">{{ item.value }}</span>
            </template>
            <template v-else>
              <!-- 枚举类型 -->
              <span v-if="item.type=== 'eumn' && item.list">
                <template v-for="(it, index) in getItemByValue(item.list, item.value, item.filterList ? item.filterList : [])">
                  <span :key="index">{{ it.label }}</span>
                </template>
              </span>
              <span v-else-if="item.type=== 'date' || item.type=== 'time'" translate="no">
                <template v-if="item.format">
                  {{ item.value | formatDate(item.format) }}
                </template>
                <template v-else>
                  {{ item.value | formatDate('yyyy-MM-dd') }}
                </template>
              </span>
              <span v-else-if="item.type=== 'money'" translate="no">
                {{ item.value | addComma }}
              </span>
              <span v-else-if="item.type=== 'moneyChinese'" translate="no">
                {{ item.value | currencyToChinese }}
              </span>
              <span v-else-if="item.type=== 'suffix'">
                {{ item.value }}{{ item.suffix }}
              </span>
              <span v-else>
                {{ item.value }}
              </span>
            </template>
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </div>
  </div>
</template>

<script>
import { formatDate, currencyToChinese, addComma } from '@/common/utils'
export default {
  name: 'Descriptions',
  props: {
    // label宽度
    labelWidth: {
      type: String,
      default: ''
    },
    // 是否覆盖描述组件样式
    fixLabelAuto: {
      type: Boolean,
      default: true
    },
    // desc标题
    descriptionsTitle: {
      type: Object,
      default() {
        return {}
      }
    },
    // desc数组配置每一项内容
    descriptionsList: {
      type: Array,
      default() {
        return []
      }
    },
    // desc隐藏项配置
    descriptionsHide: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 列数
    column: {
      type: Number,
      default: 2
    },
    // 是否显示冒号
    colon: {
      type: Boolean,
      default: true
    },
    // 是否有边框
    descBorder: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    /**
     * 判断是否显示该项
     */
    calcHideItem() {
      return (item) => {
        if (Object.prototype.hasOwnProperty.call(item, 'itemName') && this.descriptionsHide[`${item.itemName}`]) {
          return false
        } else {
          return !item.hide
        }
      }
    }
  },
  created() {},
  methods: {
    addComma,
    currencyToChinese,
    /**
     * 根据value获取满足条件的项
     * list: [
     *  {
     *    label: '',
     *    value: ''
     *  }
     * ]
     */
    getItemByValue(list, val, filterList = []) {
      const list1 = list.filter(item => item.value === val)
      let list2 = []
      if (filterList.length !== 0) {
        for (let i = 0; i < filterList.length; i++) {
          list2 = list1.filter(item => item.value !== filterList[i])
        }
        return list2
      } else {
        return list1
      }
    },

    /**
     * @description 日期格式化
     */
    getDate(val, format) {
      return formatDate(val, format || 'yyyy-MM-dd')
    },

    /**
     * @description 中文金钱格式
     */
    getChinese(val) {
      return currencyToChinese(val)
    },
    /**
     * 点击链接打开文件
     */
    clickLink(path) {
      let url = ''
      if (path) {
        if (path.indexOf('http') !== -1) {
          url = path
        } else {
          url = process.env.VUE_APP_FILE_SRC + path
        }
        window.open(url, '_blank')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/* 覆盖 描述组件样式 */
.fix-label-width {
  .el-descriptions-column3 {
    th {
      width: 13%;
    }
    td {
      width: 20.33%;
    }
  }
  .el-descriptions-column2 {
    th {
      width: 18%;
    }
    td {
      width: 32%;
    }
  }
  .el-descriptions-column1 {
    th {
      width: 30%;
    }
    td {
      width: 70%;
    }
  }
}
</style>
