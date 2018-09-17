import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

// actionTypes
// 获取聊天列表
const MSG_LIST = 'msg_list'
// 读取消息
const MSG_RECV = 'msg_recv'
// 标识已读
const MSG_READ = 'msg_read'


// reducer
const defaultState = {
  chatmsg: [],
  unread: 0
}

export function chatting(state = defaultState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.payload, unread:action.payload.msgs.filter(v=>!v.read).length}
    case MSG_RECV:
    case MSG_READ:
    default:
      return state
  }
}

// actionCreation
function msgList(msgs) {
  return {
    type: 'MSG_LIST',
    payload: msgs
  }
}

export function getMsgList() {
  return (dispatch) => {
    axios.get('/user/getmsglist').then((res) => {
      if (res.state === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs))
      }
    })
  }
}