import React from 'react';

const OrderRender = (props) => {
    return (
        <div className='order-detail-container'>
            {
                props.item.items.map((item, index) => (
                    <div className='cont' key={index}>
                        <div className='order-detail-top'>
                            <div className='order-image'>
                                <img
                                    src={item.product.photo === 'placeholder.jpg' ? require('../../images/image-placeholder.png') : 'https://api.universal.tom.ru/uploads/products/' + item.product.photo}
                                />
                            </div>
                            <div className='order-title'>
                                <p className='art'>
                                    Артикул {item.id}
                                </p>
                                <p>
                                    {item.product.title}
                                </p>
                            </div>
                        </div>
                        <div className='order-detail-bottom'>
                            <div className='order-default-amount'>
                                <p>
                                    {(item.product.price).toFixed(2)} Р
                                </p>
                            </div>
                            <div className='order-count'>
                                <p>{item.count}</p>
                            </div>
                            <div className='order-full-amount'>
                                <p>
                                    {(item.product.price * item.count).toFixed(2)} Р
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

    )
};

export default OrderRender;