import React, { Component, Fragment } from 'react';
import { MDBCard, MDBCardBody, MDBRow, MDBCardHeader, MDBIcon, MDBCardFooter } from 'mdbreact';
import { rootHistory } from '../App';

export default class IndexAdmin extends Component {
    state = {
        routes: [
            {
                path: '/manager',
                label: 'Trang chủ quản lý',
                color: 'primary',
                icon: 'home'
            },
            {
                path: '/manager/account-manager',
                label: 'Quản lý nhân viên',
                color: 'success',
                icon: 'address-card'
            },
            {
                path: '/manager/account-custommer',
                label: 'Quản lý người dùng',
                color: 'info',
                icon: 'user-edit'
            },
            {
                path: '/manager/product',
                label: 'Quản lý sản phẩm',
                color: 'danger',
                icon: 'motorcycle'
            },
            {
                path: '/manager/category',
                label: 'Quản lý thể loại',
                color: 'info',
                icon: 'bars'
            },
            {
                path: '/manager/card',
                label: 'Quản lý giỏ hàng',
                color: 'danger',
                icon: 'shopping-cart'
            },
            {
                path: '/manager/feed-back',
                label: 'Quản lý phản hồi',
                color: 'primary',
                icon: 'comments'
            },
            {
                path: '/manager/sale',
                label: 'Quản lý khuyến mãi',
                color: 'success',
                icon: 'star'
            }
        ],
        number: ['ADM', 1, 2, 3, 4, 5, 6, 7],
        hover: [false, false, false, false, false, false, false, false]
    }
    render() {
        //console.log(this.state.hover);
        document.title = "Giao diện quản lí";
        return (
            <Fragment>
                <MDBCard className="border-primary" style={{ marginTop: '20px' }}>
                    <MDBCardBody>
                        <MDBRow>
                            {this.state.routes.map((route, index) => (
                                <div className="col-lg-3 col-md-6" key={index}>
                                    <MDBCard style={{marginBottom: '20px'}} className={`border-${route.color}`}>
                                        <MDBCardHeader className={`bg-${route.color} text-white`}>
                                            <MDBRow>
                                                <div className="col-3">
                                                    <MDBIcon icon={route.icon} size="4x"></MDBIcon>
                                                </div>
                                                <div className="col-9 text-right">
                                                    <div style={{fontSize: '40px'}}>{this.state.number[index]}</div>
                                                    <div style={{ fontSize: '13px' }}>{route.label}</div>
                                                </div>
                                            </MDBRow>
                                        </MDBCardHeader>
                                        <MDBCardFooter 
                                            onMouseEnter={()=>this.setState({hover: this.state.hover.map((value, id)=>{
                                                if (index === id) return true;
                                                return value;
                                            })})} 
                                            onMouseLeave={()=>this.setState({hover: this.state.hover.map((value, id)=>{
                                                if (index === id) return false;
                                                return value;
                                            })})} 
                                            style={{cursor: 'pointer'}}
                                            onClick={()=>rootHistory.push(route.path)}
                                            name={index.toString()}
                                            className={`text-${route.color} ` + (this.state.hover[index]?"animated pulse":"")}>
                                                <span style={{float: 'left'}}>Xem chi tiết!</span>
                                                <span style={{float: 'right'}}>
                                                    <MDBIcon icon="arrow-circle-right" />
                                                </span>
                                        </MDBCardFooter>
                                    </MDBCard>
                                </div>
                            ))}
                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>
            </Fragment>
        )
    }
}
