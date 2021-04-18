const { User } = require('../../model/user');

module.exports = async(req, res) => {
    // 获取要删除的用户id
    // res.send(req.query.id);
    // return;
    
    await User.findOneAndDelete({_id: req.query.id});
    // 重定向到用户列表页面
    res.redirect('/admin/user');
    
};