// 对象代理

/**
 * 将原始对象的某个属性添加到代理对象中
 * @param {*} originalObj 
 * @param {*} targetObj 
 * @param {*} prop 属性名
 * @param {*} callback 
 */
function proxyProp(originalObj, targetObj, prop, callback){
    if (typeof originalObj[prop] === 'object') {
        // 要代理的属性是一个对象
        var newObj = {};
        createResponsive(originalObj[prop], newObj, callback);
        Object.defineProperty(targetObj, prop, {
            get(){
                return originalObj[prop];
            },
            set(value){
                originalObj[prop] = value;
                newObj = value;
                callback && callback(prop);
            }
        })
    } else {
        // 要代理的属性不是一个对象
        Object.defineProperty(targetObj, prop, {
            get(){
                return originalObj[prop];
            },
            set(value){
                originalObj[prop] = value;
                callback && callback(prop);
            }
        })
    }
    
}

/**
 * 将原始对象的所有属性，提取到代理对象中
 * @param {*} originalObj 原始对象
 * @param {*} targetObj 代理对象
 * @param {*} callback 当代理的对象属性被赋值时，需要运行的回调函数
 */
export default function createResponsive(originalObj, targetObj, callback){
    for (var prop in originalObj) {
        proxyProp(originalObj, targetObj, prop, callback);
    }
}