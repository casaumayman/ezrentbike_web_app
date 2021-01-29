import { Empty, Tooltip } from 'antd'
import Table from 'containers/Table'
import Card from 'containers/Card'
import { MDBBtn, MDBIcon } from 'mdbreact'
import React, { Component } from 'react'
import { Fragment } from 'react'
import { callApi } from 'services/apiService'
import { toast } from 'react-toastify'
import { InfoCircleTwoTone } from '@ant-design/icons'
import * as moment from 'moment'
import ModalAddEvent from '../components/ModalAddEvent'

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

const renderRow = event => {
    const {
        isPercent = false,
        title,
        content,
        value = 0,
        startTime,
        endTime,
        index,
        products = [],
    } = event
    let valueStr = isPercent ? `${value}%` : `${numberPrice(value)}`
    const fromDate = moment(startTime).format('DD/MM/YYYY')
    const toDate = moment(endTime).format('DD/MM/YYYY')
    const productsRender = products.map((product, index) => {
        return <p key={index}>{product.name}</p>
    })
    return {
        index,
        title,
        content,
        value: valueStr,
        time: `${fromDate} - ${toDate}`,
        action: (
            <Tooltip key={event.id} title={productsRender}>
                <InfoCircleTwoTone style={{ fontSize: '25px' }} />
            </Tooltip>
        ),
    }
}

export default class SaleManager extends Component {
    state = {
        data: {
            columns: [
                {
                    label: 'STT',
                    field: 'index',
                },
                {
                    label: 'Tiêu đề',
                    field: 'title',
                },
                {
                    label: 'Nội dung',
                    field: 'content',
                },
                {
                    label: 'Giá giảm',
                    field: 'value',
                },
                {
                    label: 'Thời gian',
                    field: 'time',
                },
                {
                    label: 'Sản phẩm áp dụng',
                    field: 'action',
                },
            ],
            rows: [],
        },
        visibleModel: false,
    }

    numberPrice = value => {
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

    async componentDidMount() {
        document.title = 'Quản lý khuyến mãi'
        await this.loadData()
    }

    loadData = async () => {
        try {
            const dataResponse = await callApi('/event/list-event')
            let listEvent = dataResponse.map((event, index) =>
                renderRow({ ...event, index })
            )
            this.setState(state => ({
                data: {
                    ...state.data,
                    rows: listEvent,
                },
            }))
            console.log('load Data: ' + dataResponse)
        } catch (err) {
            toast.error('Lỗi:' + err.message)
        }
    }

    callbackResult = action => {
        switch (action) {
            case 'success':
                this.loadData()
                break
            case 'cancel':
                break
            default:
                return
        }
        this.setState({ visibleModel: false })
    }

    render() {
        return (
            <div style={{ marginTop: '20px' }}>
                <ModalAddEvent
                    visible={this.state.visibleModel}
                    callbackResult={this.callbackResult}
                />
                <Card header="Quản lý khuyến mãi">
                    <Fragment>
                        <MDBBtn
                            className="text-capitalize"
                            onClick={() =>
                                this.setState({ visibleModel: true })
                            }
                            color="success"
                        >
                            <MDBIcon icon="plus" className="mr-1"></MDBIcon>{' '}
                            Thêm khuyến mãi
                        </MDBBtn>
                        {this.state.data.rows.length !== 0 ? (
                            <Table
                                data={{ ...this.state.data }}
                                caption="Danh sách khuyến mãi"
                            ></Table>
                        ) : (
                            <Empty></Empty>
                        )}
                    </Fragment>
                </Card>
            </div>
        )
    }
}
