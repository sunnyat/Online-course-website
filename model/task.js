// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 创建作业集合规则
const taskSchema = new mongoose.Schema({
    // 关联课程id
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    // 管理员id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // 作业上传时间
    time: {
        type: Date,
        default: Date.now 
    },
    // 作业题目
    title: {
        type: String
    },
    // 作业内容
    content: {
        type: String
    }
});

// 创建作业集合
const Task = mongoose.model('Task', taskSchema);

// 将评论集合构造函数作为模块成员进行导出
module.exports = {
    Task
}
