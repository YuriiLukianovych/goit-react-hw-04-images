import { useEffect } from 'react';
import css from './Modal.module.scss';

import React from 'react';

function Modal({ imageURL, onCloseModal }) {
  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const onEscapeKeyPress = e => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', onEscapeKeyPress);

    return () => {
      window.removeEventListener('keydown', onEscapeKeyPress);
    };
  }, [onCloseModal]);

  return (
    <div className={css.overlay} onClick={onOverlayClick}>
      <div className={css.modal}>
        <img src={imageURL} alt="" />
      </div>
    </div>
  );
}

export default Modal;
