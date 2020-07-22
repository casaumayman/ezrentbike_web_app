import React, { Component } from 'react'
import Modal from 'containers/Modal';
import { MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import { closeModal } from 'store/modal/actions';
import { deleteProduct } from 'store/products/action';
import baseURL from 'services/BaseURL';

class ModalDeleteProduct extends Component {
    state = {
        isLoading: false
    }
    onDelete = (id) => {
        this.setState({isLoading: true}, ()=>{
            this.props.deleteProduct(id, this.props.user.username);
        });
    }
    componentWillReceiveProps(){
        this.setState({isLoading: false});
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
    render() {
        //console.log(this.props.user);
        const footer = (
            <>
                <MDBBtn color="secondary" onClick={this.props.toggle}>Hủy bỏ</MDBBtn>
                <MDBBtn disabled={this.state.isLoading} color="danger" onClick={()=>this.onDelete(this.props.product.id)}>
                    {this.state.isLoading?(
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    ):
                        "Xóa"
                    }
                </MDBBtn>
            </>
        );
        return (
            <Modal
                isOpen = {this.props.isOpen}
                toggle = {this.props.toggle}
                title="Bạn có chắc chắn muốn xóa?"
                footer={footer}
                size="lg"
            >
                <div className="row">
                    <div className="col-4">
                        <img width="236px" alt="anh san pham" src={baseURL.backEndURLImage + `${this.props.product.image}`}></img>
                    </div>
                    <div className="col-8">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>Mã xe</td>
                                    <td>{this.props.product.id}</td>
                                </tr>
                                <tr>
                                    <td>Tên xe</td>
                                    <td>{this.props.product.name}</td>
                                </tr>
                                <tr>
                                    <td>Loại xe</td>
                                    <td>{this.props.product.category}</td>
                                </tr>
                                <tr>
                                    <td>Nhà sản xuất</td>
                                    <td>{this.props.product.producer}</td>
                                </tr>
                                <tr>
                                    <td>Giá</td>
                                    <td>{this.numberPrice(this.props.product.cost)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
  isOpen: state.modalStatus.showWarningDeleteProduct,
  user: state.authen
})

const mapDispatchToProps = {
  toggle: closeModal,
  deleteProduct: deleteProduct
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalDeleteProduct);