import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import app from "./base";
import { UserContext } from "./UserContext";

import Button from 'react-bootstrap/Button';

//Components
import Withdraw from "./Withdraw";
import Home from "./Home";
import Deposit from "./Deposit";
import Login from "./Login";
import SignUp from "./SignUp";


const App = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        firebase
          .database()
          .ref("users/" + firebaseUser.uid)
          .once("value")
          .then(function (snapshot) {
            const userData = snapshot.val();
            console.log({'id':firebaseUser.uid,'balance':userData.balance, 'email':userData.email, 'name':userData.name, 'lastName':userData.lastName})
            setUser({'id':firebaseUser.uid,'balance':userData.balance, 'email':userData.email, 'name':userData.name, 'lastName':userData.lastName});
          })
          .catch(function (error) {
            console.error("Error retrieving data: ", error);
          });
      } else {
        setUser(null);
      }
    });
  }, []);


  
  return (
    
    <AuthProvider>
      <Router>
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">BadBank</Navbar.Brand>
            <Nav className="me-auto">
              {user && (
                <>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>   
                  <Nav.Link as={Link} to="/deposit">Deposit</Nav.Link>
                  <Nav.Link as={Link} to="/withdraw">Withdraw</Nav.Link>
                </>
        
                )}

              {!user && (
                <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
              </>
                )}
            </Nav>
          </Container>
          <Container style={{justifyContent: "flex-end"}}>
            {user && (
              <>
                <span style={{color: "white", marginRight: 15}}>{user.email}</span>
                <Button variant="primary" onClick={() => app.auth().signOut()}>Sign Out</Button>
              </>
            )}
          </Container>
        </Navbar>
      </>
        <div style={{paddingTop: 80, display: "flex", justifyContent: "space-around"}}>
            <UserContext.Provider value={user}>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/deposit" component={Deposit} />
              <PrivateRoute exact path="/withdraw" component={Withdraw} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </UserContext.Provider>
        </div>
      </Router>
    </AuthProvider>

  );
};

export default App;