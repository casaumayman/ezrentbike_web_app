import React, { Component } from 'react';
import quangcao from '../assets/quangcao.jpg';

export default class Advertisement extends Component {
    render() {
        return (
            <div className='card' style={{ margin: '20px 10px', padding: '1px' }}>
                <div className="card-header bg-info text-white">
                    Đối tác của chúng tôi
                </div>
                <div className="card-body">
                    <img src={quangcao} alt="quang cao" style={{width: '100%'}}></img>
                </div>
            </div>
        )
    }
}
