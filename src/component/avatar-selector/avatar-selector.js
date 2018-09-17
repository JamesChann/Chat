import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
  static PropTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      icon: ''
    }
		this.handleSelect = this.handleSelect.bind(this)
	}

  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                        .split(',')
                        .map(v=>({
                          icon:require(`../img/${v}.png`),
                          text:v
                        }))
    const gridHeader = this.state.icon ? 
                      (<div>
                        <span>已选择头像</span>
                        <img style={{width:20}} src={this.state.icon} alt=""/>
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