<template>
  <div :class="{'page-compact':crud.pageOptions.compact}">
    <template slot="header">问题页面</template>
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
      <template slot="itemMarkFormSlot" slot-scope="scope">
        <el-input
          id="txtItemMark"
          v-model="scope.form.itemMark"
          name="txtItemMark"
          placeholder="待生成"
          readonly
          style="margin-bottom: 15px"
        />
      </template>
      <template slot="problemMarkFormSlot" slot-scope="scope">
        <el-input
          id="txtProblemMark"
          v-model="scope.form.problemMark"
          name="txtProblemMark"
          placeholder="待生成"
          readonly
          style="margin-bottom: 15px"
        />
      </template>
      <template slot="caseNumberFormSlot" slot-scope="scope">
        <el-input
          id="txtCaseNumber"
          v-model="scope.form.caseNumber"
          name="txtCaseNumber"
          placeholder="待生成"
          readonly
          style="margin-bottom: 15px"
        />
        <br>
        <el-button @click="generateMark">生成序号</el-button>
      </template>
    </d2-crud-x>
  </div>
</template>

<script>
import { crudOptions } from './crud' // 上文的crudOptions配置
import { d2CrudPlus } from 'd2-crud-plus'
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import {getToken} from "@/utils/auth";
import qs from "qs"; // 查询添加修改删除的http请求接口
export default {
  name: 'BugPage',
  mixins: [d2CrudPlus.crud], // 最核心部分，继承d2CrudPlus.crud
  methods: {
    getCrudOptions() { return crudOptions(this) },
    pageRequest(query) { return GetList(query) }, // 数据请求
    addRequest(row) { return AddObj(row) }, // 添加请求
    updateRequest(row) { return UpdateObj(row) }, // 修改请求
    delRequest(row) { return DelObj(row.id) }, // 删除请求
    showAddDialog() {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    generateMark() {
      this.axios({
        headers: {
          'Authorization': getToken()
        },
        method: 'post',
        url: process.env.VUE_APP_BASE_API + '/system/bug/generateMark',
        data: qs.stringify({
        })
      }).then((response, row) => {
        var inp1 = document.querySelector('#txtCaseNumber')
        inp1.value = response.data.data[1]
        inp1.dispatchEvent(new Event('input'))
        var inp2 = document.querySelector('#txtItemMark')
        inp2.value = response.data.data[0]
        inp2.dispatchEvent(new Event('input'))
        var inp3 = document.querySelector('#txtProblemMark')
        inp3.value = response.data.data[2]
        inp3.dispatchEvent(new Event('input'))
      })
    }
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
