<template>
  <div class="login-container" :style="'background-image:url('+ Background +');'">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <el-form-item prop="currentItem">
        <el-select v-model="loginForm.currentItem" placeholder="请选择测试项目" style="width: 115%">
          <el-option
            v-for="item in options"
            :key="item.dicType"
            :label="item.dictContent"
            :value="item.dictContent"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          class="form-input"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名"
          tabindex="1"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          :type="pwdType"
          class="form-input"
          placeholder="请输入密码"
          name="password"
          auto-complete="on"
          tabindex="2"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="16">

          <el-form-item prop="codeText">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              v-model="loginForm.codeText"
              class="code-text"
              name="codeText"
              type="text"
              maxlength="100"
              auto-complete="on"
              placeholder="请输入验证码"
              tabindex="3"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-tooltip content="点击刷新" placement="right" effect="light">
            <el-image :src="codeUrl" style="cursor:pointer;" fit="fit" @click="changeImageCode"/>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
import Background from '@/assets/background.jpg'
import { getTestItem } from '@/utils/dict'

export default {
  name: 'Login',
  data() {
    const validateTestItem = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('请选择测试项目！'))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('用户名不能小于5位！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不得少于5位！'))
      } else {
        callback()
      }
    }
    const validateCodeText = (rule, value, callback) => {
      if (value.length !== 4) {
        callback(new Error('输入4位验证码！'))
      } else {
        callback()
      }
    }
    return {
      options: [],
      Background: Background,
      loginForm: {
        username: 'lamlados',
        password: 'hurrican3',
        codeKey: '',
        codeText: '',
        currentItem: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        codeText: [{ required: true, trigger: 'blur', validator: validateCodeText }],
        currentItem: [{ required: true, trigger: 'blur', validator: validateTestItem }]
      },
      codeUrl: '',
      loading: false,
      pwdType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.randomCodeKey()
    this.changeImageCode()
  },
  mounted() {
    // 绑定事件
    window.addEventListener('keydown', this.keyDown)
    this.options = getTestItem().then(response => {
      this.options = response.data
    })
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false)
  },
  methods: {
    keyDown(e) {
      // 如果是回车则执行登录方法
      if (e.keyCode === 13) {
        this.handleLogin()
      }
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
      // this.$nextTick(() => {
      //   this.$refs.password.focus()
      // })
    },
    handleLogin() {
      const _this = this
      _this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.loading = true
          _this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              _this.loading = false
              _this.$router.push({ path: this.redirect || '/' })
            })
            .catch(() => {
              _this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changeImageCode() {
      var arr = [process.env.VUE_APP_BASE_API, '/auth/verify/code', '/', this.loginForm.codeKey, '?r=', Math.ceil(Math.random() * 100)]
      var str = arr.join('')
      this.codeUrl = str
    },
    // 随机 生成 18位 字符串
    randomCodeKey() {
      var s = []
      var hexDigits = '0123456789abcdefghijklmnopqrstuvwxyz'
      for (var i = 0; i < 24; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
      var uuid = s.join('')
      this.loginForm.codeKey = uuid
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$dark_gray:#889aa4;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      //color: $light_gray;
      color: black;
      height: 47px;
      caret-color: $dark_gray;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px white inset !important;
        -webkit-text-fill-color: black !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #DCDFE6;
    //background: rgba(0, 0, 0, 0.1);
    background-color: white;
    border-radius: 5px;
    color: #303133;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$deep_dark_gray:#303133;

.login-container {
  width: 100%;
  background-color: $bg;
  //overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;

  .login-form {
    position: relative;
    //width: 520px;
    //max-width: 100%;
    //padding: 160px 35px 0;
    border-radius: 6px;
    background: #ffffff;
    width: 385px;
    padding: 25px 25px 5px 25px;
    margin: 100px auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $deep_dark_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 15px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
