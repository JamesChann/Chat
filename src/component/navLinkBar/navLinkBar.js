import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class NavLinkBar extends Component  {
  static propTypes = {
		data: PropTypes.array.isRequired
	}
  render() {
    const navList = this.props.data.filter((item) => !item.hide)
    const { pathname } = this.props.location
    return (
      <TabBar>
        {
          navList.map((item) => {
            return <TabBar.Item
                      key={item.path}
                      badge={item.path==='/msg'?this.props.chatInfo.unread:0}
                      title={item.text}
                      icon={{uri: require(`./img/${item.icon}.png`)}}
                      selectedIcon={{uri: require(`./img/${item.icon}-active.png`)}}
                      selected={pathname === item.path}
                      onPress={() => {
                        this.props.history.push(item.path)
                      }}
                   ></TabBar.Item>
          })
        }
      </TabBar>
    )
  }
}

const mapState = (state) => {
  return {
    chatInfo: state.chatting
  }
}

export default connect(mapState)(NavLinkBar)