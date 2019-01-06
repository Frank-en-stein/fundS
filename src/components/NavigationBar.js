import React, { Component } from 'react';
import './../App.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import MyAccountButton from './form_items/MyAccountButton';
import { FaSignOut, FaDollar, FaList } from 'react-icons/lib/fa';
import { Link } from 'react-router-dom';
import requests from './../network/requests';


class NavigationBar extends Component {
    signin = () => (
    <NavItem eventKey={4} className="height-inherit btn-small btn-warning" onClick={() => this.props.handleSignInClick()}>
      <span className="text-white">+ Join</span>
    </NavItem>
    );
    account = () => (
      <NavDropdown
            eventKey={5}
            title={<MyAccountButton profilePicURL={this.props.user!=null ? this.props.user._profile.profilePicURL : null}/>}
            id="basic-nav-dropdown" className="btn-small btn-info">
        <MenuItem eventKey={5.1} className="background-white" onClick={() => this.props.handleNewLoanClick()}><FaDollar/> Apply for loan</MenuItem>
        <MenuItem eventKey={5.2} className="background-white" to="/myApplications" href="/myApplications" componentClass={Link}><FaList/> My applications</MenuItem>
        <MenuItem eventKey={5.3} className="background-white" to="/myLoans" href="/myLoans" componentClass={Link}><FaList/> My loans</MenuItem>
        <MenuItem eventKey={5.4} className="background-white" onClick={() => this.handleSignOut()}><FaSignOut/> Sign out</MenuItem>
      </NavDropdown>
    );
    handleSignOut = () => {
        requests.postSignOut(this.props.user, (isSuccess, newUser) => {
            if (isSuccess) {
                this.props.setUser(null);
                window.location = "/";
            } else alert("Sign out failed");
        });
    }
    render() {
        return (
            <Navbar staticTop collapseOnSelect className="sticky">
              <Navbar.Header className="height-inherit">
                <Navbar.Brand>
                  <Link className="brand" to="/" href="/"><strong>fund$</strong></Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse className="height-inherit">
                <Nav>
                  <NavItem eventKey={1} href="/" to="/" componentClass={Link}>
                    Home
                  </NavItem>
                  <NavItem eventKey={2} href="/fundCalculator" to="/fundCalculator" componentClass={Link}>
                    Calculator
                  </NavItem>
                </Nav>
                <Nav pullRight>
                  { this.props.user == null ? this.signin() : this.account() }
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;
