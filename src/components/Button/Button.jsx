import React from 'react';
import css from './Button.module.scss';

function Button({ onClick, disabled }) {
  return (
    <button
      className={css.btn}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      Load more
    </button>
  );
}

export default Button;
