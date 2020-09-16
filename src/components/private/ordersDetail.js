import React, {useState} from 'react';
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import OrderRender from "./orderRender";

const OrdersDetail = (props) => {

    const [showDetail, setShowDetails] = useState(false)
    const [active, setActive] = useState(false)

    const handleClick = () => {
        setShowDetails(!showDetail)
        setActive(!active)
    }
    return (
        <>
            <div className='container-header' style={active ? {backgroundColor: '#f1f1f1'} : {backgroundColor: 'white'}} onClick={() => handleClick()}>
                <div className='headers'>
                    <p className='orders-item-number'>
                        {props.order.id}
                        {
                            showDetail
                                ?
                                <ExpandLessIcon/>
                                :
                                <ExpandMoreIcon/>
                        }
                    </p>
                    <p className='orders-item-date'>
                            <b>{props.date.getDate()}.{props.date.getMonth() + 1}.{props.date.getFullYear()}</b>
                    </p>
                    <p className='orders-item-sum'>
                        <b>{(props.sum).toFixed()} Р</b>
                    </p>
                </div>
                <div className='items'>
                    {
                        showDetail ?
                            <OrderRender item={props.order} showDetail={showDetail}/>
                            : null
                    }
                </div>
            </div>
        </>
    );
};

export default OrdersDetail;