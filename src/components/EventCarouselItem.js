import { Button } from 'antd'
import Title from 'antd/lib/typography/Title'
import React, { Component } from 'react'
import backgroundImage from '../assets/sale-background.jpg'
import moment from 'moment'
import { rootHistory } from 'App'

export class EventCarouselItem extends Component {
    state = {
        title: 'Mừng năm mới 2021',
        content: 'hahahah',
        fromDate: 'Wed Jan 27 2021 16:46:55 GMT+0700',
        toDate: 'Wed Feb 27 2021 16:46:55 GMT+0700',
        isPercent: true,
        value: 0,
    }
    componentDidMount() {
        if (this.props.event) {
            this.setState({ ...this.props.event })
        }
    }
    numberPrice = value => {
        //console.log(value);
        if (value === null || value === '' || value === undefined)
            return 'null'
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
    render() {
        const {
            content,
            fromDate,
            isPercent,
            title,
            toDate,
            value,
        } = this.state
        const fromDateString = moment(fromDate).format('DD-MM-YYYY')
        const toDateString = moment(toDate).format('DD-MM-YYYY')
        return (
            <div
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    display: 'flex',
                    width: '100%',
                    height: '600px',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    padding: '30px',
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
                                    {this.numberPrice(value)}
                                </span>
                            }{' '}
                            giá thuê trên các sản phẩm áp dụng
                        </h3>
                    )}
                    <h3 style={{ color: 'white' }}>
                        Thời gian áp dụng từ ngày{' '}
                        {<span style={{ color: 'red' }}>{fromDateString}</span>}{' '}
                        đến ngày{' '}
                        {<span style={{ color: 'red' }}>{toDateString}</span>}
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
                    onClick={() => {
                        rootHistory.push('/sale/product', {...this.props.event})
                    }}
                    ghost
                >
                    Danh sách sản phẩm áp dụng
                </Button>
            </div>
        )
    }
}
