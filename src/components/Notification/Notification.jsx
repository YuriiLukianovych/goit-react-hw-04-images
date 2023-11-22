import React from 'react';
import css from './Notification.module.scss';

function Notification({ status, message }) {
  return <div className={css.notification + ' ' + css[status]}>{message}</div>;
}

export default Notification;
