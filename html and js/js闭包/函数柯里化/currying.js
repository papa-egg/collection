
// 函数柯里化：
// 函数柯里化又称部分求值
// 柯里化是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术
// 柯里化就是预先将某些参数传入，得到一个简单的函数。但是预先传入的参数被保存在闭包中，因此会有一些奇特的特性。

/*!
 * 一个简单的数值相加
 * 必须同时传入2个参数,否则 Number + NaN = NaN;
 */
function add(x, y) {
    return x + y;
}

console.log(add(1, 3)); // => 4
console.log(add(1)); // => NaN

/*!
 * 简单柯里化add函数
 */
function add(x) {
    return function (y) {
        return x + y;
    }
}

var firstNum = add(1);
var secondNum = firstNum(2);

console.log(secondNum); // => 3
console.log(add(3)(4)); // => 7


/*!
 * es5 bind方便实现柯里化
 */
function add(x, y) {
    return x + y;
}

var agency = add.bind(null, 3);

console.log(agency(4)); // => 7





