
/*!
 * toast提示弹窗在日常中经常用到，没次提示不同的提示文字，但页面结构却并没有变化
 * 如果每次都生成一样的dom结构，的确是一笔不小的开销--dom操作一般是常规js性能的5,6倍
 * 运用js闭包的特性，生成一次节点，无需重复删改
 *
 * toast提示弹框,无需添加样式
 * @param {String} value
 * @author Sun
 * @example:
 toast('加载中。。。');
 */
var toast = function(value) {
    var M_toast = document.createElement('div');
    var M_toastSpan = document.createElement('span');


    M_toast.className = 'M_toast';
    M_toast.appendChild(M_toastSpan);

    // 添加对应样式
    M_toast.setAttribute('style', 'position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%); z-index: 1000; display: none;');
    M_toastSpan.setAttribute('style', 'padding: 20px 16px; text-align: center; border-radius: 5px; background: rgba(0, 0, 0, 0.8); color: rgb(255, 255, 255); font-size: 16px;');

    document.body.appendChild(M_toast);

    // 生成dom结构并返回
    return function(value) {

        // 一直保有对节点的引用
        M_toastSpan.innerHTML = value;
        M_toast.style.display = 'block';

        setTimeout(function() {
            M_toast.style.display = 'none';
            M_toastSpan.innerHTML = '';
        }, 1000);
    };
}();
