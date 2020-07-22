import React, { Component } from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import Modal from '../containers/Modal';
import baseURL from 'services/BaseURL';

export default class ModalEditUser extends Component {
    state = {
        isLoading: false,
        user: {
            id: '',
            profile: {
                avatar: '',
                name: '',
                address: '',
                phoneNumber: '',
                email: ''
            }
        },
        validate: {
            name: true,
            email: 0,
            phoneNumber: 0,
        },
        wasValidated: {
            name: false,
            email: false,
            phoneNumber: false,
        },
        avatar: ''
    }
    componentWillReceiveProps(nextProps){
        this.setState({isLoading: false, user: nextProps.user}, ()=>{
            this.setState({user: {...this.state.user, avatar: undefined}});
        });
    }
    onEdit = user => {
        let valid = true;
        const { validate } = this.state;
        valid = (validate.name && (validate.email === 0) && (validate.phoneNumber === 0));
        if (valid) {
            this.props.onEdit(user);
            this.setState({isLoading: true});
        }
    }
    onHandleBlur = (e) => {
        const { name, value } = e.target;
        this.setState({ wasValidated: { ...this.state.wasValidated, [name]: true } });
        if (name === 'email') {
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
    }
    onHandleChange = e => {
        const { name, value } = e.target;
        if (name !== 'avatar') {
            let profile = {...this.state.user.profile, [name]: value};
            this.setState({user: {...this.state.user, profile: profile}})
        }
        else if (e.target.files && e.target.files[0]) {
            const fileImg = URL.createObjectURL(e.target.files[0]);
            this.setState({ 
                avatar: fileImg,
                user: {...this.state.user, profile: {...this.state.user.profile, avatar: e.target.files[0]}}
            });
        }
    }
    render() {
        //console.log(this.state.avatar);
        let srcImg;
        if (this.state.avatar !== '') 
            srcImg = this.state.avatar;
        else srcImg = baseURL.backEndURLAvatar + `${this.props.user.profile.avatar}`;
        //console.log(srcImg);
        const footer = (
            <>
                <MDBBtn color="secondary" onClick={this.props.toggle}>Hủy bỏ</MDBBtn>
                <MDBBtn disabled={this.state.isLoading} color="warning" onClick={()=>this.onEdit(this.state.user)}>
                    {this.state.isLoading?(
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ):
                        "Lưu"
                    }
                </MDBBtn>
            </>
        );
        const className = "form-control " + (this.state.wasValidated.name ? ((this.state.validate.name ? "is-valid mb-3" : "is-invalid")) : "mb-3");
        const classPhoneNumber = "form-control " + (this.state.wasValidated.phoneNumber ? ((this.state.validate.phoneNumber !== 0 ? "is-invalid" : "is-valid mb-3")) : "mb-3");
        const classEmail = "form-control " + (this.state.wasValidated.email ? ((this.state.validate.email === 0 ? "is-valid mb-3" : "is-invalid")) : "mb-3");
        return (
            <Modal
                isOpen = {this.props.isOpen}
                toggle = {this.props.toggle}
                title="Sửa thông tin người dùng"
                footer={footer}
                size="lg"
            >
                <div className="row">
                    <div className="col-4">
                        <div className="row">
                            <img width="236px" className="col-12" alt="avatar" 
                                src={srcImg}
                            ></img>
                            <div className="col-12 text-center">
                                <h6>Cập nhật ảnh đại diện</h6>
                                <div className="custom-file">
                                    <input name="avatar" type="file" onChange={this.onHandleChange} className="custom-file-input" id="customFile" />
                                    <label className="custom-file-label" htmlFor="customFile"></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div>
                            <MDBIcon fab icon="amilia" className='mr-2'></MDBIcon>
                            <label
                                htmlFor="name"
                                className="grey-text"
                            >
                                Nhập họ và tên
                                    </label>
                            <input
                                value={this.state.user.profile.name}
                                name="name"
                                onChange={this.onHandleChange}
                                type="text"
                                id="name"
                                onBlur={this.onHandleBlur}
                                ref="name"
                                className={className}
                                placeholder="Full name"
                            />
                            <div className="invalid-feedback mb-3">
                                Họ và tên không được để trống!
                            </div>
                        </div>
                        <div>
                            <MDBIcon icon="envelope" className='mr-2'></MDBIcon>
                            <label
                                htmlFor="email"
                                className="grey-text"
                            >
                                Nhập email
                            </label>
                            <input
                                value={this.state.user.profile.email}
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
                        <div>
                            <MDBIcon icon="phone" className='mr-2'></MDBIcon>
                            <label
                                htmlFor="phoneNumber"
                                className="grey-text"
                            >
                                Nhập số điện thoại
                            </label>
                            <input
                                value={this.state.user.profile.phoneNumber}
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
                        <div>
                            <MDBIcon icon="map-marked" className='mr-2'></MDBIcon>
                            <label
                                htmlFor="address"
                                className="grey-text"
                            >
                                Nhập địa chỉ
                            </label>
                            <input
                                value={this.state.user.profile.address}
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
                    </div>
                </div>
            </Modal>
        )
    }
}
