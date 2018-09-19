import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chat.redux'
import UserCard from '../userCard/userCard'

class Prince extends Component{
	componentDidMount() {
		this.getUserList('princess')
  }
  
	render(){
		return <UserCard userList={this.props.userList}></UserCard>
  }
  
  getUserList(princess) {
    this.props.getUserListInfo(princess)
  }

}


const mapState = (state) => {
  return {
    userList: state.chat.userList
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUserListInfo(princess) {
      dispatch(getUserList(princess))
    }
  }
}

export default connect(mapState, mapDispatch)(Prince)