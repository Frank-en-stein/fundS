import React, { Component } from 'react';
import './../App.css';
import calculator from './../utility/calculator';

class CalculationResults extends Component {
    render() {
        if (this.props.amount && this.props.loanRates && this.props.selectedFrequency && this.props.numberOfInstalments) {
            if (this.props.amount > this.props.maxAmounts[this.props.selectedFrequency])
                return (
                    <div className="intro-sub">
                        <p className="text-danger intro-sub-content">
                        Amount exceeds maximum allowed fund for {this.props.selectedFrequency} repays: {this.props.maxAmounts[this.props.selectedFrequency]}USD
                        </p>
                    </div>
                );
            if (this.props.numberOfInstalments > this.props.maxNumberOfInstalments[this.props.selectedFrequency])
                return (
                    <div className="intro-sub">
                        <p className="text-danger intro-sub-content">
                        Number of instalments exceeds maximum allowed number of instalments for {this.props.selectedFrequency} repays: {this.props.maxNumberOfInstalments[this.props.selectedFrequency]}
                        </p>
                    </div>
                );
            return (
                <div className="intro-sub">
                    <p className="text-danger intro-sub-content">
                        Total Repay (USD): <strong>{calculator.getTotalPayable(this.props.amount, this.props.loanRates[this.props.selectedFrequency])}</strong>
                    </p>
                    <p className="text-info intro-sub-content">
                        Per Instalment (USD): <strong>{calculator.getPerInstalment(this.props.amount, this.props.loanRates[this.props.selectedFrequency], this.props.numberOfInstalments)}</strong>
                    </p>
                </div>
            );
        } else return (
            <div className="intro-sub">
                <p className="text-danger intro-sub-content">Please fill out all the fields</p>
            </div>
        );
    }
}
export default CalculationResults;
