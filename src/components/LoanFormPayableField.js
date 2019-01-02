import React, { Component } from 'react';
import './../App.css';

class LoanPayableField extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: null
        }
    }
    componentWillMount() {
        if (this.state.data === null) {
            this.props.getData((isSuccess, data) => this.setState({data: data}))
        }
    }
    render() {
        return (
            <div className="form-group content-inline content-align-end">
                <label className="control-label field-label-margin">{this.props.label}</label>
                <pre className="form-control field-width field-margin">{this.props.processData(this.state.data)}</pre>
            </div>
        );
    }
}

export default LoanPayableField;