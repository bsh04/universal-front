import React, {Component} from 'react';

import { CategoriesContext } from '../../services/contexts';
import { FooterGroup } from './parts/footer/FooterGroup';
import { FooterCatalog } from './parts/footer/FooterCatalog';
import { FooterContacts } from './parts/footer/FooterContacts';


class Footer extends Component {
    render() {
        return <CategoriesContext.Consumer>{contextValue => {
            const categories = contextValue;
            
            return (
                <div className='footer row'>
                    <div className="col-md-8 col-12 ">
                        <FooterGroup title='Каталог товаров' groupName="catalog">
                            <FooterCatalog list={categories} catalogTitle='Наше производство'/>
                        </FooterGroup>
                    </div>

                    <div className="col-md-4 col-12">
                        <FooterGroup title='Контакты' groupName="contacts" toggleBtn>
                            <FooterContacts />
                        </FooterGroup>
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