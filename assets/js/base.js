//ajax的预处理函数
$.ajaxPrefilter(function(options) {
    //统一设置请求的url地址，根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        //url中包含my说明有权限接口
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //给optionspeople
    options.complete = function(res) {
        //请求成功和失败都会调用此回调函数
        // console.log(res);

        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //清除token
            localStorage.removeItem('token')
                //跳转到登录页面
            location.href = '/login.html'

        }
    }
})