import { Component } from "react";
import { SearchBar } from "./searchBar/searchBar";
import { fetchImages } from './fetchAPI';
import { ImageGallery } from './imageGallery/imageGallery';
import { Loader } from './loader/loader';
import { LoadMoreBtn } from './loadMoreBtn/loadMoreBtn';
import toast, { Toaster } from 'react-hot-toast';
import { ModalWindow } from './modal/modal';


export class App extends Component {
  state = {
    query: '',
    page: 42,
    images: [],
    loading: false,
    error: false,
    totalPage: 0,
    isModalOpen: false,
    largeImageUrl: null,
    tags:null,
   
  };
  handleSubmit = value => {
        this.setState({query: value });
     if (this.state.query === value) {
       return;
     } else {
       this.setState({
         images: [],
         page:1,
       })
     }
    }
   
 handleLoadMore = () => {
   this.setState(prevState => ({
    page: prevState.page + 1,
   }));
  };

 async componentDidUpdate(_, prevState) {  
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      
    try {
     this.setState({ loading: true, error: false });
     const data = await fetchImages(this.state.query, this.state.page);
     toast.success('Successfully created!');
     this.setState(prev => (
      {images: [...prev.images, ...data.hits],
       totalPage: (Math.ceil(data.totalHits / 12)),
          }
        ));
      } catch (error) {
        toast.error('This is an error!');
      } finally {
      this.setState({ loading: false });
     }
    }
  }

   onSelectedImg = (largeImageUrl, tags) => {
    this.setState({
      largeImageUrl: largeImageUrl,
      tags: tags,
    });
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      largeImageUrl: null,
      tags:null,
    });
  };
 
  render() {
    console.log(this.state);
    return (
      <div>
        <SearchBar handleSubmit={this.handleSubmit} />
        {this.state.images.length > 0 &&
          (<ImageGallery images={this.state.images}
            onSelectedImg={this.onSelectedImg}
        openModal={this.openModal}  />)}
        <Toaster/>
        {this.state.loading && <Loader />}
        {this.state.images.length > 0 && this.state.page !== this.state.totalPage &&
          (<LoadMoreBtn onClick={this.handleLoadMore} />)} 
        {this.state.largeImageUrl !== null && (<ModalWindow isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          largeImageUrl={this.state.largeImageUrl}
          tags={this.state.tags}
        />)}
      </div>
    );
  }
}
