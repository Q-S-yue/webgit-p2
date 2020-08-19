$(function () {
    getUserInfo();
})

//获取用户信息
var layer = layui.layer;

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }

            //开始渲染用户头像
            renderAvantar(res.data);
        }

    })
}

//渲染用户头像
function renderAvantar(user) {
    //设置用户名字，展示到欢迎区域
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎' + name);

    //设置头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic), show();
        $('.text-avatar').hide();

    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase()).show();
    }
}


//退出按钮
$('.tuichu').on('click', function () {
    layer.confirm('确认是否退出？', {
        icon: 3,
        title: '提示'
    }, function (index) {
        localStorage.removeItem('token');
        location.href = "/login.html";
        layer.close(index);
    });
})