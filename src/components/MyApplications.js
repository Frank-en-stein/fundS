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
            applications: null,
            rates: null
        }
    }
    componentWillMount() {
        if (this.state.applications === null) {
            requests.getMyApplications((isSuccess, data) => {
                this.setState({applications: data});
                console.log(data);
            });
        }
        if (this.state.rates === null) {
            requests.getLoanRates((isSuccess, data) => {
                this.setState({rates: data});
            });
        }
    }

    cancelApplication(application, index) {
        requests.postApplicationCancel(application, (isSuccess) => {
            if (isSuccess) {
                var applications = this.state.applications;
                if (applications!==null) if(applications.length > index) {
                    applications[index].status = "Cancelled";
                    this.setState(applications);
                }
            }
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
                        this.state.applications === null ? null : this.state.applications.map((application, index) => (
                            <tr>
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
