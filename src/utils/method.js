
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
    if (_t.children) {
      addLevel(_t.children, arr, le++)
    }
    return {
      ..._t,
      mLevel: le
    }
  })
}
/**
 * @description 获取两数组对象不同部分(根据id比较)
 * @param {string} 
 * @returns {Boolean}
 */

export function getDiffArr(a1,a2){
  var a3 = []
  var _t = a1.concat(a2)
  var _o = {}
  for (let i = 0; i < _t.length; i++) (_t[i].id in _o)?_o[_t[i].id]++:_o[_t[i].id] = 1
  for(let x in _o) if(_o[x] === 1) a3.push(_t.find(d=>d.id==x))
  return a3
}

/**
 * @description 获取两数组对象相同部分(根据id比较)
 * @param {string} 
 * @returns {Boolean}
 */

export function getComArr(a1,a2){
  var a3 = []
  var _d = 0
  for (let i = 0; i < a1.length; i++) {
    for (let j = 0; j < a2.length; j++) {
      if(a1[i].id === a2[j].id){
        a3[_d] = a2.find(d=>d.id==a1[i].id)
        ++_d
      }
    }
    
  }
  return a3
}

