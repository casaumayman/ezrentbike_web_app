import React, { Component, Fragment } from 'react';
import { Card } from 'containers/Card';
import { MDBBtn, MDBIcon, MDBTooltip } from 'mdbreact';
import { Table, Button, Input, Icon } from 'antd';
import ModalAddProduct from 'components/ModalAddProduct';
import { connect } from 'react-redux';
import { closeModal, openModalAddProduct, openModalWarningDeleteProduct, openModalEditProduct } from 'store/modal/actions';
import { Empty } from 'antd';
import { loadListProduct } from 'store/products/action';
import { getListProducer } from 'store/utils/action';
import Highlighter from 'react-highlight-words';
import ModalDeleteProduct from 'components/ModalDeleteProduct';
import ModalEditProduct from 'components/ModalEditProduct';
import baseURL from 'services/BaseURL';

class ProductManager extends Component {
    state = {
        data: [],
        productOperating: {
            image: undefined,
            category: 1,
            producer: 1,
            name: '',
            description: '',
            cost: 0,
            idCategory: 1,
            idProducer: 1
        }
    }
    componentDidMount() {
        this.props.loadListProduct();
        this.props.loadListProducer();
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        if (nextProps.listProduct.length > 0)
            nextProps.listProduct.sort((a, b)=>{
                return b.id - a.id
            });
        this.setState({ data: nextProps.listProduct });
    }
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    onDeleting = (record) => {
        this.setState({productOperating: record}, ()=>this.props.openModalDeleteProduct());
    }
    onEdit = (record) => {
        this.setState({productOperating: record}, ()=>this.props.openModalEditProduct());
    }
    render() {
        //console.log(this.state.data)
        document.title = "Quản lí sản phẩm";
        const columns = [
            { title: 'Mã sản phẩm', align: 'center', dataIndex: 'id', key: 'id' },
            {
                title: 'Tên sản phẩm',
                align: 'center',
                dataIndex: 'name',
                key: 'name',
                filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                    <div style={{ padding: 8 }}>
                        <Input
                            ref={node => {
                                this.searchInput = node;
                            }}
                            placeholder={`Search theo tên`}
                            value={selectedKeys[0]}
                            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                            style={{ width: 188, marginBottom: 8, display: 'block' }}
                        />
                        <Button
                            type="primary"
                            onClick={() => this.handleSearch(selectedKeys, confirm)}
                            icon="search"
                            size="small"
                            style={{ width: 90, marginRight: 8 }}
                        >
                            Search
                      </Button>
                        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                            Reset
                      </Button>
                    </div>
                ),
                filterIcon: filtered => (
                    <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
                ),
                onFilter: (value, record) =>
                    record.name
                        .toLowerCase()
                        .includes(value.toLowerCase()),
                onFilterDropdownVisibleChange: visible => {
                    if (visible) {
                        setTimeout(() => this.searchInput.select());
                    }
                },
                render: text => (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[this.state.searchText]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ),
            },
            {
                title: 'Thể loại',
                dataIndex: 'category',
                align: 'center',
                key: 'category',
                filters: [
                    {
                        text: 'Xe tay ga',
                        value: 'Xe tay ga'
                    },
                    {
                        text: 'Xe số',
                        value: 'Xe số'
                    }
                ],
                onFilter: (value, record) => {
                    //console.log(record);
                    return record.category === value;
                }
            },
            {
                title: 'Giá',
                align: 'center',
                dataIndex: 'cost',
                key: 'cost',
                sorter: (a, b) => (a.cost - b.cost),
                sortDirections: ['ascend', 'descend']
            },
            {
                title: 'Nhà sản xuất',
                dataIndex: 'producer',
                align: 'center',
                key: 'producer',
                filters: this.props.listProducer.map(value => {
                    return {
                        text: value.name,
                        value: value.name
                    }
                }),
                onFilter: (value, record) => record.producer === value
            },
            {
                title: 'Thao tác', align: 'center', key: 'operation', className: 'text-center', render: (record) => (
                    <div style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', display: 'flex' }}>
                        <div onClick={()=>this.onEdit(record)}>
                            <MDBTooltip placement="bottom">
                                <MDBBtn color="warning">
                                    <MDBIcon icon="edit" />
                                </MDBBtn>
                                <div>
                                    Chỉnh sửa
                                </div>
                            </MDBTooltip>
                        </div>
                        <div onClick={()=>this.onDeleting(record)}>
                            <MDBTooltip placement="bottom">
                                <MDBBtn color="danger">
                                    <MDBIcon icon="trash-alt" />
                                </MDBBtn>
                                <div>Xóa</div>
                            </MDBTooltip>
                        </div>
                    </div>
                )
            },
        ];
        const expandedRowRender = (record) => {
            const data = [
                {
                    key: record.key,
                    image: record.image,
                    description: record.description
                }
            ];
            const columns = [
                {
                    title: 'Ảnh sản phẩm',
                    align: 'center',
                    key: 'image',
                    render: () => (
                        <img alt="anh san pham" src={baseURL.backEndURLImage + `${record.image}`} width="100%"></img>
                    )
                },
                { title: 'Mô tả', dataIndex: 'description', align: 'center', key: 'description' }
            ];
            return <Table columns={columns} dataSource={data} pagination={false} />;
        };
        const data = [];
        for (let i = 0; i < this.state.data.length; i++) {
            const element = this.state.data[i];
            data.push({
                key: i,
                name: element.name,
                category: element.category.name,
                cost: element.cost,
                producer: element.producer.name,
                image: element.image,
                description: element.description,
                id: element.id,
                idCategory: element.category.id,
                idProducer: element.producer.id
            });
        }
        return (
            <div style={{ marginTop: '20px' }}>
                <ModalAddProduct isOpen={this.props.isOpenAddProduct} toggle={this.props.closeModal}></ModalAddProduct>
                <ModalDeleteProduct product={this.state.productOperating}></ModalDeleteProduct>
                <ModalEditProduct product={this.state.productOperating}></ModalEditProduct>
                <Card header="Quản lý sản phẩm" >
                    <Fragment>
                        <MDBBtn onClick={() => this.props.openModalAddProduct()} className="text-capitalize" color="success">
                            <MDBIcon icon="plus" className="mr-1"></MDBIcon> Thêm sản phẩm
                        </MDBBtn>
                        {this.state.data.length !== 0 ? (
                            <Table
                                style={{ marginTop: '30px' }}
                                className="components-table-demo-nested"
                                columns={columns}
                                expandedRowRender={expandedRowRender}
                                dataSource={data}
                                footer={() => "Danh sách sản phẩm"}
                            />
                        ) : <Empty></Empty>}
                    </Fragment>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isOpenAddProduct: state.modalStatus.showAddProduct,
    listProduct: state.products,
    listProducer: state.services.listProducer,
    user: state.authen
})

const mapDispatchToProps = {
    closeModal: closeModal,
    openModalAddProduct: openModalAddProduct,
    loadListProduct: loadListProduct,
    loadListProducer: getListProducer,
    openModalDeleteProduct: openModalWarningDeleteProduct,
    openModalEditProduct: openModalEditProduct
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductManager);
