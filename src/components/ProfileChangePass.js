import React, { Component } from 'react';
import { MDBIcon, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import { changePassword } from '../store/loading/actions';
import { callApi } from '../services/apiService';
import { rootHistory } from '../App';
import { toast } from 'react-toastify';
import { AUTHEN_TYPES } from '../store/authentication/types';

class ProfileChangePass extends Component {
    state = {
        user: {
            oldPassword: '',
            newPassword: '',
            reNewPassword: ''
        },
        validate: {
            oldPassword: 1,
            newPassword: false,
            reNewPassword: true
        },
        wasValidated: {
            oldPassword: false,
            newPassword: false,
            reNewPassword: false
        }
    }
    onHandleChange = e => {
        const { name, value } = e.target;
        this.setState({ user: { ...this.state.user, [name]: value } });
    }
    onUpdate = () => {
        this.setState({
            wasValidated: {
                oldPassword: true,
                newPassword: true,
                reNewPassword: true
            }
        });
        let valid = true;
        Object.keys(this.state.validate).forEach(key => {
            if (key !== 'oldPassword') {
                if (!this.state.validate[key]) valid = false;
            } else {
                if (this.state.validate[key]!==0) valid = false;
            }
        });
        if (valid) {
            this.props.toggleLoading();
            callApi('/user/change-password', 'post', {
                username: this.props.username,
                oldPass: this.state.user.oldPassword,
                newPass: this.state.user.newPassword
            }, null).then(res => {
                this.props.toggleLoading();
                toast.success('Thành công, vui lòng đăng nhập lại!');
                this.props.logout();
                localStorage.removeItem('token');
                rootHistory.push('/');
            }).catch(err => {
                this.props.toggleLoading();
                if (err.response.data.err) {
                    this.setState({validate: {...this.state.validate, oldPassword: 2}});
                } else {
                    toast.error('Lỗi: ' + err.message);
                }
            });
        }
    }
    onHandleBlur = e => {
        const { name, value } = e.target;
        this.setState({ wasValidated: { ...this.state.wasValidated, [name]: true } });
        if (name === 'oldPassword') {
            if (value === "") this.setState({ validate: { ...this.state.validate, oldPassword: 1 } });
            else this.setState({ validate: { ...this.state.validate, oldPassword: 0 } });
        }
        else if (name === "newPassword") {
            if (value === "") this.setState({ validate: { ...this.state.validate, newPassword: false } });
            else this.setState({ validate: { ...this.state.validate, newPassword: true } });
        }
        else {
            if (value !== this.state.user.newPassword) this.setState({ validate: { ...this.state.validate, reNewPassword: false } });
            else this.setState({ validate: { ...this.state.validate, reNewPassword: true } });
        }
    }
    render() {
        const classOldPass = "form-control " + (this.state.wasValidated.oldPassword ? (this.state.validate.oldPassword === 0 ? "is-valid mb-3" : "is-invalid") : "mb-3");
        const classNewPass = "form-control " + (this.state.wasValidated.newPassword ? (this.state.validate.newPassword ? "is-valid mb-3" : "is-invalid") : "mb-3");
        const classReNewPass = "form-control " + (this.state.wasValidated.reNewPassword ? (this.state.validate.reNewPassword ? "is-valid mb-3" : "is-invalid") : "mb-3");

        return (
            <div className="card">
                <div className="card-header text-white bg-info text-center">
                    Cập nhật mật khẩu
                </div>
                <div className="card-body">
                    <div>
                        <MDBIcon className="mr-2" icon="unlock-alt" />
                        <label
                            htmlFor="name"
                            className="grey-text"
                        >
                            Nhập mật khẩu cũ
                        </label>
                        <input
                            name="oldPassword"
                            value={this.state.user.oldPassword}
                            onChange={this.onHandleChange}
                            onBlur={this.onHandleBlur}
                            type="password"
                            className={classOldPass}
                        />
                        <div className="invalid-feedback mb-3" hidden={this.state.validate.oldPassword !== 1}>
                            Mật khẩu cũ không được để trống!
                        </div>
                        <div className="invalid-feedback mb-3" hidden={this.state.validate.oldPassword !== 2}>
                            Mật khẩu cũ không chính xác!
                        </div>
                    </div>
                    <div>
                        <MDBIcon icon="key" className='mr-2'></MDBIcon>
                        <label
                            htmlFor="name"
                            className="grey-text"
                        >
                            Nhập mật khẩu mới
                        </label>
                        <input
                            name="newPassword"
                            value={this.state.user.newPassword}
                            type="password"
                            onChange={this.onHandleChange}
                            onBlur={this.onHandleBlur}
                            className={classNewPass}
                        />
                        <div className="invalid-feedback mb-3">
                            Mật khẩu mới không được để trống!
                        </div>
                    </div>
                    <div>
                        <MDBIcon icon="key" className='mr-2'></MDBIcon>
                        <label
                            htmlFor="name"
                            className="grey-text"
                        >
                            Nhập lại mật khẩu mới
                        </label>
                        <input
                            name="reNewPassword"
                            value={this.state.user.reNewPassword}
                            type="password"
                            onChange={this.onHandleChange}
                            onBlur={this.onHandleBlur}
                            className={classReNewPass}
                        />
                        <div className="invalid-feedback">
                            Mật khẩu mới không khớp!
                        </div>
                    </div>
                </div>
                <div className="card-footer" style={{ textAlign: 'end' }}>
                    <MDBBtn onClick={this.onUpdate} color="primary">
                        {this.props.isLoading ? (
                            <div className="spinner-border spinner-border-sm mr-2" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (<MDBIcon icon="save" className="mr-2" />)}
                        Cập nhật
                    </MDBBtn>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.loading.changePassword,
    username: state.authen.username
});
const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(changePassword()),
    logout: () => dispatch({
        type: AUTHEN_TYPES.logout
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileChangePass);