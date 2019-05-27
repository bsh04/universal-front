/**
 * Created by misha on 03.10.17.
 */
export default function token(state = false, action) {
    switch(action.type)
    {
        case 'ADD_USER':
            return action.payload;
        case 'UPDATE_USER':
            return action.payload;
        case 'DELETE_USER':
            return false;
        default:
            return state;
    }
}
