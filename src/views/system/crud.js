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
        disabled: true,
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          slot: true,
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请选择能力点生成序号' }]
        }
      },
      {
        title: '分类标识',
        key: 'classificationMark',
        disabled: true,
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          slot: true,
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请选择能力点生成序号' }]
        }
      },
      {
        title: '用例标识',
        key: 'caseMark',
        search: {}, // 启用查询
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          slot: true,
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请选择能力点生成序号' }]
        }
      },
      {
        title: '测试追踪',
        key: 'testTrack',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'select', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入测试追踪' }
          ]
        },
        dict: {
          data: [
            {
              value: '产品说明符合性',
              label: '产品说明符合性',
              disabled: false
            },
            {
              value: '软件符合性',
              label: '软件符合性',
              disabled: false
            },
            {
              value: '用户文档集符合性',
              label: '用户文档集符合性',
              disabled: false
            }
          ]
        }
      },
      {
        title: '测试方法',
        key: 'testMethod',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'select', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请选择测试方法' }
          ]
        },
        dict: {
          data: [
            {
              value: '边界值法',
              label: '边界值法',
              disabled: false
            },
            {
              value: '因果图法',
              label: '因果图法',
              disabled: false
            },
            {
              value: '等价分类法',
              label: '等价分类法',
              disabled: false
            },
            {
              value: '场景法',
              label: '场景法',
              disabled: false
            },
            {
              value: '错误推测法',
              label: '错误推测法',
              disabled: false
            }
          ]
        }
      },
      {
        title: '测试说明',
        key: 'testDescription',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'slot', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          // rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
          //   { required: true, message: '请输入测试说明' }
          // ]
        },
        rowSlot: true
      },
      {
        title: '前提与约束',
        key: 'premiseConstraint',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text-area', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入前提与约束' }
          ]
        }
      },
      {
        title: '终止条件',
        key: 'endCondition',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text-area', // 字段类型为选择框
        form: {
          rules: [{ required: true, message: '请输入终止条件' }]
        }
      },
      {
        title: '输入及操作说明',
        key: 'operatingDescription',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入操作说明' }
          ]
          // component: {
          //   props: {
          //     uploader: {
          //       type: 'form'
          //     }
          //   }
          // }
        }
      },
      {
        title: '期望结果',
        key: 'expectedResult',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入期望结果' }
          ]
        }
      },
      {
        title: '评估准则',
        key: 'evaluationCriteria',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text-area', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
            { required: true, message: '请输入评估准则' }
          ]
        }
      },
      {
        title: '备注',
        key: 'comment',
        search: { // 查询配置，默认启用查询
          disabled: true // 【可选】true禁止查询,默认为false
        },
        type: 'text-area', // 字段类型为选择框
        form: { // 配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
          // rules: [ // 【可选】添加和修改时的校验规则，不配置则不校验
          //   { required: true, message: '请输入备注' }
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
      },
      custom: [
        // {
        //   text: '按此模板新建',
        //   size: 'small',
        //   icon: 'el-icon-edit-outline',
        //   emit: 'custom-emit-create'
        // },
        {
          text: '测试情况查看',
          size: 'small',
          icon: 'el-icon-more-outline',
          emit: 'custom-emit-result'
        }
      ]
    },
    pageOptions: {
      export: {
        local: true // 本地导出，false为服务端导出
      }
    }
  }
}
