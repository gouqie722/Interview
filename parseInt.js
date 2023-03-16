// 456
// console.log(demo(arr), 4 * Math.pow(5, 0) + 5 * Math.pow(5,1) + 6 * Math.pow(5, 0));


// parseInt('101',2); //以二进制解析
//            1          0           1
// 算过程：1*2的2次方 + 0*2的1次方 + 1*2的0次方 = 4+0+1 = 5，结果为 5

// 在102中 ，第三位2 >= 2 (radix = 2) ，并且 radix在2到36之间
// 这个时候忽略大于等于radix位及其之后的所有数值 。则现在 102 ==> 10
// 计算： 现在是2进制，则输出结果为：0 * (2^0) + 1 * (2^1) = 2 ==>输出 2

// 1015  3
// 0 * (2^0) + 1 * (2^1) = 2





// parseInt(43, 5); ===> 23
// 解析：
// 4                                  3
// 4 * Math.pow(5, 1)          3 * Math.pow(5, 0)
// 20                          3
// 20 + 3 => 23

// parseInt(45, 5); ===> 23
// 解析：
// 4                                  5
// 4 * Math.pow(5, 0)         这个时候忽略大于等于radix位及其之后的所有数值
// 4                          
// 4

// parseInt(1023, 5); ===> 138
// 解析：
// 1                                  0                   2                            3
// 1 * Math.pow(5, 3)         0 * Math.pow(5, 2)        2 * Math.pow(5, 1)       3 * Math.pow(5, 0)
// 125                          0                         10                        3
// 125 + 0 + 10 + 3
// 138
