import React, { Component } from 'react'
import { Col, Row, Tabs, Icon } from 'antd'
import { callApi } from 'services/apiService'
import catchError from 'services/catchError'
import { MDBBtn, MDBIcon } from 'mdbreact'
import { connect } from 'react-redux'
import baseURL from 'services/BaseURL'
import { openModalRentBike } from 'store/modal/actions'
import ModalRentBike from 'components/ModalRentBike'

class DetailProduct extends Component {
    state = {
        product: {
            name: '',
            cost: '',
            description: '',
            category: {
                id: 1,
                name: 'Xe số',
            },
            producer: {
                id: 1,
                name: 'Honda',
            },
            image: undefined,
            events: []
        },
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        callApi('product/detail', 'post', { id: this.props.match.params.id })
            .then(res => this.setState({ product: res }))
            .catch(err => catchError(err))
    }
    numberPrice = value => {
        //console.log(value);
        if (value === null || value === '' || value === undefined)
            return 'Nhập giá sản phẩm'
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
        //console.log(this.state.product)
        document.title = this.state.product.name
        const { product } = this.state
        const isSale = product.events.length > 0
        let amountSale = product.cost
        if (isSale) {
            product.events.forEach(event => {
                let discount = 0
                if (event.isPercent) {
                    discount = amountSale * (event.value / 100)
                } else {
                    discount = event.value
                }
                amountSale = Math.max(0, amountSale - discount)
            })
        }
        return (
            <Row style={{ marginTop: '20px' }}>
                <ModalRentBike product={{...product, cost: amountSale}}></ModalRentBike>
                <Col span={10}>
                    {product.image && (
                        <img
                            width="100%"
                            alt="anh san pham"
                            src={baseURL.backEndURLImage + `${product.image}`}
                        ></img>
                    )}
                </Col>
                <Col span={1}></Col>
                <Col span={13}>
                    <p
                        style={{
                            color: 'red',
                            fontWeight: 'bold',
                            fontSize: '40px',
                        }}
                    >
                        {product.name}
                    </p>
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: '20px',
                            color: 'green',
                        }}
                    >
                        Mã xe: {product.id}
                    </div>
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: '20px',
                            color: 'green',
                        }}
                    >
                        Thể loại: {product.category.name}
                    </div>
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: '20px',
                            color: 'green',
                        }}
                    >
                        Nhà sản xuất: {product.producer.name}
                    </div>
                    {isSale ? (
                        <div
                            style={{
                                fontWeight: 'bold',
                                fontSize: '20px',
                                color: 'green',
                            }}
                        >
                            Giá:{' '}
                            {
                                <>
                                    <span
                                        style={{
                                            textDecoration: 'line-through',
                                        }}
                                    >
                                        {this.numberPrice(product.cost)}
                                    </span>
                                    <span style={{
                                        marginLeft: '10px',
                                        color: 'red'
                                    }}>
                                        {this.numberPrice(amountSale)}
                                    </span>
                                </>
                            }
                        </div>
                    ) : (
                        <div
                            style={{
                                fontWeight: 'bold',
                                fontSize: '20px',
                                color: 'green',
                            }}
                        >
                            Giá: {this.numberPrice(product.cost)}
                        </div>
                    )}
                    {this.props.user.username === '' ? (
                        <MDBBtn
                            style={{ marginTop: '30px' }}
                            disabled
                            color="danger"
                        >
                            <MDBIcon far icon="times-circle" className="mr-1" />
                            Bạn phải đăng nhập để thuê xe!
                        </MDBBtn>
                    ) : (
                        <MDBBtn
                            onClick={() => this.props.openModalRentBike()}
                            style={{ marginTop: '30px' }}
                            color="primary"
                        >
                            <MDBIcon icon="check" className="mr-1" />
                            Thuê ngay
                        </MDBBtn>
                    )}
                    <div style={{ marginTop: '15px' }}>
                        <div
                            className="fb-like"
                            data-href="https://www.facebook.com/ithutech"
                            data-layout="standard"
                            data-action="like"
                            data-size="small"
                            data-show-faces="true"
                            data-share="true"
                        />
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <div
                            className="fb-save"
                            data-uri="https://www.facebook.com/ithutech"
                            data-size="large"
                        />
                        <div className="g-plus" data-action="share" />
                    </div>
                </Col>
                <Col span={24}>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane
                            tab={
                                <span>
                                    <Icon type="info-circle" />
                                    Thông tin xe
                                </span>
                            }
                            key="1"
                        >
                            <p
                                style={{
                                    margin: '15px',
                                    fontWeight: '400',
                                    fontSize: '18px',
                                }}
                            >
                                {product.description}
                            </p>
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    user: state.authen,
})

const mapDispatchToProps = {
    openModalRentBike: openModalRentBike,
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct)
