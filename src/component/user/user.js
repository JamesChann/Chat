import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert;

class User extends Component{
  constructor(props){
		super(props)
		this.logout = this.logout.bind(this)
  }
  
  render(){
    console.log(this.props.users)
    const personal = this.props.users
    console.log(personal)
		return personal.user ? (
      <div>
        <Result
          img={<img src={require(`../img/${personal.avatar}.png`)} style={{width:50}} alt="" />}
          title={personal.user}
					message={personal.type === 'boss' ? personal.company : null}
        >
        </Result>
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {personal.title}
            {
              personal.desc.split('\n').map((item) => (
                <Brief key={item}>{item}</Brief>
              ))
            }
            {personal.money ? <Brief>{personal.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item multipleLine onClick={this.logout}>
            退出登录
          </Item>
        </List>
      </div>
    ) : <Redirect to={personal.redirectTo} />
  }

  logout() {
    console.log('logout')
    alert('注销', '确认退出登录吗？', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认',
        onPress: () => {
          browserCookie.erase('userId')
          this.props.logoutSubmitInfo()
        }
      }
    ])
  }

}

const mapState = (state) => {
  return {
    users: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    logoutSubmitInfo() {
      dispatch(logoutSubmit())
    }
  }
}

export default connect(mapState, mapDispatch)(User)