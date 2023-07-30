
import React, { Component } from 'react';



class ScrollToggleMenu extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.toggles = [];
    this.listRef = React.createRef();
    this.listItems = [];
    this.scrollValue = 0;
  }

  componentDidMount() {
    this.toggles = this.containerRef.current.querySelectorAll('.scroll-toggle__button');
    this.listRef = this.containerRef.current.querySelector('.scroll-toggle__list');
    this.listItems = this.listRef.querySelectorAll('.scroll-toggle__list-item');

    this.toggles.forEach(toggle => {
      toggle.addEventListener('mousedown', this.handleMouseDown);
      toggle.addEventListener('mouseup', this.handleMouseUp);
    });
  }

  componentWillUnmount() {
    this.toggles.forEach(toggle => {
      toggle.removeEventListener('mousedown', this.handleMouseDown);
      toggle.removeEventListener('mouseup', this.handleMouseUp);
    });
  }

  move = (target) => {
    if (target.classList.contains('scroll-toggle__button--right')) {
      this.interval = setInterval(() => {
        this.listRef.scrollLeft += 1;
      }, 1);
    } else {
      this.interval = setInterval(() => {
        this.listRef.ScrollLeft = this.scrollValue;
        this.listRef.scrollLeft -= 1;
      }, 1);
    }
  }

  stop = () => {
    if (this.listRef.scrollLeft > 0) {
      this.scrollValue = this.listRef.scrollLeft;
    }
    clearInterval(this.interval);
  }

  handleMouseDown = (e) => {
    this.move(e.target);
  }

  handleMouseUp = () => {
    this.stop();
  }

  render() {
    return (
      <div className="scroll-toggle" ref={this.containerRef}>

        {this.props.formMenuToggle}

      </div>
    );
  }
}

export default ScrollToggleMenu;
