import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import News from './parts/news';

class Index extends Component {
    render() {
        return (
            <div>
                <News/>
            </div>
        );
    }
}

export default Index;
