// 1.引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
const {Article} = require('../../model/article');
module.exports = (req, res) => {
    const id = req.query.id;

    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3.保留上传文件的后缀
    form.keepExtensions = true;
    // res.send(form);
    // return;

    // 4.解析表单
    form.parse(req, async(err, fields, files) => {

        await Article.updateOne({_id: id}, {
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        

        // 重定向到文章列表页面
        res.redirect('/admin/article');
    })

        // res.redirect('/admin/article');
    // res.send(id);

    // // 接收客户端传递过来的请求参数
    // const {title, author, publishDate, cover, content} = req.body;
    // const id = req.query.id;
    // // console.log(id);
    // // res.send(req.body);
    // // return;
    // await Article.updateOne({_id: id}, {
    //     title: title,
    //     author: author,
    //     publishDate: publishDate,
    //     cover: cover.path.split('public')[1],
    //     content: content
    // });
    // // 重定向到课程列表页面
    // res.redirect('/admin/article');

}