/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @author
 * @description 判断手机号
 * @param value
 * @returns {boolean}
 */

export function checkPhone (rule, value, callback) {
  const reg = /^1\d{10}$/ && /^1[345789]\d{9}$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确手机号'))
  } else {
    callback()
  }
}

