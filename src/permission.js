import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

import Layout from '@/layout'
const _import = require('./router/_import_' + process.env.NODE_ENV + '.js') // 获取组件的方法
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  

    // start progress bar
    NProgress.start()
        // set page title
    document.title = getPageTitle(to.meta.title)
        // determine whether the user has logged in
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            next()
            NProgress.done()
        } else {
            console.log(to,from);
            const hasGetUserInfo = store.getters.name
                // 判断是否获取到菜单
                // if (store.getters.menus && store.getters.menus.length > 0) {
            if (hasGetUserInfo) {
                next()
            } else {
                try {
                    // get user info
                    await store.dispatch('user/getInfo')
                    next()
                    if (store.getters.menus.length < 1) {
                        global.antRouter = []
                        next()
                    }
                    const menus = filterAsyncRouter(store.getters.menus) // 1.过滤路由
                    router.addRoutes(menus) // 2.动态添加路由
                    let lastRou = [{ path: '*', redirect: '/404', hidden: true }]
                    router.addRoutes(lastRou)
                    global.antRouter = menus // 3.将路由数据传递给全局变量，做侧边栏菜单渲染工作


                    next({
                            ...to,
                            replace: true
                        }) // hack方法 确保addRoutes已完成 
                } catch (error) {
                    console.log(error);
                    await store.dispatch('user/resetToken')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})

function filterAsyncRouter(asyncRouterMap) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.component) {
            if (route.component === 'Layout') {
                route.component = Layout
            } else {
                route.component = _import(route.component) // 导入组件
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })
    return accessedRouters
}