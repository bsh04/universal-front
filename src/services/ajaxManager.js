/**
 * Created by misha on 27.01.19.
 */
import { serverUrl } from '../services/parameters';

export default function request(
    path = '',
    method = 'GET',
    data = {},
    headers = {},
    callback = null,
    errorCallback = null,
    mode = 'cors'
) {
    if (path.indexOf('http') === -1) {
        path = serverUrl + path;
    }


    headers["Content-Type"] = data instanceof FormData ? "multipart/form-data" : "application/json";
    headers["Access-Control-Request-Headers"] = "*";
    headers["Access-Control-Request-Methods"] = "*";
    headers["Access-Control-Allow-Origin"] = "*";
    if (window.store.store.getState().token !== false) {
        headers["Authorization"] = 'Bearer ' + window.store.store.getState().token;
    }

    let options = {
        method: method,
        mode: mode,
        headers: headers,
    };
    if (method !== 'GET') options.body = data instanceof FormData ? data : JSON.stringify(data);

    if (data instanceof FormData) {
        options.headers = {
            'Access-Control-Allow-Headers': window.location.hostname,
            'Authorization': 'Bearer ' + window.store.store.getState().token,
        };
    }
    //console.log('from ajax manager:', path)
    fetch(path, options)
        .then(processResponse)
        .then(res => {
            const { statusCode, data } = res;
            switch (statusCode)
            {
                case 200:
                    if (callback)
                    {
                        callback(data);
                    }
                    break;
                case 400: case 500:
                    window.store.store.dispatch({
                        type: 'UPDATE_MODAL_DATA',
                        payload: {
                            show: true,
                            title: 'Error ' + statusCode,
                            content: data.error_description ? data.error_description : data.message,
                            btnText: 'OK'
                        },
                    });
                    if (errorCallback)
                    {
                        errorCallback(data);
                    }
                    break;
                case 401:
                    window.store.store.dispatch({
                        type: 'DELETE_TOKEN',
                        payload: {},
                    });
                    break;
                default:
                    console.log("statusCode",statusCode);
                    console.log("data",data);
            }
        }).catch(e => console.log('err from fetch:',e));
}

function processResponse(response) {
    const statusCode = response.status;
    const data = response.text();

    return Promise.all([statusCode, data]).then(res => ({
        statusCode: res[0],
        data: (typeof (JSON.parse(res[1])) === 'object' ? JSON.parse(res[1]) : JSON.parse(JSON.parse(res[1]))),
    }));
}
