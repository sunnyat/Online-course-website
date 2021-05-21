
module.exports = async(req, res) => {

    // 标识 标识当前访问的是上传作业页面
    req.app.locals.currentLink = 'personal';

    // res.send(result);
    // return;
    // 渲染文章列表页面模板
    res.render('admin/personal', {
        // tasks: result
    });
}