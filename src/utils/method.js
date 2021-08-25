
/**
 * @description 获取数组对象所有id
 * @param {string} 
 * @returns {Boolean}
 */

export function getIds(data, arr = []){
  data.forEach((_t) => {
    if (_t.id) arr.push(_t.id)
    if (_t.children) {
      getIds(_t.children, arr)
    }
  })
  return arr
}


/**
 * @description 获取数组对象符合条件项id
 * @param {string} 
 * @returns {Boolean}
 */

export function getTrue(data, name, arr = []){
  data.forEach((_t) => {
    if (_t.id && _t[name].toString() === 'true') arr.push(_t.id)
    if (_t.children) {
      getTrue(_t.children, name, arr)
    }
  })
  return arr
}


/**
 * @description 给数组对象每层加层级
 * @param {string} 
 * @returns {Boolean}
 */

export function addLevel(data, arr = [], le=1){
  return data.map((_t) => {
    
    // if (_t.id && _t[name].toString() === 'true') arr.push(_t.id)
    if (_t.children) {
      addLevel(_t.children, arr, le++)
    }
    return {
      ..._t,
      mLevel: le
    }
  })
}

