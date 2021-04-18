const { Article } = require('../../model/article');

module.exports = async(req, res) => {

    // 获取搜索框关键字
     const condition = req.query.search;

    // 从数据库中查询数据
    let result = await Article.find({"title":{$regex: condition}}).populate('author').lean();
    // res.send(result);
    // return;
    
    // 渲染模板并传递数据
    // res.send('欢迎来到课程网站首页')
    res.render('home/search.art', {
        result: result,
        condition: condition
    });
    
}