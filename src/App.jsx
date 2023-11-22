import React, { Component } from 'react';
import css from './App.module.scss';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Modal from 'components/Modal';
import fetchImages from './services/api';
import Notification from 'components/Notification';

export default class App extends Component {
  state = {
    isModalVisible: false,
    isLoading: false,
    galleryList: null,
    selectedImageURL: null,
    searchQuery: null,
    page: 1,
    totalHits: 0,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.state.searchQuery &&
        prevState.searchQuery !== this.state.searchQuery) ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  openModal = largeImageURL => {
    this.setState({
      isModalVisible: true,
      selectedImageURL: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      isModalVisible: false,
      selectedImageURL: null,
    });
  };

  getImages = async () => {
    const { searchQuery, page, galleryList } = this.state;

    try {
      this.setState({
        isLoading: true,
      });
      const images = await fetchImages(searchQuery, page);

      if (galleryList) {
        this.setState(prevState => {
          return {
            galleryList: [...prevState.galleryList, ...images.hits],
            totalHits: images.totalHits,
          };
        });
      } else {
        this.setState({
          galleryList: images.hits,
          totalHits: images.totalHits,
        });
      }
    } catch (error) {
      this.setState({
        error,
      });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchQueryInput = e.target.elements.search.value;

    if (this.state.searchQuery === searchQueryInput) {
      return;
    }
    this.setState({
      searchQuery: searchQueryInput,
      galleryList: null,
      page: 1,
      error: null,
    });

    // e.target.reset();
  };

  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const {
      totalHits,
      page,
      galleryList,
      error,
      isLoading,
      isModalVisible,
      selectedImageURL,
    } = this.state;

    const isLoadMoreButtonVisible = page < Math.ceil(totalHits / 12);
    const areImages = galleryList && galleryList.length ? true : false;
    const nothingFound = galleryList && galleryList.length === 0;

    return (
      <div className={css.app}>
        <Header handleSubmit={this.handleSubmit} />
        <div className={css.appBody}>
          <div className={`${css.container} container`}>
            {/* Image Gallery */}
            {areImages && !error && (
              <ImageGallery images={galleryList} onOpenModal={this.openModal} />
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
              <Button
                onClick={this.loadMore}
                disabled={!isLoadMoreButtonVisible}
              />
            )}
          </div>
        </div>
        <Footer />
        {isModalVisible && (
          <Modal imageURL={selectedImageURL} onCloseModal={this.closeModal} />
        )}
      </div>
    );
  }
}
