import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chat.redux'
import UserCard from '../userCard/userCard'

class Genius extends Component{
	componentDidMount() {
		this.getUserList('boss')
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

export default connect(mapState, mapDispatch)(Genius)