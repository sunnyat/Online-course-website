// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 创建评论集合规则
const commentSchema = new mongoose.Schema({
    // 课程id
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    // 用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date,
        default: Date.now 
    },
    content: {
        type: String
    }
});

// 创建评论集合
const Comment = mongoose.model('Comment', commentSchema);

// 将评论集合构造函数作为模块成员进行导出
module.exports = {
    Comment
}
