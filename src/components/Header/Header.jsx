import React from 'react';
import css from './Header.module.scss';
import { ReactComponent as LogoIcon } from '../../assets/icons/search-svgrepo-com.svg';
import Searchbar from 'components/Searchbar';

function Header({ handleSubmit }) {
  return (
    <div className={css.appHeader}>
      <div className={`${css.container} container`}>
        <a className={css.logo} href="/">
          <LogoIcon width="36px" height="36px" fill="var(--yellow)" />
          <p className={css.txt}>
            <span>Image</span>
            <span>Finder</span>
          </p>
        </a>
        <Searchbar handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Header;
