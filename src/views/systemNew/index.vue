<template>
  <div :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">测试页面</template>
    <d2-crud-x
      ref="d2Crud"
      style="height: 800px; margin: 15px"
      v-bind="_crudProps"
      v-on="_crudListeners"
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
      <template slot="caseMarkFormSlot">
        {{ caseMark }}
        <br>
        <el-select v-model="value" clearable placeholder="选择能力点" style="margin-bottom: 15px">
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
  name: 'TestPage',
  mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
  data() {
    return {
      options: [],
      caseMark: '选择能力点后生成',
      value: ''
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
        url: process.env.VUE_APP_BASE_API + '/system/item/generateMark',
        data: qs.stringify({
          currentItem: this.currentItem,
          currentAbility: this.value
        })
      })
    },
    getCrudOptions() { return crudOptions(this) },
    pageRequest(query) { return GetList(query) }, // 数据请求
    addRequest(row) { return AddObj(row) }, // 添加请求
    updateRequest(row) { return UpdateObj(row) }, // 修改请求
    delRequest(row) { return DelObj(row.id) } // 删除请求
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
