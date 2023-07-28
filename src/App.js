import { Component } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { firebaseApp, database, auth } from './fire';
import { get, push, ref, set, onValue, orderByChild, query, equalTo } from 'firebase/database';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import 'bulma/css/bulma.css';
import SideBar from './SideBar';
import MainPanel from './MainPanel';
import ChatPanel from './ChatPanel';
import { messageRef, roomRef } from './fire';

class App extends Component {
  state = {
    isLogginIn: false,
    wantsToLogin: true,
    email: '',
    uid: '',
    rooms: {},
    selectedRoom: '',
    messages: {}
  }

  loadData = () => {
    onValue(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        const rooms = snapshot.val();
        console.log(rooms);
        const selectedRoom = Object.keys(rooms)[0]; // Get the first room key
        this.setState({
          rooms: rooms,
          selectedRoom: selectedRoom, // Set the selectedRoom state to the first room
        });
        this.loadMessages(selectedRoom); // Load messages for the first room
      } else {
        console.log("No data available");
      }
    }, {
      onlyOnce: false,
      // Optional: To fetch data only once initially, remove this line if you want real-time updates.
    });
  };



  loadMessages = (selectedRoom) => {

    if (selectedRoom) {
      const messagesQuery = query(messageRef, orderByChild('roomId'), equalTo(selectedRoom));

      onValue(
        messagesQuery,
        (snapshot) => {
          if (snapshot.exists()) {
            const messages = snapshot.val();
            console.log(messages);
            this.setState({ messages });
          } else {
            console.log("No messages available for the selected room");
            this.setState({ messages: {} }); // Set messages to an empty object if no messages found
          }
        },
        {
          onlyOnce: false
          // Optional: To fetch data only once initially, remove this line if you want real-time updates.
        }
      );
    }
  };



  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid } = user;
        this.setState({
          email,
          uid,
          isLogginIn: true,
        });
        this.loadData();
        this.loadMessages(this.state.selectedRoom); // Load messages for the initially selected room
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
    });

    this.loadMessages(id); // Call loadMessages to fetch messages for the selected room
  }


  sendMessage = (message) => {
    const newMessageRef = push(messageRef); // Create a new unique reference with push()

    set(newMessageRef, message)
      .then(() => {
        console.log('Message sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  addRoom = (roomName) => {
    const room = {
      author: this.state.uid,
      name: roomName,
      create: Date.now(),
    };

    if (!roomRef) {
      console.error('roomRef is not defined. Check your Firebase initialization.');
      return;
    }

    const newRoomRef = push(roomRef); // Create a new unique reference with push()

    set(newRoomRef, room)
      .then(() => {
        console.log('New room added successfully!');
      })
      .catch((error) => {
        console.error('Error adding new room:', error);
      });
  };




  render() {
    return (

      <div className="columns vh-100 is-gapless" >
        <SideBar logout={this.logout}
          rooms={this.state.rooms}
          selectedRoom={this.state.selectedRoom}
          setRoom={this.setRoom}
          addRoom={this.addRoom} />
        {this.state.isLogginIn ?
          <MainPanel>
            <ChatPanel messages={this.state.messages}
              roomId={this.state.selectedRoom}
              email={this.state.email}
              uid={this.state.uid}
              sendMessage={this.sendMessage}
            />
          </MainPanel>
          : <MainPanel>{
            this.state.wantsToLogin ?
              <LoginForm onLogin={this.handleLogin}
                goToSignUp={() => this.setState({ wantsToLogin: false })} /> :
              <SignUpForm onSignUp={this.handleSignUp}
                goToLogIn={() => this.setState({ wantsToLogin: true })} />
          }</MainPanel>
        }
      </div>
    );
  }
}

export default App;
