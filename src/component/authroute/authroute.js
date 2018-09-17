import { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'

@withRouter
class AuthRoute extends Component {
  render() {
    return (
      null
    )
  }

  componentDidMount() {
    // 判断当前页的地址，如果是login和register，则无需跳转
    const publicList = ['/login', '/register']
    const pathName = this.props.location.pathName
    if (publicList.indexOf(pathName) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info').then((res) => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          this.props.loadDataInfo(res.data.data)
        } else {
          this.props.history.push('/login')
        }
      }
    })
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadDataInfo(info) {
      dispatch(loadData(info))
    }
  }
}

export default connect(null, mapDispatch)(AuthRoute)