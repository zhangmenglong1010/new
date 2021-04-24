$(function() {
    getshuju()

    function getshuju() {
        $.ajax({
            method: 'get',
            url: './my/userinfo',

            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return alert('用户信息获取失败')
                }


            }
        })

    }

    function addAvasd(user) {
        //获取用户名称
        var name = user.nickname || user.username
            //渲染欢迎用语
        $('#welcome').html('欢迎' + name)
            //

    }

})