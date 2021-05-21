const { Article } = require('../../model/article');
// 导入评论集合构造函数
const { Comment } = require('../../model/comment');
const { Task } = require('../../model/task');

module.exports = async(req, res) => {
    // 接收客户端传递过来的课程id值
    const id = req.query.id;
    // 根据id查询课程详细信息
    let course = await Article.findOne({_id: id}).populate('author').lean();
    // 查询当前课程所对应的评论信息
    let comments = await Comment.find({cid: id}).populate('uid').lean();
    // 查询当前课程所对应的作业信息
    let tasks = await Task.findOne({cid: id}).populate('uid').lean();
    
    // res.send(comments);
    // return;
    res.render('home/course.art', {
        course: course,
        comments: comments,
        tasks: tasks
    });

}