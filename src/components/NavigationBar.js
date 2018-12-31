import React, { Component } from 'react';
import './../App.css';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal } from 'react-bootstrap';

class NavigationBar extends Component {
    render() {
        return (
            <Navbar staticTop collapseOnSelect className="sticky">
              <Navbar.Header>
                <Navbar.Brand>
                  <a href="#brand" className="brand"><strong>fund$</strong></a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1} href="#">
                    Link
                  </NavItem>
                  <NavItem eventKey={2} href="#">
                    Link
                  </NavItem>
                  <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>
                </Nav>
                <Nav pullRight>
                  <NavItem eventKey={1} href="#">
                    <Button bsStyle="warning" onClick={() => this.props.handleSignInClick()}>+ Join</Button>
                  </NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;
