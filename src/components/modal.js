/**
 * Created by misha on 27.01.19.
 */
import React, {Component} from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

class Modal extends Component {
    constructor(props, context)
    {
        super(props, context);

        this.state = {
            modal: props.modal,
        };
    }

    componentDidMount() {
        this.props.onClear();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({modal: nextProps.modal});
    }

    componentDidUpdate() {
        if (this.props.modal.show) {
            $('#myModal').show();
        }
        else {
            $('#myModal').hide();
        }
    }

    render() {
        return(
            <div className="modal" tabIndex="-1" role="dialog" id="myModal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.state.modal.title}</h5>
                            <button type="button" className="close"  aria-label="Close"
                                    onClick={() => this.props.onClear()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{this.state.modal.content}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" onClick={() => this.props.onClear()}>
                                {this.state.modal.btnText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        modal: state.modal,
    }),
    dispatch => ({
        onClear: () => {
            dispatch({ type: 'CLEAR_MODAL_DATA', payload: {} })
        }
    })
)(Modal);