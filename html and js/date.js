/*!
 * 获取当前时间
 * anthor:Sun
 * @returns {string}
 */
var _date = function (num) {
    var date = new Date();
    if (num) {
        date.setTime(num * 1000);
    }
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var monutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    if (monutes >= 0 && monutes <= 9) {
        monutes = "0" + monutes;
    }
    if (seconds >= 0 && seconds <= 9) {
        seconds = "0" + seconds;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + hours + seperator2 + monutes
        + seperator2 + seconds;

    return currentdate;
};

module.exports = _date;