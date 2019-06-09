/**
 * Created by misha on 03.10.17.
 */

export default function reload(state = {reload: false}, action) {
    switch(action.type)
    {
        case 'RELOAD':
            return {reload: true};
        case 'RELOADED':
            return {reload: false};
        default:
            return state;
    }
}
