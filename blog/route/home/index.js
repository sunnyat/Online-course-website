const { Article } = require('../../model/article');
// 导入分页模块
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    // 获取页码值
    const page = req.query.page;

    // 从数据库中查询数据
    let result = await pagination(Article).find().page(page).size(8).display(5).populate('author').exec();

    let str = JSON.stringify(result);
    let results = JSON.parse(str);

    // 渲染模板并传递数据
    // res.send('欢迎来到课程网站首页')
    res.render('home/home.art', {
        result: results
    });
}