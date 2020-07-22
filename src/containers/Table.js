import React, { Component } from 'react'
import { MDBInput } from 'mdbreact';
import PropTypes from 'prop-types';
import { MDBIcon } from 'mdbreact';

class Table extends Component {
    static propTypes = {
        color: PropTypes.string,
        data: PropTypes.any.isRequired,
        caption: PropTypes.string
    }
    state = {
        pageSize: 10,
        currentPage: 1,
        search: '',
        sort: ' ',
        data: []
    }
    componentWillMount(){
        this.setState({data: this.props.data});
    }
    onFilter = async e => {
        let value = e.target.value;
        await this.setState({ search: value });
    }
    onHandleChange = e => {
        const { name, value } = e.target;
        if (name === "pageSize") this.setState({ [name]: Number(value) });
    }
    onChoosePage = index => {
        this.setState({ currentPage: index });
    }
    onSortData = (field) => {
        let fields = this.state.sort;
        if (typeof (this.state.data.rows[0][field]) !== "string" && typeof (this.state.data.rows[0][field]) !== "number") return;
        if (this.state.sort.substr(0, fields.length - 1) === field && fields[fields.length - 1] === '1') {
            let rows = this.state.data.rows;
            if (isNaN(Number(this.state.data.rows[0][field]))) {
                rows.sort((a, b) => (b[field]).localeCompare(a[field]));
            } else rows.sort((a, b) => Number(b[field]) - Number(a[field]));
            this.setState({ data: { ...this.state.data, rows: rows }, sort: `${field}2` });
        } else {
            let rows = this.state.data.rows;
            if (isNaN(Number(this.state.data.rows[0][field]))) {
                rows.sort((a, b) => (a[field]).localeCompare(b[field]));
            } else rows.sort((a, b) => Number(a[field]) - Number(b[field]));
            this.setState({ data: { ...this.props.data, rows: rows }, sort: `${field}1` });
        }
    }
    render() {
        let newRows = this.state.data.rows.filter(value => {
            let keys = Object.keys(value);
            for (let i = 0; i < keys.length; i++) {
                const element = value[keys[i]];
                if (typeof (element) === 'string' || typeof (element) === 'number') {
                    if (element.toString().toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) {
                        return true;
                    }
                }
            }
            return false;
        });
        const pagination = [];
        const { columns } = this.state.data;
        let maxPage = Math.floor(newRows.length / this.state.pageSize);
        if (newRows.length % this.state.pageSize !== 0) maxPage++;
        const { pageSize, currentPage } = this.state;
        const rows = newRows.slice((currentPage - 1) * pageSize, Math.min((currentPage - 1) * pageSize + pageSize, newRows.length));
        for (let i = 0; i < maxPage; i++) {
            pagination.push((
                <li key={i}
                    style={{ cursor: 'pointer' }}
                    className={`page-item ` + (this.state.currentPage === (i + 1) ? "active" : "")}
                    onClick={() => this.onChoosePage(i + 1)}
                >
                    <span className="page-link">
                        {i + 1}
                    </span>
                </li>
            ));
        }
        return (
            <div>
                <div className="row">
                    <div className="col-6" style={{ textAlign: "left", margin: 'auto' }}>
                        <div className="form-inline">
                            Hiển thị
                            <select className="browser-default custom-select"
                                value={this.state.pageSize.toString()}
                                style={{ marginLeft: '10px', marginRight: '10px' }}
                                name="pageSize"
                                onChange={this.onHandleChange}
                            >
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            dòng
                        </div>
                    </div>
                    <div className="col-3"></div>
                    <div className="col-3" style={{ float: "right" }}>
                        <MDBInput value={this.state.search} onChange={this.onFilter} icon="search" labelClass="test" label="Tìm kiếm"></MDBInput>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <table className="table table-hover table-bordered" >
                            <thead className="table-primary">
                                <tr>
                                    {columns.map((value, index) => (
                                        <th
                                            style={{
                                                fontWeight: 'bold',
                                                textAlign: 'center',
                                                cursor: ((value.field !== 'action') ? "pointer" : "")
                                            }}
                                            key={index}
                                            scope="col"
                                            onClick={() => this.onSortData(value.field)}
                                        >
                                            {value.label}
                                            {(value.field !== 'action') ? (
                                                (this.state.sort.substr(0, this.state.sort.length - 1) !== value.field ? (<MDBIcon icon="sort" style={{ float: 'right' }} />) : (
                                                    (this.state.sort[this.state.sort.length - 1] === '1') ? (<MDBIcon style={{ float: 'right' }} icon="sort-up" />) : (
                                                        <MDBIcon style={{ float: 'right' }} icon="sort-down" />
                                                    )
                                                ))
                                            ) : ""}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((value, index) => (
                                    <tr key={index}>
                                        {Object.keys(value).map((key,index) => {
                                            if (key === "action") return <td key={index} style={{ textAlign: 'center' }}>{value.action}</td>
                                            else if (key === "index") return <th key={index} scope="row" style={{ fontWeight: 'bold', verticalAlign: "middle", textAlign: 'center' }}>{value.index + 1}</th>
                                            else return <td key={index} style={{ fontWeight: 'normal', verticalAlign: 'middle', textAlign: 'center' }}>{value[key]}</td>
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">{this.props.caption}</div>
                    <div className="col-3"></div>
                    <div className="col-3">
                        <ul className="pagination justify-content-end">
                            <li onClick={() => this.setState({ currentPage: currentPage - 1 })} className={`page-item ` + (this.state.currentPage === 1 ? "disabled" : "")} style={{ cursor: 'pointer' }}>
                                <span className="page-link">Previous</span>
                            </li>
                            {pagination}
                            <li onClick={() => this.setState({ currentPage: currentPage + 1 })} className={`page-item ` + (this.state.currentPage === maxPage ? "disabled" : "")} style={{ cursor: 'pointer' }}>
                                <span className="page-link">Next</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

Table.defaultProps = {
    color: "primary",
    caption: ""
}

export default Table;