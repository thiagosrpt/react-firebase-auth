import React, { useContext, useState, useRef } from "react";
import { UserContext } from "./UserContext";

//boostrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import './style.css';

const Deposit = () => {

  const userContext = useContext(UserContext)
  const amountField = useRef("0");
  console.log(userContext.userInfo)
  const [statusMessage, setStatusMessage] = useState('');
  const [validationMessage, setValidationMsg] = useState('');
  const [currentAmount, setCurrentAmount] = useState(() => {
    const firebaseUser = firebase.auth().currentUser;
    if (firebaseUser) {
      firebase
        .database()
        .ref("users/" + firebaseUser.uid)
        .once("value")
        .then(function (snapshot) {
          const userData = snapshot.val();
          setCurrentAmount(userData.balance);
        })
        .catch(function (error) {
          console.error("Error retrieving data: ", error);
        });
    } else {
    }
  });
  
  
  const handleTimeOut = (type, message) => {
    if (type === "error") {
      setValidationMsg(message)
      setTimeout(() => setValidationMsg(false), 3000);
    }
    if (type === "success") {
      setStatusMessage(message)
      setTimeout(() => setStatusMessage(false), 3000);
    }
  }
  
  
  const handleValidation = (amount) => {
    if (parseFloat(amount) <= 0) {
      handleTimeOut("error", "0 or negative values are not allowed.")
      return;
    }
    if (!amount) {
      handleTimeOut("error", "Please, enter a proper amount.")
      return;
    }
    return true;
  }
  
  
  const handleDeposit = (e) => {
    e.preventDefault();
    const { amount } = e.target.elements;
    if(handleValidation(amount.value)) {
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
              amountField.current.value = '0';
              handleTimeOut("success", "Deposit has been successfully processed.");
            })
            .catch(function(error) {
              console.error("Error updating balance: ", error);
              handleTimeOut("error", "Operation did not succeed");
            });
        } else {
          console.error("User not logged in.");
        }
    }
  }
  
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
                      <Form.Control type="number" step="any" placeholder="0" name="amount" ref={amountField}/>
                    </Form.Group>
                    <Button variant="success" type="submit">
                      Deposit Funds
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              {statusMessage ? <div class="msg alert alert-success">{statusMessage}</div> : ''}
              {validationMessage ? <div class="msg alert alert-danger">{validationMessage}</div> : ''}
            </div>
          )}
        </>
      );
    };
  
  export default Deposit;