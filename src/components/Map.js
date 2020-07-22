import React, { Component } from 'react';
import {MDBIframe} from 'mdbreact';

export default class Map extends Component {
    render() {
        return (
            <div className='card' style={{ margin: '20px 10px', padding: '1px' }}>
                <div className="card-header bg-primary text-white">
                    Địa chỉ
                </div>
                <div className="card-body">
                    <MDBIframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.5627165033602!2d106.71332961120895!3d10.801703970000128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a501281b1f%3A0x6f43044e459b3132!2zNDc1YSDEkGnhu4duIEJpw6puIFBo4bunLCBQaMaw4budbmcgMjUsIELDrG5oIFRo4bqhbmgsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1557942318233!5m2!1svi!2s" />
                </div>
            </div>
        )
    }
}
