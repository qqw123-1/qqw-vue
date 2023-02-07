<!--
  * * @Author: qinqiwei
  * @Date: 2023-02-07 15:47:47
  * @Last Modified by:   qinqiwei
  * @Last Modified time: 2023-02-07 15:47:47
  * @Description: jsx封装form
-->
<script lang="jsx">
export default {
  name: 'qw-form',
  props: {
    // ref
    formId: {
      type: String,
      default: 'form'
    },
    // 表单配置，下有详细配置说明
    // {
    //   field: 'certNo',
    //   label: '',
    //   defaultValue: '', //初始值
    //   component: 'input', //类型
    //   colProps: {
    //     span: '12'
    //   },
    // }
    formItemList: {
      type: Array,
      default: () => {
        return []
      }
    },
    inline: {
      type: Boolean,
      default: true
    },
    // 是否需要栅格布局
    isCol: {
      type: Boolean,
      default: true
    },
    // label的width
    labelWidth: {
      type: String,
      default: ''
    },
    // rules校验
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 按钮
    btnList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      rulesList: this.rules,
      formModel: {}
    }
  },
  computed: {
  },
  watch: {
    rules(n) {
      this.rulesList = n
    }
  },
  created() {
    this.formModelProcess()
  },
  methods: {
    // 表单Form节点数据处理
    formModelProcess() {
      const formObj = {}

      this.formItemList.forEach((item) => {
        const itemName = item.field
        if (!itemName) {
          console.error('存在未配置field或者field为空的表单项')
          return
        }
        // render 类型不添加属性,使用外部属性
        if (item.component === 'render') {
          return
        }
        formObj[itemName] = this.getItemDefaultValue(item)
      })
      this.formModel = Object.assign({}, formObj)
      console.log('this.formModel===>', this.formModel)
    },
    // 重置表单
    resetForm() {
      this.formModelProcess()
      this.$refs[`${this.formId}`].clearValidate()
    },
    // 值为空判断
    checkValue(val) {
      return val || val === 0
    },
    // 默认值
    getItemDefaultValue(item) {
      return item.defaultValue ? item.defaultValue : item.component === 'checkbox' ? [] : ''
    },
    // 生成列表
    generateList(itemObj) {
      const itemEle = []
      for (let index = 0; index < itemObj.list.length; index++) {
        const item = itemObj.list[index]
        switch (itemObj.component) {
          // 下拉菜单
          case 'select':
            itemEle.push(<el-option key={ item.index } label={ item.label } value={ item.value }></el-option>)
            break
          // 多选框
          case 'checkbox':
            itemEle.push(<el-checkbox label={ item.value } key={ item.index }>{ item.label }</el-checkbox>)
            break
          // 单选框
          case 'radio':
            itemEle.push(<el-radio label={ item.value }>{ item.label }</el-radio>)
            break
        }
      }
      return itemEle
    },
    // 生成下拉菜单
    generateSelect(item) {
      return <el-select v-model={ this.formModel[item.field] } style={ item.style || '' } {...this.setComponentProps(item)}>{ this.generateList(item) }</el-select>
    },
    // 生成多选框
    generateCheckbox(item) {
      console.log('generateCheckbox============>', this.formModel[item.field])
      return <el-checkbox-group v-model={ this.formModel[item.field] }>{ this.generateList(item) }</el-checkbox-group>
    },
    // 生成单选
    generateRadio(item) {
      return <div class='el-form-item'>
        <el-radio-group v-model={ this.formModel[item.field] }>{ this.generateList(item) }</el-radio-group>
      </div>
    },
    // 生成输入框
    generateInput(item) {
      const ele = []
      // 提示位置：默认右侧，bottom表示提示位置在输入框底部
      if (item.tipsType === 'bottom') {
        ele.push(<p class='title-tips item-tips-bottom'>{ item.tips }</p>)
      } else {
        ele.push(<label class='title-tips'>{ item.tips }</label>)
      }
      return <div class='el-form-item'>
        <el-input v-model={ this.formModel[item.field] } type={ item.component || '' } disabled={ item.disabled } autosize={ item.autosize } style={ item.style || '' }></el-input>
        { ele }
      </div>
    },
    // 生成表单项
    generateFormItems(items = []) {
      const ele = []
      items.forEach((item) => {
        let itemEle = ''
        switch (item.component) {
          // 外部自定义
          case 'render':
            itemEle = item.render()
            break
          // 下拉菜单
          case 'select':
            itemEle = this.generateSelect(item)
            break
          // 多选框
          case 'checkbox':
            itemEle = this.generateCheckbox(item)
            break
          // 单选框
          case 'radio':
            itemEle = this.generateRadio(item)
            break
          // 输入框
          default:
            itemEle = this.generateInput(item)
            break
        }
        const elFormItem = <el-form-item label={ item.label } prop={ item.field } label-width={ item.labelWidth } >{ itemEle }</el-form-item>

        // 栅格布局
        if (this.isCol) {
          const colContent = this.renderWrap(elFormItem, item.colProps)
          ele.push(colContent)
        } else {
          ele.push(elFormItem)
        }
      })
      return <el-row class='form-row' gutter={20}>{ele}</el-row>
    },
    // 栅格布局
    renderWrap(content, item) {
      return <el-col {...this.setGridProp(item)}>{content}</el-col>
    },
    // 获取栅格属性
    setGridProp(item = {}) {
      const colProps = {
        ...(item.span ? {}
          : {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 12,
            xl: 12
          }),
        ...item
      }
      console.log('colProps===>', colProps)
      return { props: colProps }
    },
    // 获取component属性
    setComponentProps(item = {}) {
      const componentProps = item.componentProps
        ? { ...item.componentProps }
        : {
          clearable: true
        }
      console.log('componentProps==>', componentProps)
      return { props: componentProps }
    },
    // 按钮列表
    generateBtnList() {
      if (!this.btnList || this.btnList.length === 0) {
        console.error('未配置表单按钮')
        return
      }
      const btnListEle = []
      this.btnList.forEach((btn) => {
        btnListEle.push(<el-button type={ btn.type } on-click={ () => { btn.onClick(this.$refs[this.formId], this.formModel) } }>{ btn.text }</el-button>)
      })
      return btnListEle
    }
  },
  render() {
    let ele = []
    // 表单内容
    ele = this.generateFormItems(this.formItemList)
    return (
      <div class='form-container'>
        <el-form ref={ this.formId } props={{ model: this.formModel }} rules={ this.rulesList } inline={ this.inline } disabled={ this.isDisabled } label-width={ this.labelWidth || '100px'}>
          { ele }
          <el-form-item label-width={ this.labelWidth}>
            { this.generateBtnList() }
          </el-form-item>
        </el-form>
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.form-row{
    display: flex;
    flex-wrap: wrap;
}
.form-container {
  .title-tips {
    font-size: 14px;
    font-weight: 500;
    line-height: 28px;
    vertical-align: middle;
    color: #999;
    margin-left: 20px;
  }
  .el-form-item {
    .item-tips-bottom {
       margin-top: 5px;
       margin-left: 0px;
    }
  }
  .center {
    text-align: center;
  }
}
</style>
