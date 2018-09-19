import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import { chatForm } from '../../component/chat-form/chat-form'
import './login.less'

@chatForm
class Login extends Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div className="login-bg">
        {
          this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null
        }
        <Logo></Logo>
        <WingBlank>
          <List>
            {
              this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null
            }
            <InputItem
              onChange={(v)=> this.props.handChange('user', v)}
            >用户</InputItem>
            <WhiteSpace />
            <InputItem
              onChange={(v)=> this.props.handChange('pwd', v)}
              type="password"
            >密码</InputItem>
          </List>
          <WhiteSpace /><WhiteSpace />
          <Button type="primary" onClick={this.handleClick}>登录</Button>
          <WhiteSpace />
          <Button onClick={this.register} className="active" type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }

  // handChange(key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }

  handleClick() {
    this.props.loginInfo(this.props.state)
  }

  register() {
    this.props.history.push('/register')
  }
}

// 定义mapState和mapDispatch
const mapState = (state) => {
  return {
    msg: state.user.msg,
    redirectTo: state.user.redirectTo
  }
}

const mapDispatch = (dispatch) => {
  return {
    loginInfo(info) {
      dispatch(login(info))
    }
  }
}

export default connect(mapState, mapDispatch)(Login)