import React, { Component } from 'react';
import { Row, Card, Spin, Col } from 'antd';
import Slider from 'components/Slider';
import { connect } from 'react-redux';
import { loadListProduct } from 'store/products/action';
import datxegif from '../assets/datxe.gif';
import { MDBBtn } from 'mdbreact';
import { rootHistory } from 'App';
import CardGridProduct from 'components/CardGridProduct';

class HomePage extends Component {
  state = {
    loadingProduct: true
  }
  componentDidMount() {
    this.props.loadListProduct();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.products.length > 0) this.setState({ loadingProduct: false });
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
  render() {
    document.title = "Website thuê xe máy EzRentBike";
    const cardHeaderStyle = {
      backgroundColor: '#91d5ff'
    }
    const title = (text, link) => (
      <Row>
        <Col span={20}>
          <p style={{
            fontSize: '25px',
            color: '#003a8c'
          }}>
            {text} - <img alt="gif" src={datxegif} height="20px" width="109px" /> 0938.029.040 - Huy Tuấn
          </p>
        </Col>
        <Col span={4}>
          <MDBBtn onClick={()=>{rootHistory.push(link)}} color="info" size="sm">Xem tất cả</MDBBtn>
        </Col>
      </Row>
    );
    const listTayGa = this.props.products.filter(product => product.category.id === 2);
    const listXeSo = this.props.products.filter(product => product.category.id === 1);
    const topTayGa = listTayGa.slice(listTayGa.length - 3).map(product => (
      <CardGridProduct product={product} key={product.id}></CardGridProduct>
    ));
    const topXeSo = listXeSo.slice(listXeSo.length - 3).map(product => (
      <CardGridProduct key={product.id} product={product}></CardGridProduct>
    ));
    if (!this.state.loadingProduct) return (
      <>
        <Row>
          {
            !this.state.loadingProduct &&
            <Slider products={this.props.products}></Slider>
          }
        </Row>
        <Card headStyle={cardHeaderStyle} style={{ marginTop: '15px' }} title={title("XE TAY GA", "/xe-tay-ga")}>
          {topTayGa}
        </Card>
        <Card headStyle={cardHeaderStyle} style={{ marginTop: '15px' }} title={title("XE SỐ", "/xe-so")}>
          {topXeSo}
        </Card>
      </>
    );
    else return (
      <Spin size="large"></Spin>
    )
  }
}

const mapStateToProps = (state) => ({
  products: state.products
});
const mapDispatchToProps = {
  loadListProduct: loadListProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);