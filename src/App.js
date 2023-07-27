import { Component } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { firebaseApp, database, auth } from './fire';
import { ref, set } from 'firebase/database';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import 'bulma/css/bulma.css';
import SideBar from './SideBar';
import MainPanel from './MainPanel';

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
    rooms: {
      'hh12': {
        title: 'General',
        author: 'j@j.com',
        created: Date.now(),
      },
      'jj34': {
        title: 'Jokes',
        author: 'j@j.com',
        created: Date.now(),
      },
    },
    selectedRoom: 'hh12',
  }

  componentDidMount() {
    onAuthStateChanged(auth, user => {
      if (user) {
        const { email, uid } = user;
        this.setState({
          email,
          uid,
          isLogginIn: true
        })
      }
    });
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

  setRoom = (id) => {
    this.setState({
      selectedRoom: id
    })
  }

  render() {


    return (
      <div className="columns vh-100 is-gapless" >
        <SideBar logout={this.logout}
          rooms={this.state.rooms}
          selectedRoom={this.state.selectedRoom}
          setRoom={this.setRoom} />
        <MainPanel>
          {this.state.isLogginIn ?
            <div>Here are some messages</div> :
            <div>
              <SignUpForm onSignUp={this.handleSignUp} />
              <LoginForm onLogin={this.handleLogin} />
            </div>
          }
        </MainPanel>
      </div>
    );
  }
}

export default App;
