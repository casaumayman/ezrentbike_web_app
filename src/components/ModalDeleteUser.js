import React, { Component } from 'react'
import Modal from 'containers/Modal';
import { MDBBtn } from 'mdbreact';
import baseURL from 'services/BaseURL';

class ModalDeleteUser extends Component {
    state = {
        isLoading: false
    }
    onDelete = (id) => {
        this.props.onDelete(id);
        this.setState({isLoading: true});
    }
    componentWillReceiveProps(){
        this.setState({isLoading: false});
    }
    render() {
        //console.log(this.props.user);
        const footer = (
            <>
                <MDBBtn color="secondary" onClick={this.props.toggle}>Hủy bỏ</MDBBtn>
                <MDBBtn disabled={this.state.isLoading} color="danger" onClick={()=>this.onDelete(this.props.user.id)}>
                    {this.state.isLoading?(
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ):
                        "Xóa"
                    }
                </MDBBtn>
            </>
        );
        return (
            <Modal
                isOpen = {this.props.isOpen}
                toggle = {this.props.toggle}
                title="Bạn có chắc chắn muốn xóa?"
                footer={footer}
                size="lg"
            >
                <div className="row">
                    <div className="col-4">
                        <img width="236px" alt="avatar" src={baseURL.backEndURLAvatar + `${this.props.user.profile.avatar}`}></img>
                    </div>
                    <div className="col-8">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>Họ và tên</td>
                                    <td>{this.props.user.profile.name}</td>
                                </tr>
                                <tr>
                                    <td>Số điện thoại</td>
                                    <td>{this.props.user.profile.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{this.props.user.profile.email}</td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ</td>
                                    <td>{this.props.user.profile.address}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        )
    }
}
export default ModalDeleteUser;