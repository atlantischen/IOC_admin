import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/parkManage',
    name: '基础服务',
    meta: {
      title: '基础服务',
      icon: 'basicServices'
    },
    children: [{
        path: 'parkManage',
        name: '园区管理',
        redirect: '/parkManage/index',
        component: () => import('@/views/basicServices/parkManage/index'),
        meta: {
          title: '园区管理',
          icon: 'parkManage',
        },
        children: [
          {
            path: '/parkManage/index',
            name: '',
            meta: {
              title: '',
              activeMenu:'/parkManage'
            },
            component: () => import('@/views/basicServices/parkManage/parkManage.vue'),
            hidden: true
          },
          {
            path: '/parkManage/listdetails',
            name: '详情列表',
            component: () => import('@/views/basicServices/parkManage/listdetails.vue'),
            meta: {
              title: '详情列表',
              activeMenu:'/parkManage'

            },
            hidden: true
          }
          
        ]
      },
      {
        path: 'menuManage',
        name: '菜单管理',
        component: () => import('@/views/basicServices/menuManage/index'),
        meta: {
          title: '菜单管理',
          icon: 'menuManage'
        }
      },
      {
        path: 'roleManage',
        name: '角色管理',
        component: () => import('@/views/basicServices/roleManage/index'),
        meta: {
          title: '角色管理',
          icon: 'roleManage'
        }
      },
      {
        path: 'userManage',
        name: '用户管理',
        component: () => import('@/views/basicServices/userManage/index'),
        meta: {
          title: '用户管理',
          icon: 'userManage'
        },
      },
      {
        path: 'appUser',
        name: 'APP用户',
        component: () => import('@/views/basicServices/appUser/index'),
        meta: {
          title: 'APP用户',
          icon: 'appUser'
        }
      },
      {
        path: 'dataDictionary',
        name: '数据字典',
        component: () => import('@/views/basicServices/dataDictionary/index'),
        meta: {
          title: '数据字典',
          icon: 'dataDictionary'
        }
      },
      {
        path: 'attachment',
        name: '附件管理',
        component: () => import('@/views/basicServices/attachment/index'),
        meta: {
          title: '附件管理',
          icon: 'attachment'
        }
      },
    ]
  },

  {
    path: '/log',
    component: Layout,
    redirect: '/log/operationLog',
    name: '日志',
    meta: {
      title: '日志',
      icon: 'operationLog'
    },
    children: [{
        path: 'operationLog',
        name: '操作日志',
        component: () => import('@/views/log/operationLog/index'),
        meta: {
          title: '操作日志',
          icon: 'operationLog'
        }
      },
      {
        path: 'loginLog',
        name: '登录日志',
        component: () => import('@/views/log/loginLog/index'),
        meta: {
          title: '登录日志',
          icon: 'loginLog'
        }
      }
    ]
  },

  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
