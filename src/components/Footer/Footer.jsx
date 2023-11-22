import React from 'react';
import css from './Footer.module.scss';

function Footer() {
  return (
    <div className={css.appFooter}>
      <div className={`${css.container} container`}>
        <div className={css.sign}>
          <a
            className={css.footerLink}
            href="https://goit.global/ua/"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            GoIT
          </a>
          <span>2023</span>
        </div>
        <div className={css.sign}>
          <span>Developed by:</span>
          <a
            className={css.footerLink}
            href="https://github.com/YuriiLukianovych"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Yurii Lukianovych
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
