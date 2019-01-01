import React, { Component } from 'react';
import './../App.css';
import { Button, Modal } from 'react-bootstrap';
import SocialButton from './SocialButton';

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
                  <Modal.Title>New loan application:</Modal.Title>
                </Modal.Header>
                <Modal.Body className="new-loan-modal-container">
                    
                </Modal.Body>
                <Modal.Footer>
                  <Button bsStyle="danger" onClick={() => this.props.handleClose()}>Close</Button>
                </Modal.Footer>
              </Modal>
        );
    }
}

export default NewLoanModal;