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
            },
            // complete: function(res) {
            //     //请求成功和失败都会调用此回调函数
            //     console.log(res);

            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         //清除token
            //         localStorage.removeItem('token')
            //             //跳转到登录页面
            //         location.href = '/login.html'

            //     }
            // }
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


    //退出功能
    $('#logout').on('click', function() {
        layer.confirm('您确定要退出嘛?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清除本地中的token
            localStorage.removeItem('token')
                //页面登录跳转页面
            location.href = '/login.html'
            layer.close(index)


        });
    })
})