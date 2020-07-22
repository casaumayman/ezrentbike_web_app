import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListFeedback } from 'store/utils/action';
import Card from 'containers/Card';
import Table from 'containers/Table';
import { Empty } from 'antd';

class FeedbackManager extends Component {
    state = {
        data: {
            columns: [
                {
                    label: 'STT',
                    field: 'index'
                },
                {
                    label: 'Tên tài khoản',
                    field: 'username'
                },
                {
                    label: 'Tên người dùng',
                    field: 'name'
                },
                {
                    label: 'Nội dung phản hồi',
                    field: 'content'
                }
            ],
            rows: []
        }
    }
    componentWillMount() {
        const body = {
            username: this.props.user.username,
        }
        this.props.getListFeedback(body);
    }
    componentWillReceiveProps(nextProps){
        let list = nextProps.feedbacks.map((feedback, index) => ({
            index: index,
            username: feedback.account.username,
            name: feedback.account.name,
            content: feedback.content
        }));
        this.setState({
            data: {...this.state.data, rows: list}
        });
    }
    render() {
        document.title = "Quản lí phản hồi";
        return (
            <div style={{ marginTop: '20px' }}>
                <Card header="Quản lý phản hồi">
                    {this.state.data.rows.length!==0?<Table data={this.state.data} caption="Danh sách phản hồi"></Table>:<Empty></Empty>}
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authen,
    feedbacks: state.services.listFeedback
});
const mapDispatchToProps = ({
    getListFeedback: getListFeedback
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackManager);