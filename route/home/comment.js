// 将评论集合构造函数进行导入
const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    // 接收客户端传递过来的请求参数
    const { content, uid, cid } = req.body;
    // res.send(req.body);
    // return;
    // 将评论信息存储到评论集合中
    await Comment.create({
        content: content,
        uid: uid,
        cid: cid,
        time: new Date()
    });

    // 将页面重定向回课程详情页面
    res.redirect('/home/course?id=' + cid);
}