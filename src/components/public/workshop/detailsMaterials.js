import React, {useState} from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const DetailsMaterials = (props) => {

    const [showDetails, setShowDetails] = useState(false)

    return (
        <React.Fragment key={props.index + Math.random()}>
            <div className='material-list-item'
                 onClick={() => setShowDetails(!showDetails)}>
                <img src={props.item.imageMobile}/>
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
                        <p>{props.item.body}</p>
                    </div>
                    : null
            }
        </React.Fragment>
    );
};

export default DetailsMaterials;