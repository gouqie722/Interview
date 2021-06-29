/**
 * 虚拟节点模块
 */

/**
 * VNode构造函数
 * @param {*} realDOM 
 * @param {*} template 
 */
function VNode(realDOM, template){
    this.realDOM = realDOM;
    this.template = template;
    this.children = [];//默认值
}


/**
 * 
 * @param {*} realDOM 
 */

export default function createVNode (realDOM){
    // console.log(VNode);
    var root = new VNode(realDOM, '');

    if (realDOM.nodeType === Node.TEXT_NODE) {
        // 判断真实节点是否是文本节点
        // 如果是文本节点，需要记录文本节点的值记录到虚拟节点
        root.template = realDOM.nodeValue;
    } else {
        // 不是文本节点 
        for (let i = 0; i < realDOM.childNodes.length; i++) {// realDOM.childNodes: 所有的子节点 而不是所有的子元素 
            var childRealNode = realDOM.childNodes[i]; //拿到真实节点的子节点         
            var vNode = createVNode(childRealNode);//递归创建虚拟节点
            root.children.push(vNode);
        }
    }
    return root;
}