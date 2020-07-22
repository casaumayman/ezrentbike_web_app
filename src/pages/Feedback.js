import React, { Component, Fragment } from 'react';
import image from '../assets/feedbackCover.jpg';
import { connect } from 'react-redux';
import Card from 'containers/Card';
import { Input, Modal, Button } from 'antd';
import { callApi } from 'services/apiService';
import { toast } from 'react-toastify';
import catchError from 'services/catchError';

class Feedback extends Component {
    state = {
        content: '',
        loading: false
    }
    warning = () => {
        Modal.error({
            title: "Chưa đăng nhập",
            content: "Bạn phải đăng nhập để gửi phản hồi!"
        });
    }
    handleSubmit = () => {
        if (this.props.user.username==='') this.warning();
        else {
            let body = {
                username: this.props.user.username,
                content: this.state.content
            }
            this.setState({loading: true});
            callApi('feedback/add-feedback', 'post', body, localStorage.getItem('token'))
                .then(res => {
                    toast.success('Cảm ơn bạn đã gửi phản hồi cho chúng tôi!');
                })
                .catch(err => catchError(err))
                .finally(()=>{
                    this.setState({
                        content: '',
                        loading: false
                    });
                });
        }
    }
    render() {
        document.title = "Phản hồi";
        return (
            <>
                <div style={{marginBottom: '25px'}} className="text-center">
                    <img alt="feedback cover" src={image} />   
                </div>
                <Card color="info" header="THÔNG TIN PHẢN HỒI">
                    <Fragment>
                        <h5>Nhập nội dung phản hồi: </h5>
                        <Input.TextArea value={this.state.content} onChange={(e)=>this.setState({content: e.target.value})} rows={6}>
                        </Input.TextArea>
                        <div className="clear-fix">
                            <Button 
                                onClick={this.handleSubmit}
                                style={{
                                    float: 'right', 
                                    marginTop: '10px',
                                }} 
                                size="large" 
                                icon="arrow-right"
                                type="primary"
                                loading={this.state.loading}
                            >
                                Gửi phản hồi
                            </Button>
                        </div>
                    </Fragment>
                </Card>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authen
});

export default connect( mapStateToProps, null )(Feedback);