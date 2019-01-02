import React, { Component } from 'react';
import './../App.css';
import { Button, Modal } from 'react-bootstrap';
import { Form, Field } from 'react-final-form';
import ProfileCard from './ProfileCard';
import LoanFormSelect from './LoanFormSelect';
import LoanFormPayableField from './LoanFormPayableField';
import LoanFromInput from './LoanFromInput';
import requests from '../network/requests.js';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

class NewLoanModal extends Component {
    handleSocialLogin = (user) => {
        this.props.setUser(user);
        this.props.handleClose()
    }

    handleSocialLoginFailure = (err) => {
        console.error(err);
        alert("Sign in with Social media failed. Please check yout network configuration or try signing in with some other social media")
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>New loan application</Modal.Title>
                </Modal.Header>
                <Modal.Body className="new-loan-modal-container">
                    <ProfileCard user={this.props.user}/>
                    <hr/>
                    <Form
                      onSubmit={onSubmit}
                      initialValues={{ stooge: 'larry', employed: false }}
                      render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} className="form-horizontal">
                          <LoanFormSelect label="Business type" identifier="businessTypes" getItems={requests.getBusinessTypes}/>
                          <LoanFormSelect label="Repay frequency" identifier="loanFrequency" getItems={requests.getLoanFrequencyLabels}/>
                          <LoanFromInput label="Number of instalments" identifier="instalments" getPlaceholder={requests.getMaxNumInstalments} 
                                processPlaceholder={(data) => data === null ? null : data[values.loanFrequency] === undefined ? null : "max "+data[values.loanFrequency]}/>
                          <LoanFromInput label="Loan amount (USD)" identifier="amount" getPlaceholder={requests.getMaxAmounts}
                                processPlaceholder={(data) => data === null ? null : data[values.loanFrequency] === undefined ? null : "max $"+data[values.loanFrequency]}/>
                          <LoanFormPayableField label="Total repayable (USD)" getData={requests.getLoanRates}
                                processData={(data) => data === null ? null : data[values.loanFrequency] === undefined ? null : values.amount*(1+data[values.loanFrequency]/100.00)}/>
                          <LoanFormPayableField label="Per instalment (USD)" getData={requests.getLoanRates}
                                processData={(data) => data === null ? null : data[values.loanFrequency] === undefined ? null : (parseFloat(values.amount)/values.instalments)*(1+data[values.loanFrequency]/100.00)}/>
                          <div className="form-group content-inline content-align-end">
                            <label className="control-label field-label-margin">Upload docs</label>
                            <Field
                              name="docs"
                              component="input"
                              type="file"
                              placeholder="docs"
                              className="form-control field-width field-margin"
                            />
                          </div>
                          <div className="buttons content-inline content-space-around-center">
                            <button type="submit" disabled={submitting || pristine}>
                              Submit
                            </button>
                            <button
                              type="button"
                              onClick={form.reset}
                              disabled={submitting || pristine}
                            >
                              Reset
                            </button>
                          </div>
                          <pre>{JSON.stringify(values, 0, 2)}</pre>
                        </form>
                      )}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="danger" onClick={() => this.props.handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default NewLoanModal;
