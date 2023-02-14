import React, { useEffect, useContext, useState, useCallback } from "react";
import { UserContext } from "./UserContext";

//boostrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const Deposit = () => {

const userContext = useContext(UserContext)
console.log(userContext.userInfo)
const [currentAmount, setCurrentAmount] = useState(0);
const [status, setStatus] = useState(true)

useEffect(() => {
  const firebaseUser = firebase.auth().currentUser;
  if (firebaseUser) {
    firebase
      .database()
      .ref("users/" + firebaseUser.uid)
      .once("value")
      .then(function (snapshot) {
        const userData = snapshot.val();
        console.log(userData.balance)
        setCurrentAmount(userData.balance);
      })
      .catch(function (error) {
        console.error("Error retrieving data: ", error);
      });
  } else {
  }
});

const handleDeposit = useCallback(
  async event => {
    event.preventDefault();
    const { amount } = event.target.elements;
    const firebaseUser = firebase.auth().currentUser;
    if (firebaseUser) {
      firebase
        .database()
        .ref("users/" + firebaseUser.uid + "/balance")
        .transaction(function(currentBalance) {
          return currentBalance + parseFloat(amount.value);
        })
        .then(function(transactionResult) {
          const updatedBalance = transactionResult.snapshot.val();
          setCurrentAmount(updatedBalance);
          console.log("Deposit successful. Current balance: ", updatedBalance);
        })
        .catch(function(error) {
          console.error("Error updating balance: ", error);
        });
    } else {
      console.error("User not logged in.");
    }
  },
  [userContext.balance]
);


  return (
    <>
            {userContext && (
              <div>
                <Card>
                  <Card.Header>Your Current Balance is: <b>${ currentAmount }</b></Card.Header>
                  <Card.Body>
                  <Card.Title>Deposit</Card.Title>
                  <Form onSubmit={handleDeposit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="0" name="amount"/>
                    </Form.Group>
                    <Button variant="success" type="submit">
                      Send Deposit
                    </Button>
                  </Form>
                  </Card.Body>
                </Card>
            </div>

            
            )}
  </>
    );
  };

export default Deposit;
