//入口函数
$(function() {
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须是6-12的非空字符'
        ],
        samepwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不一致'
            }
        },

        repwd: function(value) {
            //value 确认密码
            if (value !== $('[name=newPwd]').val()) {
                return '新旧密码不一致'
            }
        }



    })


    $('.layui-form').on('submit', function(e) {

        e.preventDefault()
            //获取输入框中的内容
        var data = $(this).serialize()
        console.log(data);
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    $('.layui-form')[0].reset()
                })
            }
        })
    })
})