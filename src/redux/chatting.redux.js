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
  users: {},
  unread: 0
}

export function chatting(state = defaultState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v=>!v.read).length}
    case MSG_RECV:
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1}
    // case MSG_READ:
    default:
      return state
  }
}

// actionCreation
function msgList(msgs, users) {
  return {
    type: MSG_LIST,
    payload: {msgs, users}
  }
}

function msgRecv(msg) {
  return {
    type: MSG_RECV,
    payload: msg
  }
}

export function getMsgList() {
  return (dispatch) => {
    axios.get('/user/getmsglist').then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs, res.data.users))
      }
    })
  }
}

export function sendMsg({from, to, msg}) {
  return (dispatch) => {
    socket.emit('sendmsg', {from, to, msg})
  }
}

export function recvMsg() {
  return (dispatch) => {
    socket.on('recvmsg', function(data) {
      console.log('recvmsg', data)
      alert(data)
      dispatch(msgRecv(data))
    })
  }
}