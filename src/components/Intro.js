import React, { Component } from 'react';
import './../App.css';
import { Button } from 'react-bootstrap';

class Intro extends Component {
    render() {
        return (
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
                    <Button bsSize="large" bsStyle="warning" className="get-started-btn"><strong>Get started now></strong></Button>
                </div>
            </header>
        );
    }
}

export default Intro;
