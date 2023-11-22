import React from 'react';
import css from './Searchbar.module.scss';
import { BsSearch } from 'react-icons/bs';

function Searchbar({ handleSubmit }) {
  return (
    <form className={css.searchForm} onSubmit={e => handleSubmit(e)}>
      <button className={css.searchBtn} type="submit">
        <BsSearch className={css.searchIcon} />
      </button>
      <input
        className={css.searchInput}
        type="text"
        name="search"
        placeholder="Search images and photos"
      />
    </form>
  );
}

export default Searchbar;
