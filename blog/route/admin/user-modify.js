const {User} = require('../../model/user');
const bcrypt = require('bcryptjs');
module.exports = async(req, res, next) => {
    // 接收客户端传递过来的请求参数
    const {username, email, password, role, state} = req.body;
    const id = req.query.id;
    
    // res.send(body.password);
    let user = await User.findOne({_id: id});
    // 密码比对
    const isValid = await bcrypt.compare(req.body.password, user.password);
    
    if(isValid) {
        // res.send('密码比对成功');
        // 密码比对成功
        await User.updateOne({_id: id}, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        // 重定向到用户列表页面
        res.redirect('/admin/user');
    } else {
        // 密码比对失败
        let obj = {path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息的修改', id: id}

        next(JSON.stringify(obj));
    }
    // res.send(user);

}