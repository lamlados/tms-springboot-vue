<template>
  <div class="crud-opts-right" style="float: right">
    <el-button-group>
      <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top">
        <el-button
          size="mini"
          icon="el-icon-search"
          divided
          @click="toggleSearch()"
        />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button
          size="mini"
          icon="el-icon-refresh"
          @click="refresh()"
        />
      </el-tooltip>
<!--      <el-tooltip class="item" effect="dark" content="显隐列" placement="top">-->
<!--        <el-popover-->
<!--          placement="bottom-end"-->
<!--          width="150"-->
<!--          trigger="click"-->
<!--        >-->
<!--          <el-button-->
<!--            slot="reference"-->
<!--            size="mini"-->
<!--            icon="el-icon-s-grid"-->
<!--          >-->
<!--            <i-->
<!--              class="fa fa-caret-down"-->
<!--              aria-hidden="true"-->
<!--            />-->
<!--          </el-button>-->
<!--          <el-checkbox>-->
<!--            全选-->
<!--          </el-checkbox>-->
<!--          <el-checkbox>-->
<!--            {{ item.label }}-->
<!--          </el-checkbox>-->
<!--        </el-popover>-->
<!--      </el-tooltip>-->
    </el-button-group>
  </div>
</template>

<script>
export default {
  name: 'RightToolbar',
  props: {
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 显隐数据
      value: [],
      // 弹出层标题
      title: '显示/隐藏',
      // 是否显示弹出层
      open: false,
      tableColumns: [],
      allColumnsSelected: true,
      allColumnsSelectedIndeterminate: false,
      ignoreNextTableColumnsChange: false
    }
  },
  methods: {
    // 搜索
    toggleSearch() {
      this.$emit('update:showSearch', !this.showSearch)
    },
    // 刷新
    refresh() {
      this.$emit('queryTable')
    }
  }
}
</script>

<style scoped>

</style>
