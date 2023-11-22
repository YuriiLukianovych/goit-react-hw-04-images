import React, { Component } from 'react';
import css from './Modal.module.scss';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscapeKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscapeKeyPress);
  }

  onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  onEscapeKeyPress = e => {
    if (e.key === 'Escape') {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.onOverlayClick}>
        <div className={css.modal}>
          <img src={this.props.imageURL} alt="" />
        </div>
      </div>
    );
  }
}
