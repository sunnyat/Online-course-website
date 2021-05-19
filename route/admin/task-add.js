// 将评论集合构造函数进行导入
const { Task } = require('../../model/task');

module.exports = async(req, res) => {
    // 接收客户端传递过来的请求参数
    const { title, content, uid, cid } = req.body;

    // res.send(req.body);
    // return;
    // 将评论信息存储到评论集合中
    await Task.create({
        title: title,
        content: content,
        uid: uid,
        cid: cid,
        time: new Date()
    });

    // 将页面重定向到作业页面
    res.redirect('/admin/mytask');
}