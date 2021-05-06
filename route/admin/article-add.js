// 1.引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
const { Article, validateArticle } = require('../../model/article');

module.exports = (req, res, next) => {

    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3.保留上传文件的后缀
    form.keepExtensions = true;
    // multiple多文件上传 form.parse()里的files将会是一个数组
    form.multiples = true;
    // 设置文件大小
    // form.maxFieldsSize = 650 * 1024 * 1024;

    // 4.解析表单
    form.parse(req, async(err, fields, files) => {
        try {
            await validateArticle(fields);
        } catch(e) {
            return next(JSON.stringify({path:'/admin/article-edit', message: e.message}));
        }
        if(err) {
            console.log('解析失败');
        }
        // res.send(files.cover[1].path.split('public')[1]);
        // return;
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover[0].path.split('public')[1], // 图片
            video: files.cover[1].path.split('public')[1], // 视频
            content: fields.content
        });
        // res.send(fields.author);

        // 重定向到文章列表页面
        res.redirect('/admin/article');
    })
    // res.send('ok');
}