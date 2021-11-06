import styled from "styled-components"
import logoURL from "../imageinfo"
import React, { useState, useEffect } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase, { auth, db } from '../Firebase/firebase';

import "./LoginPage.css";


function LoginPage(props) {

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
      
      
      
      
        useEffect(() => {
          authListener();
        })
      

  return (
    <Container>
    <InfoText>
        <h4>Please be aware that this is in Alpha and under construction</h4>
    </InfoText>
    <LoginContainer>
      <Logo src={logoURL} /> 
        <label className="login-text-info">Email Address</label>
        <input type="text" 
        autoFocus required 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        />
        <p className="errormsg">{emailError}</p>
        <label className="login-text-info">Password</label>
        <input type="password" 
        required value={password}
        onChange={e => setPassword(e.target.value)}
        />
        <p className="errormsg">{passwordError}</p>
        {hasAccount ? (
                    <>
                    <button onClick={handleSignup}>Registrera Konto</button>
                    <p>Har du redan ett konto?<span className="acc-info" onClick={() => setHasAccount(!hasAccount)}> Logga in</span></p>
                  </>
        ) : (
          <>
            <button onClick={handleLogin}>Logga in</button>
            <p>Har du inget konto? <span className="acc-info"
            onClick={() => setHasAccount(!hasAccount)}>
              
              Registrera nytt konto</span></p>
          </>
        )}
    </LoginContainer>
    <p>This App (VOIP2G) is being developed by Lean</p>
    </Container>

  )
}

export default LoginPage;



const InfoText = styled.div`
  color:white;
  text-align:center;
`;

const Container = styled.div`
display: grid;
place-items: center;
height: 60vh;
background-color: #081620;
`;

const LoginContainer = styled.div`
  padding: 100px;
  display:flex;
  flex-direction: column;
  align-items: center;
  background-color:#14364e;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7)
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;