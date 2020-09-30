import React, {Component} from 'react';

import { CategoriesContext } from '../../services/contexts';
import { FooterGroup } from './parts/footer/FooterGroup';
import { FooterCatalog } from './parts/footer/FooterCatalog';
import { FooterContacts } from './parts/footer/FooterContacts';
import { FooterContactsLink } from './parts/footer/FooterContactsLink';
import { Link } from 'react-router-dom';


class Footer extends Component {
    render() {
        return <CategoriesContext.Consumer>{contextValue => {
            const categories = contextValue.categories;
            
            return (
                <div className='footer'>
                    <div className="row">
                        <div className="col-xl-8 col-lg-7 col-12 ">
                            <FooterGroup title='Каталог товаров' groupName="catalog" toggleBtn>
                                <FooterCatalog list={categories} catalogTitle='Наше производство'/>
                            </FooterGroup>
                        </div>

                        <div className="col-xl-4 col-lg-5 col-12">
                            <FooterGroup title='Контакты' groupName="contacts" toggleBtn>
                                <FooterContacts />
                                
                            </FooterGroup>
                            <FooterGroup>
                                <div className="footer-nav-links">
                                    <FooterContactsLink link="/workshop" title="Швейный цех"/>
                                    <FooterContactsLink link="/news" title="Новости"/>
                                    <FooterContactsLink link="/deliveryandpayment" title="Оплата и доставка"/>
                                </div>
                                <p className="footer__link footer__link_attention">
                                    Обращаем ваше внимание на то, что данный интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 (п.2) Гражданского кодекса РФ
                                </p>
                            </FooterGroup>
                        </div>
                        <hr className="hr"/>
                        <div className="footer-copyright">
                            <p className="copyright__text">© 2020 ООО "Универсал Томск"</p>
                            <Link to="/conf-info" className="copyright__privacy-link">Политика конфидециальности</Link>
                            <div className="copyright__unknown-blocks">
                                <span></span>
                                <span></span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            );
        }}
        </CategoriesContext.Consumer>
    }
}

export default Footer;

















/*

    <p>ООО "Универсал Томск"</p>
    <p>
        <a href='https://vladimirov-mv.name'>Сайт разработан командой "Unicorn Project"</a>
    </p>
*/