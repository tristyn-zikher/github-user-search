import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import Table from './Table/Table';
import './App.css';
import { GITHUB_BEARER_TOKEN, FIREBASE_CONFIG } from './config'
import * as firebase from 'firebase'

class App extends Component {
  constructor() {
    super();
    this.state = {
      alertMessage: {}
    }
    this.updateQuery = this.updateQuery.bind(this);
    this.searchForUser = this.searchForUser.bind(this);
    this.filterResults = this.filterResults.bind(this);
  }

  componentDidMount() {
    // initializes firebase then gets all current users
    firebase.initializeApp(FIREBASE_CONFIG);
    let firebaseHeadingRef = firebase.database().ref().child('usernames')
    firebaseHeadingRef.on('value', usernames => {
      let savedUsers = [];
      let users = usernames.val();
      // convert object received from DB to array for mapping
      for (let user in users) {
        savedUsers.push(users[user]);
      }
      savedUsers = savedUsers.reverse();
      console.log("SavedUsers: ", savedUsers)
      this.setState({ savedUsers })
    })
  }

  searchForUser(event) {
    event.preventDefault();
    let alertMessage = {
      message: 'Your search is empty.',
      type: 'error'
    }
    // if there the search string is empty it alerts the user their query is empty
    if (!this.state.searchQuery) {
      this.setState({ alertMessage });
      return;
    }
    fetch(`https://api.github.com/users/${this.state.searchQuery}`, {
      headers: {
        "Authorization": GITHUB_BEARER_TOKEN,
      }
    })
    .then((userInfo) => {
      return userInfo.json();
    })
    .then((userInfo) => {
      let firebaseRef = firebase.database().ref();
      let username = userInfo.login;
      // if a user is found, alert user the action was a success
      alertMessage.message = `User "${username}" added to the db.`;
      alertMessage.type = 'success';
      if (username) {
        firebaseRef.child('usernames').push(userInfo);
        this.setState({
          searchQuery: '',
          alertMessage
        });
      } else {
        // if user is not found, alert user there was an error adding user to DB
        alertMessage.message = `Error adding "${this.state.searchQuery}" to the db.`;
        alertMessage.type = 'error';
        this.setState({
          alertMessage
        });
      }
    })
  }

  filterResults(val) {
    let savedUsers = this.state.savedUsers;
    savedUsers = savedUsers.sort((a, b)=>{
      if (typeof a[val] === 'number') {
        return a[val] - b[val];
      }
      if (a[val] && b[val]) {
        if(a[val].toUpperCase() < b[val].toUpperCase()) { return -1; }
        if(a[val].toUpperCase() > b[val].toUpperCase()) { return 1; }
      }
      return 0;
    });
    this.setState({ savedUsers })
  }

  updateQuery(event) {
    let searchQuery = event.target.value;
    this.setState({ searchQuery });
  }

  render() {
    // generates alerts
    const GenerateMessage = () => {
      let alertMessage = this.state.alertMessage;
      if (alertMessage.type === 'success') return <h4 className="alert alert-success mt-2">{alertMessage.message}</h4>
      if (alertMessage.type === 'error') return <h4 className="alert alert-danger mt-2">{alertMessage.message}</h4>
      return <div></div>;
    }

    return (
      <div className="App container card mt-5">
        <SearchBar
          searchForUser={this.searchForUser}
          searchQuery={this.state.searchQuery}
          updateQuery={this.updateQuery}
        />
          <GenerateMessage />
        <Table onClick={this.filterResults} savedUsers={this.state.savedUsers} />
      </div>
    );
  }
}


export default App;
