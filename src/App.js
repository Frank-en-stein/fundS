import React, { Component } from 'react';
import Intro from './components/Intro';
import './App.css';
import NewLoanModal from './components/modals/NewLoanModal';
import SignInModal from './components/modals/SignInModal';
import MyApplications from './components/MyApplications';
import MyLoans from './components/MyLoans';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router'

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShowSignInModal = this.handleShowSignInModal.bind(this);
        this.handleCloseSignInModal = this.handleCloseSignInModal.bind(this);

        this.state = {
          showSignInModal: false,
          showNewLoanModal: false,
          newLoanModalTitle: "New loan application",
          user: null,
          myApplications: null,
          myLoans: null
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
      //console.log(this.state.user._profile);
    }

    renderIntroPage() {
        return (
            <Intro
                user={this.state.user}
                setUser={(user) => this.setUser(user)}
                handleSignInClick={(e) => this.handleShowSignInModal()}
                handleNewLoanClick={(e) => this.handleShowNewLoanModal()}
            />
        );
    }
    renderMyApplicationPage() {
        if (this.state.user === null) return <Redirect to="/" />;
        return (
            <MyApplications
                user={this.state.user}
                setUser={(user) => this.setUser(user)}
                handleSignInClick={(e) => this.handleShowSignInModal()}
                handleNewLoanClick={(e) => this.handleShowNewLoanModal()}
                applications={this.state.myApplications}
                setMyApplications={(data)=>this.setState({myApplications:  data})}
            />
        );
    }
    renderMyLoansPage() {
        if (this.state.user === null) return <Redirect to="/" />;
        return (
            <MyLoans
                user={this.state.user}
                setUser={(user) => this.setUser(user)}
                handleSignInClick={(e) => this.handleShowSignInModal()}
                handleNewLoanClick={(e) => this.handleShowNewLoanModal()}
                loans={this.state.myLoans}
                setMyLoans={(data)=>this.setState({myLoans: data})}
            />
        );
    }

  render() {
    return (
      <div className="App">
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
            addMyApplication={(data) => {
                    var applications = this.state.myApplications;
                    //console.log(applications);
                    if (applications !== null) {
                        applications.push(data);
                        this.setState({myApplications: applications});
                    }
                }
            }
        />
        <Router>
    		<Switch>
    			<Route exact path={'/'} 	render={() => this.renderIntroPage()} />
                <Route exact path={'/myApplications'} render={() => this.renderMyApplicationPage()} />
                <Route exact path={'/myLoans'} render={() => this.renderMyLoansPage()} />
    		</Switch>
    	</Router>
      </div>
    );
  }
}

export default App;
