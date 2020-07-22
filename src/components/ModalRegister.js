import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal, openModalRegister } from '../store/modal/actions';
import { MDBBtn, MDBModal, MDBModalBody, MDBIcon } from 'mdbreact';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from 'services/BaseURL';

class ModalRegister extends Component {
    state = {
        user: {
            username: '',
            password: '',
            rePassword: '',
            name: '',
            email: '',
            phoneNumber: '',
            address: '',
            avatar: undefined
        },
        validate: {
            name: false,
            username: 1,
            password: false,
            rePassword: false,
            email: 1,
            phoneNumber: 1,
        },
        wasValidated: {
            password: false,
            name: false,
            username: false,
            rePassword: false,
            email: false,
            phoneNumber: false,
        },
        isLoading: false
    }
    onHandleBlur = (e) => {
        const { name, value } = e.target;
        this.setState({ wasValidated: { ...this.state.wasValidated, [name]: true } });
        if (name === 'username')
            if (value === "") this.setState({ validate: { ...this.state.validate, username: 1 } });
            else this.setState({ validate: { ...this.state.validate, username: 0 } });
        else if (name === 'rePassword') {
            if (value !== this.state.user.password)
                this.setState({ validate: { ...this.state.validate, rePassword: false } })
            else this.setState({ validate: { ...this.state.validate, rePassword: true } })
        }
        else if (name === 'email') {
            const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
            if (value === "") this.setState({ validate: { ...this.state.validate, email: 1 } });
            else this.setState({ validate: { ...this.state.validate, email: re.test(value) ? 0 : 2 } });
        }
        else if (name === 'name') {
            if (value === "") this.setState({ validate: { ...this.state.validate, name: false } });
            else this.setState({ validate: { ...this.state.validate, name: true } });
        }
        else if (name === "phoneNumber") {
            if (value === "") this.setState({ validate: { ...this.state.validate, phoneNumber: 1 } });
            else if (value.length !== 10 && value.length !== 11) this.setState({ validate: { ...this.state.validate, phoneNumber: 2 } });
            else this.setState({ validate: { ...this.state.validate, phoneNumber: 0 } });
        }
        else if (name === 'password') {
            if (value === "") this.setState({ validate: { ...this.state.validate, password: false } });
            else this.setState({ validate: { ...this.state.validate, password: true } });
        }
    }
    onHandleChange = (e) => {
        const { name, value } = e.target;
        if (name !== 'avatar') {
            this.setState({ user: { ...this.state.user, [name]: value } });
        }
        else
            this.setState({ user: { ...this.state.user, avatar: e.target.files[0] } });
    }
    toggle = () => {
        if (this.props.isShow) this.props.closeModal();
        else this.props.openModal();
    }
    requestRegister = () => {
        const url = baseURL.backEndURL + 'register';
        const formData = new FormData();
        Object.keys(this.state.user).forEach((key) => {
            formData.append(key, this.state.user[key])
        });
        const config = {
            headers: {
                'content-type': 'multipart/form-data; application/x-www-form-urlencoded'
            }
        }
        formData.delete('rePassword');
        if (this.state.user.avatar === undefined) formData.delete('avatar');
        axios.post(url, formData, config).then(res => {
            this.props.closeModal();
            this.setState({ isLoading: false });
            toast.success("Bạn đã đăng ký thành công!");
        }).catch(err => {
            this.setState({ isLoading: false });
            if (err.response.data.err === 'Tên tài khoản đã tồn tại!')
                this.setState({ validate: { ...this.state.validate, username: 2 } });
            // this.props.closeModal();
            // toast.error("Lỗi: " + err.message);
        });
    }
    onSubmitHandle = () => {
        const validateObj = { ...this.state.wasValidated };
        Object.keys(validateObj).forEach(key => {
            validateObj[key] = true
        });
        this.setState({ wasValidated: validateObj });
        let allValid = true;
        Object.keys(this.state.validate).forEach(key => {
            if (key !== 'email' && key !== 'username' && key !== 'phoneNumber') {
                allValid = this.state.validate[key];
            } else {
                allValid = (this.state.validate[key] === 0);
            }
        });
        if (allValid) {
            this.requestRegister();
            this.setState({ isLoading: true });
        }
    }
    render() {
        const classUsername = "form-control " + (this.state.wasValidated.username ? ((this.state.validate.username !== 0 ? "is-invalid" : "is-valid mb-3")) : "mb-3");
        const className = "form-control " + (this.state.wasValidated.name ? ((this.state.validate.name ? "is-valid mb-3" : "is-invalid")) : "mb-3");
        const classPassword = "form-control " + (this.state.wasValidated.password ? ((this.state.validate.password ? "is-valid mb-3" : "is-invalid")) : "mb-3");
        const classEmail = "form-control " + (this.state.wasValidated.email ? ((this.state.validate.email === 0 ? "is-valid mb-3" : "is-invalid")) : "mb-3");
        const classRePassword = "form-control " + (this.state.wasValidated.rePassword ? ((this.state.validate.rePassword ? "is-valid mb-3" : "is-invalid")) : "mb-3");
        const classPhoneNumber = "form-control " + (this.state.wasValidated.phoneNumber ? ((this.state.validate.phoneNumber !== 0 ? "is-invalid" : "is-valid mb-3")) : "mb-3");
        return (
            <MDBModal isOpen={this.props.isShow} size="lg" toggle={this.toggle}>
                <MDBModalBody>
                    <p className="h5 text-center mb-4">Đăng ký tài khoản</p>
                    <div className="grey-text">
                        <div className="row">
                            <div className="col-md-6">
                                <MDBIcon icon="user" className='mr-2'></MDBIcon>
                                <label
                                    htmlFor="username"
                                    className="grey-text"
                                >
                                    Tên tài khoản
                                </label>
                                <input
                                    name="username"
                                    ref="username"
                                    onChange={this.onHandleChange}
                                    value={this.state.user.username}
                                    type="text"
                                    onBlur={this.onHandleBlur}
                                    id="username"
                                    className={classUsername}
                                    placeholder="Username"
                                />
                                <div className="invalid-feedback mb-3" hidden={this.state.validate.username !== 1}>Tên tài khoản không được để trống!</div>
                                <div className="invalid-feedback mb-3" hidden={this.state.validate.username !== 2}>Tên tài khoản đã tồn tại!</div>
                            </div>
                            <div className="col-md-6">
                                <MDBIcon fab icon="amilia" className='mr-2'></MDBIcon>
                                <label
                                    htmlFor="name"
                                    className="grey-text"
                                >
                                    Nhập họ và tên
                                </label>
                                <input
                                    value={this.state.user.name}
                                    name="name"
                                    onChange={this.onHandleChange}
                                    type="text"
                                    id="name"
                                    onBlur={this.onHandleBlur}
                                    ref="name"
                                    className={className}
                                    placeholder="Full name"
                                />
                                <div className="invalid-feedback mb-3">Họ và tên không được để trống!</div>
                            </div>
                            <div className="col-md-6">
                                <MDBIcon icon="key" className='mr-2'></MDBIcon>
                                <label
                                    htmlFor="password"
                                    className="grey-text"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    value={this.state.user.password}
                                    name="password"
                                    onChange={this.onHandleChange}
                                    type="password"
                                    id="password"
                                    onBlur={this.onHandleBlur}
                                    ref='password'
                                    className={classPassword}
                                    placeholder="Password"
                                />
                                <div className="invalid-feedback mb-3">Mật khẩu không được để trống!</div>
                            </div>
                            <div className="col-md-6">
                                <MDBIcon icon="key" className='mr-2'></MDBIcon>
                                <label
                                    htmlFor="re-password"
                                    className="grey-text"
                                >
                                    Nhập lại mật khẩu
                                </label>
                                <input
                                    value={this.state.user.rePassword}
                                    name="rePassword"
                                    onChange={this.onHandleChange}
                                    type="password"
                                    id="re-password"
                                    onBlur={this.onHandleBlur}
                                    ref="rePassword"
                                    className={classRePassword}
                                    placeholder="Confirm password"
                                />
                                <div className="invalid-feedback mb-3">Mật khẩu không khớp!</div>
                            </div>
                            <div className="col-md-6">
                                <MDBIcon icon="envelope" className='mr-2'></MDBIcon>
                                <label
                                    htmlFor="email"
                                    className="grey-text"
                                >
                                    Nhập email
                                </label>
                                <input
                                    value={this.state.user.email}
                                    name="email"
                                    onChange={this.onHandleChange}
                                    type="text"
                                    id="email"
                                    onBlur={this.onHandleBlur}
                                    ref="email"
                                    className={classEmail}
                                    placeholder="Email"
                                />
                                <div className="invalid-feedback mb-3" hidden={this.state.validate.email !== 1}>Email không được để trống!</div>
                                <div className="invalid-feedback mb-3" hidden={this.state.validate.email !== 2}>Email không đúng định dạng!</div>
                            </div>
                            <div className="col-md-6">
                                <MDBIcon icon="phone" className='mr-2'></MDBIcon>
                                <label
                                    htmlFor="phoneNumber"
                                    className="grey-text"
                                >
                                    Nhập số điện thoại
                                </label>
                                <input
                                    value={this.state.user.phoneNumber}
                                    name="phoneNumber"
                                    onChange={this.onHandleChange}
                                    type="number"
                                    id="phoneNumber"
                                    onBlur={this.onHandleBlur}
                                    ref="phoneNumber"
                                    className={classPhoneNumber}
                                    placeholder="Phone number"
                                />
                                <div className="invalid-feedback mb-3" hidden={this.state.validate.phoneNumber !== 1}>Số điện thoại không được để trống!</div>
                                <div className="invalid-feedback mb-3" hidden={this.state.validate.phoneNumber !== 2}>Số điện thoại không đúng định dạng!</div>
                            </div>
                            <div className="col-md-6">
                                <MDBIcon icon="map-marked" className='mr-2'></MDBIcon>
                                <label
                                    htmlFor="address"
                                    className="grey-text"
                                >
                                    Nhập địa chỉ
                                </label>
                                <input
                                    value={this.state.user.address}
                                    name="address"
                                    onChange={this.onHandleChange}
                                    type="text"
                                    id="address"
                                    onBlur={this.onHandleBlur}
                                    ref="address"
                                    className="form-control mb-3"
                                    placeholder="Address"
                                />
                            </div>
                            <div className="col-md-6">
                                <div className="custom-file">
                                    <label htmlFor="exampleFormControlFile1"><MDBIcon icon="image" /> Tải lên ảnh đại diện</label>
                                    <input type="file" name="avatar" onChange={this.onHandleChange} className="form-control-file" id="exampleFormControlFile1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        {(this.state.isLoading ? (
                            <MDBBtn disabled onClick={this.onSubmitHandle}><span className="spinner-border spinner-border-sm"></span> Đăng ký</MDBBtn>
                        ) : (
                                <MDBBtn onClick={this.onSubmitHandle}><MDBIcon far icon="registered" /> Đăng ký</MDBBtn>
                            ))}
                    </div>
                </MDBModalBody>
            </MDBModal>
        )
    }
}

const mapStateToProps = (state) => ({
    isShow: state.modalStatus.showRegister
});
const mapDispatchToProps = {
    closeModal: closeModal,
    openModal: openModalRegister
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalRegister);