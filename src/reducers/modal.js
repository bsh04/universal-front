/**
 * Created by misha on 03.10.17.
 */
let defaultData = {
    show: false,
    title: '',
    content: '',
    btnText: 'OK'
};

export default function modal(state = defaultData, action) {
    switch(action.type)
    {
        case 'UPDATE_MODAL_DATA':
            return action.payload;
        case 'CLEAR_MODAL_DATA':
            return defaultData;
        default:
            return state;
    }
}
