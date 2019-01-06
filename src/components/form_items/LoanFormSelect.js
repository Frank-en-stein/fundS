import React, { Component } from 'react';
import './../../App.css';
import { Field } from 'react-final-form';

class LoanFormSelect extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: null
        };
    }
    componentWillMount() {
        if (this.state.items === null) {
            this.props.getItems((isSuccess, items) => {
                this.setState({ items: items});
            });
        }
    }
    render() {
        return (
            <div className="form-group content-inline content-align-end">
                <label className="control-label field-label-margin" htmlFor={this.props.identifier}>{this.props.label}</label>
                <Field
                    name={this.props.identifier}
                    id={this.props.identifier}
                    component="select"
                    required={this.props.required}
                    className="form-control field-width field-margin">
                    <option key={0} value="">(Select {this.props.label})</option>
                    { this.state.items === null ? null : this.state.items.map((item, idx) => <option key={idx + 1}>{item}</option>)}
                </Field>
            </div>
        );
    }
}

export default LoanFormSelect;
