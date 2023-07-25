import { Component } from 'react';
import SignUpForm from './SignUpForm';


class App extends Component {
  state = {
    hasSignedUp: false
  }

  handleSignUp = (e) => {
    e.preventDefault();
    this.setState(state => {
      const newState = Object.assign({}, state);
      newState.hasSignedUp = !newState.hasSignedUp;

      return newState;
    })

  }

  render() {
    return (
      <div className="App" >
        <SignUpForm onSignUp={this.handleSignUp} />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
