const express = require('express')
// md5加密
const utils = require('utility')

const Router = express.Router()
// 获取user模型
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')


Router.get('/list', function(req, res) {
  // 清除所有记录
  // User.remove({}, function(err, doc) {})
  // find查询记录
  const { type } = req.query
  User.find({type: type}, function(err, doc) {
    return res.json({code: 0, data: doc})
  })
})

// 更新完善个人详细信息
Router.post('/update', function(req, res) {
  const userId = req.cookies.userId
  if (!userId) {
    return json.dumps({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userId, body, function(err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})

// 获取用户聊天信息
Router.get('/getmsglist', function(req, res) {
  const user = req.cookies.user
  Chat.find({}, function(err, doc) {
    if (!err) {
      return res.json({code: 0, msgs: doc})
    }
  })
})

// 用户登录
Router.post('/login', function(req, res) {
  const {user, pwd} = req.body
  User.findOne({user: user, pwd: md5Pwd(pwd)}, {'pwd': 0, '__v': 0}, function(err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误'})
    }
    // 设置cookie保存用户状态
    res.cookie('userId', doc._id)
    return res.json({code: 0, data: doc})
  })
})

// 用户注册，需要依赖body-parser
Router.post('/register', function(req, res) {
  console.log(req.body)
  const {user, pwd, type} = req.body
  User.findOne({user: user}, function(err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }
    
    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({code: 1, msg: '服务端出错了'})
      }
      const { user, type, _id } = doc
      res.cookie('userId', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
    // 因为需要设置id所以用save方法保存插入数据
    // User.create({user, type, pwd: md5Pwd(pwd)}, function(err, doc) {
    //   if (err) {
    //     return res.json({code: 1, msg: '服务端出错了'})
    //   }
    //   return res.json({code: 0})
    // })
  })
})

// 判断用户状态
Router.get('/info', function(req, res) {
  const { userId } = req.cookies
  if (!userId) {
    return res.json({code: 1})
  }
  User.findOne({_id: userId}, {'pwd': 0, '__v': 0}, function(err, doc) {
    if (err) {
      return res.json({code: 1, msg: '后端出错了'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

// 两层md5加salt
function md5Pwd(pwd) {
  const salt = 'chat_is_good_3957x8yza6!@#IUHJh~~'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router