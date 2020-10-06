import React, { Component } from 'react';
import { ContactFormInput } from '../contact-form/ContactFormInput';
import { ContactFormSubmit } from '../contact-form/ContactFormSubmit';
import { ModalFrame } from '../modal/ModalFrame';
import { ContactFormAgreeLink } from '../contact-form/ContactFormAgreeLink';
import { Gallery } from '../gallery';


export class ModalGallery extends Component {
    constructor(props) {
        super(props);

    }
    

    render() {
        
        return (
            <ModalFrame visible={this.props.visible} handleToggle={this.props.handleToggle} className={'modal-frame-gallery'}>
                <Gallery images={this.props.images} currentImage={this.props.currentImage}/>
            </ModalFrame>
        )
    }
}

