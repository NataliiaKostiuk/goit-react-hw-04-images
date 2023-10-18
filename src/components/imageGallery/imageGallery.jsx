import { ImageGalleryItem } from '../imageGalleryItem/imageGalleryItem';
import {ImageGalleryList} from './imageGallery.styled'

export const ImageGallery = ({ images,onSelectedImg,openModal }) => {
    return (
        <ImageGalleryList> 
            {images.map(({ id, webformatURL,tags,largeImageURL}) => {
        return (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            tags={tags}
            onSelectedImg={onSelectedImg}
            openModal={openModal}
            largeImageURL={largeImageURL}
          />
        );
      })}
        </ImageGalleryList>
    )    
    
};
