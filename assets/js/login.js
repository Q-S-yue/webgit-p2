$(function () {
    //跳转链接交互
    $("#login_link").on('click', function () {
        $(".login").hide();
        $(".reg").show();
    })
    $("#reg_link").on('click', function () {
        $(".reg").hide();
        $(".login").show();
    })

    //自定义验证
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

        repwd: function name(value) {
            var pwd = $(".reg [name=password]").val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    //点击注册时
    //使用layer方法
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            data: $(this).serialize(),
            url: '/api/reguser',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功，请登录");
                //清空表单使用原生dom对象方法的
                $('#form_reg')[0].reset()
                //注册成功就跳转到登录页面呗
                $("#reg_link").click();
            }
        })
    })


    //点击登录时
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            data: $(this).serialize(),
            url: '/api/login',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //保存token到
                localStorage.setItem('token', res.token);
                layer.msg("登录成功");
                //跳转到主页面
                location.href = "/index.html";
            }
        })
    })
})