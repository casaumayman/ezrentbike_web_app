import React, { Component } from 'react';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBCarouselCaption } from 'mdbreact';
import { rootHistory } from 'App';
import baseURL from 'services/BaseURL';

export default class Slider extends Component {
    state = {
        products: []
    }
    componentWillMount() {
        this.setState({
            products: this.props.products
        });
    }
    render() {
        const length = this.state.products.length;
        const items = this.state.products.slice(length-4, length).map((product, index) => (
            <MDBCarouselItem key={product.id} itemId={index+1}>
                <MDBView>
                    <img
                        className="d-block w-100"
                        height="550px"
                        src={baseURL.backEndURLImage + `${product.image}`}
                        alt="slide item"
                    />
                    <MDBMask overlay="black-light"></MDBMask>
                </MDBView>
                <MDBCarouselCaption>
                    <h3 style={{cursor: 'pointer'}} className="h3-responsive text-white" onClick={()=>rootHistory.push(`/product/${product.id}`)}>{product.name}</h3>
                    <p>{product.producer.name}</p>
                </MDBCarouselCaption>
            </MDBCarouselItem>
        ));
        //console.log(this.state.products.slice(0, 3));
        return (
            <MDBCarousel
                activeItem={1}
                length={4}
                showControls={true}
                showIndicators={true}
                className="z-depth-1"
                //style={{height: '550px'}}
            >
                <MDBCarouselInner>
                    {items}
                </MDBCarouselInner>
            </MDBCarousel>
        )
    }
}
