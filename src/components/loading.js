/**
 * Created by misha on 27.01.19.
 */
/**
 * Created by misha on 27.01.19.
 */
import React, {Component} from 'react';

class Loading extends Component {
    render() {
        return(
            <div className="loadingBlock">
                <div>
                    <img src={require('../images/loading.gif')} alt="loading..."/>
                </div>
            </div>
        );
    }
}

export default Loading;