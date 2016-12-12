
require('../../css/index.css');
require('../module/base');

import CONFIG from '../module/config';
import scrollLoad from '../module/scrollLoad';

const sole = (context) => {
    console.log(context);
};

const localUrl = CONFIG.API_URL + '/wap/'+ CONFIG.SHOPNO + '/celebrity/mammonRewardList.json';

ajaxRequest(localUrl, function (data) {
    if (data.success) {
        const dataLists = data.info.datas;
        let _html = '';

        dataLists.forEach(function (item) {
            _html = _html + '<li></li>';
        });
        $('#J_ulist').html(_html);



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


