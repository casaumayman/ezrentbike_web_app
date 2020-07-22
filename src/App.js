import React, { Component } from 'react'
import AppLayout from './layouts/AppLayout';
import {Router} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
//css
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel, faUser, faSignInAlt, faSearch } from '@fortawesome/free-solid-svg-icons'
import { autoLogin } from './store/authentication/actions';
import { AUTHEN_TYPES } from './store/authentication/types';
// import './App.css';
library.add(faStroopwafel, faUser, faSignInAlt, faSearch);

export const rootHistory = createBrowserHistory();

class App extends Component {
  componentWillMount(){
    if (localStorage && localStorage.getItem('token') && localStorage.getItem('remember')==='true') {
      this.props.autoLogin(localStorage.getItem('token'));
    }
    if (localStorage && localStorage.getItem('remember')==='false'){
      localStorage.removeItem('token');
      this.props.onLogout();
    }
  }
  render() {
    return (
      <Router history={rootHistory}>
        <Switch>
          <Route path='/' component={AppLayout}></Route>
        </Switch>
      </Router>
    )
  }
}

const mapDispathToProps = (dispatch) => ({
  autoLogin: (token)=>dispatch(autoLogin(token)),
  onLogout: () => dispatch({
    type: AUTHEN_TYPES.logout
  })
})

export default connect(null, mapDispathToProps)(App);