import { Card } from 'antd'
import CardGridProduct from 'components/CardGridProduct'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProductEvent extends Component {
    render() {
        const event = this.props.location.state
        document.title = `Sản phẩm khuyến mãi: ${event.title}`
        const title = (
            <p
                style={{
                    fontSize: '25px',
                    color: '#003a8c',
                }}
            >
                Sản phẩm khuyến mãi: {event.title}
            </p>
        )
        const list = this.props.products
            .filter(product =>
                {
                    let events = []
                    if (product.events) events = product.events
                    return events.some(item => item.id === event.id)
                }
            )
            .map(product => (
                <CardGridProduct
                    key={product.id}
                    product={product}
                ></CardGridProduct>
            ))
        return (
            <Card title={title} headStyle={{ backgroundColor: '#91d5ff' }}>
                {list}
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products,
})

export default connect(mapStateToProps, null)(ProductEvent)