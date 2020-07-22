import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBIcon, MDBBtn } from 'mdbreact';
import { infoUser } from '../store/loading/actions';
import { editInfo } from '../store/authentication/actions';

class ProfileInfo extends Component {
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
            name: true,
            email: 0,
            phoneNumber: 0,
        },
        wasValidated: {
            name: false,
            email: false,
            phoneNumber: false,
        },
        disable: true
    }
    componentWillMount() {
        this.setState({ user: { ...this.state.user, ...this.props.user } });
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
        this.setState({ user: { ...this.state.user, [name]: value } });
    }
    onEdit = () => {
        let valid = true;
        const { validate } = this.state;
        valid = (validate.name && (validate.email === 0) && (validate.phoneNumber === 0));
        if (valid) {
            this.setState({ disable: true });
            this.props.toggleLoading();
            this.props.onSubmitEdit({
                username: this.state.user.username,
                name: this.state.user.name,
                email: this.state.user.email,
                phoneNumber: this.state.user.phoneNumber,
                address: this.state.user.address
            });
        }
    }
    onRecovery = () => {
        this.setState({
            user: this.props.user,
            wasValidated: {
                name: false,
                email: false,
                phoneNumber: false
            }
        });
    }
    render() {
        const className = "form-control " + (this.state.wasValidated.name ? ((this.state.validate.name ? "is-valid mb-3" : "is-invalid")) : "mb-3");
        const classPhoneNumber = "form-control " + (this.state.wasValidated.phoneNumber ? ((this.state.validate.phoneNumber !== 0 ? "is-invalid" : "is-valid mb-3")) : "mb-3");
        const classEmail = "form-control " + (this.state.wasValidated.email ? ((this.state.validate.email === 0 ? "is-valid mb-3" : "is-invalid")) : "mb-3");
        return (
            <div className="card">
                <div className="card-header bg-info text-white text-center">
                    Thông tin cơ bản
                </div>
                <div className="card-body">
                    <div>
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
                            disabled={this.state.disable}
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
                            value={this.state.user.email}
                            name="email"
                            onChange={this.onHandleChange}
                            type="text"
                            id="email"
                            disabled={this.state.disable}
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
                            value={this.state.user.phoneNumber}
                            name="phoneNumber"
                            onChange={this.onHandleChange}
                            type="number"
                            id="phoneNumber"
                            disabled={this.state.disable}
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
                            value={this.state.user.address}
                            name="address"
                            onChange={this.onHandleChange}
                            type="text"
                            id="address"
                            onBlur={this.onHandleBlur}
                            ref="address"
                            className="form-control mb-3"
                            disabled={this.state.disable}
                            placeholder="Address"
                        />
                    </div>
                </div>
                <div className="card-footer" style={{ textAlign: "right" }}>
                    {this.state.disable ? (
                        <MDBBtn color="secondary" onClick={() => { this.setState({ disable: false }) }}>
                            <MDBIcon icon="pen" className="mr-1" />Chỉnh sửa
                        </MDBBtn>
                    ) : (
                            <MDBBtn color="primary" onClick={this.onEdit}>
                                {this.props.isLoading ? (<div className="spinner-border spinner-border-sm mr-1" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>) : (
                                        <MDBIcon icon="save" className="mr-1" />
                                    )}
                                Lưu
                        </MDBBtn>
                        )}
                    <MDBBtn disabled={this.state.disable} onClick={this.onRecovery}>
                        <MDBIcon icon="undo" className="mr-1" />Phục hồi
                    </MDBBtn>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.authen,
    isLoading: state.loading.infoUser
});
const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(infoUser()),
    onSubmitEdit: user => dispatch(editInfo(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);