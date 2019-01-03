import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Intro from './components/Intro';
import NewLoanModal from './components/modals/NewLoanModal';
import SignInModal from './components/modals/SignInModal';
import MyApplications from './components/MyApplications';
import MyLoans from './components/MyLoans';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, HashRouter, Redirect,BrowserHistory } from 'react-router-dom';
import { createHashHistory } from 'history';
export const history = createHashHistory();

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShowSignInModal = this.handleShowSignInModal.bind(this);
        this.handleCloseSignInModal = this.handleCloseSignInModal.bind(this);

        this.state = {
          showSignInModal: false,
          showNewLoanModal: false,
          newLoanModalTitle: "New loan application",
          user: null
        };
    }
    componentWillMount() {
        var user = JSON.parse(localStorage.getItem("user"));
        if(user!==null) this.setState({user: user});
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
      localStorage.setItem("user", JSON.stringify(fetchedUser));
      console.log(this.state.user._profile);
    }

  render() {
    return (
      <div className="App">
        <NavigationBar
            user={this.state.user}
            setUser={(user) => this.setUser(user)}
            handleSignInClick={() => this.handleShowSignInModal()}
            handleNewLoanClick={() => this.handleShowNewLoanModal()}
        />
        <SignInModal
            show={this.state.showSignInModal}
            handleClose={() => this.handleCloseSignInModal()}
            setUser={(user) => this.setUser(user)}
        />
        <NewLoanModal
            show={this.state.showNewLoanModal}
            handleClose={() => this.handleCloseNewLoanModal()}
            user={this.state.user}
            modalTitle={this.state.newLoanModalTitle}
        />
        <Router>
    		<Switch>
    			<Route exact path={'/'} 	render={() => <Intro handleNewLoanClick={() => this.handleShowNewLoanModal()}/>} />
                <Route exact path={'/home'} render={() => <Intro handleNewLoanClick={() => this.handleShowNewLoanModal()}/>} />
                <Route exact path={'/myApplications'} render={() => <MyApplications />} />
                <Route exact path={'/myLoans'} render={() => <MyLoans />} />
    		</Switch>
    	</Router>
      </div>
    );
  }
}

export default App;
