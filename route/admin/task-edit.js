const { Task } = require('../../model/task');

module.exports = async(req, res) => {

    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'task';

    // 接收客户端传递过来的请求参数
    const {message, id} = req.query;

    let result = await Task.findOne({_id: id}).populate('cid').lean();
    
    // 如果当前传递了id参数
    if(id) {
        // 修改操作
        let task = await Task.findOne({_id: id});

        res.render('admin/task-edit', {
            message: message,
            task: task,
            link: '/admin/task-modify?id=' + id,
            button: '修改',
            result: result
        });
    } else {
        // 上传操作
        res.render('admin/task-edit', {
            message: message,
            link: '/admin/task-add',
            button: '上传'
        });
    }
}