const { Article } = require('../../model/article');

module.exports = async(req, res) => {

    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    // 接收客户端传递过来的请求参数
    const {message, id} = req.query;

    let result = await Article.findOne({_id: id}).populate('author').lean();
    
    // 如果当前传递了id参数
    if(id) {
        // 修改操作
        let article = await Article.findOne({_id: id});

        res.render('admin/article-edit', {
            message: message,
            article: article,
            link: '/admin/article-modify?id=' + id,
            button: '修改',
            result: result
        });
    } else {
        // 添加操作
        res.render('admin/article-edit', {
            message: message,
            link: '/admin/article-add',
            button: '添加'
        });
    }
}