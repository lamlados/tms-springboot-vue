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
        width: '80px',
        form: { // form表单的配置
          slot: true,
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请生成项目标识' }]
        }
      },
      {
        title: '问题标识',
        key: 'problemMark',
        search: {}, // 启用查询
        type: 'text', // 字段类型为选择框
        form: { // form表单的配置
          slot: true,
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请生成问题标识' }]
        }
      },
      {
        title: '问题类型',
        key: 'problemType',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'select', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入问题类型' }
          ]
        },
        dict: {
          data: [
            {
              value: 1,
              label: '设计问题',
              disabled: false
            },
            {
              value: 2,
              label: '文档问题',
              disabled: false
            },
            {
              value: 3,
              label: '程序问题',
              disabled: false
            },
            {
              value: 4,
              label: '规范性问题',
              disabled: false
            }
          ]
        }
      },
      {
        title: '问题级别',
        key: 'problemLevel',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'select', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入问题级别' }
          ]
        },
        dict: {
          data: [
            {
              value: 1,
              label: '一般',
              disabled: false
            },
            {
              value: 2,
              label: '建议',
              disabled: false
            },
            {
              value: 3,
              label: '严重',
              disabled: false
            },
            {
              value: 4,
              label: '致命',
              disabled: false
            }
          ]
        }
      },
      {
        title: '问题描述',
        key: 'problemDescription',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入问题描述' }
          ]
        }
      },
      {
        title: '用例序号',
        key: 'caseNumber',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // form表单的配置
          slot: true,
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请生成项目标识' }]
        }
      },
      {
        title: '测试版本',
        key: 'testCaseTest.testVersion',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: {
          disabled: true
          // rules: [{ required: true, message: '请输入终止条件' }]
        }
      },
      {
        title: '测试人员',
        key: 'testCaseTest.testBy',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          disabled: true
        }
      },
      {
        title: '监督人员',
        key: 'testCaseTest.supervisedBy',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          disabled: true
        }
      },
      {
        title: '执行日期',
        key: 'testCaseTest.executionDate',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          disabled: true
        }
      },
      {
        title: '备注',
        key: 'comment',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
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
