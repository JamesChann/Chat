// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { user as userReducer } from './redux/user.redux'
import { chat as chatReaducer } from './redux/chat.redux'
import { chatting as chattingReaducer } from './redux/chatting.redux'
export default combineReducers({
  user: userReducer,
  chat: chatReaducer,
  chatting: chattingReaducer
})