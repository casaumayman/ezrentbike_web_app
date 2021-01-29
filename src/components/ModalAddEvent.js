import { Button, Checkbox, DatePicker, Input, InputNumber, Modal, Transfer } from 'antd'
import React, { Component } from 'react'
import backgroundImage from '../assets/sale-background.jpg'
import Title from 'antd/lib/typography/Title'
import moment from 'moment'
import TextArea from 'antd/lib/input/TextArea'
import { connect } from 'react-redux'
import { callApi } from 'services/apiService'
import { toast } from 'react-toastify'

/*Props {
    visible: boolean,
    callbackResult: (action) => {},
} */

const numberPrice = value => {
    //console.log(value);
    if (value === null || value === '' || value === undefined) return 'null'
    let num = value + ''
    let result = num.charAt(num.length - 1)
    for (let i = num.length - 2; i >= 0; i--) {
        let j = num.length - i
        result = num.charAt(i) + result
        if (j % 3 === 0) result = '.' + result
    }
    if (result.charAt(0) === '.') result = result.slice(1)
    return result + ' VNĐ'
}

const renderPreview = event => {
    const {
        content = 'content',
        startTime = 'Wed Jan 27 2021 16:46:55 GMT+0700',
        isPercent = true,
        title = 'title',
        endTime = 'Wed Jan 27 2021 16:46:55 GMT+0700',
        value = 10,
    } = event
    const fromDateString = moment(startTime).format('DD-MM-YYYY')
    const toDateString = moment(endTime).format('DD-MM-YYYY')
    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: '30px',
                height: '100%',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                    flex: 10,
                }}
            >
                <Title style={{ color: 'white', textAlign: 'center' }}>
                    {title}
                </Title>
                <h3
                    style={{
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    {content}
                </h3>
                {isPercent ? (
                    <h3 style={{ color: 'white' }}>
                        Giảm giá{' '}
                        {<span style={{ color: 'red' }}>{value}%</span>} giá
                        thuê trên các sản phẩm áp dụng
                    </h3>
                ) : (
                    <h3 style={{ color: 'white' }}>
                        Giảm{' '}
                        {
                            <span style={{ color: 'red' }}>
                                {numberPrice(value)}
                            </span>
                        }{' '}
                        giá thuê trên các sản phẩm áp dụng
                    </h3>
                )}
                <h3 style={{ color: 'white' }}>
                    Thời gian áp dụng từ ngày{' '}
                    {<span style={{ color: 'red' }}>{fromDateString}</span>} đến
                    ngày {<span style={{ color: 'red' }}>{toDateString}</span>}
                </h3>
            </div>
            <Button
                style={{
                    width: '250px',
                    flex: 1,
                    color: '#00c851',
                    borderColor: '#00c851',
                }}
                size="large"
                ghost
            >
                Danh sách sản phẩm áp dụng
            </Button>
        </div>
    )
}

class ModalAddEvent extends Component {
    state = {
        isLoading: false,
        event: {
            title: '',
            content: '',
            startTime: '',
            endTime: '',
            isPercent: false,
            value: 1,
            products: [],
        },
    }

    setStateEvent = (key, value) => {
        const stateEvent = { ...this.state.event }
        this.setState({ event: { ...stateEvent, [key]: value } })
    }

    handleOk = async () => {
        this.setState({ isLoading: true })
        try {
            await callApi(
                'event/create-event',
                'POST',
                {
                    username: this.props.user.username,
                    event: this.state.event,
                },
                localStorage.getItem('token')
            )
            toast.success('Thêm khuyến mãi thành công!')
            this.props.callbackResult('success')
        } catch (err) {
            toast.error('Lỗi: ' + err)
            console.log(err)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    handleCancel = () => {
        this.props.callbackResult('cancel')
    }

    filterOption = (inputValue, option) => {
        return option.name.toUpperCase().indexOf(inputValue.toUpperCase()) > -1
    }

    onDateChange = dates => {
        let dateStart = dates[0].set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        })
        let dateEnd = dates[1].set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        })
        const stateEvent = { ...this.state.event }
        this.setState({
            event: { ...stateEvent, startTime: dateStart.toString(), endTime: dateEnd.toString() },
        })
    }

    render() {
        return (
            <Modal
                title="Thêm khuyến mãi"
                visible={this.props.visible}
                onOk={this.handleOk}
                confirmLoading={this.state.isLoading}
                onCancel={this.handleCancel}
                closable={false}
                afterClose={this.afterClose}
                maskClosable={false}
                width={1200}
                okText="Thêm"
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '435px',
                    }}
                >
                    <div
                        style={{
                            flex: 3,
                            paddingRight: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Input
                            placeholder="Tiêu đề"
                            value={this.state.event.title}
                            onChange={e => {
                                this.setStateEvent('title', e.target.value)
                            }}
                        />
                        <TextArea
                            placeholder="Nội dung"
                            rows={3}
                            value={this.state.event.content}
                            onChange={e => {
                                this.setStateEvent('content', e.target.value)
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <InputNumber
                                style={{ flex: 5 }}
                                placeholder="Giá trị khuyến mãi"
                                suffix={
                                    this.state.event.isPercent ? '%' : 'VNĐ'
                                }
                                formatter={value => {
                                    if (this.state.event.isPercent) {
                                        return `${value}%`
                                    }
                                    return `${value} VNĐ`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        '.'
                                    )
                                }}
                                parser={value => {
                                    if (this.state.event.isPercent) {
                                        return value.replace('%', '')
                                    }
                                    return value.replace(/\D/g, '')
                                }}
                                min={1}
                                max={
                                    this.state.event.isPercent ? 100 : 10000000
                                }
                                defaultValue={this.state.event.value}
                                onChange={value => {
                                    this.setStateEvent('value', value)
                                }}
                                value={this.state.event.value}
                            />
                            <div style={{ flex: 1 }}></div>
                            <Checkbox
                                checked={this.state.event.isPercent}
                                onChange={e =>
                                    this.setStateEvent(
                                        'isPercent',
                                        e.target.checked
                                    )
                                }
                                style={{ flex: 3 }}
                            >
                                Giảm giá theo %
                            </Checkbox>
                        </div>
                        <DatePicker.RangePicker
                            format="DD-MM-YYYY"
                            disabledDate={date =>
                                date < moment().startOf('day')
                            }
                            separator="->"
                            onChange={this.onDateChange}
                            allowClear={false}
                        />
                        <Transfer
                            dataSource={[...this.props.products]}
                            showSearch
                            filterOption={this.filterOption}
                            targetKeys={this.state.event.products.map(
                                item => item.id
                            )}
                            onChange={listId => {
                                this.setStateEvent(
                                    'products',
                                    listId.map(id => ({ id }))
                                )
                            }}
                            onSearch={this.handleSearch}
                            render={item => item.name}
                            rowKey={item => item.id}
                        />
                    </div>
                    <div
                        style={{
                            flex: 5,
                        }}
                    >
                        {renderPreview(this.state.event)}
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products,
    user: state.authen,
})

export default connect(mapStateToProps, null)(ModalAddEvent)
