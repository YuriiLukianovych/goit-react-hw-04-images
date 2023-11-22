import { useState, useEffect } from 'react';
import css from './App.module.scss';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import fetchImages from './services/api';
import Notification from 'components/Notification';

import React from 'react';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [galleryList, setGalleryList] = useState([]);
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const getImages = async () => {
      try {
        setIsLoading(true);
        const images = await fetchImages(searchQuery, page);

        setGalleryList(s => [...s, ...images.hits]);
        setTotalHits(images.totalHits);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [searchQuery, page]);

  const openModal = largeImageURL => {
    setIsModalVisible(true);
    setSelectedImageURL(largeImageURL);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedImageURL(null);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const searchQueryInput = e.target.elements.search.value;

    if (searchQuery === searchQueryInput) {
      return;
    }

    setSearchQuery(searchQueryInput);
    setGalleryList([]);
    setPage(1);
    setError(null);

    // e.target.reset();
  };

  const loadMore = () => {
    setPage(s => s + 1);
  };

  const isLoadMoreButtonVisible = page < Math.ceil(totalHits / 12);
  const areImages = galleryList.length ? true : false;
  const nothingFound = !totalHits && searchQuery && !isLoading;

  return (
    <div className={css.app}>
      <Header handleSubmit={handleSubmit} />
      <div className={css.appBody}>
        <div className={`${css.container} container`}>
          {/* Image Gallery */}
          {areImages && !error && (
            <ImageGallery images={galleryList} onOpenModal={openModal} />
          )}

          {/* Error Div */}
          {error && <Notification status="error" message={error.message} />}

          {/* Nothing Found */}
          {nothingFound && (
            <Notification
              status="warning"
              message="Nothing was found for your request. Please enter another request."
            />
          )}

          {/* Loader */}
          {isLoading && <Loader />}

          {/* Button */}
          {areImages && !error && (
            <Button onClick={loadMore} disabled={!isLoadMoreButtonVisible} />
          )}
        </div>
      </div>
      <Footer />
      {isModalVisible && (
        <Modal imageURL={selectedImageURL} onCloseModal={closeModal} />
      )}
    </div>
  );
}

export default App;
