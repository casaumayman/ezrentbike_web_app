import React, { Component } from 'react';
import {MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter} from 'mdbreact';
import PropTypes from 'prop-types';

export default class Modal extends Component {
    render() {
        return (
            <MDBModal style={{pointerEvents: 'none'}} size={this.props.size} isOpen={this.props.isOpen} toggle={this.props.toggle}>
                {this.props.title && <MDBModalHeader toggle={this.toggle}>{this.props.title}</MDBModalHeader>}
                <MDBModalBody>
                    {this.props.children}
                </MDBModalBody>
                {this.props.footer &&
                    <MDBModalFooter>
                        {this.props.footer}
                    </MDBModalFooter>
                }
            </MDBModal>
        )
    }
}

Modal.propTypes = {
    size: PropTypes.oneOf(["lg", "sm", "fluid", "medium"]),
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    footer: PropTypes.element,
    children: PropTypes.element.isRequired
}