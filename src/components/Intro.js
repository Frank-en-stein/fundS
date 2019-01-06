import React, { Component } from 'react';
import './../App.css';
import { Button } from 'react-bootstrap';
import NavigationBar from './NavigationBar';

class Intro extends Component {
    render() {
        return (
            <div>
                <NavigationBar
                    user={this.props.user}
                    setUser={this.props.setUser}
                    handleSignInClick={(e) => this.props.handleSignInClick(e)}
                    handleNewLoanClick={(e) => this.props.handleNewLoanClick(e)}
                />
                <header className="App-header App-bg">
                    <div className="intro">
                        <blockquote className="blockquote bg-info intro-sub-online">
                            <div>
                                One stop funding solution for small businesses
                                <footer>All online, in a flash</footer>
                            </div>
                        </blockquote>
                        <div className="intro-sub">
                        <p className="text-danger intro-sub-content">Apply</p>
                        <p className="text-info intro-sub-content">Get <strong>fund$</strong></p>
                        <p className="text-success intro-sub-content">Repay</p>
                        </div>
                        <Button bsSize="large" bsStyle="warning" className="get-started-btn" onClick={()=>this.props.user===null ? this.props.handleSignInClick() : this.props.handleNewLoanClick()}>
                            <strong>Get started now></strong>
                        </Button>
                    </div>
                </header>
            </div>
        );
    }
}

export default Intro;
