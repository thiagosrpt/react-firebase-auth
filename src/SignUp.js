import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import "firebase/database";
import firebase from "firebase/app"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import "firebase/auth";
import { FcGoogle } from 'react-icons/fc';

import {handleGoogleSignUp} from './googleAuth'


const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password, name, lastName } = event.target.elements;
    try {
      const user = await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);

      // Save name and lastName to Firebase database
      firebase
        .database()
        .ref("users/" + user.user.uid)
        .set({
          name: name.value,
          lastName: lastName.value,
          email: email.value,
          balance: 0
        });

      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
      <div>
          <Card style={{ width: '28rem'}}>
            <Card.Header>Create Account</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-1" controlId="formBasicEmail">
                  <Form.Control type="name" name="name" placeholder="Name" required/>
                  <Form.Control type="lastName" name="lastName" placeholder="Last Name" required/>
                  <Form.Control type="email" name="email" placeholder="Email" required />
                  <Form.Control type="password" name="password" placeholder="Password" required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Create Account
                </Button>
                <Button variant="light" onClick={handleGoogleSignUp}>
                  Sign up with <FcGoogle />
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
  );
};

export default withRouter(SignUp);
