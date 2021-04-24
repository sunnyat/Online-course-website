// 1.引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
const {User} = require('../../model/user');
const bcrypt = require('bcryptjs');
const { send } = require('process');
module.exports = async(req, res, next) => {
    const id = req.query.id;
    
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'headers');
    // 3.保留上传文件的后缀
    form.keepExtensions = true;

    // 4.解析表单
    form.parse(req, async(err, fields, files) => {

        let user = await User.findOne({_id: id});
        // 密码比对
        const isValid = await bcrypt.compare(fields.password, user.password);

        if(isValid) {
            // 密码比对成功
            // 判断用户是否重新上传了头像
            var ucover = files.cover.path.split('public')[1];
            var coLength = ucover.length;
            var lastName = ucover.substring(coLength-4,coLength);
            var flag = lastName == '.jpg' || lastName == '.png';
            ucover = flag ? cover : 0;
            // 更新用户信息
            await User.updateOne({_id: id}, {
                username: fields.username,
                email: fields.email,
                role: fields.role,
                cover: ucover || user.cover,
                state: fields.state
            });
            // 重定向到用户列表页面
            res.redirect('/admin/user');
        } else {
            // 密码比对失败
            let obj = {path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息的修改', id: id}

            next(JSON.stringify(obj));
        }
    });
}