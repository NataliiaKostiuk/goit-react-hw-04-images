import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '39125221-1f7d496f02856d1b2d986a210';

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

