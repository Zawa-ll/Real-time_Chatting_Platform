import { Component } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { firebaseApp, database } from './fire';
import { ref, set } from 'firebase/database';

const foodRef = ref(database, 'food');

const newFoodItem = {
  name: 'Pizza',
  price: 10
};


set(foodRef, newFoodItem)
  .then(() => {
    console.log('Data added successfully!');
  })
  .catch((error) => {
    console.error('Error adding data:', error);
  });


class App extends Component {


  state = {
    isLogginIn: false,
    email: ''
  }

  handleSignUp = (e) => {
    e.preventDefault();
    this.setState(state => {
      const newState = Object.assign({}, state);
      newState.hasSignedUp = !newState.hasSignedUp;

      return newState;
    })
  }

  handleLogin = (email) => {
    this.setState({
      isLogginIn: true,
      email,
    });
    console.log('App', this.state);
  }

  render() {
    return (
      <div className="App" >
        <SignUpForm onSignUp={this.handleSignUp} />
        <LoginForm onLogin={this.handleLogin} />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    );
  }
}

export default App;
