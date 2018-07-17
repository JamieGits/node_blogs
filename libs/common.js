function toDou(num) {
    return num < 10 ? '0' + num : '' + num;
}

module.exports = {
    time2Date: function (timestamp) {
        var oDate = new Date();
        oDate.setTime(timestamp * 1000);

        return oDate.getFullYear() + '-' + toDou(oDate.getMonth() + 1) + '-' + toDou(oDate.getDay()) + ' '
            + toDou(oDate.getHours()) + ':' + toDou(oDate.getMinutes()) + ':' + toDou(oDate.getSeconds());
    }
};