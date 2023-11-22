import axios from 'axios';

const API_KEY = '1719842-829ac206ae49bf14fe6b0938c';

const fetchImages = async (searchQuery, page) => {
  const responce = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return responce.data;
};

export default fetchImages;
