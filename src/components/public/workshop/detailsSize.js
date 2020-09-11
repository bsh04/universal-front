import React, {useState} from 'react';
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const DetailsSize = (props) => {

    const [showDetails, setShowDetails] = useState(false)

    return (

        <React.Fragment key={props.index}>
            <div className='size-list-item'
                 onClick={() => setShowDetails(!showDetails)}>
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
    )
};

export default DetailsSize;