// getMenu 解析后台路由
import { getMenu } from '@/utils/getMenu'
// 引入路由 和 静态路由
import router, { constantRoutes } from '../../router/index'
const state = {
  routerType: '',
  // 菜单路由
  meunList: []
}

const mutations = {
  SET_ROUTER_TYPE(state, type) {
    state.routerType = type
  },
  SET_ROUTER_MENULIST(state, list) {
    // 静态路由 +  动态路由  合并  完整路由
    const array = constantRoutes.concat(list)
    state.meunList = array
    router.options.routes = array
    router.addRoutes([...array])
  }
}

const actions = {
  setMenuList({ commit, state }) {
    // 接收返回来的 路由数组
    return new Promise((resolve, reject) => {
      getMenu().then(res => {
        commit('SET_ROUTER_TYPE', '')
        commit('SET_ROUTER_MENULIST', res)
        resolve(res)
      })
    })
  }
}
export default {
  state,
  mutations,
  actions
}
