import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Row, Col, Modal, Form, Input, Select, Tooltip, InputNumber } from 'antd';
import { getListProducer } from 'store/utils/action';
import { callApiImage } from 'services/apiService';
import catchError from 'services/catchError';
import { toast } from 'react-toastify';
import { editProduct } from 'store/products/action';
import { closeModal } from 'store/modal/actions';
import baseURL from 'services/BaseURL';

class ModalEditProduct extends Component {
    state = {
        product: {
            image: undefined,
            idCategory: 1,
            idProducer: 1,
            name: '',
            description: '',
            cost: 0
        },
        image: undefined,
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
                    image: URL.createObjectURL(e.target.files[0]),
                    product: { ...this.state.product, image: e.target.files[0] }
                });
            else this.setState({
                image: undefined,
                product: { ...this.state.product, image: undefined }
            });
        } else this.setState({ product: { ...this.state.product, [name]: value } });
    }
    componentWillMount() {
        this.props.onLoadProducer();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({product: nextProps.product});
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
            if (newProduct.image === undefined) delete newProduct.image;
            callApiImage('product/edit', 'post', newProduct, localStorage.getItem('token')).then(res => {
                toast.success('Cập nhật sản phẩm thành công!');
                //console.log(res);
                this.props.editProduct(res);
            }).catch(err => catchError(err)).finally(() => {
                this.setState({
                    isLoading: false,
                    product: {
                        image: undefined,
                        idCategory: 1,
                        idProducer: 1,
                        name: '',
                        description: '',
                        cost: 0
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
        let titlePrice = this.numberPrice(this.state.product.cost);
        let srcImg = (!this.state.image ? baseURL.backEndURLImage + `${this.props.product.image}` : this.state.image);
        return (
            <Modal
                width="800px"
                onCancel={this.props.toggle}
                title="Sửa sản phẩm"
                visible={this.props.isOpen}
                okText="Lưu chỉnh sửa"
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
                                <Radio.Group name="idCategory" onChange={this.onHandleChange} value={this.state.product.idCategory}>
                                    <Radio.Button value={2}>Xe tay ga</Radio.Button>
                                    <Radio.Button value={1}>Xe số</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            {
                                this.props.listProducer.length > 0 ?
                                    <Form.Item label="Nhà sản xuất" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                        <Select name="idProducer"
                                            onChange={(value) => this.setState({ product: { ...this.state.product, idProducer: value } })}
                                            defaultValue={this.state.product.idProducer}
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
                                        defaultValue={this.state.product.cost}
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
    user: state.authen,
    isOpen: state.modalStatus.showEditProduct,
})

const mapDispatchToProps = {
    onLoadProducer: getListProducer,
    editProduct: editProduct,
    toggle: closeModal
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalEditProduct);