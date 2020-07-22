import React, { Component } from 'react'
import { Modal, Row, Col, DatePicker, Form } from 'antd';
import { connect } from 'react-redux';
import { closeModal } from 'store/modal/actions';
import baseURL from 'services/BaseURL';
import moment from 'moment';
import { callApi } from 'services/apiService';
import catchError from 'services/catchError';
import { toast } from 'react-toastify';

class ModalRentBike extends Component {
    state = {
        loading: false,
        dateStart: null,
        dateEnd: null,
        wasValidated: false,
        valid: false
    }
    handleSubmit = () => {
        this.setState({ wasValidated: true });
        if (this.state.valid) {
            this.setState({ loading: true });
            let body = {
                username: this.props.user.username,
                productId: this.props.product.id,
                dateStart: (+this.state.dateStart).toString(),
                dateEnd: (+this.state.dateEnd).toString()
            }
            callApi('lease', 'post', body, localStorage.getItem('token'))
                .then(res => {
                    let { product } = this.props;
                    product.leases.push(res);
                    toast.success("Bạn đã đặt thuê xe thành công!");
                })
                .catch(err => catchError(err))
                .finally(() => {
                    this.setState({
                        loading: false,
                        dateStart: null,
                        dateEnd: null,
                        wasValidated: false,
                        valid: false
                    });
                    this.props.onCancel();
                });
        }
    }
    numberPrice = (value) => {
        //console.log(value);
        if (value === null || value === '' || value === undefined) return "Nhập giá sản phẩm";
        let num = value + '';
        let result = num.charAt(num.length - 1);
        for (let i = num.length - 2; i >= 0; i--) {
            let j = num.length - i;
            result = num.charAt(i) + result;
            if (j % 3 === 0) result = '.' + result;
        }
        if (result.charAt(0) === '.') result = result.slice(1);
        return result + ' VNĐ';
    }
    disabledDate = current => {
        const disablePast = current < moment().endOf('day');
        const { product } = this.props;
        let disable = false;
        let check = (start, end, curr) => {
            start = Number(start);
            end = Number(end);
            const v1 = curr.isSameOrAfter(start, 'day');
            const v2 = curr.isSameOrBefore(end, 'day');
            return v1 && v2;
        }
        for (let i = 0; i < product.leases.length; i++) {
            const element = product.leases[i];
            if (check(element.startTime, element.endTime, current)) {
                disable = true;
                break;
            }
        }
        return (disablePast || disable);
    }
    onDateChange = (dates) => {
        let dateStart = dates[0].set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
        let dateEnd = dates[1].set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
        this.setState({
            dateStart,
            dateEnd,
            valid: (!dateEnd || !dateStart) ? false : true
        });
    }
    render() {
        const { product } = this.props;
        const { dateStart, dateEnd, wasValidated, valid } = this.state;
        const countDay = () => {
            if (!dateStart || !dateEnd) return 0;
            return dateEnd.diff(dateStart, 'day') + 1;
        }
        return (
            <Modal
                title="Chọn ngày thuê xe:"
                visible={this.props.visible}
                onOk={this.handleSubmit}
                confirmLoading={this.state.loading}
                onCancel={this.props.onCancel}
                okText="Thuê ngay"
                cancelText="Hủy bỏ"
                width="800px"
            >
                <Row>
                    <Col span={9}>
                        <img alt="anh san pham" width="100%" src={baseURL.backEndURLImage + product.image} />
                        <p style={{
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: '17px'
                        }}>Ảnh sản phẩm</p>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={14}>
                        <p style={{ fontWeight: 'bold', color: 'red', textAlign: 'center', fontSize: '30px' }}>{product.name}</p>
                        <div style={{
                            fontWeight: 'bold',
                            color: 'green',
                            fontSize: '20px',
                            marginBottom: '10px'
                        }}>
                            {"Giá: " + this.numberPrice(product.cost) + "/ngày"}
                        </div>
                        <Row>
                            <Col span={6}>
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '20px'
                                }}>
                                    Ngày thuê:
                                </div>
                            </Col>
                            <Col span={18}>
                                <Form.Item
                                    style={{ marginBottom: '0px' }}
                                    validateStatus={(wasValidated && (!dateEnd || !dateStart)) ? "error" : "success"}
                                    help={(wasValidated && !valid) ? "Bạn phải chọn ngày thuê xe!" : ""}
                                >
                                    <DatePicker.RangePicker
                                        format="DD-MM-YYYY"
                                        disabledDate={this.disabledDate}
                                        separator="->"
                                        onChange={this.onDateChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div style={{
                            fontWeight: 'bold',
                            fontSize: '20px',
                            marginTop: '5px'
                        }}>
                            Số ngày đã chọn: {<span style={{ color: 'red' }}>{countDay()}</span>}
                        </div>
                        <div style={{
                            fontWeight: 'bold',
                            fontSize: '20px',
                            marginTop: '5px'
                        }}>
                            Tổng giá: {<span style={{ color: 'red' }}>{this.numberPrice(countDay() * product.cost)}</span>}
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => ({
    visible: state.modalStatus.showRentBike,
    user: state.authen
})

const mapDispatchToProps = {
    onCancel: closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRentBike);