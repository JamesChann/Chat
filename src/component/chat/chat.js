import React, { Component } from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chatting.redux'
import './chat.less'
import io from 'socket.io-client'
import { getChatId } from '../../util';

const socket = io('ws://localhost:9093')

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    if (!this.props.chatInfo.chatmsg.length) {
      this.props.getMsgListInfo()
      this.props.recvMsgInfo()
    }
    // socket.on('recvmsg', (data) => {
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
  }

  render() {
    const users = this.props.chatInfo.users
    const userId = this.props.match.params.user
    if (!users[userId]) {
      return null
    }
    const chatId = getChatId(userId, this.props.userInfo._id)
    const chatmsgs = this.props.chatInfo.chatmsg.filter((item)=>item.chatId===chatId)
    return (
      <div id='chat-page' className={this.props.userInfo.type==='prince'?'princeInfo':'princessInfo'}>
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => {
          this.props.history.goBack()
        }}
        >
          {users[userId].name}
        </NavBar>

        {
          chatmsgs.map((item) => {
            const avatar = require(`../img/${users[item.from].avatar}.png`)
            return item.from === userId ? (
                <div key={item._id} className="chathe">
                  <img className="chatavatar" src={avatar} alt=""/>
                  <div className="chattxt">
                    <span>{item.content}</span>
                    <div className="arrow"></div>
                  </div>
                </div>
              ) : (
                <div key={item._id} className="chatme">
                  <img className="chatavatar" src={avatar} alt=""/>
                  <div className="chattxt">
                    <span>{item.content}</span>
                    <div className="arrow"></div>
                  </div>
                </div>
              )
            //   <List key={item._id}>
            //     <Item
            //       thumb={avatar}
            //     >
            //       {item.content}
            //     </Item>
            //   </List>
            // ) : (
            //   <List key={item._id}>
            //     <Item className="chat-me" extra={<img src={avatar} />}>
            //       {item.content}
            //     </Item>
            //   </List>
            // )
            // return <p key={item._id}>{item.content}</p>
          })
        }
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={(val)=>this.sendMsgInfo(val)}
              extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
            >
            </InputItem>
          </List>
        </div>
      </div>
    )
  }

  sendMsgInfo(val) {
    this.setState({
      text: val
    })
  }

  handleSubmit() {
    // socket.emit('sendmsg', {text: this.state.text})
    // this.setState({
    //   text: ''
    // })
    const from = this.props.userInfo._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsgInfo({from, to, msg})
    this.setState({
      text: ''
    })
  }
}

const mapState = (state) => {
  return {
    userInfo: state.user,
    chatInfo: state.chatting
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMsgListInfo() {
      dispatch(getMsgList())
    },
    sendMsgInfo({from, to, msg}) {
      dispatch(sendMsg({from, to, msg}))
    },
    recvMsgInfo() {
      dispatch(recvMsg())
    }
  }
}

export default connect(mapState, mapDispatch)(Chat)