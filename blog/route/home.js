// 引用express框架
const express = require('express');
// 创建博客展示页面路由
const home = express.Router();

// 前台首页展示页面
home.get('/', require('./home/index'));

// 视频详情展示页面
home.get('/course', require('./home/course'));

// 创建评论功能路由
home.post('/comment', require('./home/comment'));

// 前台搜索展示页面
home.get('/search', require('./home/search'));

// 将路由对象作为模块成员进行导出
module.exports = home;