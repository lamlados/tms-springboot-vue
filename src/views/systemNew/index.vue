<template>
  <div :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">测试用例页面</template>
    <d2-crud-x
      ref="d2Crud"
      style="height: 800px; margin: 15px"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @custom-emit-create="handleCreate"
      @custom-emit-result="handleResult"
      @custom-emit-execution="handleExecution"
      @custom-dialog-create="customCreateDialog"
      @custom-dialog-result="customResultDialog"
      @custom-dialog-execution="customExecutionDialog"
    >
      <!-- 自动绑定参数与事件 -->
      <!-- 包含详细参数见：https://gitee.com/greper/d2-crud-plus/blob/master/packages/d2-crud-plus/src/lib/mixins/crud.js#L164-->
      <div slot="header">
        <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" />
        <el-button-group>
          <el-button size="small" type="primary" @click="addRow"><i class="el-icon-plus" /> 新增</el-button>
        </el-button-group>
        <crud-toolbar v-bind="_crudToolbarProps" v-on="_crudToolbarListeners" />
      </div>
      <template slot="itemMarkFormSlot" slot-scope="scope">
        <el-input
          id="txtItemMark"
          v-model="scope.form.itemMark"
          name="txtItemMark"
          placeholder="选择能力点后生成"
          readonly
          style="margin-bottom: 15px"
        ></el-input>
      </template>
      <template slot="classificationMarkFormSlot" slot-scope="scope">
        <el-input
          id="txtClassMark"
          v-model="scope.form.classificationMark"
          name="txtClassMark"
          placeholder="选择能力点后生成"
          readonly
          style="margin-bottom: 15px"
        ></el-input>
      </template>
      <template slot="caseMarkFormSlot" slot-scope="scope">
        <el-input
          id="txtCaseMark"
          v-model="scope.form.caseMark"
          name="txtCaseMark"
          placeholder="选择能力点后生成"
          readonly
          style="margin-bottom: 15px"
        ></el-input>
        <br>
        <el-select v-model="value" clearable placeholder="选择能力点" style="margin-bottom: 15px; margin-right: 15px">
          <el-option
            v-for="item in options"
            :key="item.dictType"
            :label="item.dictContent"
            :value="item.dictMark"
          />
        </el-select>
        <el-button @click="generateMark">生成序号</el-button>
      </template>
    </d2-crud-x>
  </div>
</template>

<script>
import { crudOptions } from './crud' // 上文的crudOptions配置
import { d2CrudPlus } from 'd2-crud-plus'
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
import qs from 'qs'

export default {
  name: 'TestCasePage',
  mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
  data() {
    return {
      options: [],
      caseMark: '选择能力点后生成',
      itemMark: '选择能力点后生成',
      classificationMark: '选择能力点后生成',
      value: '',
      showCreateDialog: false,
      showResultDialog: false,
      showExecutionDialog: false
    }
  },
  computed: {
    ...mapGetters([
      'currentItem'
    ])
  },
  mounted() {
    this.axios({
      headers: {
        'Authorization': getToken()
      },
      method: 'get',
      url: process.env.VUE_APP_BASE_API + '/dict/abilities?currentItem=' + this.currentItem
    }).then(response => {
      this.options = response.data.data
    })
  },
  methods: {
    generateMark() {
      this.axios({
        headers: {
          'Authorization': getToken()
        },
        method: 'post',
        url: process.env.VUE_APP_BASE_API + '/system/mark/generateMark',
        data: qs.stringify({
          itemName: this.currentItem,
          currentAbility: this.value
        })
      }).then(response => {
        this.caseMark = response.data.message
        var cMark = this.caseMark
        if (cMark !== '') {
          var inp1 = document.querySelector('#txtCaseMark')
          inp1.value = cMark
          inp1.dispatchEvent(new Event('input'))
          var inp2 = document.querySelector('#txtItemMark')
          inp2.value = cMark.slice(0, 4)
          inp2.dispatchEvent(new Event('input'))
          var inp3 = document.querySelector('#txtClassMark')
          inp3.value = cMark.slice(0, cMark.lastIndexOf('-'))
          inp3.dispatchEvent(new Event('input'))
        }
      })
    },
    getCrudOptions() { return crudOptions(this) },
    pageRequest(query) { return GetList(query) }, // 数据请求
    addRequest(row) { return AddObj(row) }, // 添加请求
    updateRequest(row) { return UpdateObj(row) }, // 修改请求
    delRequest(row) { return DelObj(row.id) }, // 删除请求,
    handleCreate() {
      // 打开自定义模版的对话框
      this.getD2Crud().showDialog({
        mode: 'custom', // 当前打开模式,可选项[add,edit,view, 还可以自定义任意字符串]
        template: {
          key1: {
            title: '字段1',
            key: 'key1'
          }
        },
        modeContext: {
          test: '这里是modeContext---edit'
        }
      })
    },
    handleResult() {
      this.getD2Crud().showDialog({
        mode: 'custom', // 当前打开模式,可选项[add,edit,view, 还可以自定义任意字符串]
        template: {
          key1: {
            title: '字段1',
            key: 'key1'
          }
        },
        modeContext: {
          test: '这里是modeContext---edit'
        }
      })
    },
    handleExecution() {
      this.getD2Crud().showDialog({
        mode: 'custom', // 当前打开模式,可选项[add,edit,view, 还可以自定义任意字符串]
        template: {
          key1: {
            title: '字段1',
            key: 'key1'
          }
        },
        modeContext: {
          test: '这里是modeContext---edit'
        }
      })
    },
    customCreateDialog() {},
    customResultDialog() {},
    customExecutionDialog() {}
  }
}
</script>
<style>

.el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #DCDFE6;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #909399;
}
</style>
