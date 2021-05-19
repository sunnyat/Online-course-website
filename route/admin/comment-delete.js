const { Comment } = require('../../model/comment');

module.exports = async(req, res) => {
    // res.send(req.query.id);
    // return;
    await Comment.findOneAndDelete({_id: req.query.id});
    // 重定向到留言列表页面
    res.redirect('/admin/comment');
    
};