/*****=base on ES5=*******/


/*/!*!
 * 刷脸app分享控制
 * @param value {string}
 * @author Le_cuer
 * @example:
 sole('这是信息!')
 *!/
function startShare(shopName, shareUrl) {

    var title=getIconCopy(true);
    var desc="我是"+ (shopName || '老板') +"，我的福气与你同享",
        pic= _shareConfig.shareLinkDoMain + imgresourcePath + "activity/img/wx.png",
        shareInfo = _shareConfig.shareLinkDoMain + shareUrl;
    if (pic.indexOf('http') === -1) {
        pic = 'http://' + pic;
    }

    var type = '1212';
    window.getshareinfo = function(){
        return '{\"title\":\"'+ title +'\",\"desc\":\"'+desc+'\",\"thumburl\":\"'+pic+'\",\"sharelink\":\"'+shareInfo+'\",\"type\":\"'+ type +'\"}';
    };
    console.log(getshareinfo());

}*/

/***********************************分割线*************************************/

/*!
 * console.log简化
 * @param value {string}
 * @author Le_cuer
 * @example:
 sole('这是信息!')
 */
function sole(value) {
    console.log(value);
}

/*!
 * extend-简易-浅拷贝
 * @param target  {object}
 * @param source  {object}
 * @return {object}
 * @author Le_cuer
 * @example:
 Object.extend(object1, object2)
 */
Object.extend = function(target, source) {
    target = target || {};
    var targetPropertyArray = Object.keys(target);

    Object.keys(source).forEach(function(property) {
        if (targetPropertyArray.indexOf(property) === -1) {
            target[property] = source[property];
        }
    });

    return target;
};

/*!
 * 获取url参数
 * 默认为当前页面url地址
 * @param {string} url
 * @return {object}
 * @author Sun
 * @example:
 getQueryRequestObjs('xxx.html?name=Sun').name => Sun
 */
function getQueryRequestObjs(url) {
    var localSearch = url ? url.slice(url.indexOf('?')) : location.search;
    var theRequest = {};

    if (localSearch.indexOf('?') !== -1) {
        var str = localSearch.slice(1);
        var strs = str.split('&');

        for (var i = 0, l = strs.length; i < l; i++) {
            theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1];
        }
    }

    return theRequest;
}

/*!
 * 检测是否是当前对象是否是函数functin
 * @param fn {object}
 * @return {boolean}
 * @author Le_cuer
 * @example:
 isFunction(function() {}) => true
 */
function isFunction(fn) {
    return Object.prototype.toString.call(fn)=== '[object Function]';
}

/*!
 * AJAX原生调用封装方法
 * @param url {string}
 * @param success {function}
 * @param data {object}
 * @param error {function}
 * @param asyne {boolean}
 * @author Le_cuer
 * @example:
 ajaxRequest('/api/list', function(data) {
    console.log(data);
 }, data, function(err) {}, false);
 */
function ajaxRequest(url, success, data, error, async) {
    var  xhr   = new XMLHttpRequest();

    if (data) {
        var sendData = '';
        Object.keys(data).forEach(function(item, index) {
            if (index == 0) {
                sendData += item + '=' + data[item];
            }
            else {
                sendData += '&' + item + '=' + data[item];
            }
        });
    }

    xhr.open('post', url, !Boolean(async));
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send(sendData);

    if (!!async) {
        success(JSON.parse(xhr.responseText));
    }
    else {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    success(JSON.parse(xhr.responseText));
                }
                else {
                    if (error) {
                        error();
                    }
                    else {
                        console.error('ajaxRequest 请求失败！ 错误代号：' + xhr.status);
                    }
                }
            }
        }
    }
}

/*!
 * append底部添加节点
 * @param parentItem {string or node}
 * @param childItem {string or node}
 * @author Le_cuer
 * @example:
 appendItem('.la', '<p>123</p>');
 */
function appendItem(parentItem, childItem) {
    var childs = typeof childItem === 'string'? returnChildNodes(childItem): [].slice.call(childItem),
        parent = typeof parentItem === 'string'? querySelectorAll(parentItem): parentItem;

    if (!Array.isArray(parent)) parent = [parent];
    if (childs.length === 0) childs = [childItem];

    parent.forEach(function(parentItem, index, parentArray) {

        (function(_parentItem) {
            childs.forEach(function(item) {
                if (parentArray.length == 1) {

                    _parentItem.appendChild(item);
                }
                else {

                    // 对节点进行深拷贝，包括属性and事件
                    var itemCloneNode = item.cloneNode(true);

                    _parentItem.appendChild(itemCloneNode);
                }

            })
        })(parentItem);

    });

    function returnChildNodes(str) {
        var _div = document.createElement('div');
        _div.innerHTML = str;
        return [].slice.call(_div.childNodes);
    }
}

/*!
 * ES5高级选择器
 * @param context {string}
 * @return {DOM}
 * @author Le_cuer
 * @example:
 querySelectorAll('.ulist li');
 */
function querySelectorAll(context) {
    try {
        var result = document.querySelectorAll(context);

        switch (result.length) {
            case 0:
                return null;
                break;
            case 1:
                return result[0];
                break;
            default:
                return Array.prototype.slice.call(result);
        }
    }
    catch(err) {
        console.log('querySelectorAll error: ' + err);
    }
}

/*!
 * 判断是否在微信内
 * @return {Boolean}
 * @author Le_cuer
 * @example:
 if (verdictWeixin) alert(true);
 */
function isInWeixin() {
    try {
        var isWeixin = navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1;
        if (isWeixin) {
            return true;
        }
        else {
            return false;
        }
    }
    catch(err) {
        console.log('verdictWeixin error: ' + err);
    }
}

/*!
 * 判断是当前环境是ios还是android
 * @return {Boolean}
 * @author Le_cuer
 * @example:
 if (verdictWeixin) alert(true);
 */
function isInIos() {
    try {
        var ua = navigator.userAgent.toLowerCase();

        if (/iphone|ipad|ipod/.test(ua)) {
            return 1;
        } else if (/android/.test(ua)) {
            return 0;
        }
        else {
            console.error('当前平台无法检测');
            return -1;
        }
    }
    catch(err) {
        console.log('verdictIos error: ' + err);
    }
}

/*!
 * 生成随机数
 * @param maxNum {number}
 * @param startNum {number}
 * @return {number}
 * @author Le_cuer
 * @example:
 getRandomNumber(10, 1); => 1-10随机数
 */
function getRandomNumber(maxNum, startNum) {
    if (typeof maxNum !== 'number' && typeof startNum !== 'number') {
        console.error('getRandomNumber error: parameter error');
        return false;
    }
    return Math.floor(Math.random() * maxNum + (startNum ? startNum: 0));
}

/*!
 * 委托点击事件-解决日常绑定点击带来的杂乱和性能开销
 * @param hook {string}
 * @param emit {function}
 * @return null
 * @author Le_cuer
 * @example:
 addClickEvent('.la', function() { doSomething })
 */
var addClickEvent = function() {
    var  eventArr = [];
    document.addEventListener('click', function(e) {
        eventArr.forEach(function(itemObj) {
            var  hook = Array.prototype.slice.call(document.querySelectorAll(itemObj.hook)),
                result = hook.some(function(hookItem) {
                    if (e.target === hookItem) {
                        return true;
                    }
                });
            if (result) {
                itemObj.emit();
            }
        })
    });

    return function source(hook, emit) {
        eventArr.push({
            hook: hook,
            emit: emit
        });
        return source;
    }
}();

/*!
 * toast提示弹框,无需添加样式
 * @param value {string}
 * @author Le_cuer
 * @example:
 toast('已过期');
 */
var toast = function(value) {
    var M_toast = document.createElement('div'),
        M_toastSpan = document.createElement('span'),
        M_toastStyle = {
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            '-webkit-transform': 'translate(-50%,-50%)',
            'zIndex': '1000',
            display: 'none'
        },
        M_toastSpanStyle = {
            padding: '20px 16px',
            textAlign: 'center',
            borderRadius: '5px',
            background: 'rgba(0,0,0,.8)',
            background: '-webkit-rgba(0,0,0,.8)',
            color: '#fff',
            fontSize: '16px'
        };

    M_toast.className = 'M_toast';
    M_toast.appendChild(M_toastSpan);

    // 添加对应样式
    addpendStyles(M_toastStyle, M_toast);
    addpendStyles(M_toastSpanStyle, M_toastSpan);

    document.body.appendChild(M_toast);

    // 生成dom结构并返回
    return function(value) {
        M_toastSpan.innerHTML = value;
        M_toast.style.display = 'block';

        setTimeout(function() {
            M_toast.style.display = 'none';
            M_toastSpan.innerHTML = '';
        }, 1000);
    };

    // 添加css样式
    function addpendStyles(objStyle, domEmit) {
        Object.keys(objStyle).forEach(function(property) {
            domEmit.style[property] = objStyle[property];
        })
    }
}();

/*!
 * 手机号格式验证-基于toast插件
 * @param telnumber {string}
 * @return {boolean}
 * @author Le_cuer
 * @example:
 if (checkPhone(phone))
 console.log('手机格式正确！');
 */
function checkPhone(phone) {
    if((/^1[34578]\d{9}$/.test(phone))){
        return true;
    }
    else if (phone == ''){
        toast('手机号不能为空');
    }
    else {
        toast('手机号输入格式不正确');
    }
    return false;
}

