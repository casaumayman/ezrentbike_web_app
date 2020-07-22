import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Card } from 'antd';
import CardGridProduct from 'components/CardGridProduct';

class SearchResult extends Component {
    render() {
        //console.log(this.props.location.state);
        const value = this.props.location.state.value;
        document.title = "Result: "+value;
        const title = (
            <p style={{
                fontSize: '25px',
                color: '#003a8c',
            }}>
                Kết quả tìm kiếm cho: "{value}"
          </p>
        );
        const list = this.props.products.filter((product)=>
            product
            .name
            .toLowerCase()
            .indexOf(value.toLowerCase())!==-1
        ).map(product=>(
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

export default connect(mapStateToProps, null)(SearchResult);
