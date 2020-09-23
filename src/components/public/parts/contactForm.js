import React, { Component } from 'react';
import { ContactFormInput } from './contact-form/ContactFormInput';
import { ContactFormSubmit } from './contact-form/ContactFormSubmit';
import { ContactFormAgreeLink } from './contact-form/ContactFormAgreeLink';
import { ModalGallery } from './modal_blocks/ModalGallery';


export default class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            modalVisible: false
        }
    }

    handleSubmit = () => {
        this.setState({modalVisible: !this.state.modalVisible});
        
    }

    render() {
        return (
            <div className="contact-form contact-form_main">
                
                <ModalGallery visible={this.state.modalVisible} handleToggle={this.handleSubmit} images={images}/>
                <div className="col">
                    <div className="contact-form__title-wrapper">
                        <div className="contact-form-title">Есть вопросы — спрашивайте!</div>
                        <div className="contact-form-subtitle">Вы можете задать вопрос по работе магазина или спросить о интересующем вас товаре. <br/>Наши специалисты вам помогут</div>
                    </div>
                    <div className="row">
                        
                        <ContactFormInput 
                            type="text"
                            placeholder="Имя"
                            label={"Имя"}
                            onChange={(value) => console.log('value',value)}
                            width={4}
                        />
                        <ContactFormInput 
                            type="tel"
                            placeholder="+7 (XXX) XXX - XX - XX"
                            label={"Телефон"}
                            onChange={(value) => console.log('value',value)}
                            width={4}
                        />
                       <ContactFormInput 
                            type="email"
                            placeholder="E-mail"
                            label={"E-mail"}
                            onChange={(value) => console.log('value',value)}
                            width={4}
                        />
                        
                    </div>
                    <div className="row">
                             <ContactFormInput 
                                type="text"
                                placeholder=""
                                label={"Что вас заинтересовало?"}
                                onChange={(value) => console.log('value',value)}
                                width={8}
                            />
                            <ContactFormInput 
                                type="text"
                                placeholder="9 + 4 ="
                                label={"Проверочный код"}
                                onChange={(value) => console.log('value',value)}
                                width={4}
                            />
                    </div>
                </div>
                <ContactFormAgreeLink link=""/>
                <div className="row">
                    <ContactFormSubmit 
                        title="Отправить"
                        onClick={this.handleSubmit}
                    />
                </div>
            </div>
        )
    }
}

const images = [
    "https://i.pinimg.com/originals/61/e7/8b/61e78b08a8dd18779132812218a9f2a8.jpg",
    "https://storge.pic2.me/upload/739/524aab17af4ad.jpg",
    "https://lh3.googleusercontent.com/proxy/JB1bptpUpxIZ4TsO4_fUsqVEwXs6Dcbjvk0dTWgXucgaB-SXQgntSf9B_NufChP0hlnqVrSWbrzOUuxaKKEYHUAIRc1WwFA",
]
