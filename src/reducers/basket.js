/**
 * Created by misha on 03.10.17.
 */
export default function basket(state = [], action) {
    switch(action.type)
    {
        case 'BASKET_ADD':
            return action.payload;
        case 'BASKET_DELETE':
            return action.payload;
        
        default:
            return state;
    }
}
