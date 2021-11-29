/**
 * 
 * 渲染模块
 */
import compile from './compile.js';

/**
 * 
 * @param {*} vNode 虚拟节点
 * @param {*} envObj 环境对象
 */
export default function render(vNode, envObj){
    if (vNode.realDOM.nodeType === Node.TEXT_NODE) {
        // 如果是文本节点
        // 将vNode.template编译， 将编译结果设置到realDOM
        vNode.realDOM.nodeValue = compile(vNode.template, envObj);
    } else {
        // 如果不是文本节点，就循环子节点
        for (let i = 0; i < vNode.children.length; i++) {
            var children = vNode.children[i];
            render(children, envObj);            
        }
    }
}