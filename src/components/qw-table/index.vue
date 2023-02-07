<template>
  <div>
    <!-- table部分 -->
    <div ref="table" class="tablePrintWrap pt-20">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        lazy
        :row-key="options.rowKey"
        :load="options.load"
        :tree-props="options.treeProps"
        :max-height="options.maxHeight"
        empty-text="暂无数据"
        :highlight-current-row="true"
        :data="tableData"
        v-bind="options.tableAttr"
        :border="showBorder"
        align="center"
        :header-cell-style="{paddingTop: '10px',paddingBottom: '10px'}"
        style="width: 100%"
        @select="selectRow"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @row-dblclick="rowDblclick"
        @row-click="rowClick"
        @expand-change="expandChange"
      >
        <el-table-column
          v-if="options.radio && !options.checkbox"
          width="40"
        >
          <template slot-scope="scope">
            <div class="table-radio">
              <el-radio v-model="radio" :label="scope.$index" @change="radioChange">{{ '' }}</el-radio>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          v-if="options.checkbox && !options.radio"
          :selectable="options.selectable"
          align="center"
          type="selection"
          width="50"
        />

        <el-table-column
          v-if="options.showIndex"
          type="index"
          label="序号"
          align="center"
        >
          <template slot-scope="scope">
            {{ (currentPage - 1) * currentPageSize + scope.$index + 1 }}
          </template>
        </el-table-column>

        <template v-for="(val, attr, index) in options.columnOptions || {}">
          <el-table-column
            v-if="val.hide !== true"
            :key="index"
            align="center"
            v-bind="val.columnAttr"
          >
            <!-- <template slot="header" slot-scope="scope">
              <div :class="{'justify-center': val.subtitle ? val.subtitle.position === 'right' : ''}">
                <div :class="{'justify-center': val.type === 'autoRadio'}">
                  {{ scope.column.label }}
                  <div v-if="val.type === 'autoRadio'" class="ml-10 radio-wrap align-center">
                    <el-radio-group v-model="rightRadio" :diasbled="val.disabled" @change="rightChange($event, attr)">
                      <template v-for="(item, index) in val.list">
                        <el-radio :key="index" :label="item.value">{{ item.label }}</el-radio>
                      </template>
                    </el-radio-group>
                  </div>
                </div>
                <div
                  v-if="val.subtitle"
                  :style="val.subtitle.style"
                  :class="val.subtitle.class || 'ft-12 gray3'"
                  @click="subTitleClick(attr, scope.row)"
                >
                  {{ val.subtitle.label }}
                </div>
              </div>
            </template> -->
            <template slot-scope="scope">
              <template v-if="val.toRoute">
                <span class="text-link" @click.stop="toPage(val.toRoute,scope.row)">{{ scope.row[attr] }}</span>
              </template>
              <template v-else-if="val.slot">
                <slot
                  :name="val.slot || attr"
                  v-bind="{...scope, turnPageBeginPos: (currentPage - 1) * currentPageSize + firstNum }"
                />
              </template>
              <!-- 金钱格式栏 -->
              <template v-else-if="val.type === 'money'">
                <span translate="no">{{ addComma(scope.row[attr]) }}</span>
              </template>
              <!-- 日期格式栏 -->
              <template v-else-if="val.type === 'time'">
                <div v-if="scope.row[attr]" translate="no">
                  <!-- <i v-if="val.icon !== false" :class="val.iconClass || 'el-icon-time'+' mr-6'" /> -->
                  <span>{{ getDate(scope.row[attr], val.format) }}</span>
                </div>
              </template>
              <template v-else-if="val.type === 'chineseAmount'" translate="no">
                <span>{{ currencyToChinese(scope.row[attr]) }}</span>
              </template>
              <!-- 单选栏 -->
              <!-- <template v-else-if="val.type === 'autoRadio'">
                <div class="ml-10 radio-wrap" @click.stop>
                  <el-radio-group v-model="scope.row[attr]" :disabled="val.disabled" @change="autoRadioChange($event, attr, scope.row)">
                    <template v-for="(item, index) in val.list">
                      <el-radio :key="index" :label="item.value">{{ item.label }}</el-radio>
                    </template>
                  </el-radio-group>
                </div>
              </template> -->
              <template v-else>
                <span>{{ val.list ? getLabel(scope.row[attr], val) : scope.row[attr] }}</span>
              </template>
            </template>
          </el-table-column>
        </template>
        <el-table-column
          v-if="options.tableHandler"
          fixed="right"
          align="center"
          v-bind="options.handlerAttr"
        >
          <template slot="header">
            <div>
              <div>
                {{ options.handlerLabel || '操作' }}
              </div>
              <div v-if="options.handlerSubtitle" class="ft-12">
                {{ options.handlerSubtitle }}
              </div>
            </div>
          </template>
          <template slot-scope="scope">
            <div @click.stop>
              <slot name="tableHandler" v-bind="{...scope}" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页部分 -->
    <div>
      <qw-pagination
        v-if="!options.noPagination"
        :total="total"
        :page.sync="currentPage"
        :limit.sync="currentPageSize"
        :page-sizes.sync="pageSizes"
        @pagination="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="js">
import { addComma, currencyToChinese, formatDate, MathPlus } from '@/common/utils'
import qwPagination from '@/components/qw-pagination'
export default {
  components: { qwPagination },
  props: {
    options: {
      type: Object,
      required: true,
      default: () => {
        return {}
      }
    },
    query: {
      type: Function,
      default: () => {
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    businessCode: {
      type: String,
      default: ''
    },
    firstNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100]
      }
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    queryTip: {
      type: Boolean,
      default: true
    },
    formRef: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否展示边框
    showBorder: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      descType: '1',
      visible: false,
      radio: '',
      rightRadio: '',
      loading: false,
      currentPage: 1,
      currentPageSize: 10,
      tableData: [],
      total: 0,
      selection: [],
      detailColumn: 2, // 弹窗表单列数
      detailList: [], // 弹窗详情数据
      dateFormat: { // 日期组件显示的格式
        type: String,
        default: 'yyyy-MM-dd'
      },
      row: {},
      detailData: {},
      form: {
        number: ''
      },
      currentTarget: '',
      currentIndex: 0,
      authList: [],
      detailCollapse: true,
      detailHideData: {},
      stashRow: {}
    }
  },
  watch: {
    data: {
      handler(val) {
        this.tableData = val
      },
      deep: true
    }
  },
  created() {
    this.currentPageSize = this.pageSize
  },
  mounted() {
    this.initFn()
  },
  activated() {
    if (this.options.editModel) {
      document.addEventListener('click', this.globalClick)
    }
  },
  deactivated() {
    document.removeEventListener('click', this.globalClick)
  },
  methods: {
    addComma,
    currencyToChinese,
    initFn() {
      if (this.options.query) {
        this.loadData()
      } else {
        this.tableData = this.data
      }
    },
    /**
     * @description 加载数据
     */
    loadData(reset = true) {
      if (reset) {
        this.currentPage = 1
      }
      this.queryFn()
    },
    queryFn() {
      const pageCalc = this.options.pageCalc !== false
      const page = {
        turnPageBeginPos: pageCalc ? (this.currentPage - 1) * this.currentPageSize + this.firstNum + '' : this.currentPage,
        turnPageShowNum: this.currentPageSize
      }
      this.tableData = []
      this.loading = true
      this.query(page, (data = [], total = 0, opt = {}) => {
        this.tableData = data
        this.total = total * 1
        this.loading = false
        const { showTip = true } = opt
        if (this.queryTip && showTip && this.tableData.length === 0) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: this.$t('message.noData')
          })
        }
      }, () => {
        this.total = 0
        this.loading = false
      })
    },
    /**
     * @description 单选取值
     */
    radioChange(index) {
      this.selection = [this.tableData[index]]
    },
    /**
     * @description 全选取值
     */
    selectionChange(selection) {
      if (this.options.radio) return
      this.selection = selection
      this.$emit('selectionChange', selection)
    },

    rowDblclick(row, column, event) {
      if (this.options.editModel && !this.currentTarget && this.options.autoEdit !== false) {
        this.currentTarget = event.target.parentNode
        this.currentIndex = row.$index
        this.$set(row, '$isEdit', true)
      }
    },

    /**
     * @description 判断点击是否在原来的目标元素上
     * @param e
     */
    globalClick(e) {
      this.$nextTick(() => {
        if (this.options.editModel && this.currentTarget) {
          if (!this.currentTarget.contains(e.target) && this.options.autoEdit !== false) {
            this.finishEdit(this.tableData[this.currentIndex])
          }
        }
      })
    },

    finishEdit(row, cb = () => {
    }) {
      this.$refs.ruleForm.validate((val) => {
        if (!val) {
          cb(false)
        } else {
          row.$isEdit = false
          this.currentIndex = ''
          this.currentTarget = ''
          cb(true)
          this.$emit('btnClick', '$edit', row)
        }
      })
    },
    toPage(name, row) {
      this.$router.push({
        name: name,
        params: row
      })
    },
    btnClick(val) {
      this.$emit('bottomClick', val.id, this.data)
      this.$emit('btnClick', val.id, this.data)
    },
    detailClick(val, fn) {
      this.$emit('detailClick', val.id, this.row, fn)
      this.$emit('btnClick', val.id, this.row, fn)
    },
    /**
     * @description 页面size变更
     */
    handleSizeChange(val) {
      console.log('handleSizeChange')
      this.$emit('handleSizeChange')
      this.radio = ''
      this.selection = []
      this.currentPageSize = val
      console.log('formRef', this.formRef)
      if (Object.prototype.hasOwnProperty.call(this.formRef, 'submitForm')) {
        this.formRef.submitForm({ id: 'submit1', needSubmit: true })
      } else {
        this.loadData()
      }
    },
    /**
     * @description 翻页
     */
    handleCurrentChange(val) {
      console.log('handleCurrentChange', val)
      this.radio = ''
      this.selection = []
      this.currentPage = val.page
      if (Object.prototype.hasOwnProperty.call(this.formRef, 'submitForm')) {
        this.formRef.submitForm({ id: 'submit1', needSubmit: true })
      } else {
        this.loadData(false)
      }
    },
    /**
     * 查询指定序号所在页面的数据
     */
    autoQueryFixPage(index) {
      if (index && !isNaN(Number(index)) && Number(index) >= 0) {
        if (MathPlus().sub(this.total, index) >= 0) {
          const toPage = Math.floor(MathPlus().div(index, this.currentPageSize)) + 1
          if (this.currentPage !== toPage) {
            this.currentPage = toPage
            this.queryFn()
          } else {
            this.$message({
              type: 'warning',
              message: this.$i18n.t('table.pageTip')
            })
          }
        }
      }
    },
    /**
     * 是/否 单选框值变化
     */
    rightChange(val, key) {
      this.tableData.forEach(item => {
        this.$set(item, key, val)
      })
      this.$emit('selectChange', key + 'header', val, this.tableData)
    },

    autoRadioChange(val, attr, row) {
      this.$emit('selectChange', attr, val, row)
    },

    selectRow(selection, row) {
      this.$nextTick(() => {
        if (row.children) {
          const flag = this.selection.indexOf(row) !== -1
          this.splitFn(row.children, flag)
        }
      })
    },

    selectAll() {
      const flag = this.getIsAllChecked()
      this.splitFn(this.tableData, flag)
    },
    /**
     * 处理数据
     */
    splitFn(data, flag) {
      data.forEach((row, index) => {
        let available = true
        if (this.options.selectable) {
          available = this.options.selectable(row, index)
        }
        if (available) {
          this.$refs.multipleTable.toggleRowSelection(row, flag)
        }
        if (row.children) {
          this.splitFn(row.children, flag)
        }
      })
    },

    /**
     * @description 获取table组件中的全选checkbox的勾选状态
     */
    getIsAllChecked() {
      return this.$refs.multipleTable.store.states.isAllSelected
    },

    /**
     * @description 点击副标题
     */
    subTitleClick(key, row) {
      this.$emit('subTitleClick', key, row)
      this.$emit('btnClick', key, row)
    },

    /**
     * @description 日期格式化
     */
    getDate(val, format) {
      return val ? formatDate(val, format || 'yyyy-MM-dd') : val
    },

    /**
     * @description 操作栏点击事件
     */
    handlerClick(item, row) {
      this.$emit('handlerClick', item.id, row)
      this.$emit('btnClick', item.id, row)
    },
    /**
     * @description 操作栏按钮根据参数隐藏
     */
    setBtnHide(item, row) {
      if (item.customShow) {
        return item.customShow(row)
      } else {
        if (item.showKey) {
          const showValue = (item.showValue && item.showValue.split(',')) || '1'
          return showValue.indexOf(row[item.showKey]) > -1
        } else {
          return true
        }
      }
    },

    /**
     * @description 表格选择栏获取label
     */
    getLabel(val, opt) {
      if (!val) {
        return ''
      }
      const label = opt.defaultProps ? (opt.defaultProps.label || 'label') : 'label'
      const value = opt.defaultProps ? (opt.defaultProps.value || 'value') : 'value'
      const list = opt.list
      return this.findData(list, value, val)[label] || val
    },
    findData(list, key, val) {
      return list.find(item => val === item[key]) || {}
    },
    /**
     * @description 获取状态item
     */
    getTimeStatus(list, val, filterList = []) {
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

    open() {
      const opt = this.options.detailOption || {}
      if (opt.showHistory) {
        this.queryAuthList()
      }
      this.$emit('open', 'detail', this.row)
    },
    opened() {
      this.$emit('opened', 'detail', this.row)
    },
    closed() {
      this.$emit('closed', 'detail', this.row)
    },
    close() {
      this.$emit('close', 'detail', this.row)
    },
    /**
     * 获取当前table的分页信息
     */
    getTablePageInfo() {
      return {
        currentPage: this.currentPage,
        pageSize: this.currentPageSize
      }
    },
    /**
     * 获取table组件的指定ref实例
     */
    getRefs(ref) {
      return this.$refs[ref]
    },
    /**
     * 详情弹窗内的表格栏
     */
    getDetailTable(detail) {
      return (page, cb, close) => {
        if (!this.row.orderFlowNo) {
          this.row.orderFlowNo = this.row.flowNo
        }
        const currentBusinessCode = this.row.bsnCode || this.businessCode
        detail.getTableData({ ...this.row, currentBusinessCode }, page, cb, close)
      }
    },

    resetAutoRadio() {
      this.rightRadio = ''
    },
    /**
     * @description 清空表单数据
     */
    resetTable() {
      this.tableData = []
    },

    expandChange(row, flag) {
      this.$emit('expandChange', row, flag)
    },
    doLayout() {
      this.$refs.multipleTable.doLayout()
    },
    /**
     * @description 获取表格当前分页参数
     * @returns {{total: number, currentPage: number, turnPageBeginPos: string, turnPageShowNum: number}}
     */
    getPage() {
      return {
        turnPageBeginPos: (this.currentPage - 1) * this.currentPageSize + this.firstNum + '',
        turnPageShowNum: this.currentPageSize,
        currentPage: this.currentPage,
        total: this.total
      }
    },
    /**
     * 重置table:
     * 1、清除列表数据；
     * 2、分页参数重置。
     */
    resetTableAll() {
      this.tableData = []
      this.total = 0
      this.currentPageSize = this.pageSize
    },

    /**
     * @description 点击表格行触发单选/多选
     */
    rowClick(row) {
      this.$emit('rowClick', row)
    },

    /**
 * @description 清空选择
 */
    clearSelection() {
      if (this.options.radio) {
        this.radio = ''
      } else {
        this.$refs.multipleTable.clearSelection()
      }
      this.selection = []
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
