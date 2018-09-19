import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

// actionTypes
// 获取聊天列表
const MSG_LIST = 'msg_list'
// 读取消息
const MSG_RECV = 'msg_recv'
// 标识已读
// const MSG_READ = 'msg_read'


// reducer
const defaultState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chatting(state = defaultState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userId).length}
    case MSG_RECV:
      const n = action.payload.to === action.userId ? 1 : 0
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n}
    // case MSG_READ:
    default:
      return state
  }
}

// actionCreation
function msgList(msgs, users, userId) {
  return {
    type: MSG_LIST,
    payload: {msgs, users, userId}
  }
}

function msgRecv(msg, userId) {
  return {
    type: MSG_RECV,
    userId: userId,
    payload: msg
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist').then((res) => {
      const userId = getState().user._id
      // console.log('getState', getState())
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msgs, res.data.users, userId))
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
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
      // console.log('recvmsg', data)
      const userId = getState().user._id
      dispatch(msgRecv(data, userId))
    })
  }
}