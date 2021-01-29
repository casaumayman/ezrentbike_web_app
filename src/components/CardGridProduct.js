import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { rootHistory } from 'App'
import { MDBView } from 'mdbreact'
import baseURL from 'services/BaseURL'
import salegif from '../assets/sale.gif'

export default class CardGridProduct extends Component {
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
        const cardGridStyle = {
            width: '33.3%',
        }
        const titleStyle = {
            textAlign: 'center',
            marginTop: '5px',
            fontWeight: 'bold',
            fontSize: '17px',
            color: 'green',
        }
        const product = this.props.product
        const isSale =
            this.props.product.events && this.props.product.events.length > 0
        return (
            <Card.Grid style={cardGridStyle}>
                <div onClick={() => rootHistory.push(`/product/${product.id}`)}>
                    <MDBView hover zoom>
                        <div
                            style={{
                                position: 'absolute',
                                zIndex: 100,
                                right: 0,
                                visibility: isSale ? 'visible' :'hidden'
                            }}
                        >
                            <img alt="sale" src={salegif} width="100px" />
                        </div>
                        <img
                            alt="anh san pham"
                            src={baseURL.backEndURLImage + `${product.image}`}
                            height="230px"
                            width="100%"
                        ></img>
                    </MDBView>
                </div>
                <div style={titleStyle}>{product.name}</div>
                <div style={{ textAlign: 'center' }}>
                    <p>
                        <b
                            style={{ color: 'red', fontWeight: 'bold' }}
                        >{`Giá: ${this.numberPrice(product.cost)} /ngày`}</b>
                        <Button
                            style={{ marginLeft: '15px' }}
                            onClick={() =>
                                rootHistory.push(`/product/${product.id}`)
                            }
                            type="primary"
                        >
                            Xem chi tiết
                        </Button>
                    </p>
                </div>
            </Card.Grid>
        )
    }
}
