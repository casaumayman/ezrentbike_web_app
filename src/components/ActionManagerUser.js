import React, { Component, Fragment } from 'react';
import {MDBTooltip, MDBBtn, MDBIcon} from 'mdbreact';

export default class ActionManagerUser extends Component {
    onClickHandle = () => {
        this.props.dataOut("hehe");
    }
    render() {
        return (
            <Fragment>
                <MDBTooltip placement="bottom">
                    <MDBBtn color="warning">
                        <MDBIcon icon="edit" />
                    </MDBBtn>
                    <div>
                        Chỉnh sửa
                    </div>
                </MDBTooltip>
                <MDBTooltip placement="bottom">
                    <MDBBtn onClick={this.onClickHandle} color="danger">
                        <MDBIcon icon="trash-alt" />
                    </MDBBtn>
                    <div>Xóa</div>
                </MDBTooltip>
            </Fragment>
        )
    }
}
