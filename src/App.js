import './App.css';
import LoginPage from './Components/usersystem/LoginPage';
import MainPage from './Components/MainPage';
import React, { useState, useEffect } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase, { auth, db } from './Firebase/firebase';
import ListChannels from './Components/channel/ListChannels';
import { useCollection } from "react-firebase-hooks/firestore";


function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);



  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":

          case "auth/user-disabled":

          case "auth/user-not-found":

            setEmailError(err.message);
            break;

          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };
  let registerd = false;

  const handleSignup = () => {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
            setEmailError(err.message);
            break;

          case "auth/invalid-email":
            setEmailError(err.message);
            break;

          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });

    registerd = true;
  }

  const saveNewUserToDb = (user) => {
    db.collection('users').doc(user.uid).add({
      registerd: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.email,
      uid: user.uid,
      banned: 0,
      admin: 0,
      lastlogin: 0,
    });
  }
  /* UPDATE PROFILE INFO!
    const updateNewUserInDb = (user) => {
      // const user = firebase.auth().currentUser;
  
      user.updateProfile({
        displayName: "Lean",
        photoURL: "https://example.com/jane-q-user/profile.jpg",
        banned: 0,
        admin: 0,
      }).then(() => {
        console.log("update successfull!", user);
      }).catch((error) => {
        console.log("update failed", error);
      });
    } */
  const [users] = useAuthState(auth);
  useEffect(() => {
    if (users) {
      db.collection('users').doc(users.uid).set(
        {
          email: users.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: users.photoURL,
          banned: 0,
          admin: 0,
        },
        { merge: true }
      );
    }
  }, [users]);


  const handleLogout = () => {
    firebase.auth().signOut();
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (registerd) {
          registerd = false;
          saveNewUserToDb(user);
        }
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    })
  }


  const showChannels = () => {

  }

  useEffect(() => {
    authListener();
  })


  if (!user) return <LoginPage
    email={email}
    setEmail={setEmail}
    password={password}
    setPassword={setPassword}
    handleLogin={handleLogin}
    handleSignup={handleSignup}
    hasAccount={hasAccount}
    setHasAccount={setHasAccount}
    emailError={emailError}
    passwordError={passwordError}
  />

  return (
    <div>
      <MainPage useri={user} handleLogout={handleLogout} />
      {showChannels()}
    </div>
  )
}



export default App;
