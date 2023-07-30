import React, { Component } from 'react';
import { Fragment } from 'react';
const Star = ({ starId, marked }) => {
    return (
        <span

            star-id={starId}
            role="button"
            style={{ color: "#ff9933", cursor: "pointer" }}
        >
            {marked ? "\u2605" : "\u2606"}
        </span>
    );

};
class ShowStar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.star,
            // key: 0
        }
    }
    showStar = () => {


        return (
            <div

            // onMouseOver={this.hoverOver}
            // onMouseOut={() => this.hoverOver(null)}
            // onClick={event => this.setRating(event.target.getAttribute("star-id"))}
            >
                {
                    Array.from({ length: 5 }, (v, i) => (
                        <Star key={i + 1} starId={i + 1} marked={this.state.rating > i} />
                    ))
                }
            </div>
        )

    }
    render() {

        return (
            <Fragment>
                {this.showStar()}
            </Fragment>
        )
    }
}

export default ShowStar;