const { Task } = require('../../model/task');

module.exports = async(req, res) => {
    // res.send(req.query.id);
    // return;
    await Task.findOneAndDelete({_id: req.query.id});
    // 重定向到作业列表页面
    res.redirect('/admin/mytask');
    
};