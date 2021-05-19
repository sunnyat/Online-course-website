// 引用express框架
const express = require('express');
// 创建博客展示页面路由
const admin = express.Router();
//引入中间件，处理multipart数据...没用了
// const multipart = require('connect-multiparty')
// const multipartMiddleware = multipart()

// 渲染登录页面
admin.get('/login', require('./admin/loginPage'));

// 实现登录功能
admin.post('/login', require('./admin/login'));

// 渲染注册页面
admin.get('/register', require('./admin/registerPage'));

// 实现注册功能
admin.post('/register', require('./admin/register'));

// 创建用户列表路由
admin.get('/user', require('./admin/userPage'));

// 实现退出功能(通过a标签过来的请求一定是get请求)
admin.get('/logout', require('./admin/logout'));

// 创建用户编辑页路由
admin.get('/user-edit',require('./admin/user-edit'));

// 创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 创建实现用户修改功能路由
admin.post('/user-modify', require('./admin/user-modify'));

// 删除用户功能
admin.get('/delete', require('./admin/user-delete'));

// 课程列表页面路由
admin.get('/article', require('./admin/article'));

// 课程编辑页面路由
admin.get('/article-edit', require('./admin/article-edit'));

// 实现课程添加功能的路由
admin.post('/article-add', require('./admin/article-add'));

// 实现课程修改功能的路由
admin.post('/article-modify', require('./admin/article-modify'));

// 删除课程功能
admin.get('/delete-course', require('./admin/article-delete'));

// 作业列表页面路由
admin.get('/task', require('./admin/task'));

// 作业编辑页面路由
admin.get('/task-edit', require('./admin/task-edit'));

// 实现作业上传功能的路由
admin.post('/task-add', require('./admin/task-add'));

// 实现作业修改功能的路由
admin.post('/task-modify', require('./admin/task-modify'));

// 删除作业功能
admin.get('/task-delete', require('./admin/task-delete'));

// 个人中心路由
admin.get('/personal', require('./admin/personal'));

// 我上传的课程路由
admin.get('/mycourse', require('./admin/mycourse'));

// 我上传的作业路由
admin.get('/mytask', require('./admin/mytask'));

// 留言列表页面路由
admin.get('/comment', require('./admin/comment'));

// 删除留言功能
admin.get('/comment-delete', require('./admin/comment-delete'));

// 将路由对象作为模块成员进行导出
module.exports = admin;
