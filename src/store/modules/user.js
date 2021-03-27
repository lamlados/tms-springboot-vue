import { login, logout, getUserInfo } from '@/api/user'
import { getToken, getHeader, setToken, removeToken } from '@/utils/auth'
import { getTestItem } from '@/utils/dict'

const user = {
  state: {
    token: getToken(),
    header: getHeader(),
    username: '',
    userinfo: {},
    testItem: getTestItem(),
    currentItem: ''
  },

  mutations: {
    SET_TOKEN: (state, header, token) => {
      state.header = header
      state.token = token
    },
    SET_USER_INFO: (state, user) => {
      state.username = user.username
      state.userinfo = user
    },
    SET_ITEM: (state, item) => {
      state.currentItem = item
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            const result = response.data
            const tokenValue = result.prefix + result.value
            setToken(result.header, tokenValue)
            commit('SET_TOKEN', result.header, tokenValue)
            commit('SET_ITEM', userInfo.currentItem)
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const result = response.data
          const item = response.data.currentItem
          commit('SET_USER_INFO', result)
          commit('SET_ITEM', item)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_USER_INFO', '')
          commit('SET_TOKEN', '', '')
          commit('SET_ITEM', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USER_INFO', '')
        commit('SET_TOKEN', '', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
