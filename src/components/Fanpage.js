import React, { Component } from 'react'

export default class Fanpage extends Component {
    render() {
        return (
            <div className='card' style={{ margin: '20px 10px', padding: '1px' }}>
                <div className="card-header bg-info text-white">
                    Fanpage
                </div>
                <div className="card-body">
                    {/* <div className="fb-page" data-href="https://www.facebook.com/thuexemaytphcm/" data-tabs="" data-width="" data-height="200px" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/thuexemaytphcm/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/thuexemaytphcm/">THUÊ XE MÁY HCM</a></blockquote></div> */}
                    {/* <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Folympicithutech%2F&tabs=timeline&width=340&height=200&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width={400} height={200} style={{border: 'none', overflow: 'hidden'}} scrolling="no" title="hehe" frameBorder={0} allowTransparency="true" allow="encrypted-media" /> */}
                    <iframe title="fanpage" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fthuexemaythanhphat%2F&tabs=timeline&width=340&height=200&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" width={340} height={200} style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameBorder={0} allow="encrypted-media" />
                </div>
            </div>
        )
    }
}
