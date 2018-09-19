import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import { chatForm } from '../../component/chat-form/chat-form'
import './register.less'

@chatForm
class Register extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount(){
		this.props.handChange('type', 'prince')
	}

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div className="register-bg">
        {
          this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null
        }
        <Logo></Logo>
        <List>
          {
            this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null
          }
          <InputItem 
            onChange={(v)=> this.props.handChange('user', v)}>
            用户名
          </InputItem>
          <WhiteSpace />
          <InputItem 
            onChange={(v)=> this.props.handChange('pwd', v)}
            type="password"
          > 
            密码
          </InputItem>
          <WhiteSpace />
          <InputItem 
            onChange={(v)=> this.props.handChange('repeatPwd', v)}
            type="password"  
          >
            确认密码
          </InputItem>
          <WhiteSpace />
          <RadioItem 
            onChange={()=> this.props.handChange('type', 'prince')} 
            checked={this.props.state.type==='prince'}>
            王子
          </RadioItem>
          <RadioItem 
            onChange={(v)=> this.props.handChange('type', 'princess')} 
            checked={this.props.state.type==='princess'}>
            公主
          </RadioItem>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleClick}>注册</Button>
        </List>
      </div>
    )
  }

  // handChange(key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }

  handleClick() {
    this.props.registerInfo(this.props.state)
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
    registerInfo(info) {
      dispatch(register(info))
    }
  }
}

export default connect(mapState, mapDispatch)(Register)