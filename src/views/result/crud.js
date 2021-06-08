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
        title: '项目标识',
        key: 'itemMark',
        type: 'text',
        disabled: true,
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        form: { // form表单的配置
          slot: true,
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请生成项目标识' }]
        }
      },
      {
        title: '测试用例标识',
        key: 'caseMark',
        type: 'text',
        disabled: true,
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        form: { // form表单的配置
          slot: true,
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请生成用例测试号' }]
        }
      },
      {
        title: '测试人员',
        key: 'testBy',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入测试人员' }]
        }
      },
      {
        title: '执行时间',
        key: 'executionDate',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'datetime', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请选择执行时间' }],
          component: {
            name: 'el-date-picker',
            props: {
              type: 'datetime',
              format: 'yyyy-MM-dd HH:mm:ss',
              value_format: 'yyyy-MM-dd HH:mm:ss'
            }
          }
        }
      },
      {
        title: '测试版本',
        key: 'testVersion',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
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
        title: '监督人员',
        key: 'supervisedBy',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入监督人员' }
          ]
        }
      },
      {
        title: '执行结果',
        key: 'executionResult',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'select', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入执行结果' }
          ]
        },
        dict: {
          data: [
            {
              value: '通过',
              label: '通过',
              disabled: false
            },
            {
              value: '不通过',
              label: '不通过',
              disabled: false
            }
          ]
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
