const {Task} = require('../../model/task');

module.exports = async(req, res) => {
    const id = req.query.id;
    // res.send('ok');
    // return;

    // 更新用户信息
    await Task.updateOne({_id: id}, {
        title: req.body.title,
        content: req.body.content,
        uid: req.body.uid,
        cid: req.body.cid,
        time: new Date()
    });
    // 重定向到用户列表页面
    res.redirect('/admin/mytask');
}
