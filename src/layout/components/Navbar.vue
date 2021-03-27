<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="status-container">
        测试项目： {{ currentItem }}
        当前用户：{{ name }}
      </div>
      <div class="item-switch-container">
        <el-select v-model="value" clearable placeholder="选择测试项目" style="margin-right: 5px">
          <el-option
            v-for="item in options"
            :key="item.dictType"
            :label="item.dictContent"
            :value="item.dictContent"
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
import { getTestItem } from '@/utils/dict'
import { getToken } from '@/utils/auth'
import qs from 'qs'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      Avatar: Avatar,
      options: [],
      value: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'currentItem'
    ])
  },
  mounted() {
    // this.currentItem.value = { roomCode: '' }
    this.options = getTestItem().then(response => {
      this.options = response.data
    })
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
    switchItem() {
      this.axios({
        headers: {
          'Authorization': getToken()
        },
        method: 'post',
        url: process.env.VUE_APP_BASE_API + '/system/item/switchItem',
        data: qs.stringify({
          user: this.name,
          currentItem: this.value
        })
      })
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
