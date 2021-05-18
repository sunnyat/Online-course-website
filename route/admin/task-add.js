// 将评论集合构造函数进行导入
const { Task } = require('../../model/task');

module.exports = async(req, res) => {
    // 接收客户端传递过来的请求参数
    const { content, uid, cid } = req.body;

    // 将评论信息存储到评论集合中
    await Task.create({
        content: content,
        uid: uid,
        cid: cid,
        time: new Date()
    });

    // 将页面重定向到上传作业页面
    res.redirect('/admin/task');
}