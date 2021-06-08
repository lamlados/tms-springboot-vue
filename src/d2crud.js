import { d2CrudPlus } from 'd2-crud-plus'
// import d2Crud from '@d2-projects/d2-crud' 【d2-crud官方已停止维护，推荐使用增强版d2-crud-x】
// 推荐将d2-crud替换为d2-crud-x【使用方式基本与d2-crud一致】
import d2CrudX from 'd2-crud-x'
import Vue from 'vue'
import request from '@/utils/request' // 你项目http请求用的什么就引入什么
import { D2pFileUploader, D2pUploader } from 'd2p-extends'

Vue.use(d2CrudX, { name: 'd2-crud-x' }) // 注册名称为d2-crud-x ，不传name则使用d2-crud作为标签名称

Vue.use(D2pFileUploader, { d2CrudPlus })
Vue.use(D2pUploader, {
  defaultType: 'form', // 默认类型为腾讯云上传，可选值：【cos、qiniu、alioss、form】
  form: { // 本地服务端上传
    action: '', // 上传url
    name: 'file', // 上传时文件的参数名
    data: {}, // 上传附加参数
    headers: {}, // 上传请求头
    successHandle(res) { // 上传成功后，后台返回结果处理
      return { url: res.data } // data是该文件的url
    },
    withCredentials: false // 是否带cookie
  }
  // ,buildKey(){} //key生成规则方法，也可以配置在组件的uploader参数里面，默认根据时间日期和文件名称生成
})

Vue.use(d2CrudPlus, {
  starTip: false,
  // 获取数据字典的请求方法
  // 可在dict中配置getData方法覆盖此全局方法
  getRemoteDictFunc(url, dict) {
    return request({ // 用你项目中的http请求
      url: url,
      method: 'get'
    }).then(ret => {
      return ret.data // 返回字典数组
    })
  },
  commonOption() { // d2-crud option 全局配置，每个页面的crudOptions会以全局配置为基础进行覆盖
    return {
      format: {
        response(ret) {
          // 这里默认配置是  return ret.data
          return ret.data
        },
        page: { // page接口返回的数据结构配置，
          request: { // 请求参数
            current: 'pageNum', // 当前
            size: 'pageSize'
          },
          response: { // 返回结果
            current: 'pageNum', // 当前页码 ret.data.current
            size: 'pageSize', // 每页条数，ret.data.size
            // size: (data) => { return data.size }, // 你也可以配置一个方法，自定义返回
            total: 'total', // 总记录数 ret.data.total
            records: 'list' // 列表数组 ret.data.list
          }
        }
      },
      formOptions: {
        defaultSpan: 12 // 默认的表单 span
      },
      options: {
        height: '100%' // 表格高度100%，此时d2-crud-x外部容器必须有高度, 使用toolbar必须设置
      },
      pageOptions: {
        compact: false // 是否紧凑型页面
      },
      viewOptions: {
        disabled: true // 开启查看按钮
      },
      searchOptions: { // 查询配置参数, 支持el-form的配置参数
        size: 'small',
        show: true, // 是否显示搜索工具条
        disabled: false, // 是否禁用搜索工具条
        debounce: { // 自动查询防抖,debounce:false关闭自动查询
          wait: 500 // 延迟500毫秒
        },
        searchAfterReset: true // 点击重置后是否立即查询
      },
      rowHandle: {
        // 行操作栏，与d2-crud一致，默认配置有修改与删除
        width: 190, // 操作列宽度
        fixed: 'right',
        title: '操作', // 操作列名
        edit: {}, // 编辑按钮,配置同上
        remove: {}, // 删除按钮,配置同上
        custom: [// 自定义按钮
          {
            // 配置同上
            // 点击事件,需要在<d2-crud-x @custom-emit="yourHandle"/>
            emit: 'custom-emit'
          }
        ],
        dropdown: { // 配置false关闭dropdown
          // atLeast 至少几个以上按钮才收入下拉框中，配置0全部按钮收入下拉框
          // 注意show=false的按钮也会计算在内（行编辑按钮默认是隐藏的也会占一个位置，虽然它没有显示）
          atLeast: 2,
          text: '更多' // 按钮文字
        }
      }
    }
  }
})
