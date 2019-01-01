import React, { Component } from 'react';
import './../App.css';

class MyAccountButton extends Component {
    render() {
        return (
            <span className="text-white">
                <img href="#" alt="ProPic" src={this.props.profilePicURL} className="circle my-account-btn-pic"/> My Account
            </span>
        );
    }
}

export default MyAccountButton;