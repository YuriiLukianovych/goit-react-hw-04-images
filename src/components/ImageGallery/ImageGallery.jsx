import React from 'react';
import css from './ImageGallery.module.scss';
import ImageGalleryItem from 'components/ImageGalleryItem';

function ImageGallery({ images, onOpenModal }) {
  return (
    <ul className={`${css.galleryList} list`}>
      {images.map(img => {
        return (
          <ImageGalleryItem
            key={img.id}
            image={img}
            onOpenModal={onOpenModal}
          />
        );
      })}
    </ul>
  );
}

export default ImageGallery;
