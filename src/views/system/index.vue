<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--侧边分类数据-->
      <el-col :xs="9" :sm="6" :md="5" :lg="4" :xl="4">
        <div class="head-container">
          <el-input v-model="filterText" size="small" placeholder="树形搜索栏" style="margin-bottom:10px;" />
        </div>
        <el-tree
          ref="tree2"
          :data="treeData"
          :props="defaultProps"
          :filter-node-method="filterNode"
          class="filter-tree"
          default-expand-all
        />
      </el-col>
      <!--用户数据-->
      <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
        <!--工具栏-->
        <div class="head-container">
          <div v-show="showSearch">
            <!-- 搜索 -->
            <el-input
              clearable
              size="small"
              placeholder="输入用例标识搜索"
              style="width: 200px; margin-bottom: 10px"
              class="filter-item"
            />
            <span>
              <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" style="margin-left: 10px">搜索</el-button>
              <el-button class="filter-item" size="mini" icon="el-icon-refresh-left" @click="handleResult">重置</el-button>
            </span>
          </div>
          <div class="crud-opts" style="margin-bottom: 5px">
            <span class="crud-opts-left" style="">
              <!--左侧插槽-->
              <slot name="left" />
              <el-button
                size="mini"
                type="primary"
                plain
                icon="el-icon-plus"
                @click="handleAdd"
              >
                新增
              </el-button>
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
        <el-dialog :visible.sync="addFormVisible" append-to-body :close-on-click-modal="false" width="900px" title="新增测试项目">
          <el-form ref="elForm" size="medium" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="用例标识" prop="field102">
                  <div :style="{width: '100%'}">自动生成-项目名1
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="测试追踪" prop="field103">
                  <el-input placeholder="请输入测试追踪" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="测试方法" prop="field106">
                  <el-select placeholder="请选择测试方法" clearable :style="{width: '100%'}" value />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="测试说明" prop="field105">
                  <el-input placeholder="请输入测试说明" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="前提与约束" prop="field109">
                  <el-input
                    type="textarea"
                    placeholder="请输入前提与约束"
                    :autosize="{minRows: 4, maxRows: 4}"
                    :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="终止条件" prop="field112">
                  <el-input
                    type="textarea"
                    placeholder="请输入终止条件"
                    :autosize="{minRows: 4, maxRows: 4}"
                    :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="输入及操作说明" prop="field111">
                  <el-input
                    type="textarea"
                    placeholder="请输入输入及操作说明"
                    :autosize="{minRows: 4, maxRows: 4}"
                    :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="期望测试结果" prop="field110">
                  <el-input
                    type="textarea"
                    placeholder="请输入期望测试结果"
                    :autosize="{minRows: 4, maxRows: 4}"
                    :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="评估准则" prop="field108">
                  <el-input
                    type="textarea"
                    placeholder="请输入评估准则"
                    :autosize="{minRows: 4, maxRows: 4}"
                    :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注" prop="field107">
                  <el-input
                    type="textarea"
                    placeholder="请输入备注"
                    :autosize="{minRows: 4, maxRows: 4}"
                    :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer">
            <el-button @click="cancelForm">取消</el-button>
            <el-button type="primary" @click="handelConfirm">确定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="executionFormVisible" append-to-body :close-on-click-modal="false" title="测试实施">
          <el-form ref="elForm" size="medium" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="测试版本" prop="field102">
                  <el-input placeholder="请输入测试版本" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="执行日期" prop="field117">
                  <el-date-picker
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :style="{width: '100%'}"
                    placeholder="请选择执行日期"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="实际结果" prop="field103">
                  <el-input placeholder="请输入实际结果" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="测试人员" prop="field115">
                  <el-input placeholder="请输入测试人员" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="执行结果" prop="field105">
                  <el-input placeholder="请输入执行结果" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="测试监督员" prop="field113">
                  <el-input placeholder="请输入测试监督员" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="问题标识" prop="field114">
                  <el-input placeholder="请输入问题标识" clearable :style="{width: '100%'}" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="备注" prop="field118">
                  <el-input
                    type="textarea"
                    placeholder="请输入备注"
                    :autosize="{minRows: 4, maxRows: 4}"
                    :style="{width: '100%'}"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="handelConfirm">确定</el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="resultFormVisible" append-to-body :close-on-click-modal="false" width="850px" title="测试情况查看">
          <el-table
            ref="table"
            style="width: 100%;"
            :data="list"
            :row-style="{height: '80px'}"
          >
            <el-table-column :show-overflow-tooltip="true" width="60" prop="id" label="序号">
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" width="100" prop="caseMark" label="测试人员">
              <template slot-scope="scope">
                {{ scope.row.caseMark }}
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" width="100" prop="track" label="执行时间">
              <template slot-scope="scope">
                {{ scope.row.testMethod }}
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" width="100" prop="testDescription" label="测试版本">
              <template slot-scope="scope">
                {{ scope.row.testDescription }}
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" width="100" prop="preCons" label="实际测试结果">
              <template slot-scope="scope">
                {{ scope.row.premiseConstraint }}
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" width="100" prop="endCondition" label="执行结果">
              <template slot-scope="scope">
                {{ scope.row.endCondition }}
              </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" width="120" prop="opDescription" label="问题标识">
              <template slot-scope="scope">
                {{ scope.row.operatingDescription }}
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
        </el-dialog>
        <el-dialog :visible.sync="problemFormVisible" append-to-body :close-on-click-modal="false" width="500px" title="BUG创建">
          <el-row :gutter="15">
            <el-form
              ref="elForm"
              size="medium"
              label-width="100px"
              label-position="left"
            >
              <el-col :span="24">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="问题标识" prop="field102">
                      <el-input
                        placeholder="请输入问题标识"
                        clearable
                        :style="{width: '100%'}"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="问题类别" prop="field103">
                      <el-input
                        placeholder="请输入问题类别"
                        clearable
                        :style="{width: '100%'}"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="问题级别" prop="field104">
                      <el-input
                        placeholder="请输入问题级别"
                        clearable
                        :style="{width: '100%'}"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="问题描述" prop="field105">
                      <el-input
                        placeholder="请输入问题描述"
                        clearable
                        :style="{width: '100%'}"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="备注" prop="field106">
                      <el-input
                        type="textarea"
                        placeholder="请输入备注"
                        :autosize="{minRows: 4, maxRows: 4}"
                        :style="{width: '100%'}"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-form>
          </el-row>
          <div slot="footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="handelConfirm">确定</el-button>
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
          <el-table-column :show-overflow-tooltip="true" width="100" prop="caseMark" label="用例标识">
            <template slot-scope="scope">
              {{ scope.row.caseMark }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="100" prop="track" label="测试追踪">
            <template slot-scope="scope">
              {{ scope.row.testTrack }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="100" prop="method" label="测试方法">
            <template slot-scope="scope">
              {{ scope.row.testMethod }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="100" prop="testDescription" label="测试说明">
            <template slot-scope="scope">
              {{ scope.row.testDescription }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="100" prop="preCons" label="前提与约束">
            <template slot-scope="scope">
              {{ scope.row.premiseConstraint }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="100" prop="endCondition" label="终止条件">
            <template slot-scope="scope">
              {{ scope.row.endCondition }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="120" prop="opDescription" label="输入及操作说明">
            <template slot-scope="scope">
              {{ scope.row.operatingDescription }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="120" prop="expectedResult" label="期望测试结果">
            <template slot-scope="scope">
              {{ scope.row.expectedResult }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" width="120" prop="criteria" label="评估准则">
            <template slot-scope="scope">
              {{ scope.row.evaluationCriteria }}
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
                <el-dropdown trigger="click" style="margin-right: 5px;font-size: small">
                  <el-button size="mini" type="primary" icon="el-icon-caret-bottom" plain />
                  <el-dropdown-menu slot="dropdown" class="opts-dropdown">
                    <el-dropdown-item @click.native="handleAdd">按此模板新建</el-dropdown-item>
                    <el-dropdown-item @click.native="handleAdd">修改</el-dropdown-item>
                    <el-dropdown-item @click.native="handleExecution">测试实施</el-dropdown-item>
                    <el-dropdown-item @click.native="handleProblem">测试情况查看</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button size="mini" type="danger" icon="el-icon-delete" plain @click="handleDelete" />
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
      executionFormVisible: false,
      resultFormVisible: false,
      problemFormVisible: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      treeData: [{
        'id': '1',
        'label': '大分类1',
        'children': [
          {
            'id': '2',
            'label': '中分类2'
          },
          {
            'id': '3',
            'label': '中分类3'
          },
          {
            'id': '4',
            'label': '中分类4',
            'children': [
              {
                'id': '5',
                'label': '小分类5'
              }
            ]
          }
        ]
      }],
      filterText: '',
      list: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    fetchData() {
      var vm = this
      this.axios({
        headers: {
          'Authorization': getToken()
        },
        method: 'post',
        url: process.env.VUE_APP_BASE_API + '/system/item/pageInfo',
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
    handleExecution() {
      this.executionFormVisible = true
    },
    handleResult() {
      this.resultFormVisible = true
    },
    handleProblem() {
      this.problemFormVisible = true
    },
    // handleDelete() {
    //   var vm = this
    //   this.axios({
    //     headers: {
    //       'Authorization': getToken()
    //     },
    //     method: 'post',
    //     url: 'http://localhost:8090/system/item/delete',
    //     data: qs.stringify({
    //       id: vm.scope.row.id
    //     })
    //   }).then(function(resp) {
    //     vm.total = resp.data.data.total
    //     vm.list = resp.data.data.list
    //   })
    // },
    cancelForm() {
      this.addFormVisible = false
      this.executionFormVisible = false
      this.resultFormVisible = false
      this.problemFormVisible = false
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
