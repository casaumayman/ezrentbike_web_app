import React, { Component } from 'react'
import { MDBAlert } from 'mdbreact';

export default class NotAuthen extends Component {
    render() {
        document.title = "Có lỗi xảy ra!";
        return (
            <MDBAlert color="danger">Bạn phải đăng nhập mới được xem nội dung này!</MDBAlert>
        )
    }
}
