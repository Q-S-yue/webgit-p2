$(function () {


    var baseUrl = 'http://ajax.frontend.itheima.net';
    $.ajaxPrefilter(function (options) {
        options.url = baseUrl + options.url;
        //优化头文件处理
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ""
            }
        }


        //优化验证退出页面
        // 全局统一挂载 complete 回调函数
        options.complete = function (res) {
            // console.log(res.responseJSON);
            if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })



})