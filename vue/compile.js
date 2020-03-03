/**
 * 编译模块
 */

// "姓名：{{name}}, 年龄：{{age}}, 居住省份：{{addr.province}}"
// 返回: ["{{name}}", {{age}}, {{addr.province}}];
function getFragments(template){ 
    var matches = template.match(/{{[^}]+}}/g)//正则表达式匹配双大括号
    return matches || [];
}

/**
 * 根据片段的内容，从环境对象中取出对应的数据
 * @param {*} fragment 片段内容
 * @param {*} envObj 环境对象
 */
function getValue(fragment, envObj) {
    //exp: 花括号内部的表达式
    var exp = fragment.replace("{{", '').replace('}}', '');
    var props = exp.split('.'); //将表达式以 . 分割成一个属性数组
    // console.log(props);
    var obj = envObj;
    // console.log(obj);
    for (let i = 0; i < props.length; i++) {
        // console.log(obj[props[i]]);
        obj = obj[props[i]]; 

    }
    // console.log(obj);
    return obj;
}


/**
 * 根据模拟和环境对象得到编译结果
 * @param {*} template 模板字符串
 * @param {*} envObj 环境对象
 */
export default function compile (template, envObj){
    //提取模板中的 {{xxx}}
    var frags = getFragments(template);
    var result = template;//先保存模板到result中 result保存了最终的编译结果
    for (let i = 0; i < frags.length; i++) {
        var frag = frags[i];
        result = result.replace(frag, getValue(frag, envObj));
    }
    return result;
    // console.log(frags);
}