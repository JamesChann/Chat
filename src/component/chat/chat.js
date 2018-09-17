import React, { Component } from 'react'
import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList } from '../../redux/chatting.redux'
import io from 'socket.io-client'

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
    this.props.getMsgListInfo()
    // socket.on('recvmsg', (data) => {
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
  }

  render() {
    return (
      <div>
        {
          this.state.msg.map((item) => {
            return <p key={item}>{item}</p>
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
    console.log(this.state)
    socket.emit('sendmsg', {text: this.state.text})
    this.setState({
      text: ''
    })
  }
}

const mapState = (state) => {
  return {
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMsgListInfo() {
      dispatch(getMsgList())
    }
  }
}

export default connect(mapState, mapDispatch)(Chat)