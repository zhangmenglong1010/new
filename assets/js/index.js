$(function() {
    //提取用户基本信息
    getUserInfo()

    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',

            success: function(res) {
                // console.log(res);
                //进行判断是否获取成功
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                renderAvatar(res.data)
            }
        })
    }

    function renderAvatar(user) {
        //获取用户的名称（有nickname就用nickname，没有就用username）
        var name = user.nickname || user.username
            //渲染欢迎用语
        $('#welcom').html('欢迎' + name)
            //渲染头像（有头像图像则渲染，没有则渲染文字）
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avatar').hide()
        } else {
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
            $('.layui-nav-img').hide()
        }
    }
})