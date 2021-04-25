//入口函数
$(function() {
    // alert('ok')
    //-------1-获取用户信息，展示到表单中
    //1)获取用户信息

    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })

                }
            }
        })
    }
})