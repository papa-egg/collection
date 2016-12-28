
/***********************base on es5***********************/
/***********************just for shualian***********************/

/*!
 * 刷脸上下拉加载数据
 * 仅限刷脸上下拉固定数据结构使用
 * @param {String} url
 * @param {Function} success
 * @param {Object} data
 * @param {Boolean} isNotMemory
 * @author Sun
 * @example:
 scrollLoad(localUrl, function (data) {
 //...数据拼接，渲染页面...
 return data.info.datas.length; => 数据数组的长度，默认数据结构为data.info.datas，如果不是，请填写
 })
 */
function scrollLoad(url, success, data, isNotMemory) {
    'use strict';

    try {

        /*!
         * extend-简易-浅拷贝
         * @author Sun
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

        /********************************************************************************************************************/
        var curPage = 1;
        var defaultData = { pageSize: 20};
        var localData = Object.extend(data, defaultData);
        var _flag = true;

        /*!
         * 滚动记忆
         */
        (function () {
            if (isNotMemory) return;

            var sTop = parseInt(sessionStorage.getItem('scrollTop'));
            var sPage = parseInt(sessionStorage.getItem('curPage'));

            if (sPage && sPage > 1) {
                if (window.screen.height > sTop) {
                    sPage = 1;
                }

                for (var i = 1; i < sPage; i++) {
                    everyResquest(localData);
                }
            }

            // 滚动到先前高度
            //document.body.scrollTop = sTop + 'px';
            sole('------------------');
            sole(sTop);
            //$(document).scrollTop(sTop);
            window.scrollTo(0, '300px');
            //document.querySelector('body').scrollTop = '300px';
            sole(document.body.scrollTop);
            sole('------------------');

            // 重置session参数
            sessionStorage.setItem('scrollTop', sTop);
            sessionStorage.setItem('curPage', sPage);
        })();

        /*!
         * 滚动加载
         */
        window.onscroll = function scrolling() {
            sessionStorage.setItem('scrollTop', document.body.scrollTop);

            if (document.body.offsetHeight - window.screen.height - document.body.scrollTop < 50) {

                if (_flag) {
                    _flag = false;
                } else {
                    return;
                }

                everyResquest(localData);
            }
        };

        /*!
         * 循环请求封装
         */
        function everyResquest(data) {
            var localData = data;

            // 不断循环加一
            curPage++;
            localData.curPage = curPage;

            ajaxRequest(url, function (data) {
                if (data.success) {
                    var datasLength = success(data) || data.info.datas;

                    if (typeof datasLength === 'undefined') {
                        console.error('返回数据数组有误，请检查！');
                        return false;
                    }

                    if (datasLength < data.pageSize) {
                        window.onscroll = null;
                    }

                    sessionStorage.setItem('curPage', localData.curPage);
                    _flag = true;
                } else {
                    console.error(data.message);
                }
            }, localData, null, true);
        }

    } catch (err) {
        console.error(err);
    }
}

/***************************************************************************************************************************/

/*!
 * 获取url参数
 * 默认为当前页面url地址
 * @param {String} url
 * @return {Object}
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
 * AJAX原生调用封装方法
 * @param {String} url 
 * @param {Function} success 
 * @param {Object} data 
 * @param {Function} error 
 * @param {Boolean} asyne 
 * @author Sun
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


/***es6导出模块，如果不是，请自行注释*****************/
export default scrollLoad


