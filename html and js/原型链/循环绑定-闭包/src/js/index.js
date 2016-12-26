

document.addEventListener('DOMContentLoaded', function () {

    var listItems = document.querySelectorAll('#J_ulist li');
    var i = 0;
    var len = listItems.length;

    // 循环遍历绑定事件
    for (; i < len; i++) {
        listItems[i].addEventListener('click', function () {
            alert(i + 1); // => 永远固定为5
        })
    }

    // 循环绑定事件是所有前端必定遇到过的坑，当点击tab分页，切换时必需要解决的问题
    // 之所以i永远都为固定值，在于js(最起码es6之前)没有块级作用域
    // 解决思路就是类似生活中需要找一个能进行“行李”(变量)托管的地方

    /*!
    * 方法一
    * 通过一个立即执行函数表达式来建立一个函数作用域，通过闭包来存储变量i的当前值
    */
    for (; i < len; i++) {
        (function (i) {
            listItems[i].addEventListener('click', function () {
                alert(i + 1);
            })
        })(i)
    }

    /*!
     * 方法二
     * 先将dom节点转化为数组对象，然后采用es5高阶函数来遍历节点
     */
    Array.prototype.slice.call(listItems).forEach(function (item, index) {
        console.log(item);

        item.addEventListener('click', function () {
            alert(index + 1);
        })
    });

    /*!
     * 方法三
     * es6新添块级作用域，i随着执行块也会相应变化
     */
    for (let i = 0; i < len; i++) {
        listItems[i].addEventListener('click', function () {
            alert(i + 1);
        });
    }
});

