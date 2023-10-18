import {ImageGalleryItemS, ImageGalleryItemImage} from './imageGalleryItem.styled'

export const ImageGalleryItem =({src,onSelectedImg,openModal,tags,largeImageURL }) => {
      return (
        <ImageGalleryItemS onClick={openModal}>
          <ImageGalleryItemImage src={src} alt={tags}
            onClick={() => onSelectedImg(largeImageURL,tags)} />
  
        </ImageGalleryItemS>
      );
    };
  