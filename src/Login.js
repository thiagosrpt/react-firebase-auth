import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "firebase/auth";
import { FcGoogle } from 'react-icons/fc';

import {handleGoogleSignUp} from './googleAuth'

const Login = ({ history }) => {

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (

      <>
        <div>
          <Card style={{ width: '28rem'}}>
            <Card.Header>Login</Card.Header>
            <Card.Body>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control type="email" name="email" placeholder="Enter email" />
                  <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <div>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                  <Button variant="light" onClick={handleGoogleSignUp}>
                    Login with <FcGoogle />
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </>
  );
};

export default withRouter(Login);
