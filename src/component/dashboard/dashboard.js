import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navLinkBar/navLinkBar'
import { Switch, Route } from 'react-router-dom'
import PrincessInfo from '../../component/princessInfo/princessInfo'
import PrinceInfo from '../../component/princeInfo/princeInfo'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import { getMsgList, recvMsg } from '../../redux/chatting.redux'

class Dashboard extends Component {
	componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgListInfo()
      this.props.recvMsgInfo()
    }
  }

  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
			{
				path:'/princess',
				text:'公子',
				icon:'prencess',
				title:'公子列表',
				component:PrincessInfo,
				hide:user.type==='prince'
			},
			{
				path:'/prince',
				text:'菇凉',
				icon:'prencess',
				title:'菇凉列表(点击可立即聊天)',
				component:PrinceInfo,
				hide:user.type==='princess'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
		]
    return (
      <div className={this.props.user.type==='prince'?'princeInfo':'princessInfo'}>
        <NavBar className='fixd-header' mode="dark">{navList.find((item)=>item.path===pathname).title}</NavBar>
        <div style={{marginTop: 45}}>
          <Switch>
            {
              navList.map((item) => {
                return <Route key={item.path} path={item.path} component={item.component}></Route>
              })
            }
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    chat: state.chatting
  }
}

const mapDispatch = (dispatch) => {
  return {
    getMsgListInfo() {
      dispatch(getMsgList())
    },
    recvMsgInfo() {
      dispatch(recvMsg())
    }
  }
}

export default connect(mapState, mapDispatch)(Dashboard)