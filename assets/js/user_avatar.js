//入口函数
$(function() {
    // 1.1 获取裁剪区域的 元素对象
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)

    //2)单击上传按钮，弹出文件选择对话框
    $('#btnChooseImage').on('click', function() {
        //触发文件框选择的点击事件
        $('#file').click()
    })

    //3）选择了新图片，更换剪裁区域的图片
    $('#file').on('change', function(e) {
        //获取用户中选中的文件列表（伪数组）
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layui.layer.msg('请选择图片文件')

        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
            // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
            // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //4)上传头像（单击“确定”，把选中的文件提交给服务器
    $('#btnUpload').on('click', function() {
        var fileList = $('#file')[0].files
        if (fileList.length === 0) {
            return layui.layer.msg('请选择头像')
        }
        //剪裁图片并转换成banse64格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')

        //调接口
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {
                    //更换新头像
                    window.parent.getUserInfo()
                })
            }
        })
    })


})