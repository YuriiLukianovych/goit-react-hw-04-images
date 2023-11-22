import React from 'react';
import css from './ImageGalleryItem.module.scss';

function ImageGalleryItem({ image, onOpenModal }) {
  const { webformatURL, largeImageURL, tags } = image;
  return (
    <li className={css.galleryItem} onClick={() => onOpenModal(largeImageURL)}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
}

export default ImageGalleryItem;
