import React, { Component } from 'react';
import './../App.css';
import { Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import CalculationResults from './CalculationResults';
import requests from './../network/requests';
import calculator from './../utility/calculator';

class Calculator extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            maxAmounts: null,
            loanRates: null,
            instalmentFrequency: null,
            maxNumberOfInstalments: null,
            amount: null,
            selectedFrequency: null,
            numberOfInstalments: null
        };
    }
    componentWillMount() {
        if (this.state.instalmentFrequency === null) {
            requests.getLoanFrequencyLabels((isSuccess, data) => {
                if (isSuccess) this.setState({ instalmentFrequency: data});
            });
        }
        if (this.state.maxNumberOfInstalments === null) {
            requests.getMaxNumInstalments((isSuccess, data) => {
                if (isSuccess) this.setState({ maxNumberOfInstalments: data });
            });
        }
        if (this.state.maxAmounts === null) {
            requests.getMaxAmounts((isSuccess, data) => {
                if (isSuccess) this.setState({ maxAmounts: data });
            });
        }
        if (this.state.loanRates === null) {
            requests.getLoanRates((isSuccess, data) => {
                if (isSuccess) this.setState({ loanRates: data });
            });
        }
    }
    instalmentFrequencySelect = () => (
        <select className="calculator-select-loanFrequency" onChange={(e)=>this.setState({selectedFrequency: e.target.value})}>
            <option key={0} value="">(frequency)</option>
            { this.state.instalmentFrequency === null ? null :
                this.state.instalmentFrequency.map((item, idx) => <option key={idx + 1} value={item}>{item}</option>)}
        </select>
    )
    render() {
        return (
            <div>
                <NavigationBar
                    user={this.props.user}
                    setUser={this.props.setUser}
                    handleSignInClick={(e) => this.props.handleSignInClick(e)}
                    handleNewLoanClick={(e) => this.props.handleNewLoanClick(e)}
                />
                <header className="App-header App-bg">
                    <div className="intro-calc">
                        <blockquote className="blockquote bg-info intro-sub-online">
                            <div>
                                I need USD <input
                                                className="calculator-input-amount"
                                                name="numberOfInstalments"
                                                type="number"
                                                min="0"
                                                size="4"
                                                onChange={(e)=>this.setState({amount: e.target.value})}
                                            /> with a
                                number of <input
                                            className="calculator-input-numberOfInstalments"
                                            name="numberOfInstalments"
                                            type="number"
                                            min="0"
                                            placeholder=""
                                            size="1"
                                            onChange={(e)=>this.setState({numberOfInstalments: e.target.value})}
                                          /> repays {this.instalmentFrequencySelect()}
                            </div>
                        </blockquote>
                        <CalculationResults {...this.state}/>
                        <Button bsSize="large" bsStyle="warning" className="get-started-btn" onClick={()=>this.props.user===null ? this.props.handleSignInClick() : this.props.handleNewLoanClick()}>
                            <strong>Get started now></strong>
                        </Button>
                    </div>
                </header>
            </div>
        );
    }
}
export default Calculator;
