<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col>
        <!--工具栏-->
        <div class="head-container">
          <div v-show="showSearch">
            <!-- 搜索 -->
            <el-input
              clearable
              size="small"
              placeholder="输入问题标识搜索"
              style="width: 200px; margin-bottom: 10px"
              class="filter-item"
            />
            <span>
              <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" style="margin-left: 10px">搜索</el-button>
              <el-button class="filter-item" size="mini" icon="el-icon-refresh-left">重置</el-button>
            </span>
          </div>
          <div class="crud-opts" style="margin-bottom: 5px">
            <span class="crud-opts-left">
              <!--左侧插槽-->
              <slot name="left" />
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="mini"
              >
                删除
              </el-button>
              <el-button
                size="mini"
                type="warning"
                plain
                icon="el-icon-download"
              >
                导出
              </el-button>
              <!--右侧-->
              <slot name="right" />
            </span>
            <RightToolbar :show-search.sync="showSearch" @queryTable="fetchData" />
          </div>
        </div>
        <!--表单渲染-->
        <el-dialog :visible.sync="addFormVisible" append-to-body :close-on-click-modal="false" width="800px">
          <el-form ref="form" :inline="true" size="big" label-width="100px">
            <el-form-item label="测试用例标识" prop="itemMark">
              <el-input />
            </el-form-item>
            <el-form-item label="测试追踪" prop="problemMark">
              <el-input />
            </el-form-item>
            <el-form-item label="测试方法" prop="caseNumber">
              <el-select value />
            </el-form-item>
            <el-form-item label="测试说明" prop="problemType">
              <el-input />
            </el-form-item>
            <el-form-item label="前提与约束" prop="problemLevel">
              <el-input />
            </el-form-item>
            <el-form-item label="终止条件" prop="problemDescription">
              <el-input />
            </el-form-item>
            <el-form-item label="输入及操作说明" prop="ddDescription">
              <el-input />
            </el-form-item>
            <el-form-item label="备注" prop="comment">
              <el-input type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancelForm">取消</el-button>
            <el-button type="primary">确认</el-button>
          </div>
        </el-dialog>
        <!--表格渲染-->
        <el-table
          ref="table"
          style="width: 100%;"
          :data="list"
          :row-style="{height: '80px'}"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column :show-overflow-tooltip="true" width="60" prop="id" label="序号">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="100" prop="problemMark" label="问题标识">
            <template slot-scope="scope">
              {{ scope.row.problemMark }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="100" prop="problemType" label="问题类别">
            <template slot-scope="scope">
              {{ scope.row.problemType }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="100" prop="problemLevel" label="问题级别">
            <template slot-scope="scope">
              {{ scope.row.problemLevel }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="100" prop="problemDescription" label="问题说明">
            <template slot-scope="scope">
              {{ scope.row.problemDescription }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="100" prop="caseNumber" label="用例标识">
            <template slot-scope="scope">
              {{ scope.row.caseNumber }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="120" prop="testVersion" label="测试版本">
            <template slot-scope="scope">
              {{ scope.row.testCaseTest.testVersion }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="120" prop="testBy" label="测试人员">
            <template slot-scope="scope">
              {{ scope.row.testCaseTest.testBy }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="120" prop="supervisedBy" label="监督人员">
            <template slot-scope="scope">
              {{ scope.row.testCaseTest.supervisedBy }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="120" prop="executionDate" label="执行日期">
            <template slot-scope="scope">
              {{ scope.row.testCaseTest.executionDate }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="120" prop="comment" label="备注">
            <template slot-scope="scope">
              {{ scope.row.comment }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="115"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <div
                :data="scope"
              >
                <el-button size="mini" type="primary" icon="el-icon-edit" plain style="width: 44%;" />
                <el-button size="mini" type="danger" icon="el-icon-delete" plain style="width: 44%;" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <Pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index.vue'
import qs from 'qs'
import { getToken } from '@/utils/auth'
import RightToolbar from '@/components/RightToolbar'

export default {
  components: { RightToolbar, Pagination },
  data() {
    return {
      // 显示搜索条件
      showSearch: true,
      addFormVisible: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      filterText: '',
      list: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      var vm = this
      this.axios({
        headers: {
          'Authorization': getToken()
        },
        method: 'post',
        url: process.env.VUE_APP_BASE_API + '/system/bug/pageInfo',
        data: qs.stringify({
          pageNum: vm.listQuery.page,
          pageSize: vm.listQuery.limit
        })
      }).then(function(resp) {
        vm.total = resp.data.data.total
        vm.list = resp.data.data.list
      })
    },
    handleAdd() {
      this.addFormVisible = true
    },
    cancelForm() {
      this.addFormVisible = false
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
