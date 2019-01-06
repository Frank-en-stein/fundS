import React, { Component } from 'react';
import './../App.css';
import { Table, Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import requests from './../network/requests';
import calculator from './../utility/calculator';

class MyLoans extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rates: null
        }
    }
    componentWillMount() {
        if (this.props.loans === null) {
            requests.getMyLoans((isSuccess, data) => {
                this.props.setMyLoans(data);
                console.log(data);
            });
        }
        if (this.state.rates === null) {
            requests.getLoanRates((isSuccess, data) => {
                this.setState({rates: data});
            });
        }
    }
    handleRepay(loan, index) {
        var txId = window.prompt("Please enter the transaction id of payment to confirm:");
        if (txId === null) return;
        if (txId === "") {
            alert("Please enter a valid transaction Id");
            return;
        }
        if (loan.instalments.paid >= loan.instalments.total) {
            alert("All instalments already completed");
            return;
        }
        requests.postLoanInstalment(loan, txId, (isSuccess, newloan) => {
            if (isSuccess) {
                if (newloan === null) {
                    alert("The transacion ID provided for instalment repayment was not valid");
                    return;
                }
                var loans = this.props.loans;
                if (loans!==null) if(loans.length > index) {
                    loans[index] = newloan;
                    this.props.setMyLoans(loans);
                }
            } else alert("Instalment repayment confirmation failed. Please try again later or contact support");
        });
    }
    render() {
        return (
            <div className="App-bg my-loan content-hor-center">
                <NavigationBar
                    user={this.props.user}
                    setUser={(user) => this.props.setUser(user)}
                    handleSignInClick={(e) => this.props.handleSignInClick(e)}
                    handleNewLoanClick={(e) => this.props.handleNewLoanClick(e)}
                />
                <Table className="avoid-navbar my-loan-table" responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>#</th>
                        <th>ID</th>
                        <th>Business Type</th>
                        <th>Amount (USD)</th>
                        <th>Total Amount (USD)</th>
                        <th>Per Instalment (USD)</th>
                        <th>Last Instalment</th>
                        <th>Repay Frequency</th>
                        <th>Remaining Instalments</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.loans === null ? null : this.props.loans.map((loan, index) => (
                            <tr key={index}>
                                <td><Button bsStyle="success" bsSize="small" onClick={()=>this.handleRepay(loan, index)}>Repay</Button></td>
                                <td>{index+1}</td>
                                <td>{loan.id}</td>
                                <td>{loan.businessTypes}</td>
                                <td>{loan.amount}</td>
                                <td>{this.state.rates === null ? null : calculator.getTotalPayable(loan.amount, this.state.rates[loan.loanFrequency])}</td>
                                <td>{this.state.rates === null ? null : calculator.getPerInstalment(loan.amount, this.state.rates[loan.loanFrequency], loan.instalments.total)}</td>
                                <td>{loan.lastInstalmentDate}</td>
                                <td>{loan.loanFrequency}</td>
                                <td>{loan.instalments.paid + "/" + loan.instalments.total}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </Table>
            </div>
        );
    }
}

export default MyLoans;
