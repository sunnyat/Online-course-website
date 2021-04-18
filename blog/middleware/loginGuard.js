const guard = (req, res, next) => {
    // 判断用户访问的是否是登录页面
    // 判断用户登录状态
    // 如果用户是登录的 将请求放行
    // 不是登录的 将请求重定向到登录页面
    if(req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // if(req.session.role == 'normal') {
        //     // 让它跳转到首页 return阻止程序向下执行
        //     return res.redirect('/home/')
        // }
        // 用户是登录状态 将请求放行
        next();
    }
}

module.exports = guard;