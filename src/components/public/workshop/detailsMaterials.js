import React, {useState} from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {articleImages} from '../../../services/parameters'

const DetailsMaterials = (props) => {

    const [showDetails, setShowDetails] = useState(false)

    return (
        <React.Fragment key={props.index + Math.random()}>
            <div className='material-list-item'
                 onClick={() => setShowDetails(!showDetails)}>
                {
                    props.item.image
?
                        <img src={articleImages + props.item.image}/>
                        :
                        <div className='material-list-item__splash-mobile'><p>Нет фото</p></div>

                }
                <h5>{props.item.title}</h5>
                {
                    showDetails
                        ?
                        <ExpandLessIcon className='mr-3'/>
                        :
                        <ExpandMoreIcon className='mr-3'/>

                }
            </div>
            {
                showDetails ?

                    <div>
                        <p>{props.item.content}</p>
                    </div>
                    : null
            }
        </React.Fragment>
    );
};

export default DetailsMaterials;