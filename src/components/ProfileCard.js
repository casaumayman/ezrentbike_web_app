import React, { Component } from 'react'
import Card from 'containers/Card';
import { Table, Spin, Tag } from 'antd';
import moment from 'moment';
import {connect} from 'react-redux';
import { callApi } from 'services/apiService';
import catchError from 'services/catchError';

class ProfileCard extends Component {
    state = {
        currentTime: moment(),
        listLease: []
    }
    componentWillMount(){
        callApi('get-list-lease', 'post', {username: this.props.user.username}, localStorage.getItem('token'))
            .then(listLease => {
                if (listLease instanceof Array)
                this.setState({listLease});
            })
            .catch(err => catchError(err));
    }
    componentDidMount(){
        setInterval(() => {
            this.setState({currentTime: moment()});
        }, 1000);
    }
    numberPrice = (value) => {
        //console.log(value);
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
        const columns = [
            {
                title: 'Tên xe',
                dataIndex: 'name',
                key: 'name',
                align: 'center'
            },
            {
                title: 'Ngày bắt đầu',
                dataIndex: 'startTime',
                align: 'center',
                key: 'startTime',
                render: startTime => {
                    startTime = Number(startTime);
                    return moment(startTime).format("DD-MM-YYYY");
                }
            },
            {
                title: 'Ngày kết thúc',
                dataIndex: 'endTime',
                align: 'center',
                key: 'endTime',
                render: endTime => {
                    return moment(Number(endTime)).format("DD-MM-YYYY");
                }
            },
            {
                title: 'Trạng thái',
                align: 'center',
                key: 'status',
                render: record => {
                    let curr = moment();
                    let start = moment(Number(record.startTime));
                    if (curr.isBefore(start)) return <Tag color="#108ee9">Đang chờ thuê</Tag>
                    else return <Tag color="#f50">Đang thuê</Tag>
                }
            },
            {
                title: 'Tiền thuê',
                align: 'center',
                key: 'cost',
                render: record => {
                    let startTime = Number(record.startTime);
                    let endTime = Number(record.endTime);
                    return <span style={{color: 'red'}}>{this.numberPrice((moment(endTime).diff(moment(startTime), 'days')+1)*record.cost)}</span>;
                }
            },
            {
                title: 'Thời gian còn lại',
                align: 'center',
                key: 'stillTime',
                render: record => {
                    let startTime = Number(record.startTime);
                    let endTime = Number(record.endTime);
                    let duration = moment.duration(moment(startTime).diff(this.state.currentTime));
                    if (duration < 0) duration = moment.duration(moment(endTime).diff(this.state.currentTime));
                    return `${Math.floor(duration.asDays())} ngày ${duration.hours()} giờ ${duration.minutes()} phút ${duration.seconds()} giây`;
                }
            }
        ];
        const dataSource = this.state.listLease.filter(lease => moment(Number(lease.endTime)) > moment()).map(lease => ({
            key: lease.id,
            name: lease.product.name,
            startTime: lease.startTime,
            endTime: lease.endTime,
            cost: lease.product.cost
        })).sort((a, b)=>{
            let starta = Number(a.startTime);
            let startb = Number(b.startTime);
            return (starta - startb);
        });
        return (
            <Card color="info" header="Giỏ hàng">
                {this.state.listLease?(
                    <Table bordered columns={columns} dataSource={dataSource}/>
                ):(
                    <Spin size="large" />
                )}
                
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
  user: state.authen
})

export default connect(mapStateToProps, null)(ProfileCard);