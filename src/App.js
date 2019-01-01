import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import SignInModal from './components/SignInModal';
import Intro from './components/Intro';
import NewLoanModal from './components/NewLoanModal';

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShowSignInModal = this.handleShowSignInModal.bind(this);
        this.handleCloseSignInModal = this.handleCloseSignInModal.bind(this);

        this.state = {
          showSignInModal: false,
          showNewLoanModal: false,
          user: null
        };
    }
    handleCloseSignInModal() {
        this.setState({ showSignInModal: false });
    }
    handleShowSignInModal() {
        this.setState({ showSignInModal: true });
    }
    handleCloseNewLoanModal() {
      this.setState({ showNewLoanModal: false });
    }
    handleShowNewLoanModal() {
        this.setState({ showNewLoanModal: true });
    }
    setUser(fetchedUser) {
      this.setState({ user: fetchedUser });
      console.log(this.state.user._profile.profilePicURL);
    }
  render() {
    return (
      <div className="App">
        <NavigationBar user={this.state.user} handleSignInClick={() => this.handleShowSignInModal()} handleNewLoanClick={() => this.handleShowNewLoanModal()}/>
        <SignInModal show={this.state.showSignInModal} handleClose={() => this.handleCloseSignInModal()} setUser={(user) => this.setUser(user)}/>
        <NewLoanModal show={this.state.showNewLoanModal} handleClose={() => this.handleCloseNewLoanModal()} user={this.state.user}/>
        <Intro handleNewLoanClick={() => this.handleShowNewLoanModal()}/>
      </div>
    );
  }
}

export default App;
