
require('../../css/index.css');
require('../module/base');

import CONFIG from '../module/config';
import scrollLoad from '../module/scrollLoad';

const sole = (context) => {
    console.log(context);
};

// 声明接口
const localUrl = CONFIG.API_URL + '/wap/'+ CONFIG.SHOPNO + '/celebrity/mammonRewardList.json';

// 请求接口，加载第一屏数据
ajaxRequest(localUrl, function (data) {
    if (data.success) {
        const dataLists = data.info.datas;
        let _html = '';

        dataLists.forEach(function (item) {
            _html = _html + '<li></li>';
        });

        // 添加列表项
        $('#J_ulist').html(_html);


        // 绑定下拉加载
        scrollLoad(localUrl, function (data) {
            var dataLists = data.info.datas;
            let _html = '';

            dataLists.forEach(function (item) {
                _html = _html + '<li></li>';
            });
            $('#J_ulist').append(_html);

            return dataLists.length;
        });

    } else {
        toast(data.message);
    }
}, {
    curPage: 1,
    pageSize: 20
});


