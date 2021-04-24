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
})