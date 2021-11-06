import styled from "styled-components"
import React from "react"
import logoURL from "../imageinfo"

import "./LoginPage.css";


function LoginPage(props) {

  const {
          email ,
          setEmail, 
          setPassword,
          password,
          handleLogin,
          handleSignup,
          hasAccount,
          setHasAccount,
          emailError,
          passwordError
        } = props;

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