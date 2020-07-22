import React, { Component } from 'react'
import { Alert } from 'antd';

export default class Sale extends Component {
    render() {
        document.title = "Khuyến mãi";
        return (
            <Alert
            message="Vô cùng xin lỗi"
            description="Tính năng đang được phát triển, quý khách vui lòng quay lại sau!"
            type="error"
          />
        )
    }
}
