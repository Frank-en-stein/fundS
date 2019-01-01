import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import SignInModal from './components/SignInModal';
import Intro from './components/Intro';

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShowSignInModal = this.handleShowSignInModal.bind(this);
        this.handleCloseSignInModal = this.handleCloseSignInModal.bind(this);

        this.state = {
          showSignInModal: false,
          user: null
        };
    }
    handleCloseSignInModal() {
        this.setState({ showSignInModal: false });
    }
    handleShowSignInModal() {
        this.setState({ showSignInModal: true });
    }
    setUser(fetchedUser) {
      this.setState({ user: fetchedUser });
      console.log(this.state.user._profile.profilePicURL);
    }
  render() {
    return (
      <div className="App">
        <NavigationBar user={this.state.user} handleSignInClick={() => this.handleShowSignInModal()}/>
        <SignInModal show={this.state.showSignInModal} handleClose={() => this.handleCloseSignInModal()} setUser={(user) => this.setUser(user)}/>
        <Intro/>
      </div>
    );
  }
}

export default App;
