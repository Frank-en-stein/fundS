import React, { Component } from 'react';
import './../App.css';
import * as SocialIDs from './../SocialIDs.json';
import { Button, Modal } from 'react-bootstrap';
import SocialLogin from 'react-social-login';
import SocialButton from './SocialButton';

class SignInModal extends Component {
    handleSocialLogin = (user) => {
        console.log(user);
    }

    handleSocialLoginFailure = (err) => {
        console.error(err);
    }
    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose()}>
                <Modal.Header closeButton>
                  <Modal.Title>Sign in using:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SocialButton
                      provider='facebook'
                      appId={SocialIDs.facebook}
                      onLoginSuccess={this.handleSocialLogin}
                      onLoginFailure={this.handleSocialLoginFailure}
                    >
                      Login with Facebook
                    </SocialButton>
                    <SocialButton
                      provider='google'
                      appId={SocialIDs.google}
                      onLoginSuccess={this.handleSocialLogin}
                      onLoginFailure={this.handleSocialLoginFailure}
                    >
                      Login with Google
                    </SocialButton>
                    <SocialButton
                      provider='linkedin'
                      appId={SocialIDs.linkedin}
                      onLoginSuccess={this.handleSocialLogin}
                      onLoginFailure={this.handleSocialLoginFailure}
                    >
                      Login with LinkedIn
                    </SocialButton>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => this.props.handleClose()}>Close</Button>
                </Modal.Footer>
              </Modal>
        );
    }
}

export default SignInModal;
