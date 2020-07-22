import { toast } from 'react-toastify';
import { Alert } from 'antd';
import React from 'react';

export const toastify = {
    success: (message) => toast(<Alert
        message="Thành công!"
        description={message}
        type="success"
        showIcon
    />),
    error: (message) => toast(<Alert
        message="Error"
        description={message}
        type="error"
        showIcon
    />)
}