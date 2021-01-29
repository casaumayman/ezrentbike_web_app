import React, { Component } from 'react'
import { Alert, Carousel } from 'antd'
import { EventCarouselItem } from 'components/EventCarouselItem'
import { callApi } from 'services/apiService'
import { toast } from 'react-toastify'
import moment from 'moment'

export default class Sale extends Component {
    state = {
        events: [],
    }
    async componentDidMount() {
        try {
            let data = await callApi('event/list-event')
            data = data.filter(
                event =>
                    moment(event.endTime).isSameOrAfter(moment()) &&
                    moment(event.startTime).isSameOrBefore(moment())
            )
            this.setState({ events: data })
        } catch (err) {
            toast.error('Lỗi: ' + err.message)
        }
    }
    render() {
        document.title = 'Khuyến mãi'
        if (this.state.events && this.state.events.length > 0)
            return (
                <div style={{ position: 'fixed', width: '1129px' }}>
                    <Carousel autoplay>
                        {this.state.events.map(event => (
                            <EventCarouselItem event={event} />
                        ))}
                    </Carousel>
                </div>
            )
        else
            return (
                <Alert
                    message="Chưa có khuyến mãi"
                    description="Bạn vui lòng quay lại sau!"
                    type="warning"
                    showIcon
                />
            )
    }
}
