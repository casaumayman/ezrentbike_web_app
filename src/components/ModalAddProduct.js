import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Row, Col, Modal, Form, Input, Select, Tooltip, InputNumber } from 'antd';
import { getListProducer } from 'store/utils/action';
import { callApiImage } from 'services/apiService';
import catchError from 'services/catchError';
import { toast } from 'react-toastify';
import { addProduct } from 'store/products/action';
import baseURL from 'services/BaseURL';

class ModalAddProduct extends Component {
    state = {
        product: {
            image: undefined,
            category: 1,
            producer: 1,
            name: '',
            description: '',
            price: 0
        },
        avatar: undefined,
        validate: {
            name: true,
            price: true
        },
        wasValidated: false,
        isLoading: false
    }
    onHandleChange = e => {
        const { name, value } = e.target;
        if (name === 'image') {
            if (e.target.files && e.target.files[0])
                this.setState({
                    avatar: URL.createObjectURL(e.target.files[0]),
                    product: { ...this.state.product, image: e.target.files[0] }
                });
            else this.setState({
                avatar: undefined,
                product: { ...this.state.product, image: undefined }
            });
        } else this.setState({ product: { ...this.state.product, [name]: value } });
    }
    componentWillMount() {
        this.props.onLoadProducer();
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
        return result + ' VND';
    }
    vadlidate = () => {
        let name = this.state.product.name !== "";
        let price = this.state.product.price !== "" && this.state.product.price !== null;
        this.setState({
            validate: {
                name,
                price
            },
            wasValidated: true
        });
        if (name && price) return true;
        return false;
    }
    handleSubmit = () => {
        if (this.vadlidate()) {
            this.setState({ isLoading: true });
            let newProduct = this.state.product;
            newProduct.username = this.props.user.username;
            newProduct.cost = newProduct.price;
            delete newProduct.price;
            if (newProduct.image === undefined) delete newProduct.image;
            callApiImage('product/add-product', 'post', newProduct, localStorage.getItem('token')).then(res => {
                toast.success('Thêm sản phẩm thành công!');
                this.props.addProduct(res);
            }).catch(err => catchError(err)).finally(() => {
                this.setState({
                    isLoading: false,
                    product: {
                        image: undefined,
                        category: 1,
                        producer: 1,
                        name: '',
                        description: '',
                        price: 0
                    },
                    avatar: undefined,
                    validate: {
                        name: true,
                        price: true
                    },
                    wasValidated: false
                });
                this.props.toggle();
            });
        }
    }
    render() {
        //console.log(this.state.product);
        let titlePrice = this.numberPrice(this.state.product.price);
        let srcImg = (!this.state.avatar ? baseURL.backEndURLImage + "default.jpg" : this.state.avatar);
        return (
            <Modal
                width="800px"
                onCancel={this.props.toggle}
                title="Thêm sản phẩm mới"
                visible={this.props.isOpen}
                okText="Thêm sản phẩm"
                cancelText="Hủy bỏ"
                onOk={this.handleSubmit}
                confirmLoading={this.state.isLoading}
            >
                <Row>
                    <Col span={8}>
                        <Row>
                            <Col span={24}>
                                <img alt="san pham" width="100%" src={srcImg}></img>
                            </Col>
                            <Col span={24}>
                                <h6 style={{ textAlign: 'center' }}>Tải lên ảnh</h6>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept="image/*"
                                        name="image"
                                        onChange={this.onHandleChange}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">Chọn tệp</label>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={16}>
                        <Form layout="horizontal">
                            <Form.Item
                                label="Tên xe:"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                hasFeedback={this.state.wasValidated}
                                validateStatus={this.state.validate.name ? "success" : "error"}
                                help={this.state.wasValidated ? "Tên sản phẩm không được để trống!" : ""}
                            >
                                <Input
                                    onChange={this.onHandleChange}
                                    name="name"
                                    value={this.state.product.name}
                                    placeholder="Điền tên sản phẩm"
                                />
                            </Form.Item>
                            <Form.Item label="Loại xe:" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                <Radio.Group name="category" onChange={this.onHandleChange} defaultValue={2}>
                                    <Radio.Button value={2}>Xe tay ga</Radio.Button>
                                    <Radio.Button value={1}>Xe số</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            {
                                this.props.listProducer.length > 0 ?
                                    <Form.Item label="Nhà sản xuất" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        <Select name="producer"
                                            onChange={(value) => this.setState({ product: { ...this.state.product, producer: value } })}
                                            defaultValue={this.state.product.producer}
                                        >
                                            {this.props.listProducer.map((producer, index) => (
                                                <Select.Option key={index} value={producer.id}>{producer.name}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item> : ""
                            }
                            <Form.Item
                                label="Giá thuê (vnd/ngày):"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                hasFeedback={this.state.wasValidated}
                                validateStatus={this.state.validate.price ? "success" : "error"}
                                help={this.state.wasValidated ? "Giá sản phẩm không được để trống!" : ""}
                            >
                                <Tooltip
                                    trigger={['focus']}
                                    placement="topLeft"
                                    overlayClassName="numeric-input"
                                    title={titlePrice}
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        type="number"
                                        min={0}
                                        defaultValue={this.state.product.price}
                                        onChange={(value) => this.setState({ product: { ...this.state.product, price: value } })}
                                    />
                                </Tooltip>
                            </Form.Item>
                            <Form.Item label="Mô tả sản phẩm:" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                <Input.TextArea value={this.state.product.description} onChange={this.onHandleChange} name="description" rows={3}>
                                </Input.TextArea>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    listProducer: state.services.listProducer,
    user: state.authen
})

const mapDispatchToProps = {
    onLoadProducer: getListProducer,
    addProduct: addProduct
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalAddProduct);