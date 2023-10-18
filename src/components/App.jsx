import { useEffect, useState } from "react";
import { SearchBar } from "./searchBar/searchBar";
import { fetchImages } from './fetchAPI';
import { ImageGallery } from './imageGallery/imageGallery';
import { Loader } from './loader/loader';
import { LoadMoreBtn } from './loadMoreBtn/loadMoreBtn';
import toast, { Toaster } from 'react-hot-toast';
import { ModalWindow } from './modal/modal';


export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line 
  const [error, setError] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState(null);
  const [tags, setTags] = useState(null);



  useEffect(() => {
      async function getImages() {
        if (
          query === ''
        ) {
          return;
        }
        try {
          setError(false);
          setLoading(true);
          const data = await fetchImages(query, page);
          toast.success('Successfully created!');
          setImages(prevState => [...prevState, ...data.hits]);
          setTotalPage(Math.ceil(data.totalHits / 12));
        } catch (error) {
          toast.error(`This is an error!`);
        } finally {
          setLoading(false);
        }
      }
      getImages()
    
}, [query, page])

 const handleSubmit = value => {
    setQuery(value);
    if (query === value) {
      return;
    } else {
      setImages([]);
      setPage(1)
    }
  }
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  
  const onSelectedImg = (largeImageUrl, tags) => {
    setLargeImageUrl(largeImageUrl);
    setTags(tags);
  };

  const openModal = () => {
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLargeImageUrl(null);
    setTags(null);
  };
 console.log(page);
  return (
    <div>
      <SearchBar handleSubmit={handleSubmit} />
        {images.length > 0 &&  (<ImageGallery images={images}
          onSelectedImg={onSelectedImg}
          openModal={openModal} />)}
      <Toaster />
      {loading && <Loader />}
      {images.length > 0 && page !== totalPage &&
        (<LoadMoreBtn onClick={handleLoadMore} />)}
      {largeImageUrl !== null && (<ModalWindow isModalOpen={isModalOpen}
        closeModal={closeModal}
        largeImageUrl={largeImageUrl}
        tags={tags}
      />)}
    </div>
  );
}





