import React, {Component} from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class DeliveryAndPaymentIndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    renderDescription(item, index) {
        return (
            <div key={index} className='content-item'>
                <img src={require(`../../../images/bottom_index/content_images/${item.src}`)} className='pr-2'/>
                {
                    item.title
                        ?
                        <div className='item-body'>
                            <strong>{item.title}</strong>
                            <small>{item.content}</small>
                        </div>
                        :
                        <p className='text-left'>{item.content}</p>
                }
            </div>
        )
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
                            <div>
                                {
                                    this.props.item.content.body
                                        ?
                                        <p className='pb-2 pt-0 text-left'>{this.props.item.content.body}</p>
                                        :
                                        null
                                }
                                {
                                    this.props.item.content.images ?
                                        this.props.item.content.images.map((item, index) => this.renderDescription(item, index))
                                        :
                                        null
                                }
                                {
                                    this.props.item.content.addition
                                        ?
                                        <p className='addition'>{this.props.item.content.addition}</p>
                                        :
                                        null
                                }
                            </div>
                        </div>
                        : null
                }
            </div>
        );
    }
}

export default DeliveryAndPaymentIndexPage;