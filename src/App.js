import { Component } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { firebaseApp, database, auth } from './fire';
import { ref, set } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import 'bulma/css/bulma.css';

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

  logout = (e) => {
    signOut(auth)
      .then(() => {
        this.setState({
          email: '',
          uid: '',
          isLogginIn: false,
        });
      });
  }

  render() {
    return (

      <div className="columns vh-100" >
        <div className='column is-3 hero is-primary is-paddingless'>
          <h1>Side Bar</h1>
          <div className='control'>
            <button onClick={this.logout} className='button is-fullwidth'>
              Log out
            </button>
          </div>
        </div>

        <div className='column hero'>
          <div className='hero-body'>
            <div className='columns is-centered'>
              <div className='ccolumn is-half'>
                <SignUpForm onSignUp={this.handleSignUp} />
                <LoginForm onLogin={this.handleLogin} />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
