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



// https://www.zhipin.com/job_detail/0aa9c989db5e1d0e1nN-3dy8E1pV.html?ka=search_list_jname_36_blank&lid=1HQ54aNKMmO.search.36&securityId=L8cL_EQ2uBDv8-c1c8iIHEvkMpLNyfi-ld8hyDgkV44IzSIDXahAB77Ua7-hz7CN1B385K4wbe5Zvbs2P_YOknq0qyVOp1S7_NSStyk3FLoNaXTpIA4%7E
// https://www.zhipin.com/job_detail/1b555667838cd0001nN739m-GVBT.html?ka=search_list_jname_39_blank&lid=1HQ54aNKMmO.search.39&securityId=MyXEI4LUEuIxs-o11V-ZSbFQGkxADz0e98peSB9YLwSRhKiqmKoDZ00EhaBE0QbRjD7RLmyJp3OfcmJFDRHVQFpvm448rSsvvTETW_W-ncaSNuMnGA%7E%7E
// https://www.zhipin.com/job_detail/320856cf6da73a0a1nB92t28E1FU.html?ka=search_list_jname_50_blank&lid=1HQ54aNKMmO.search.50&securityId=6oHPFWAAnMYHC-Z1FkTbgI2hyoLlAxuL88w-smPqmFY-ILH3HUZOCeXuPzdv6JwsYZ7X48lvMQd6Uhnd2SDHAfL_saGJK54jZcy_7CMAPN1OjntilJpr
// https://www.zhipin.com/job_detail/628ac078857303ef1nJy2NW5F1VZ.html?ka=search_list_jname_122_blank&lid=1HQ54aNKMmO.search.122&securityId=RPQsHQnTeOvnY-01kYj19MgJYLCHc5eWagZO-g6NCAQUZWzSO0DecZlFh4cZ8fh4H9kLm3BuSmAecIiC0ookrkunAoS13iG-VdlsZxv4fDzvPHg%7E
// https://www.zhipin.com/job_detail/7c69924bd1941ca03nZ-092-FlQ~.html?ka=comp_joblist_4
// https://www.zhipin.com/job_detail/da9cef563b71eff31nB53tm-EFVT.html?ka=search_list_jname_145_blank&lid=1HQ54aNKMmO.search.145&securityId=kSV7Ruzd1pcHh-P1j65RR-tW_1QZuTqCnlUDZzDGoXW_jpwmAVzDqFifwJgzPIFnExokfWFPYLncLMRUCnVa3sDuVCL6NezIgQcxLz_Uu1VcWMh3XMw%7E
// https://www.zhipin.com/job_detail/ac318c8818af84871nJ53t67FFtY.html?ka=search_list_jname_157_blank&lid=1HQ54aNKMmO.search.157&securityId=iama9XJLEdp1i-_1K80uphGfjexEhUyWP5aurabL7SfdITAWQcIQrlc1FIRlF_lzMQtrfS8O3FFaBvFpBlfTh4TwmFI1pSfdnJWO6G65-GMqbGNP_KQ%7E
// https://www.zhipin.com/job_detail/0e32d2da877923b91nF42NW1GQ~~.html?ka=search_list_jname_159_blank&lid=1HQ54aNKMmO.search.159&securityId=eeqUcqtqbU20k-e1fuCK1tYQ1hPdxkxh37MsxD2ptgqUNbdBiumvhF6AkQqI9CBUzDg4jGWUI5gCk6agMiOIr5mewAeOF60PFmoN2tFMP0c%7E
// https://www.zhipin.com/job_detail/bbd411729752d3e81nF409S1FFtT.html?ka=search_list_jname_160_blank&lid=1HQ54aNKMmO.search.160&securityId=kNViQ6sZLzBAy-q1zbDYXsd-Hq1NMqOx80R7aipce6_pUppa9NlZATSevIch9ZiUx8PvKgPhmYhRMPZaACbgqKEUnVEApKHdSRNq5HaJUfSDNz1K
// https://www.zhipin.com/job_detail/2fa78b17f47250521nZ609m-GVFZ.html?ka=search_list_jname_239_blank&lid=1HQ54aNKMmO.search.239&securityId=jZbaETD4sEiiR-0117BCRuMcolflcm8KmA5oaM7YMn_rTOhI7sbYF3bTw49BCTtwsdZ-WbstyKT9_VngNYz_LQK0zJtclWtmBgPpO45wHqlOTF4ETg%7E%7E
// https://www.zhipin.com/job_detail/f299232a18f338781nF92tS-GVZQ.html?ka=search_list_jname_242_blank&lid=1HQ54aNKMmO.search.242&securityId=DXXRCqxJWQFb1-p1DXfcIMVOMH_byPYxwSQ_OLLPMbHu0c4p5vSp9eUDj97ICEVK-BuACcl7qlbyVkXr8eGQVSAKr48iS0PaoW4X8JGFE3lyQf3mwA%7E%7E
// https://www.zhipin.com/job_detail/fcfdb131162dd79b1nJy09i1GFJT.html?ka=search_list_jname_247_blank&lid=1HQ54aNKMmO.search.247&securityId=-1fVXoMkxwFMo-J1FTB9i5ftG_rZUNj0toT22rNKVnOhFz09ZjMKIXehhm2qZi93baSSQP9v8BiKrDalEcJfz9zC6N0Qc0wk_4HNN6TV7om13BGxYg%7E%7E
// https://www.zhipin.com/job_detail/d3ec6594cfe9705f1nR-09q9FlRR.html?ka=comp_joblist_4



// 1
// https://www.zhipin.com/job_detail/65c9b0ef7781c5091nB52N67EFFR.html?ka=search_list_jname_228_blank&lid=1HQ54aNKMmO.search.228&securityId=4uIYDJ26zWv9--n1-FXXc_e3fTAQDx6fdGQVjxJecPcPndbt4IbBXyEcSJlfWR4Ie911xXv6Kjh3rZwtLwGxRtG8oJq1XGXK_qrQdiHMuo7ib6Dtfw%7E%7E
// https://www.zhipin.com/job_detail/7453746d5311eba41nJz2t-9FFZY.html?ka=search_list_jname_128_blank&lid=1HQ54aNKMmO.search.128&securityId=lwAp6BNzGntlh-q1-j6Ee1XpV69wwc1bmmBjTR6qCKEiBy8cNP2cr6qxXj2IfFbSbUsq4I8X4NuIAb5b6ibsJ1P7Rm8zOjH8yhP2q-stKHmPyRFa3Q%7E%7E