// 导入用户集合构造函数
const {User} = require('../../model/user');
module.exports = async(req, res) => {

    // 标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 接收客户端传递过来的当前页参数
    let page = req.query.page || 1;

    let pagesize = 6;

    let count = await User.countDocuments({});

    let total = Math.ceil(count / pagesize);

    let start = (page - 1) * pagesize;

    // 将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start);
    
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    });
};