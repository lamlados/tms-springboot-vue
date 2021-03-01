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
          <div>
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
              <el-button class="filter-item" size="mini" icon="el-icon-refresh-left">重置</el-button>
            </span>
          </div>
          <div class="crud-opts" style="margin-bottom: 5px">
            <span class="crud-opts-left">
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
                size="mini"
                type="success"
                plain
                icon="el-icon-edit"
              >
                修改
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
            <el-button-group class="crud-opts-right" style="float: right">
              <el-button
                size="mini"
                plain
                type="info"
                icon="el-icon-search"
              />
              <el-button
                size="mini"
                icon="el-icon-refresh"
              />
              <el-popover
                placement="bottom-end"
                width="150"
                trigger="click"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  icon="el-icon-s-grid"
                >
                  <i
                    class="fa fa-caret-down"
                    aria-hidden="true"
                  />
                </el-button>
                <el-checkbox>
                  全选
                </el-checkbox>
              </el-popover>
            </el-button-group>
          </div>
        </div>
        <!--表单渲染-->
        <el-dialog :visible.sync="addFormVisible" append-to-body :close-on-click-modal="false" width="800px">
          <el-form ref="form" :inline="true" size="big" label-width="100px">
            <el-form-item label="测试用例标识" prop="caseMark">
              <el-input />
            </el-form-item>
            <el-form-item label="测试追踪" prop="testTrack">
              <el-input />
            </el-form-item>
            <el-form-item label="测试方法" prop="testMethod">
              <el-select value />
            </el-form-item>
            <el-form-item label="测试说明" prop="testDescription">
              <el-input />
            </el-form-item>
            <el-form-item label="前提与约束" prop="preCon">
              <el-input type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="终止条件" prop="endConditions">
              <el-input type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="输入及操作说明" prop="ddDescription">
              <el-input type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="期望测试结果" prop="expectedResult">
              <el-input type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="评估准则" prop="criteria">
              <el-input type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="comment">
              <el-input type="textarea" placeholder="请输入内容"></el-input>
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
                <el-button size="mini" type="primary" icon="el-icon-arrow-down" plain style="margin-right: 5px" />
                <el-popover placement="top" width="180" trigger="manual">
                  <p>msg</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text">取消</el-button>
                    <el-button type="primary" size="mini">确定</el-button>
                  </div>
                  <el-button type="danger" icon="el-icon-delete" size="mini" />
                </el-popover>
                <el-button size="mini" type="danger" icon="el-icon-delete" plain />
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

export default {
  components: { Pagination },
  data() {
    return {
      addFormVisible: false,
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
        url: 'http://localhost:8090/system/item/pageInfo',
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

