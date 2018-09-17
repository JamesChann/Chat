import React, { Component } from 'react'

export function chatForm(Comp) {
  return class WrapComp extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handChange = this.handChange.bind(this)
    }

    handChange(key, val) {
      this.setState({
        [key]: val
      })
    }

    render() {
      return (
        <Comp handChange={this.handChange} state={this.state} {...this.props}></Comp>
      )
    }
  }
}