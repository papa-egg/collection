
// javascript中分为5种基本类型（undefined, null, boolean, number, string）和1种引用类型（object）
// 引用类型（object）中又有许多实例（example: function, regexp, array）

// js作为一门弱类型语言，仿佛一件匕首一样，既方便灵活，有时又凶险万分
// js阻塞式（客户端）运行方式引起的雪崩式错误也是颇多
// 虽然编程是很重要的事，绝不应该在不清不楚的情况下进行，但js长期缺少高技术和高素质人员，加上陡峭的学习曲线，而低素质和低水平却一直不断增长

// js作为一门弱类型语言
// 日常中对各种js类型的检测恐怕是最多的，然而很多时候很多常用方案并不完美，有时会产生很多意料不到的问题也不利于以后维护拓展。
// 一套最佳实践是必不可少的，能够给当前乃至以后避免许许多多的问题

/*!
 * 优先并且经常使用“===”全等，而不是“==”
 * “==”背后会进行一些隐式转换，不利于保持数据完整性，况且转换总免不了相应一些性能
 * 学会使用等号是js数据格式的重中之重
 */
const x = 2;

// good
if (x === 2) {
    // ...stuff...
}

// bad
if (x == 2) {
    // ...stuff...
}

/*!
 * typeof在检测一些基本类型是非常简便的
 * 适合typeo检测的值为 undefined, boolean, number, string
 */
const x;

// 检测是否为undefined
if (typeof x === 'undefined') {
    // ...stuff...
}

// best
if (x === void 0) {
    // ...stuff...
}

if (typeof x === 'boolean') {
    // ...stuff...
}

if (typeof x === 'number') {
    // ...stuff...
}

if (typeof x === 'string') {
    // ...stuff...
}

// 为什么typeof不适合检测null
const x = null;

typeof x // => object

// typeof null返回 object可以说是一个难以摆脱的历史遗留问题
// 背后原理是这样的，所有数据各种背后都无非转变二进制码，当前3位如果都为0,那么typeof检测就返回object,而null二进制码是全0
// 当然这并不是什么不能解决的问题，甚至只需要加一个判断，但由于长期对null的各种引用比较，如果取消，会引发大规模的js代码崩溃，所以null就成为一个js中非常特殊的存在

/*!
 * 基本类型检测除null之外，采用typeof是一个非常有效的方法
 * 如何检测null，又如何检测引用类型却比基本类型复杂麻烦的多
 */

// 检测是否是object对象
// 主要难点在于array,function等原型末端都是object，还需要排除null
function isObject(type) {
    return type != null && Object.prototype.toString.call(type) === '[object Object]';
}

// 检测是否是数组
function isArray(type) {

    // 当iframe嵌套时，由于不是同一个Array的实例，所以instanceof不一定完全正确
    return type instanceof Array || Object.prototype.toString.call(type) === '[object Array]';
}

// es5,提倡
function isArray(type) {
    return Array.isArray(type);
}

// 检测是否为函数function
// 经常有人用typeof xxx = 'function'来检测函数，但这涉及类似ie浏览器中存在兼容问题，比如它会返回 object
// 当然个人来说返回object的确更合情合理，所以最好还是不要用typeof来检测函数function
function isFunction(type){
    return Object.prototype.toString.call(type) === 'object Function'
}
// 注：为什么会出现这种混乱的情况？
// 初期js并没有成长为一门编程语言的报复，可日常函数却是非常多的，要检测一个值是不是一个函数就成了一个非常迫切的问题，于是就给typeof增加了一种状态，当然并不是所有厂商都照做了


// 检测null
if (x === null) {
    // ...stuff...
}

// 检测日期
function isDate(type) {
    return type instanceof Date || Object.prototype.toString.call(type) === '[object Date]';
}

// 检测正则
function isRegExp(type) {
    return type instanceof Date || Object.prototype.toString.call(type) === '[object RegExp]';
}




// 往上都是基本类型和引用类型的检测,有时检测某个值是不是对象的属性也是必不可少的
// 最重要的是判断改属性在当前对象上而不能往上追溯到原型链

// “in”检测属性值
var person = {
    getName: function () {
        return this.name;
    }
};

var mySelf = Object.create(person);

mySelf.name = 'Sun';

for (var i in mySelf) {

    // 即使属性getName只是person的一个属性，但in会基于原型链往上查找，可很多时候我们不太需要原型链上的属性
    console.log(i); // => name, getName（具体先后随浏览器而已）
}

// good
if (mySelf.hasOwnProperty('name')) {
    // ...stuff...
}

// best
if (Object.keys(mySelf).indexOf('name') > -1) {
    // ...stuff...
}


/********************END WORD**********************/
// js中dom对象因为各种浏览器实现各有差异，并没有统一标准，所以如果是dom对象以上并不试用