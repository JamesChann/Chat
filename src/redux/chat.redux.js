import axios from 'axios'

// actionTypes
const USER_LIST = 'USER_LIST'


// reducer
const defaultState = {
  userList: []
}

export function chat(state = defaultState, action) {
  switch(action.type) {
    case USER_LIST: 
      return {...state, userList: action.payload}
    default:
      return state
  }
}


// actionCreators
function userList(data) {
  return {
    type: USER_LIST,
    payload: data
  }
}

export function getUserList(type) {
  return (dispatch) => {
    axios.get('/user/list?type=' + type).then((res) => {
      if (res.data.code === 0) {
        dispatch(userList(res.data.data))
      }
    })
  }
}
