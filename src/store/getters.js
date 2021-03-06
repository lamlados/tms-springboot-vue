const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.username,
  userinfo: state => state.user.userinfo,
  currentItem: state => state.user.currentItem,
  // 当前用户的动态菜单路由
  dynamicRouters: state => state.permission.dynamicRouters,
  // 通用信息
  website: state => state.common.website
}
export default getters
