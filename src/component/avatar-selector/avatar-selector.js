import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import './avatar.less'
// import PropTypes from 'prop-types'

class AvatarSelector extends Component {

  constructor(props) {
    super(props)
    this.state = {
      icon: ''
    }
		this.handleSelect = this.handleSelect.bind(this)
	}

  render() {
    const avatarList = 'pic01,pic02,pic03,pic04,pic05,pic06,pic07,pic08,pic09,pic10,pic11,pic12,pic13,pic14,pic15'
                        .split(',')
                        .map(v=>({
                          icon:require(`../img/${v}.png`),
                          text:v
                        }))
    const gridHeader = this.state.icon ? 
                      (<div>
                        <span style={{verticalAlign: 'middle'}}>已选择头像</span>
                        <img style={{width:20, verticalAlign: 'middle',marginLeft: 10}} src={this.state.icon} alt=""/>
                      </div>)
                      : '请选择头像'
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid data={avatarList} columnNum={5} onClick={(ele) => this.handleSelect(ele)} />
        </List>
      </div>
    )
  }

  handleSelect(ele) {
    this.setState(ele)
    this.props.selectAvatar(ele.text)
  }

}

export default AvatarSelector