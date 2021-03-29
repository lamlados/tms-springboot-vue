export const crudOptions = (vm) => { // vm即this
  return {
    columns: [
      {
        title: '序号',
        key: 'id',
        sortable: true,
        type: 'text',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        width: '80px',
        form: { // form表单的配置
          disabled: true // 禁止添加输入与修改输入【可选】默认false
        }
      },
      {
        title: '测试人员',
        key: 'testBy',
        disabled: true,
        search: {}, // 启用查询
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          slot: true,
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入测试人员' }]
        }
      },
      {
        title: '执行时间',
        key: 'executionDate',
        disabled: true,
        search: {}, // 启用查询
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          slot: true,
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请选择执行时间' }]
        }
      },
      {
        title: '测试版本',
        key: 'testVersion',
        search: {}, // 启用查询
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          slot: true,
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请选择测试版本' }]
        }
      },
      {
        title: '实际测试结果',
        key: 'actualResult',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入实际测试结果' }
          ]
        }
      },
      {
        title: '执行结果',
        key: 'executionResult',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入执行结果' }
          ]
        }
      },
      {
        title: '问题标识',
        key: 'problemMark',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          // rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
          //   { required: true, message: '请输入测试说明' }
          // ]
        }
      }
    ],
    rowHandle: { // https://greper.github.io/d2-crud-plus/d2-crud-x/row-handle.html#custom
      edit: {
        type: 'warning',
        show: true
      },
      remove: {
        type: 'dangerous',
        show: true
      }
    }
  }
}
