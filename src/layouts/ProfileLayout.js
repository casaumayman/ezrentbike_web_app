import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfileLeft from '../components/ProfileLeft';
import { Route, Switch } from 'react-router-dom';
import { MDBBtnGroup, MDBBtn } from 'mdbreact';
import { rootHistory } from '../App';
import ProfileInfo from '../components/ProfileInfo';
import ProfileChangePass from '../components/ProfileChangePass';
import { Badge } from 'antd';
import ProfileCard from 'components/ProfileCard';
import { callApi } from 'services/apiService';
import catchError from 'services/catchError';
import moment from 'moment';

class ProfileLayout extends Component {
  onHandleClick = e => {
    const {name} = e.target;
    if (name === 'info') rootHistory.push('/profile/info');
    else if (name === 'pass') rootHistory.push('/profile/change-password');
    else rootHistory.push('/profile/card');
  }
  state = {
    length: 0
  }
  componentWillMount(){
    callApi('get-list-lease', 'post', {username: this.props.user.username}, localStorage.getItem('token'))
      .then(listLease => {
        let length = listLease.filter(lease => 
          moment().isBefore(moment(Number(lease.endTime)))
        ).length;
        this.setState({length});
      })
      .catch(err => catchError(err));
  }
  render() {
    return (
      <>
        <div className="row">
          <h1>{this.props.user.username}</h1>
        </div>
        <div className="row">
          <div className="col-md-3">
            <ProfileLeft></ProfileLeft>
          </div>
          <div className="col-md-9" style={{ marginTop: '50px' }}>
            <MDBBtnGroup>
              <MDBBtn color="info" onClick={this.onHandleClick} name="info" size="lg">Thông tin</MDBBtn>
              <MDBBtn color="info" onClick={this.onHandleClick} name="pass" size="lg">Đổi mật khẩu</MDBBtn>
              <Badge count={this.state.length} overflowCount={100}>
                <MDBBtn color="info" onClick={this.onHandleClick} name="card" size="lg">Giỏ hàng</MDBBtn>
              </Badge>
            </MDBBtnGroup>
            <hr />
            <Switch>
              <Route path="/profile/info" component={ProfileInfo}></Route>
              <Route path="/profile/change-password" component={ProfileChangePass}></Route>
              <Route path="/profile/card" component={ProfileCard}></Route>
            </Switch>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authen
});
const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileLayout);