/*
 * @Description: 
 * @Author: ZhangXin
 * @Date: 2021-02-02 16:03:48
 * @LastEditTime: 2021-02-23 23:09:02
 * @LastEditors: ZhangXin
 */
import Layout from '@/layout'
import {getUserAuthMenu} from '@/api/user'
const _import = require('@/router/_import_' + process.env.NODE_ENV + '.js') // 获取组件的方法

/**
 * @description: 解析后端返回来的菜单树
 * @param {*} data 后端返回来的路由树
 * @param {*} arr 菜单
 * @return {*}
 */
function tree(data, arr) {
  data.forEach((datas, index) => {
    arr.push({
      path: datas.path,
      name: datas.name,
      types: datas.types,
      hidden: datas.hidden == 'true' ? true : false,
      // 当时这块踩坑了
      component: datas.component === 'Layout' ? Layout : _import(datas.component),
      meta: {
        title: datas.meta.title,
        icon: datas.meta.icon,
        // 用来存放按钮权限
        button: datas.meta.button
      },
      //  redirect: datas.redirect,
      id: datas.id,
      // 子路由
      children: []
    })

    if (datas.children) {
      const childArr = tree(datas.children, [])
      arr[index].children = childArr
    }
  })
  return arr
}


/**
 * @description: 获取当前登录用户的菜单
 * @param {*}
 * @return {*}
 */
export function getMenu() {
  return new Promise(function (resolve, reject) {
    getUserAuthMenu().then(res => {
      if(res.code === 200){
      const datas = res.data
      // 调用 tree 来解析后端返回来的树
      resolve(tree(datas, []))
      }

    })
  })
}

