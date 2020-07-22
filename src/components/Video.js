import React, { Component } from 'react';
import {MDBIframe} from 'mdbreact';

export default class Video extends Component {
    render() {
        return (
            <div className='card' style={{ margin: '20px 10px', padding: '1px' }}>
                <div className="card-header bg-success text-white">
                    Video giới thiệu
                </div>
                <div className="card-body">
                    <MDBIframe src="https://www.youtube.com/embed/9MwV7Rz-BQs" />
                </div>
            </div>
        )
    }
}
