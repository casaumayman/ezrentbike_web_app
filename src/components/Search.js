import React, { Component } from 'react';
import { MDBBtn } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { AutoComplete } from 'antd';
import { rootHistory } from 'App';

class Search extends Component {
    state = {
        source: [],
        name: ''
    }
    onHandleChange = value => {
        let list =value?this.props.products.map(product => product.name).filter(item => item.toLowerCase().indexOf(value.toLowerCase())!==-1):[];
        this.setState({
            name: value,
            source: list
        });
    }
    onSubmit = () => {
        rootHistory.push('/search', {
            value: this.state.name
        });
    }
    onSelect = value => {
        this.setState({name: value});
    }
    render() {
        //console.log(this.state.name);
        return (
            <div className='card' style={{ margin: '20px 10px' }}>
                <div className="card-header bg-primary text-white">
                    Tìm kiếm
                </div>
                <div className="card-body">
                    <AutoComplete
                        placeholder="Nhập tên xe"
                        dataSource={this.state.source}
                        onSearch={this.onHandleChange}
                        onSelect={this.onSelect}
                        style={{width: '100%'}}
                    >
                    </AutoComplete>
                </div>
                <div className='card-footer' style={{ textAlign: 'center' }}>
                    <MDBBtn onClick={this.onSubmit} color='primary'><FontAwesomeIcon icon='search'></FontAwesomeIcon> Tìm kiếm</MDBBtn>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.products
})

export default connect(mapStateToProps, null)(Search);