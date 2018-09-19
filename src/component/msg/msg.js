import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List } from 'antd-mobile'
import './msg.less'

class Msg extends Component {
  render() {
    const Item = List.Item
		const Brief = Item.Brief
    // console.log(this.props.states)
    const userId = this.props.states.user._id

    const msgsGroup = {}
    this.props.states.chatting.chatmsg.forEach((item)=> {
      msgsGroup[item.chatId] = msgsGroup[item.chatId] || []
      msgsGroup[item.chatId].push(item)
    })
    // console.log(msgsGroup)
    const chatList = Object.values(msgsGroup)
    return (
      <div className="msgs">
          {
            chatList.map((item) => {
              console.log(item)
              const targetId = item[0].from === userId ? item[0].to : item[0].from
              // console.log(this.props.userInfo[targetId])
              const lastMsg = this.getLastMsg(item)
              // const name = this.props.userInfo[targetId] ? this.props.userInfo[targetId].name : ''
              // const avatar = this.props.userInfo[targetId] ? this.props.userInfo[targetId].avatar : ''
              if (!this.props.userInfo[targetId]) {
                return null
              }
              return (
                <List key={lastMsg._id}>
                  <Item thumb={require(`../img/${this.props.userInfo[targetId].avatar}.png`)}>
                    {(this.props.userInfo[targetId]).name}
                    <Brief>{lastMsg.content}</Brief>
                  </Item>
                </List>
              )
            })
          }
      </div>
    )
  }

  // 获取最后一条信息
  getLastMsg(arr) {
    return arr[arr.length - 1]
  }
}

const mapState = (state) => {
  return {
    states: state,
    userInfo: state.chatting.users
  }
}

export default connect(mapState, null)(Msg)