
// 闭包：
// 闭包指有权访问另一个函数作用域中的变量的函数;

/*!
 * 闭包实例
 * 通过函数b，有权访问函数a内变量x，而无法在外层直接访问变量x
 */
function a() {
    var x = 123;

    function b() {
        return x;
    }

    return b;
}

console.log(x); // => throw Error: x is not defined
console.log(a()()); // => 123;

/*!
 * 闭包实例-2
 * 除了闭包，更多包含this的指向问题
 */
var obj = {
    x: 123,
    func: function () {
        return this.x;
    }
};

console.log(x); // => throw Error: x is not defined
console.log(obj.func()); // => 123;





