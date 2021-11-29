
import createVNode from './vnode.js';
import createResponsive from './dataResponsive.js';
import render from './render.js';


Vue.prototype.render = function (){
    render(this.$vNode, this);
}
export default function Vue(options){
    // 保存el和data
    this.$el = options && options.el;
    this.$data = options && options.data;
    // 根据el创建虚拟节点
    this.$vNode = createVNode(document.querySelector(this.$el));
    // 将data里的数据附加到代理对象
    var self = this;
    createResponsive(this.$data, this, function (){
        // 当属性发生变化时重新渲染
        self.render();
    })
    this.render()//初始渲染
}
