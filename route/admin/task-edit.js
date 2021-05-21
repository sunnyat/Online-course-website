const { Article } = require('../../model/article');
const { Task } = require('../../model/task');
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {

    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'mytask';

    // 接收客户端传递过来的请求参数
    const {message, id} = req.query;


    // 接收客户端传递过来的页码
    const page = req.query.page;
    let articles = await pagination(Article).find().page(page).size(6).display(2).populate('author').exec();
    
    let str = JSON.stringify(articles);
    let results = JSON.parse(str);

    
    // 如果当前传递了id参数
    if(id) {
        // 修改操作
        // let result = await Task.findOne({_id: id}).populate('cid').populate('uid').lean();
        let result = await Task.findOne({_id: id});
        // res.send(result);
        // return;
        res.render('admin/task-edit', {
            message: message,
            task: result,
            link: '/admin/task-modify?id=' + id,
            button: '修改',
        });
    } else {
        // 上传操作
        res.render('admin/task-edit', {
            message: message,
            link: '/admin/task-add',
            button: '上传',
            articles: results
        });
    }
}