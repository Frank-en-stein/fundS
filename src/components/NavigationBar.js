import React, { Component } from 'react';
import './../App.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import MyAccountButton from './MyAccountButton';
import { FaSignOut, FaDollar, FaList } from 'react-icons/lib/fa';

class NavigationBar extends Component {
    signin = () => (
    <NavItem eventKey={4} className="height-inherit btn-small btn-warning" onClick={() => this.props.handleSignInClick()}>
      <span className="text-white">+ Join</span>
    </NavItem>
    );
    signout = () => (
      <NavDropdown eventKey={5} title={<MyAccountButton profilePicURL={this.props.user!=null ? this.props.user._profile.profilePicURL : null}/>} id="basic-nav-dropdown" className="btn-small btn-info">
        <MenuItem eventKey={5.1} className="background-white"><FaDollar/> New loan</MenuItem>
        <MenuItem eventKey={5.2} className="background-white"><FaList/> My loans</MenuItem>
        <MenuItem eventKey={5.3} className="background-white"><FaSignOut/> Sign out</MenuItem>
      </NavDropdown>
    );
    render() {
        return (
            <Navbar staticTop collapseOnSelect className="sticky">
              <Navbar.Header className="height-inherit">
                <Navbar.Brand>
                  <a href="#brand" className="brand"><strong>fund$</strong></a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse className="height-inherit">
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
                  { this.props.user == null ? this.signin() : this.signout() }
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;
