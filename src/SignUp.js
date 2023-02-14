import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import "firebase/database";
import firebase from "firebase/app"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

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
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" name="name" placeholder="" />
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="lastName" name="lastName" placeholder="" />
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" placeholder="" />
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
  );
};

export default withRouter(SignUp);
