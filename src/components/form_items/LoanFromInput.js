import React, { Component } from 'react';
import './../../App.css';
import { Field } from 'react-final-form';

class LoanFormInput extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            placeholderData: null
        }
    }
    componentWillMount() {
        if (this.state.placeholderData === null) {
            this.props.getPlaceholder((isSuccess, data) => this.setState({placeholderData: data}))
        }
    }
    render() {
        return (
            <div className="form-group content-inline content-align-end">
                <label className="control-label field-label-margin">{this.props.label}</label>
                    <Field
                        name={this.props.identifier}
                        component="input"
                        type="number"
                        min="0"
                        placeholder={this.props.processPlaceholder(this.state.placeholderData)}
                        className="form-control field-width field-margin"
                        required={this.props.required}
                        pattern="[0-9]"
                        title="Please enter number only"
                    />
            </div>
        );
    }
}

export default LoanFormInput;
