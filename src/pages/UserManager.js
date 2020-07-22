import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card } from '../containers/Card';
import { MDBBtn, MDBIcon, MDBTooltip } from 'mdbreact';
import { toast } from 'react-toastify';
import { callApi } from '../services/apiService';
import Table from '../containers/Table';
import ModalDeleteUser from 'components/ModalDeleteUser';
import catchError from 'services/catchError';
import { closeModal, openModalWarningDeleteUser, openModalRegister, openModalEditUser } from 'store/modal/actions';
import ModalEditUser from 'components/ModalEditUser';
import Axios from 'axios';
import { Empty } from 'antd';
import baseURL from 'services/BaseURL';
//import update from 'react-addons-update';

class UserManager extends Component {
    state = {
        data: {
            columns: [
                {
                    label: "STT",
                    field: 'index',
                },
                {
                    label: 'Họ và tên',
                    field: 'name',
                },
                {
                    label: 'Số điện thoại',
                    field: 'phoneNumber',
                },
                {
                    label: 'Email',
                    field: 'email',
                },
                {
                    label: 'Địa chỉ',
                    field: 'address',
                },
                {
                    label: 'Hành động',
                    field: 'action'
                }
            ],
            rows: []
        },
        user: {
            id: '',
            profile: {
                avatar: '',
                name: '',
                address: '',
                phoneNumber: '',
                email: ''
            }
        }
    }
    onShowModal = user => {
        //console.log(user)
        this.props.openDeleteWarning();
        this.setState({
            user: user
        });
    }
    onToggleModal = () => {
        this.props.closeModal();
    }
    onShowEditUser = user => {
        this.props.openEditUser();
        this.setState({
            user: user
        });
    }
    findIndex = (id) => {
        for (let i = 0; i < this.state.data.rows.length; i++) {
            const element = this.state.data.rows[i];
            //console.log(element);
            if (element.id === id) return i;
        }
        return -1;
    };
    onDelete = (id) => {
        callApi('user/delete', 'post', {id: id, username: this.props.user.username}, localStorage.getItem('token')).then(res=>{
            let rows = this.state.data.rows;
            //console.log(this.findIndex(id));
            rows.splice(this.findIndex(id), 1);
            toast.success('Xoá người dùng thành công!');
            this.setState({data: {...this.state.data, rows: rows}});
            this.onToggleModal();
        }).catch(err => catchError(err));
    }
    onEdit = user => {
        //console.log(user);
        let formData = new FormData();
        const url = baseURL.backEndURL + 'user/edit-user';
        formData.append('username', this.props.user.username);
        formData.append('id', user.id);
        Object.keys(user.profile).forEach((key, index)=>{
            if (key !== 'id') formData.append(key, user.profile[key]);
        });
        const config = {
            headers: {
                'content-type': 'multipart/form-data; application/x-www-form-urlencoded',
                'token': localStorage.getItem('token')
            }
        }
        if (user.profile.avatar===undefined) formData.delete('avatar');
        Axios.post(url, formData, config).then(res => {
            let user = res.data.user;
            //console.log(user);
            let list = this.state.data.rows;
            let idItem = this.findIndex(user.id);
            list.splice(idItem, 1, {
                index: idItem,
                id: user.id,
                name: user.profile.name,
                phoneNumber: user.profile.phoneNumber,
                email: user.profile.email,
                address: user.profile.address,
                action: (
                    <div style = {{flex: 1,flexDirection: 'row',justifyContent:'center',display:'flex' }}>
                        <div onClick={()=>this.onShowEditUser(user)}>
                            <MDBTooltip placement="bottom">
                                <MDBBtn color="warning">
                                    <MDBIcon icon="edit" />
                                </MDBBtn>
                                <div>
                                    Chỉnh sửa
                                </div>
                            </MDBTooltip>
                        </div>
                        <div  onClick={()=>this.onShowModal(user)}>
                            <MDBTooltip placement="bottom">
                                <MDBBtn  color="danger">
                                    <MDBIcon icon="trash-alt" />
                                </MDBBtn>
                                <div>Xóa</div>
                            </MDBTooltip>
                        </div>
                    </div>
                )
            });
            this.setState({
                data: {
                    ...this.state.data,
                    rows: list
                }
            });
            //console.log(list);
            //update(list, {$splice: []})
            toast.success('Sửa thông tin thành công!');
            this.onToggleModal();
            
        }).catch(err => { 
            catchError(err);
            this.onToggleModal();
        });
    }
    onAddUser = () => {
        this.props.openRegister();
    }
    componentWillMount() {
        //console.log("hihi");
        callApi('/user', 'post', { username: this.props.user.username }, localStorage.getItem('token')).then(result => {
            let listUser = result.map((user, index) => ({
                index: index,
                name: user.profile.name,
                phoneNumber: user.profile.phoneNumber,
                email: user.profile.email,
                address: user.profile.address,
                action: (
                    <div style = {{flex: 1,flexDirection: 'row',justifyContent:'center',display:'flex' }}>
                        <div onClick={()=>this.onShowEditUser(user)}>
                            <MDBTooltip placement="bottom">
                                <MDBBtn color="warning">
                                    <MDBIcon icon="edit" />
                                </MDBBtn>
                                <div>
                                    Chỉnh sửa
                                </div>
                            </MDBTooltip>
                        </div>
                        <div  onClick={()=>this.onShowModal(user)}>
                            <MDBTooltip placement="bottom">
                                <MDBBtn  color="danger">
                                    <MDBIcon icon="trash-alt" />
                                </MDBBtn>
                                <div>Xóa</div>
                            </MDBTooltip>
                        </div>
                    </div>
                )
            }));
            //console.log("hehe");
            this.setState({
                data: {
                    ...this.state.data,
                    rows: listUser
                }
            });
        }).catch(err => {
            if (err.response.data) {
                toast.error(err.response.data.err);
            } else toast.error("Lỗi: " + err.message);
        });
    }
    render() {
        //console.log(this.state.data);
        document.title = "Quản lí người dùng";
        return (
            <div style={{ marginTop: '20px' }}>
                <ModalDeleteUser isOpen={this.props.isOpenDelete} user={this.state.user} onDelete = {(id)=>this.onDelete(id)} toggle={this.onToggleModal}></ModalDeleteUser>
                <ModalEditUser isOpen={this.props.isOpenEdit} user={this.state.user} onEdit={user => this.onEdit(user)} toggle={this.onToggleModal}></ModalEditUser>
                <Card header="Quản lý người dùng">
                    <Fragment>
                        <MDBBtn className="text-capitalize" onClick={this.onAddUser} color="success">
                            <MDBIcon icon="plus" className="mr-1"></MDBIcon> Thêm người dùng
                        </MDBBtn>
                        {this.state.data.rows.length!==0?<Table data={this.state.data} caption="Danh sách người dùng"></Table>:<Empty></Empty>}
                    </Fragment>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.authen,
    isOpenDelete: state.modalStatus.showWarningDeleteUser,
    isOpenRegister: state.modalStatus.showRegister,
    isOpenEdit: state.modalStatus.showEditUser
});
const mapDispatchToProps = {
    closeModal: closeModal,
    openDeleteWarning: openModalWarningDeleteUser,
    openEditUser: openModalEditUser,
    openRegister: openModalRegister
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManager);