import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card } from 'antd';
import CardGridProduct from 'components/CardGridProduct';
import datxegif from '../assets/datxe.gif';

class XeSo extends Component {
    render() {
        //console.log(this.props);
        document.title = "Xe số";
        const title = (
            <p style={{
                fontSize: '25px',
                color: '#003a8c',
            }}>
                XE SỐ - <img alt="gif" src={datxegif} height="20px" width="109px" /> 0938.029.040 - Huy Tuấn
          </p>
        );
        const list = this.props.products.filter((product)=>product.category.id===1).map(product=>(
            <CardGridProduct key={product.id} product={product}></CardGridProduct>
        ))
        return (
            <Card title={title} headStyle={{backgroundColor: '#91d5ff'}}>
                {list}
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.products
});

export default connect(mapStateToProps, null)(XeSo);
