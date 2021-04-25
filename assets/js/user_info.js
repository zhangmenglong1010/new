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
                //把用户信息展示到表单中
                // $('[name=username').val(res.data.username)
                // $('[name=nickname').val(res.data.nickname)
                // $('[name=email').val(res.data.email)
                // $('[name=id').val(res.data.id)

                //快速给所有的表单项赋值
                layui.form.val('formUserInfo', res.data)
            }
        })
    }
    //2-重置表单信息
    //效果：重新把用户展示到表单中
    $('#btnReset').on('click', function(e) {
        //阻止默认行为（重置按钮的默认行为是清空表单项）
        e.preventDefault()
            //重新获取用户信息，重新赋值
        initUserInfo()
    })

    //自定义一个验证昵称长度规则
    layui.form.verify({
            nickname: function(value, item) {
                if (value.length > 6) {
                    return '昵称不能超过六个字'
                }
            }
        })
        //完成用户修改功能
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
            //获取输入框中的内容
        var data = $(this).serialize()
        console.log(data);
        $.ajax({
            method: 'post',
            url: '/my/userinfol',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 })
                    //更改父页面元素index.html中的欢迎用语
                    //window.parent父页面对应的window对象
                window.parent.getUserInfo()
            }
        })
    })


})