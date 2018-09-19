import React, { Component } from 'react'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends Component {
  render() {
    return (
      <WingBlank>
        <WhiteSpace />
        {
          this.props.userList.map((item) => {
            return item.avatar ? 
                (<Card key={item._id} onClick={()=>this.handleClick(item)}>
                  <Card.Header
                    title={item.user}
                    thumb={require(`../img/${item.avatar}.png`)}
                    extra={<span>{item.title}</span>}
                  >
                  </Card.Header>
                  <Card.Body>
                    {
                      item.desc.split('\n').map((itemInner)=> (
                        <div key={itemInner}>{itemInner}</div>
                      ))
                    }
                  </Card.Body> 
                </Card>) : null
          })
        }
      </WingBlank>
    )
  }

  handleClick(info) {
    this.props.history.push(`/chat/${info._id}`)
  }
}

export default UserCard