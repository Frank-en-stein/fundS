import React from 'react';
import SocialLogin from 'react-social-login';
import { Button } from 'react-bootstrap';

const button = ({ children, triggerLogin, ...props }) => (
  <Button onClick={triggerLogin} {...props}>
    { children }
  </Button>
)

export default SocialLogin(button);
