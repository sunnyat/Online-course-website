// 创建用户集合
// 引入mongoose第三方模块
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcryptjs');
// 引入joi模块
const Joi = require('joi');
// 创建用户集合规则
const userSchame = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱地址不重复
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    cover: {  // 用户头像
        type: String,
        default: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F01%2F56%2F69%2F585747cfd354024.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620789520&t=2abab02b11f4f025751e87165c399572'
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        require: true
    },
    state: {
        type: Number,
        // 0 启用状态
        // 1 禁用状态
        default: 0
    }
});

// 创建集合
const User = mongoose.model('User', userSchame);

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'sy',
        email: 'syy@qq.cn',
        password: pass,

    });
}
// createUser();

// 验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        // cover: Joi.string().required().error(new Error('用户头像不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid('0', '1').required().error(new Error('状态值非法'))
    };

    // 实施验证
    return Joi.validate(user, schema);
}

// 将用户集合作为模块成员进行导出
module.exports = {
    // User: User 属性和值一样 可以省略
    User,
    validateUser
}

