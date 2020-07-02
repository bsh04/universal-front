import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';



class MenuTop extends Component {
    constructor(props) {
        super(props);
    }

    
    
    render() {

        return (
                <div className="row">
                    <div className="col-md-3 col-7 my-1 my-md-0 ">
                        
                        <Link to="/">
                        {/*<img alt='main' src={require('../../../images/main_logo.jpeg')} style={{maxHeight: 100}}/>*/}
                            <h1 className="text-center">Универсал</h1>
                            <h2 className="text-center d-none d-md-block">Хозяйственные товары</h2>
                        </Link>
                        
                    </div>
                    <div className="col-md-2 my-3 my-md-0 d-none d-md-block">
                        <p className={'text-md-left text-center'}>
                            <span>
                                <i className={'fa fa-phone'}> <a href={'tel:+7 (3822) 90-92-91'} itemProp="telephone">+7 (3822) 90-92-91</a></i><br/>
                                <i className={'fa fa-phone'}> <a href={'tel:+7 (3822) 90-44-32'} itemProp="telephone">+7 (3822) 90-44-32</a></i><br/>
                                <i className={'fa fa-phone'}> <a href={'tel:+7 (3822) 90-26-68'} itemProp="telephone">+7 (3822) 90-26-68</a></i>
                            </span>
                            <br/>
                        </p>
                    </div>
                    <div className="col-md-3 text-md-left text-center my-3 my-md-0 d-none d-md-block">
                        <i className={'fa fa-envelope '}> <a href={'email:razov@mail.tomsknet.ru'} itemProp="email">razov@mail.tomsknet.ru</a></i><br/>
                        <p className="street-addres" itemProp="streetAddress"><i className={'fa fa-map-marker'}></i> Адрес: г. Томск, ул. Бердская, 31 <br/>(пер. Пойменный 5)</p>
                    </div>
                    <div className="col-md-2 my-3 my-md-0 d-none d-md-block">
                        <div className="shedule">
                            График работы
                        </div>
                        <div className="shedule-tooltip">
                            <p><b>ПН-ПТ</b> <span>9:00 - 17:00</span></p>
                            <p><b>СБ</b> <span>9:00 - 14:00</span></p>
                            <p><b>ВС</b> <span>ВЫХОДНОЙ</span></p>
                        </div>
                    </div>
                    <div className="col-md-2 col-5 text-md-right text-center my-1 my-md-0">
                        <p>
                        { this.props.token ?
                                <Link to='/user/basket' className="iconButtons">
                                    <i className={'fa fa-shopping-cart'}> </i>
                                    {this.props.basket.length > 0 ? <span className={'badge badge-danger'}>{this.props.basket.length}</span> : null}
                                </Link>
                                : '' }
                        { this.props.token ?
                                <Link to='/user/favorite' className="iconButtons">
                                    <i className={'fa fa-heart'}> </i>
                                    {this.props.like.length > 0 ? <span className={'badge badge-danger'}>{this.props.like.length}</span> : null}
                                </Link>
                                : '' }
                        </p>
                    </div>
                </div>
        )
    }
}
export default MenuTop;