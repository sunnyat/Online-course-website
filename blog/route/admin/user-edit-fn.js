// 引入用户集合的构造函数
const {User, validateUser} = require('../../model/user');
// 1.引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
// 引入加密模块
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {

    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'headers');
    // 3.保留上传文件的后缀
    form.keepExtensions = true;
    
    // 4.解析表单
    form.parse(req, async(err, fields, files) => {
        try {
            await validateUser(fields);
        } catch(e) {
            return next(JSON.stringify({path:'/admin/user-edit', message: e.message}));
        }
        // 根据邮箱地址查询用户是否存在
        let user = await User.findOne({email: fields.email});
        // 如果用户已经存在
        if(user) {
            // 重定向回用户添加页面
            // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`);
            return next(JSON.stringify({path: '/admin/user-edit', message: '邮箱地址已经被占用'}));
        }
        // 对密码进行加密处理 生成随机字符串
        const salt = await bcrypt.genSalt(10);
        // 加密
        const password = await bcrypt.hash(fields.password, salt);
        // 替换密码
        fields.password = password;
 
        await User.create({
            username: fields.username,
            email: fields.email,
            password: fields.password,
            cover: files.cover.path.split('public')[1],
            role: fields.role,
            state: fields.state
        });
        
        // 重定向到用户列表页面
        res.redirect('/admin/user');
    })

}