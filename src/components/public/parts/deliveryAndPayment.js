import React, {Component} from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class DeliveryAndPaymentIndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    render() {
        return (
            <div className='dropdown item'>
                <div className="button" type="button" id="dropdownMenuButton"
                     onClick={() => this.setState({open: !this.state.open})}>
                    <div className='bottom-title'>
                        {<img src={require('../../../images/bottom_index/' + this.props.item.image)}/>}
                        <p>{this.props.item.title}</p>
                    </div>
                    <KeyboardArrowDownIcon/>
                </div>
                {
                    this.state.open
                    ?
                        <div className='custom-dropdown-item'>
                            <div className='arrow'/>
                            <div>{this.props.item.title}</div>
                        </div>
                        : null
                }
            </div>
        );
    }
}

export default DeliveryAndPaymentIndexPage;