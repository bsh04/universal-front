/**
 * Created by misha on 03.10.17.
 */
export default function token(state = false, action) {
    switch(action.type)
    {
        case 'ADD_TOKEN':
            return action.payload;
        case 'UPDATE_TOKEN':
            return action.payload;
        case 'DELETE_TOKEN':
            return false;
        default:
            return state;
    }
}
