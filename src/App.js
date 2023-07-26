import { Component } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { firebaseApp, database, auth } from './fire';
import { ref, set } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
    email: '',
    uid: '',
  }

  handleSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(user => console.log(user))
      .catch(err => console.error(err));
  }

  handleLogin = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        const { uid: UID, email: userEmail } = user; // Rename to userEmail to avoid conflict
        this.setState({
          isLogginIn: true,
          email: userEmail,
          uid: UID,
        });
      })
      .catch(err => console.error(err));
  }


  render() {
    return (
      <div className="App" >
        <SignUpForm onSignUp={this.handleSignUp} />
        <LoginForm onLogin={this.handleLogin} />
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        {this.state.isLogginIn ?
          <p>You are loged in</p> :
          <p>You are not loged in</p>
        }
      </div>
    );
  }
}

export default App;
