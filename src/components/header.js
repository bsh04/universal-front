import React, {useEffect, useState} from 'react';
import request from "../services/ajaxManager";
import MenuTop from "./public/parts/menuTop";
import TopNavbar from "./public/parts/navbarTop";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

const Header = props => {

    const token = props.token
    const [basket, setBasket] = useState([])
    const [like, setLike] = useState([])
    const [reduceTopMenu, setReduceTopMenu] = useState(false)
    const [mobileMode, setMobileMode] = useState(false)
    const [dropItem, setDropItem] = useState('')
    const [minimalMode, setMinimalMode] = useState(false)

    useEffect(() => {
        handleGet()
        window.addEventListener("resize", checkWindowSizeMD);
        window.addEventListener("scroll", navbarFixed);
        checkWindowSizeMD()

        return () => {
            window.removeEventListener("resize", checkWindowSizeMD);
            window.removeEventListener("scroll", navbarFixed);
        }
    }, []);

    useEffect(() => {
        handleGet();
    }, [props.reload])

    const navbarFixed = () => {
        if (window.pageYOffset > 50) {
            setReduceTopMenu(true)
        } else {
            setReduceTopMenu(false)
        }
    }

    const handleGet = () => {
        if (props.token) {
            request(
                'product/basket',
                'GET',
                null,
                {},
                function (response) {
                    setBasket(response);
                    props.onBasketAdd(response);
                },
            );

            request(
                'product/favorite',
                'GET',
                null,
                {},
                function (response) {
                    setLike(response)
                },
            );
        }
    }

    const checkWindowSizeMD = () => {
        if (window.innerWidth >= 1700) {
            setMobileMode(false)
            setMinimalMode(false)
        } else if(window.innerWidth < 1700 && window.innerWidth > 950) {
            setMobileMode(false)
            setMinimalMode(true)
        }
        else {
            setMobileMode(true)
            setMinimalMode(false)
        }
    }

    return (
        <div>
            <div>
                <MenuTop
                    mobileMode={mobileMode}
                    reduceTopMenu={reduceTopMenu}
                    basket={basket}
                    like={like}
                    token={token}
                    setDropItem={setDropItem}
                    minimalMode={minimalMode}
                />
            </div>
            <div>
                <TopNavbar
                    mobileMode={mobileMode}
                    reduceTopMenu={reduceTopMenu}
                    basket={basket}
                    like={like}
                    token={token}
                    dropItem={dropItem}
                    setDropItem={setDropItem}
                    minimalMode={minimalMode}
                />
            </div>
        </div>
    );
};

export default withRouter(connect(
    (state) => ({
        token: state.token,
        user: state.user,
        reload: state.reload
    }),
    dispatch => ({
        onDeleteToken: (token) => {
            dispatch({type: 'DELETE_TOKEN', payload: token})
        },
        onDeleteUser: (user) => {
            dispatch({type: 'DELETE_USER', payload: user})
        },
        onBasketAdd: (basket) => {
            dispatch({type: 'BASKET_ADD', payload: basket})
        }
    })
)(Header));