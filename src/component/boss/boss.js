import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chat.redux'
import UserCard from '../userCard/userCard'

class Boss extends Component{
	componentDidMount() {
		this.getUserList('genius')
  }
  
	render(){
		return <UserCard userList={this.props.userList}></UserCard>
  }
  
  getUserList(genius) {
    this.props.getUserListInfo(genius)
  }

}


const mapState = (state) => {
  return {
    userList: state.chat.userList
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserListInfo(genius) {
      dispatch(getUserList(genius))
    }
  }
}

export default connect(mapState, mapDispatch)(Boss)