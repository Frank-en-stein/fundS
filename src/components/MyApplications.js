import React, { Component } from 'react';
import './../App.css';
import { Table } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import requests from './../network/requests';
import calculator from './../utility/calculator';
import { FaClose } from 'react-icons/lib/fa';

class MyApplications extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rates: null
        }
    }
    componentWillMount() {
        if (this.props.applications === null) {
            requests.getMyApplications((isSuccess, data) => {
                this.props.setMyApplications(data);
                //console.log(data);
            });
        }
        if (this.state.rates === null) {
            requests.getLoanRates((isSuccess, data) => {
                this.setState({rates: data});
            });
        }
    }

    cancelApplication(application, index) {
        var id = window.prompt("Please enter the application id to confirm:");
        if (id === null) return;
        if (id !== application.id) {
            alert("Wrong application id entered");
            return;
        }
        requests.postApplicationCancel(application, (isSuccess, application) => {
            if (isSuccess) {
                var applications = this.props.applications;
                if (applications!==null) if(applications.length > index) {
                    if (application === null) applications.splice(index, 1);
                    else applications[index] = application;
                    this.props.setMyApplications(applications);
                }
            } else alert("Error occurred, action failed");
        });
    }

    render() {
        return (
            <div className="App-bg my-application content-hor-center">
                <NavigationBar
                    user={this.props.user}
                    setUser={(user) => this.props.setUser(user)}
                    handleSignInClick={(e) => this.props.handleSignInClick(e)}
                    handleNewLoanClick={(e) => this.props.handleNewLoanClick(e)}
                />
                <Table className="avoid-navbar my-application-table" responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>#</th>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Business Type</th>
                        <th>Amount (USD)</th>
                        <th>Total Repayable (USD)</th>
                        <th>Per Instalment (USD)</th>
                        <th>Repay Frequency</th>
                        <th>Number of Instalments</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.applications === null || this.props.applications === undefined ? null : this.props.applications.map((application, index) => (
                            <tr key={index}>
                                <td><FaClose onClick={(e)=>this.cancelApplication(application, index)}/></td>
                                <td>{index+1}</td>
                                <td>{application.id}</td>
                                <td>{application.status}</td>
                                <td>{application.businessTypes}</td>
                                <td>{application.amount}</td>
                                <td>{this.state.rates === null ? null : calculator.getTotalPayable(application.amount, this.state.rates[application.loanFrequency])}</td>
                                <td>{this.state.rates === null ? null : calculator.getPerInstalment(application.amount, this.state.rates[application.loanFrequency], application.instalments)}</td>
                                <td>{application.loanFrequency}</td>
                                <td>{application.instalments}</td>
                            </tr>
                        ))
                    }
                </tbody>
                </Table>
            </div>
        );
    }
}

export default MyApplications;
