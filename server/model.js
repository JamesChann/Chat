const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/react-chat'
mongoose.connect(DB_URL)

// 定义用户模型
const models = {
  user: {
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'type': {type: String, require: true},
    // 头像
    'avatar': {type: String},
    // 个人简介
    'desc': {type: String},
    // 职位名称
    'title': {type: String},
    // 如果是Boss，再增加两个字段
    'company': {type: String},
    'money': {type: String}
  },
  chat: {
    'chatId': {type: String, require: true},
    'from': {type: String, require: true},
    'to': {type: String, require: true},
    'read': {type: Boolean, default: false},
    'content': {type: String, require: true, default: ''},
    'create_time': {type: Number, default: new Date().getTime()}
  }
}
// 批量取出字段
for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}