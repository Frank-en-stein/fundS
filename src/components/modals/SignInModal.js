import React, { Component } from 'react';
import './../../App.css';
import * as SocialIDs from './../../SocialIDs.json';
import { Button, Modal } from 'react-bootstrap';
import SocialButton from '../form_items/SocialButton';
import { FaFacebook, FaGoogle, FaLinkedin } from 'react-icons/lib/fa';
import requests from './../../network/requests';

class SignInModal extends Component {
    handleSocialLogin = (user) => {
        requests.postSignIn(user, (isSuccess, newUser) => {
            if (isSuccess) {
                this.props.setUser(newUser);
                this.props.handleClose();
            } else alert("SignIn failed");
        });
    }

    handleSocialLoginFailure = (err) => {
        console.error(err);
        alert("Sign in with Social media failed. Please check yout network configuration or try signing in with some other social media")
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
                <Modal.Header closeButton>
                  <Modal.Title>Sign in using:</Modal.Title>
                </Modal.Header>
                <Modal.Body className="sign-in-btn-container">
                    <SocialButton
                      provider='facebook'
                      appId={SocialIDs.facebook}
                      onLoginSuccess={this.handleSocialLogin}
                      onLoginFailure={this.handleSocialLoginFailure}
                    >
                      <FaFacebook className="font-xlarge"/> Facebook
                    </SocialButton>
                    <SocialButton
                      provider='google'
                      appId={SocialIDs.google}
                      onLoginSuccess={this.handleSocialLogin}
                      onLoginFailure={this.handleSocialLoginFailure}
                    >
                      <FaGoogle className="font-xlarge"/> Google
                    </SocialButton>
                    <SocialButton
                      provider='linkedin'
                      appId={SocialIDs.linkedin}
                      onLoginSuccess={this.handleSocialLogin}
                      onLoginFailure={this.handleSocialLoginFailure}
                    >
                      <FaLinkedin className="font-xlarge"/> LinkedIn
                    </SocialButton>
                </Modal.Body>
                <Modal.Footer>
                  <Button bsStyle="danger" onClick={() => this.props.handleClose()}>Close</Button>
                </Modal.Footer>
              </Modal>
        );
    }
}

export default SignInModal;
