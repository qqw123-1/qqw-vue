<template>
  <div class="tc bg">
    <div class="title pt-30">
      个人信息
    </div>
    <div class="content mh-25 pv-40">
      <el-row>
        <el-col :span="12">姓名：</el-col>
        <el-col :span="12">{{ info.name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">年龄：</el-col>
        <el-col :span="12">{{ info.age }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="12">公司：</el-col>
        <el-col :span="12">{{ info.company }}</el-col>
      </el-row>
    </div>
    <div class="pv-40">
      <qw-button type="danger" @click="toIndex" size="mini">
        <template slot="text">
          查询
        </template>
      </qw-button>
      <qw-button type="primary" @click="back" size="mini">
        <template slot="text">
          返回
        </template>
      </qw-button>
    </div>
    <!-- 表单示例 -->

    <h1>表格示例</h1>
    <div style="margin: 50px 0px;">
      <el-button type="primary" @click="reload">
        刷新
      </el-button>
      <el-button type="primary" @click="getRow">
        获取选中值、清空
      </el-button>

      <!-- :show-border="true" 是否展示边框 -->
      <qw-table
        ref="table"
        :options="tableOptions"
        :query="getTableData"
      >
        <template slot="slot">
          此处slot可加按钮
        </template>
        <!-- slot-scope="scope"可拿取当前行数据 -->
        <template slot="tableHandler">
          <span class="text-link" @click="detail">详情</span>
        </template>
      </qw-table>

    </div>

    <!-- 描述示例 -->
    <h1>描述示例</h1>
    <div style="margin: 50px 50px;">

      <!-- labelWidth="100px" 设置宽度 -->
      <qw-desc :descriptions-list="descriptionsList" :column="2" :descriptions-hide="detailInfoHide" :descriptions-title="descriptionsTitle">
        <template slot="slotName" slot-scope="scope">
          此处为插槽{{ scope.itemData }}
        </template>
      </qw-desc>

    </div>

    <!-- 描述示例 -->
    <h1>表单示例</h1>
    <div>

      <!-- labelWidth="100px" 设置宽度 -->
      <qw-form ref="elForm" :form-item-list="formItemList" :rules="rules1" :btn-list="btnList" />
    </div>
  </div>
</template>

<script>
import { testApi } from '@/config/api/public.js'
export default {
  name: 'view',
  data() {
    return {
      info: {},
      // 表单配置
      tableOptions: {
        query: true, // 首次进入自动调用quey方法
        showIndex: true, // 显示序号
        // radio: true, // 单选框
        checkbox: true, // 多选框
        // pageCalc: false,

        tableHandler: true, // 是否显示操作栏 插槽名tableHandler
        handlerLabel: '操作栏名称', // 操作栏label设置，默认为操作
        handlerAttr: { // tableHandler宽度
          width: 200
        },

        tableAttr: {},
        noPagination: false, // 是否不分页
        columnOptions: {
          number: {
            columnAttr: {
              label: '流水号', // 表头
              minWidth: '120px' // 一栏最小宽度
              // width: '120px' // 定宽度
            }
          },
          money: {
            columnAttr: {
              label: '金额'
            },
            type: 'money'
          },
          moneyChinese: {
            columnAttr: {
              label: '大写金额'
            },
            type: 'chineseAmount'
          },
          time: {
            columnAttr: {
              label: '时间'
            },
            type: 'time',
            format: 'yyyy-MM-dd'
          },
          status: {
            columnAttr: {
              label: '枚举值'
            },
            list: [
              { label: '正常', value: '1' },
              { label: '失败', value: '0' }
            ]
          },
          slot1: {
            columnAttr: {
              label: '插槽',
              width: 180
            },
            slot: 'slot'
          }
        }
      },

      // 描述配置
      descriptionsList: [
        {
          label: '枚举',
          value: '0',
          span: 2, // 分行，只有在第一列时生效
          type: 'eumn', // type判断类型：eumn枚举、time时间、money金额、chineseAmount大写金额、suffix后缀
          itemName: 'eumn111', // itemName配合隐藏某项detailInfoHide使用
          filterList: [''], // 过滤掉某个值
          list: [
            { label: '正常', value: '0' },
            { label: '失败', value: '1' }
          ]
        },
        // 插槽类型
        {
          customer: true,
          slot: 'slotName',
          label: '插槽'
        },
        // 普通展示类型
        {
          label: '普通展示',
          value: '0'
        },
        // 后缀类型
        {
          label: '后缀',
          value: '0',
          type: 'suffix',
          suffix: '元' // value后缀
        },
        // 隐藏项目类型
        {
          label: '隐藏项目',
          value: '0',
          itemName: 'xxxhide'
        },
        // 金额类型
        {
          label: '金额',
          value: '10000',
          type: 'money'
        },
        // 大写金额类型
        {
          label: '大写金额',
          value: '10000',
          type: 'chineseAmount'
        },
        // 时间类型
        {
          label: '时间',
          value: '20230206111111',
          type: 'time',
          format: 'yyyy-MM-dd hh:mi:ss'
        }
      ],
      // 描述隐藏，descriptionsList中要隐藏的项必须配有itemName
      detailInfoHide: {
        xxxhide: true
      },
      // 描述标题配置
      descriptionsTitle: {
        label: '我是标题',
        value: '我是标题的描述'
      },

      // 表单配置
      formItemList: [
        {
          field: 'name',
          label: '名字',
          component: 'input',
          defaultValue: '默认值',
          // componentProps: { //component中属性
          //   disabled: true
          // },
          // disabled: true,
          // autosize: true,
          // style: '',
          // tipsType: 'right',
          // tips: '我是提示',
          colProps: { // 栅格布局
            span: 8
          }
        },

        {
          field: 'age',
          label: '年龄',
          component: 'input',
          colProps: {
            span: 8
          }
        },

        {
          field: 'status',
          label: '状态1',
          component: 'select',
          componentProps: {
            disabled: true
          },
          list: [
            { label: '正常', value: '0' },
            { label: '失败', value: '1' }
          ],
          colProps: {
            span: 8
          }
        },

        {
          field: 'checkbox',
          label: '状态2',
          component: 'checkbox',
          defaultValue: ['0'],
          list: [
            { label: '正常', value: '0' },
            { label: '失败', value: '1' }
          ],
          colProps: { // 暂不支持
            span: 8
          }
        },

        {
          field: 'radio',
          label: '状态3',
          component: 'radio',
          list: [
            { label: '正常', value: '0' },
            { label: '失败', value: '1' }
          ],
          colProps: { // 暂不支持
            span: 6
          }
        }
      ],
      rules1: {
        name: [
          {
            required: true,
            message: '请输入正确名称',
            trigger: 'blur'
          }
        ],
        age: [
          {
            required: true,
            message: '请输入正确年龄',
            trigger: 'blur'
          }
        ]
      },
      btnList: [
        {
          text: '提交',
          type: 'primary',
          onClick: this.commitForm
        },
        {
          text: '重置',
          type: '',
          onClick: this.resetForm1
        }
      ]
    }
  },
  mounted() {
    console.log('process.env.VUE_APP_TITLE====>', process.env.VUE_APP_TITLE)
  },
  methods: {
    toIndex() {
      const params = {
        type: '1'
      }
      testApi(params).then(res => {
        console.log('res======>', res)
      }).catch(err => {
        console.log('err-======>', err)
        this.info = err.data
      })
    },
    back() {
      this.$router.push({
        name: 'index'
      })
    },
    test() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            list: [{
              number: '111',
              money: '100000',
              moneyChinese: '100000',
              time: '20220102',
              status: '1',
              name: '111'
            }, {
              number: '111',
              money: '100000',
              moneyChinese: '100000',
              time: '20220102',
              status: '0',
              name: '111'
            }],
            turnPageTotalNum: '2'
          })
        }, 1000)
      })
    },

    // --------------------------------table方法-----------------------------------------
    /**
     * Table获取数据函数
     */
     getTableData(page, callback, close) {
      const params = {
        ...page
      }
      console.log('params===>', params)
      this.test(params).then((res) => {
        console.log(res)
        callback(
          res.list, res.turnPageTotalNum
        )
      }).catch(() => {
        close()
      })
    },
    detail() {
      this.$notify({
        title: '提示',
        message: '点击详情',
        type: 'success',
        duration: 2000
      })
    },
    // 刷新表格
    reload() {
      this.$refs.table.loadData()
    },
    // 获取选中值
    getRow() {
      console.log('选中值：', this.$refs.table.selection)
      this.$refs.table.clearSelection()
    },

    // --------------------------------表单方法-----------------------------------------
    // 表单提交
    commitForm(v, form) {
      v.validate((valid, error) => {
        if (valid) {
          console.log('提交成功form====>', form)
          this.$notify({
            title: '提示',
            message: '点击详情',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: '提示',
            message: error,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    // 重置表单
    resetForm1(v, form) {
      console.log('重置', form, v)
      this.$refs.elForm.resetForm()
    }
  }
}
</script>

<style lang="scss" scoped>
.bg{
}
.mh-25{
  margin: 0 25%;
}
</style>