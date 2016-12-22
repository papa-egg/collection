
for (var i = 0; i < 10; i++) {
    // ...stuff...
}

// for循环无论是哪种语言，绝对是最常用到的语法之一了，当进行循环遍历等等都会用到
// es5提供了一系列循环高阶函数，它让我们遍历更方便更快更高效，也随着浏览器厂商的推进，es5绝大部分都提供了不错的支持
// 更是为了面向未来，开始慢慢替代原来死板的for循环吧
// es5高阶遍历方法主要有 every, some, filter, forEach, map

/*!
 * 首先，我把every和some归为一类
 * every: 数组中的每一项全部满足条件，返回true,否则返回false;
 * some: 数组中只要有一项满足条件，返回true,否则返回false;
 */

var numArr = [1, 2, 3, 4];

// numArr所有数都大于0,满足条件，返回true
var result = numArr.every(function (item, index, args) {
    return item > 0
});

console.log(result); // => true;

// numArr的第一项不满足条件，返回false
var result = numArr.every(function (item, index, args) {
    return item > 1
});

console.log(result); // => false;

// numArr中3和4大于2，返回true
var result = numArr.some(function (item, index, args) {
    return item > 2
});

console.log(result); // => true;

// numArr没有一项大于5，都不满足条件，返回false;
var result = numArr.some(function (item, index, args) {
    return item > 5
});

console.log(result); // => false;


/*!
 * filter: 循环遍历，返回条件满足的每一项生成的一个数组
 */

// 数组numArr中只有4大于3满足条件，返回只有4的一个数组
var result = numArr.filter(function (item, index, args) {
    return item > 3;
});

console.log(result); // => [4];



/*!
 * forEach: 简单循环遍历，无返回值
 */

// 数组numArr中只有4大于3满足条件，返回z值单为4的一个数组
numArr.forEach(function (item, index, args) {
    console.log(item); // => 1, 2, 3, 4
});


/*!
 * map: 映射，返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组
 * 具体看例子
 */

// [(1 * 2), (2 * 2), (3 * 2), (4 * 2)]
var result = numArr.map(function (item, index, args) {
    return item * 2;
});

console.log(result); // => [2, 4, 6, 8]

// [(1 + 2), (2 + 2), (3 + 2), (4 + 2)]
var result = numArr.map(function (item, index, args) {
    return item + 2;
});

console.log(result); // => [3, 4, 5, 6]


// reduce, reduceRight
// 对数组中的所有元素调用指定的回调函数。该回调函数的返回值为累积结果，并且此返回值在下一次调用该回调函数时作为参数提供。

// 返回所有项相加的和 1 + 2 + 3 + 4
var result = numArr.reduce(function (prev, cur, index, args) {
    return prev + cur;
});

console.log(result); // => 10



// 以上方法都是数组Array的方法，非数组无法调用
// 如果遍历对象，常规采用for in遍历对象，另外还需要用hasOwnProperty来排除原型链上的属性
// es5可以采用Object.keys()将对象转化为数组，然后可以方便得用以上方法进行遍历

var obj = {
    x: 1,
    y: 2,
    z: 3
};

Object.keys(obj).forEach(function (item, index, args) {
    console.log(obj[item]); // => (1, 2, 3)具体返回值顺序依浏览器而已，but, who care!
});

