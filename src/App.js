import React, { Component } from 'react';
import './App.css';
import brightness1 from 'react-icons/lib/md';
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
  render() {
    return (
      <div className="App">
        <NavigationBar handleSignInClick={() => this.handleShowSignInModal()}/>
        <SignInModal show={this.state.showSignInModal} handleClose={() => this.handleCloseSignInModal()}/>
        <Intro/>
      </div>
    );
  }
}

export default App;
