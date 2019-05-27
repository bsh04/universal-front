/**
 * Created by misha on 15.09.17.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import token from './token';
import user from './user';
import modal from './modal';

export default combineReducers({
    routing: routerReducer,
    token,
    user,
    modal,
});