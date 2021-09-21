import PageT from './PageT.vue'
const coms = [
  PageT
]


const install = function(Vue){
  coms.forEach(c=>{
    Vue.component(c.name,c)
  })
}

export default install