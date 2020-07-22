import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal, openModalLogin } from '../store/modal/actions';
import { MDBBtn, MDBModal, MDBModalBody, MDBInput, MDBIcon } from 'mdbreact';
import { login } from '../store/authentication/actions';

class ModalLogin extends Component {
    state = {
        user: {
            username: '',
            password: ''
        },
        isLoading: false,
        rememberPass: false
    }
    componentWillReceiveProps() {
        this.setState({
            user: {
                username: '',
                password: ''
            },
            isLoading: false
        });
    }
    toggle = () => {
        if (this.props.isShow) this.props.closeModal();
        else this.props.openModal();
    }
    onHandleSubmit = () => {
        if (this.state.user.username !== '' && this.state.user.password !== '') {
            this.setState({ isLoading: true });
            this.props.onLogin({...this.state.user, rememberPass: this.state.rememberPass});
        }
    }
    onHandleChange = (e) => {
        const { name, value } = e.target;
        if (name === "rememberPass") {
            if (e.target.checked) this.setState({rememberPass: true});
            else this.setState({rememberPass: false});
        }
        else this.setState({ user: { ...this.state.user, [name]: value } });
    }
    handleKeyDown = e => {
        if (e.key === 'Enter') this.onHandleSubmit();
    }
    render() {
        return (
            <MDBModal isOpen={this.props.isShow} toggle={this.toggle}>
                <MDBModalBody>
                    <p className="h5 text-center mb-4">Đăng nhập</p>
                    <div className="grey-text">
                        <MDBInput
                            label="Nhập tên tài khoản"
                            icon="envelope"
                            group
                            type="text"
                            onChange={this.onHandleChange}
                            onKeyDown={this.handleKeyDown}
                            value={this.state.user.username}
                            name="username"
                        />
                        <MDBInput
                            label="Nhập mật khẩu"
                            icon="lock"
                            group
                            type="password"
                            onChange={this.onHandleChange}
                            value={this.state.user.password}
                            onKeyDown={this.handleKeyDown}
                            name="password"
                        />
                        <div className="custom-control custom-checkbox" style={{marginLeft: '40px', marginBottom: '16px', color: '#42424A'}}>
                            <input type="checkbox" checked={this.state.rememberPass} onKeyDown={this.handleKeyDown} onChange={this.onHandleChange} name="rememberPass" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Nhớ mật khẩu</label>
                        </div>
                    </div>
                    <div className="text-center">
                        <MDBBtn onClick={this.onHandleSubmit} onKeyDown={this.handleKeyDown}>{this.state.isLoading ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                                <MDBIcon icon="sign-in-alt" />
                            )} Đăng nhập</MDBBtn>
                    </div>
                </MDBModalBody>
            </MDBModal>
        )
    }
}

const mapStateToProps = (state) => ({
    isShow: state.modalStatus.showLogin
});
const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
    openModal: () => dispatch(openModalLogin()),
    onLogin: user => dispatch(login(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);