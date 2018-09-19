import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chat.redux'
import UserCard from '../userCard/userCard'

class Princess extends Component{
	componentDidMount() {
		this.getUserList('prince')
  }
  
	render(){
		return <UserCard userList={this.props.userList}></UserCard>
  }
  
  getUserList(prince) {
    this.props.getUserListInfo(prince)
  }

}


const mapState = (state) => {
  return {
    userList: state.chat.userList
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserListInfo(prince) {
      dispatch(getUserList(prince))
    }
  }
}

export default connect(mapState, mapDispatch)(Princess)