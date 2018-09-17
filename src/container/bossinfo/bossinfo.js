import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'

class BossInfo extends Component {
  constructor(props) {
		super(props)
		this.state = {
			title:'',
			desc:'',
			company:'',
			money:''
    }
    this.selectPic = this.selectPic.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
	}

  render() {
    // console.log(this.props)
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {
          redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null
        }
        <NavBar mode="dark" >BOSS完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={(imgname)=>this.selectPic(imgname)}
        ></AvatarSelector>
        <InputItem onChange={(v)=>this.onChange('title',v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v)=>this.onChange('company',v)}>
					公司名称
				</InputItem>
				<InputItem onChange={(v)=>this.onChange('money',v)}>
					职位薪资
				</InputItem>
        <TextareaItem
					onChange={(v)=>this.onChange('desc',v)}
					rows={3}
					autoHeight
					title='职位要求'
				>
				</TextareaItem>
        <Button 
          onClick={this.handleUpdate}
          type="primary"
        >
          保存
        </Button>
      </div>
    )
  }

  onChange(key,val){
		this.setState({
			[key]:val
		})
  }

  selectPic(imgname) {
    this.setState({
      avatar: imgname
    })
  }

  handleUpdate() {
    this.props.updateInfo(this.state)
  }
  
}

const mapState = (state) => {
  return {
    redirectTo: state.user.redirectTo
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateInfo(info) {
      dispatch(update(info))
    }
  }
}

export default connect(mapState, mapDispatch)(BossInfo)