import React, { Component } from 'react'
import logoImg from './chat-logo.png'
import './logo.less'

class Logo extends Component {
  render() {
    return (
      <div className="logo-container">
        <img ref="logos" width="280" height="280" src={logoImg} alt=""/>
      </div>
    )
  }
}

export default Logo