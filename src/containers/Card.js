import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Card extends Component {
    render() {
        return (
            <div className={`card border-${this.props.color}`}>
                <div className={`card-header bg-${this.props.color} text-white`}>
                    {this.props.header}
                </div>
                <div className="card-body">
                    {this.props.children}
                </div>
                {(this.props.footer)?(
                    <div className="card-footer">
                        {this.props.footer}
                    </div>
                ):("")}
            </div>
        )
    }
}

Card.propTypes = {
    color: PropTypes.oneOf(["primary", "info", "danger", "warning", "secondary", "dark", "success"]).isRequired,
    header: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]).isRequired,
    children: PropTypes.element.isRequired,
    footer: PropTypes.element
};
Card.defaultProps = {
    color: "primary"
}

export default Card;
