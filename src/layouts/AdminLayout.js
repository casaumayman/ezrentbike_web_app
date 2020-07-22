import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { MDBCard, MDBCardBody, MDBAlert, MDBIcon, MDBBtn } from 'mdbreact';
import { Route } from 'react-router-dom';
import { rootHistory } from '../App';
import IndexAdmin from '../pages/IndexAdmin';
import UserManager from '../pages/UserManager';
import ProductManager from 'pages/ProductManager';
import FeedbackManager from 'pages/FeedbackManager';

const customLink = ({ to, label, exact, icon }, even, id) => {
    return (
        <Route
            path={to}
            exact={exact}
            children={({ match }) => (
                <MDBBtn outline style={{ width: '100%' }} name={id.toString()} onClick={even} color={match ? "danger" : "primary"}>
                    <MDBIcon icon={icon} className="mr-2" />{label}
                </MDBBtn>
            )}
        />
    );
}

class AdminLayout extends Component {
    state = {
        routes: [
            {
                path: '/manager',
                exact: true,
                icon: 'university',
                label: 'Trang chủ quản lý'
            },
            {
                path: '/manager/account-manager',
                exact: false,
                icon: 'address-card',
                label: 'Quản lý nhân viên'
            },
            {
                path: '/manager/account-custommer',
                exact: false,
                icon: 'user-edit',
                label: 'Quản lý người dùng'
            },
            {
                path: '/manager/product',
                exact: false,
                icon: 'motorcycle',
                label: 'Quản lý sản phẩm'
            },
            {
                path: '/manager/category',
                exact: false,
                icon: 'bars',
                label: 'Quản lý thể loại'
            },
            {
                path: '/manager/card',
                exact: false,
                icon: 'shopping-cart',
                label: 'Quản lý giỏ hàng'
            },
            {
                path: '/manager/feed-back',
                exact: false,
                icon: 'comments',
                label: 'Quản lý phản hồi'
            },
            {
                path: '/manager/sale',
                exact: false,
                icon: 'star',
                label: 'Quản lý khuyến mãi'
            }
        ]
    };
    onClickHandle = e => {
        const name = e.target.name;
        switch (name) {
            case '0':
                rootHistory.push('/manager');
                break;
            case '1':
                rootHistory.push('/manager/account-manager');
                break;
            case '2':
                rootHistory.push('/manager/account-custommer');
                break;
            case '3':
                rootHistory.push('/manager/product');
                break;
            case '4':
                rootHistory.push('/manager/category');
                break;
            case '5':
                rootHistory.push('/manager/card');
                break;
            case '6':
                rootHistory.push('/manager/feed-back');
                break;
            case '7':
                rootHistory.push('/manager/sale');
                break;
            default:
                break;
        }
    }
    render() {
        document.title = "Giao diện quản lý";
        if (this.props.user.role === 0) {
            return (
                <MDBAlert color="danger">
                    Bạn không có quyền xem trang này!
                </MDBAlert>
            )
        } else return (
            <Fragment>
                <MDBCard>
                    <MDBCardBody>
                        <div className="row" style={{ marginBottom: '20px' }}>
                            <div className="col-md-12" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                <a href="?thread=admin-ncp"><MDBIcon size="3x" icon="edit" /></a>
                                <font face="Tahoma" size="5.9">THUÊ XE MÁY EZRENTBIKES - GIAO DIỆN QUẢN LÝ</font>
                            </div>
                        </div>
                        <div className="row">
                            {this.state.routes.map((route, index) => (
                                <div key={index} className="col-md-3">
                                    {customLink({ to: route.path, label: route.label, exact: route.exact, icon: route.icon }, this.onClickHandle, index)}
                                </div>
                            ))}
                        </div>
                    </MDBCardBody>
                </MDBCard>
                <Route path="/manager" exact component={IndexAdmin}/>
                <Route path="/manager/account-custommer" component={UserManager}/>
                <Route path="/manager/product" component={ProductManager}/>
                <Route path="/manager/feed-back" component={FeedbackManager}/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    user: state.authen
});
export default connect(mapStateToProps, null)(AdminLayout);