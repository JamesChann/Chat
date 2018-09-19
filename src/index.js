import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css'

import Login from './container/login/login.js'
import Register from './container/register/register.js'
import AuthRoute from './component/authroute/authroute'
import PrinceInfo from './container/prince/prince'
import PrincessInfo from './container/princess/princess'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'
import reducers from './reducer'
import './config'
import './index.less'

const store = createStore(reducers, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
	(<Provider store={store}>
    <BrowserRouter>
			<div className="page-index">
				<AuthRoute></AuthRoute>
				<Switch>
					<Route path="/" exact component={Login}></Route>
					<Route path='/princeinfo' component={PrinceInfo}></Route>
					<Route path='/princessinfo' component={PrincessInfo}></Route>
					<Route path="/login" component={Login}></Route>
					<Route path="/register" component={Register}></Route>
					<Route path="/chat/:user" component={Chat}></Route>
					<Route component={Dashboard}></Route>
				</Switch>
			</div>
    </BrowserRouter>
	</Provider>),
	document.getElementById('root')
)
