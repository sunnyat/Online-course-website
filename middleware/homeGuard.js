const guard = (req, res, next) => {
    if(!req.session.username) {
        res.redirect('/admin/login');
        // console.log(req.url.indexOf("admin") + 1);
    } else if(req.session.role == 'normal' && !(req.url.indexOf("course") + 1) && !(req.url.indexOf("") + 1)) {
        // 让它跳转到首页 return阻止程序向下执行
        res.redirect('/home/');
        // console.log('no');
        // next();
    }
    // 用户是登录状态 将请求放行
    next();
}

module.exports = guard;