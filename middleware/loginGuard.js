const guard = (req, res, next) => {
    // 判断用户访问的是否是登录页面
    // 判断用户登录状态
    // 如果用户是登录的 将请求放行
    // 不是登录的 将请求重定向到登录页面
    //indexOf 存在返回位置，不存在返回-1
    if(req.url != '/login' && !(req.url.indexOf("register") + 1) && !req.session.username) {
        res.redirect('/admin/login');
        // console.log(req.url.indexOf("admin") + 1);
    } else {
        if(req.session.role == 'normal') {
            // 让它跳转到首页 return阻止程序向下执行
            res.redirect('/home/');
            // console.log('no');
            // next();
        }
        // console.log(req.url.indexOf("admin") + 1)
        // 用户是登录状态 将请求放行
        next();
    }
}

module.exports = guard;