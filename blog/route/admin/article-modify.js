// 1.引入formidable第三方模块
const formidable = require('formidable');
const path = require('path');
const {Article} = require('../../model/article');
module.exports = async(req, res) => {
    const id = req.query.id;
    let article = await Article.findOne({_id: id});

    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.配置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3.保留上传文件的后缀
    form.keepExtensions = true;
    // multiple多文件上传 form.parse()里的files将会是一个数组
    form.multiples = true;

    // 4.解析表单
    form.parse(req, async(err, fields, files) => {
        // 判断是否重新上传了封面
        var tcover = files.cover[0].path.split('public')[1];
        var coLength = tcover.length;
        var cLastName = tcover.substring(coLength-4,coLength);
        var cFlag = cLastName == '.jpg' || cLastName == '.png';
        tcover = cFlag ? tcover : 0;

        // 判断是否重新上传了视频
        var tvideo = files.cover[1].path.split('public')[1];
        var viLength = tvideo.length;
        var vLastName = tvideo.substring(viLength-4,viLength);
        var vFlag = vLastName == '.mp4';
        tvideo = vFlag ? tvideo : 0;

        // 更新课程信息
        await Article.updateOne({_id: id}, {
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: tcover || article.cover,
            video: tvideo || article.video,
            content: fields.content
        });
        // 重定向到文章列表页面
        res.redirect('/admin/article');
    })
}