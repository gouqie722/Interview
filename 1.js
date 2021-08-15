// console.log(Number({a: 0}));
// console.log([]+{});


/**
 * HTTP/1.0/1.1/2.0
 * 
 */


// 实现一个并发的函数
class PromiseQueue {
    constructor (options = {}) {
        
    }
}


/**
 * Number()
 *      1. undefined  NaN
 *      2. null       0
 *      3. 布尔值     true为1  ， false为0
 *      4. 字符串     
 *          1. 空字符串 空格字符串转为0
 *          2. 非空字符串，并且内容为纯数字（包含十六进制与科学计数法） 转成对应的数字
 *          3. 其余全部为NaN
 *      5. 数字     原来的数字
 *      6. 对象
 *          1. 对象，函数转为NaN
 *          2. 空数组转为0，数组里只有一个数据并且这个数据能转成数字，则转成对应的数字，其余为NaN 
 *  
 */


/**
 * 空字符串和空格字符串转Number都为0
 * 非空字符串包含进制与科学表示法 都能够转成数字其它的通通都是NaN
 * 
 */
console.log(
    Number(undefined),//NaN
    Number(null), //0

    Number(true), //1
    Number(false), //0

    Number(''), //0
    Number(' '), //0
    
    Number('12'), //12
    Number('012'), //12
    Number('0xff90'), //65424   十六进制可以转成数字
    Number('5e5'), //500000     科学计数法
    Number('k'), //NaN

    Number({}), //NaN
    Number(function(){}), //NaN
    Number([]), //0
    Number([9, 0]),//NaN
    Number([01]), //1

    Number(['1']), //1
    Number(['1', '1']), //1

)


/**
 * String()
 *      1. 基本数据类型，null，undefined的结果就是给数据加上引号变成字符串
 *      2. 对象
 *          1. 数组的结果为把所有的中括号去掉，外面加上引号
 *          2. 对象的结果为'[object Object]' (除了日期对象)
 *          3. 函数的结果为在函数的整体外面加个引号
 */
console.log(
    String(null), // 'null'
    String(undefined),// 'undefined'
    String(123), // '123'
    String([1,[2]]),//'1, 2' 把方括号干掉 外边加上引号
    String({}),  //'[object Object]'
    String([90, '09', function(){}, {}]), // '90, '09', function(){}, [object Object]'

)


/**
 * Boolean()
 *      1. undefined   false
 *      2. null        false
 *      3. 数字
 *          +0 -0 NaN转布尔值的结果为false ，其他的转布尔值为true 
 *      4. 布尔值    转为对应的值
 *      5. 字符串
 *          空字符串转布尔值为false ，其他(包括空格字符串)都转为true
 *      6. 对象转布尔值都是true
 */
console.log(
    Boolean(undefined), //false
    Boolean(null),    //false
    Boolean(+0), //false
    Boolean(-0), //false
    Boolean(NaN), //false
    Boolean(12), //false 
    Boolean(''), //false
    Boolean(' '), //true
    Boolean([]),//true
    Boolean({}),//true
    Boolean(function(){}), //true
)

/**
 * toString()      返回对象的字符串的表现形式(表现形式指的是把数据转成字符串)
 * valueOf()       返回对象对应的原始值
 */
let data = [
    {type: '数字', value: 123},
    {type: '字符串', value: 'keo'},
    {type: '布尔值', value: true},
    {type: '数组', value: [1,2]},
    {type: '函数', value: function(){}},
    {type: '对象', value: {a: 129, b: 98}},
]

for (let i = 0; i < data.length; i++) {
    console.log(
        data[i].type + "valueOf的结果为" + data[i].value.valueOf(),
        
    )   
    console.log(data[i].type + "toString的结果为" + data[i].value.toString()) 
}



/**
 * 该项目是根据公司的业务需求而开发的一个用于管理学生信息的项目，该项目由本人独立开发
 * 系统包含了新增学生，修改学生信息，删除学生等模块，项目的前端部分使用vue作为框架，其中
 * 使用vue-router处理路由，使用vuex处理共享数据并且用echarts做数据可视化处理，
 * 后端提供数据接口实现学生信息的增删改查
 * 
 */

