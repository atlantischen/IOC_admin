import store from '@/store'
export default{
    has:{
       inserted(el,binding,vnode){
        let permTypes = vnode.context.$route.meta.permTypes;
        if (permTypes&&!permTypes.includes(binding.value)) {
            el.parentNode.removeChild(el);
        }
       } 
    }
}
export default hasPermission;