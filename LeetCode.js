// 1. 数据结构核心基础

// 2. 多算法实现遍历、查找、排序、对比等

// 排序算法

/**
 * 交换数组中指定的位置
 * @param {*} arr 
 * @param {*} i1 
 * @param {*} i2 
 */
function swap(arr, i1, i2) {
    var temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
}


/**
 *
 * 选择排序
 * @param {*} arr
 */
function selectionSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        // 搞定 i ~ arr.length - 1 区间
        // 从该区间中找出最小值，和第i位交换
        var min  = arr[i]; //定义一个变量，为该区间的第一个数
        var index = i;//最小值所在位置
        for(var j = 0; j < arr.length; j ++){
            if (arr[j] < min) {
                min = arr[j];
                index = j; //重新记录最小值的位置
            }
        }
        // 最小值已经找出
        // 交换第i位和第index位
        swap(arr, i, index);
    }
}

var arr = [5, 1, 3, 4, 7, 6];
selectionSort(arr);
console.log(arr);