 import { Overlay,ImgWrap ,Img } from './modal.styled';
import { Component } from 'react';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');


export class ModalWindow extends Component {

    render() {
        const {largeImageUrl, tags, closeModal, isModalOpen } = this.props
        return (
            <Overlay onClick={closeModal}>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customStyles}
              contentLabel="Example Modal">

              
             <ImgWrap>
                    <Img  src={largeImageUrl} alt={tags} />
            </ImgWrap> 
                </Modal>
              </Overlay>  
        )
    }
}

