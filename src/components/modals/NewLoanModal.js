import React, { Component } from 'react';
import './../../App.css';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-final-form';
import ProfileCard from '../ProfileCard';
import LoanFormSelect from '../form_items/LoanFormSelect';
import LoanFormPayableField from '../form_items/LoanFormPayableField';
import LoanFromInput from '../form_items/LoanFromInput';
import requests from '../../network/requests';
import calculator from '../../utility/calculator';

class NewLoanModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            formValues: null
        }
    }

    handleSocialLogin = (user) => {
        this.props.setUser(user);
        this.props.handleClose()
    }

    handleSocialLoginFailure = (err) => {
        console.error(err);
        alert("Sign in with Social media failed. Please check yout network configuration or try signing in with some other social media")
    }

    onSubmit = (values) => {
      requests.postNewLoanApplication(values, (isSuccess, application) => {
          this.props.addMyApplication(application);
          if (isSuccess)  this.props.handleClose();
          else alert("Application submission failed");
          //window.alert(JSON.stringify(values, 0, 2));
      });
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modalTitle} <button type="button" className="btn btn-small btn-info"
                        onClick={() => requests.getLoanApplicationDraftForm((isSuccess, data) => this.setState({formValues: data}))}>Restore last draft</button></Modal.Title>
                </Modal.Header>
                <Modal.Body className="new-loan-modal-container">
                    <ProfileCard user={this.props.user}/>
                    <hr/>
                    <Form
                      onSubmit={this.onSubmit}
                      initialValues={this.state.formValues}
                      values={this.state.formValues}
                      render={({ handleSubmit, form, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit} className="form-horizontal">
                          <LoanFormSelect label="Business type" identifier="businessTypes" getItems={requests.getBusinessTypes}/>
                          <LoanFormSelect label="Repay frequency" identifier="loanFrequency" getItems={requests.getLoanFrequencyLabels}/>
                          <LoanFromInput label="Number of instalments" identifier="instalments" getPlaceholder={requests.getMaxNumInstalments}
                                processPlaceholder={(data) => data === null ? null : data[values.loanFrequency] === undefined ? null : "max "+parseInt(data[values.loanFrequency])}/>
                          <LoanFromInput label="Loan amount (USD)" identifier="amount" getPlaceholder={requests.getMaxAmounts}
                                processPlaceholder={(data) => data === null ? null : data[values.loanFrequency] === undefined ? null : "max $"+data[values.loanFrequency]}/>
                          <LoanFormPayableField label="Total repayable (USD)" getData={requests.getLoanRates}
                                processData={(data) => data === null ? null : data[values.loanFrequency] === undefined || values.amount === undefined ? null : calculator.getTotalPayable(values.amount, data[values.loanFrequency])}/>
                          <LoanFormPayableField label="Per instalment (USD)" getData={requests.getLoanRates} identifier="perInstalment"
                                processData={(data) => data === null ? null : data[values.loanFrequency] === undefined || values.amount === undefined ? null : calculator.getPerInstalment(values.amount, data[values.loanFrequency], values.instalments)}/>
                          <div className="form-group content-inline content-align-end">
                            <label className="control-label field-label-margin">Upload docs</label>
                            <input
                              name="docs"
                              component="input"
                              type="file"
                              placeholder="docs"
                              className="form-control field-width field-margin"
                              onChange={(event) => event.target.length === 0 ? null : values["docs"] = event.target.files[0]}
                            />
                          </div>
                          <hr/>
                          <div className="buttons content-inline content-space-between">
                            <button type="button" className="btn btn-primary" disabled={submitting || pristine}
                                    onClick={() => {
                                        requests.postLoanApplicationDraftForm(values, (isSuccess) => {
                                            if (isSuccess) {
                                                this.props.handleClose();
                                                alert("Application draft saved");
                                            }
                                        });
                                    }
                                }
                                >Save as draft</button>
                            <div className="content-align-end">
                                <button type="submit" className="btn btn-success" disabled={submitting || pristine}>Submit</button>
                                <button
                                type="button"
                                onClick={() => form.reset({})}
                                className="btn btn-danger"
                                disabled={submitting}
                                >
                                Reset
                                </button>
                            </div>
                          </div>
                          <pre>{JSON.stringify(values, 0, 2)}</pre>
                        </form>
                      )}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}

export default NewLoanModal;
