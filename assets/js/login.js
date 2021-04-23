$(function() {
    //登录表单和注册表单切换
    //单击去注册按钮绑定事件
    // $('#link_reg').on('click', function() {
    //         //注册表显示
    //         $('.login-box').hide()
    //             //登录表隐藏
    //         $('.reg-box').show()
    //     })
    //     //单击去登录按钮绑定事件
    // $('#link_login').on('click', function() {
    //     //注册表隐藏
    //     $('.login-box').hide()
    //         //登录表显示
    //     $('.reg-box').show()

    // })

    $('#link_reg,#link_login').on('click', function() {
        $('.login-box,.reg-box').toggle()
    })

    //2）自定义密码校验规则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须是6-12位的非空字符'
        ],
        repwd: function(value, item) {
            var pwd = $('#form_reg [name=password]').val()
            if (pwd !== value)
                return '两次密码输入必须一致'

        }
    })

    //3)注册功能
    //(1)给注册表单监听submit事件
    $('#form_reg').on('submit', function(e) {
        //(2)阻止默认提交行为
        e.preventDefault()
            //（3）
        var data = {
                username: $('#form_reg [name=username]').val().trim(),
                password: $('#form_reg [name=password]').val().trim()
            }
            //(4)发送ajax请求
        $.ajax({
            method: 'post',
            url: 'http://api-breakingnews-web.itheima.net/api/reguser',
            data: data,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    // return alert('注册失败')
                    return layui.layer.msg(res.message, { icon: 5 })

                }

                layui.layer.msg('用户注册成功', { icon: 6 }, function() {
                    //触发去登录按钮的单击事件
                    $('#link_login').click()

                })

            }



        })


    })

    //4)登录功能
    $('#form_login').on('submit', function(e) {
        //阻止默认提交行为
        e.preventDefault()

        var data = $(this).serialize() //jq提供的一种收集数据的方式
            // console.log(data);
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }

                layui.layer.msg(res.message, { icon: 6 }, function() {
                    // location.href = './index.html'
                    //把token保存到本地存储
                    localStorage.setItem('token', res.token)
                        //跳转到后台首页index.html
                    location.href = './index.html'
                })


            }
        })
    })


})