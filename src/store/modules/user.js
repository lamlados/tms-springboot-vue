import { login, logout, getUserInfo } from '@/api/user'
import { getToken, getHeader, setToken, removeToken } from '@/utils/auth'
// import Cookies from 'js-cookie'

const user = {
  state: {
    token: getToken(),
    header: getHeader(),
    username: '',
    userinfo: {}
  },

  mutations: {
    SET_TOKEN: (state, header, token) => {
      state.header = header
      state.token = token
    },
    SET_USER_INFO: (state, user) => {
      state.username = user.username
      state.userinfo = user
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.data
          const tokenValue = result.prefix + result.value
          setToken(result.header, tokenValue)
          commit('SET_TOKEN', result.header, tokenValue)
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
          commit('SET_USER_INFO', result)
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
