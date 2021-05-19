// const { Task } = require('../../model/task');
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {

    // 接收客户端传递过来的页码
    const page = req.query.page;
    // 标识 标识当前访问的是上传作业页面
    req.app.locals.currentLink = 'personal';
    

    // res.send(result);
    // return;
    // 渲染文章列表页面模板
    res.render('admin/personal', {
        // tasks: result
    });
}