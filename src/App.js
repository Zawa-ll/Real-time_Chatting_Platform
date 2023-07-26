import { Component } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { firebaseApp, database, auth } from './fire';
import { ref, set } from 'firebase/database';
import { createUserWithEmailAndPassword } from 'firebase/auth';

// const foodRef = ref(database, '/foods');

// const newFoodItem = {
//   name: 'Apple Pies',
//   price: 10
// };


// set(foodRef, newFoodItem)
//   .then(() => {
//     console.log('Data added successfully!');
//   })
//   .catch((error) => {
//     console.error('Error adding data:', error);
//   });


class App extends Component {
  state = {
    isLogginIn: false,
    email: ''
  }

  handleSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(user => console.log(user))
      .catch(err => console.log(err));
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
