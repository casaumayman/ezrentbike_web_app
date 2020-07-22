import React, { Component } from 'react'
import { connect } from 'react-redux';
import { callApiImage } from '../services/apiService';
import { toast } from 'react-toastify';
import { updateAvatar, autoLogin } from '../store/authentication/actions';
import baseURL from 'services/BaseURL';

class ProfileLeft extends Component {
    onHandleChange = e => {
        if (e.target.value) {
            callApiImage('/user/edit', 'post', {
                username: this.props.user.username,
                avatar: e.target.files[0]
            }, localStorage.getItem('token')).then(res => {
                localStorage.setItem('token', res.token);
                toast.success('Cập nhật ảnh đại diện thành công!');
                this.props.onRelogin(res.token);
                this.props.onUpdateAvatar(res.avatar);
            }).catch(err => {
                if (err.response.data) {
                    toast.error('Lỗi: ' + err.response.data.err);
                } else toast.error('Lỗi: ' + err.message);
            })
        }
    }
    render() {
        const sourceAvatar = baseURL.backEndURLAvatar + `${this.props.user.avatar}`;
        return (
            <div className="text-center">
                <img alt="avatar" className='img-fluid rounded-circle hoverable' src={sourceAvatar}></img>
                <h6>Cập nhật ảnh đại diện</h6>
                <div className="custom-file">
                    <input type="file" onChange={this.onHandleChange} className="custom-file-input" id="customFile" />
                    <label className="custom-file-label" htmlFor="customFile"></label>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.authen
});
const mapDispatchToProps = dispatch => ({
    onUpdateAvatar: avatar => dispatch(updateAvatar(avatar)),
    onRelogin: token => dispatch(autoLogin(token))
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileLeft);