// 1.引入mongoose模块
const mongoose = require('mongoose');
// 引入joi模块
const Joi = require('joi');

// 2.创建文章集合规则
    const articleSchema = new mongoose.Schema({
        title: {
            type: String,
            maxlength: 20,
            minlength: 4,
            // 第一个参数 必填or不必填, 第二个参数为错误信息
            required: [true, '请填写文章标题']
        },
        author: {
            type: mongoose.Schema.Types.ObjectId, // 数据库中独有的类型
            ref: 'User',  // 用户集合名称
            required: [true, '请传递作者']
        },
        publishDate: { // 发布时间
            type: Date,
            // 非必填 如果没传入时间，则自动传当前时间
            default: Date.now  
        },
        cover: {  // 课程封面
            type: String,
            default: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdingyue.nosdn.127.net%2Fg1pUsTRtVscn2jyn8qQrdjhIiJeWOwO1DcF3u50t709Vz1513449016965.jpg&refer=http%3A%2F%2Fdingyue.nosdn.127.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620789296&t=311cf375b5200ce33547484bbc5180d9'
        },
        video: {  // 课程视频
            type: String,
            // default: null
            default: 'https://blz-videos.nosdn.127.net/1/OverWatch/OVR-S03_E03_McCree_REUNION_zhCN_1080P_mb78.mp4'
        },
        content: {
            type: String
        }
    })
// 3.根据规则创建集合
const Article = mongoose.model('Article', articleSchema); // 名称首字母必须大写

// 验证用户信息
const validateArticle = article => {
    // 定义对象的验证规则
    const schema = {
        title: Joi.string().min(4).max(16).required().error(new Error('请按要求填写课程名称')),
        author: Joi.string().required().error(new Error('请按要求填写课程作者')),
        publishDate: Joi.date().required().error(new Error('请填写课程发布日期')),
        // cover: Joi.required().error(new Error('请上传课程封面')),
        content: Joi.string().required().error(new Error('请按要求填写课程简介'))
    };

    // 实施验证
    return Joi.validate(article, schema);
}

// 4.将集合规则作为模块成员进行导出
module.exports ={
    Article,
    validateArticle
}