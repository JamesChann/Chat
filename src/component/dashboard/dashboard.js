import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navLinkBar/navLinkBar'
import { Switch, Route } from 'react-router-dom'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import { getMsgList, recvMsg } from '../../redux/chatting.redux'

function Msg() {
  return <h2>Msg页</h2>
}

class Dashboard extends Component {
	componentDidMount() {
    this.props.getMsgListInfo()
    this.props.recvMsgInfo()
  }

  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:user.type==='genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:user.type==='boss'
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
      <div>
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
    user: state.user
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