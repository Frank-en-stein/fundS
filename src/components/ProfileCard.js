import React, { Component } from 'react';
import './../App.css';

class ProfileCard extends Component {
    getProfilePicURL = () => (this.props.user !== null ? this.props.user._profile.profilePicURL:null)
    getProfileName = () => (this.props.user !== null ? this.props.user._profile.name:null)
    getProfileEmail = () => (this.props.user !== null ? this.props.user._profile.email:null)
    render() {
        return (
            <div className="profile-card">
                <div className="content-ver-center profile-card-img-container">
                    <img src={this.getProfilePicURL()} className="circle profile-card-img"/>
                </div>
                <div className="content-ver-center profile-card-info">
                    <span><strong>{this.getProfileName()}</strong></span>
                    <span className="italic">{this.getProfileEmail()}</span>
                </div>
            </div>
        );
    }
}
export default ProfileCard;
