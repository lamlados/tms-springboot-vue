<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="status-container">
        测试项目： {{ ongoingItem }}
        当前用户：{{ name }}
      </div>
      <div class="item-switch-container">
        <el-select v-model="testItem.value" clearable placeholder="选择测试项目" style="margin-right: 5px">
          <el-option
            v-for="item in testItem"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
        <el-button @click="switchItem">切换</el-button>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img alt="" :src="Avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/lamlados/tms-springboot-vue">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Avatar from '@/assets/avatar.png'
import { getToken } from '@/utils/auth'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      Avatar: Avatar,
      options: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'testItem',
      'ongoingItem'
    ])
  },
  created() {
    this.fetchData()
    // if (localStorage.getItem('store')) {
    //   // replaceState替换数据 Object.assign合并对象
    //   this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem('store'))))
    // }
    // // 在页面刷新时将vuex里的信息保存到localStorage里，onbeforeunload在页面刷新前。
    // window.addEventListener('beforeunload', () => {
    //   localStorage.setItem('store', JSON.stringify(this.$store.state))
    //   console.log(JSON.stringify(this.$store.state))
    // })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    fetchData() {
      var vm = this
      this.axios({
        headers: {
          'Authorization': getToken()
        },
        method: 'Get',
        url: process.env.VUE_APP_BASE_API + '/system/testItem'
      }).then(function(resp) {
        vm.options = resp.data.data
      })
    },
    switchItem() {
      location.reload()
    }

  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .status-container{
      font-size: 14px;
      color: #303133;
      float: left;
      margin-right: 15px;
    }
    .item-switch-container{
      float: left;
      margin-right: 5px;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }

}
</style>
