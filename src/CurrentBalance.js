import React, { useState   } from "react";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";


const CurrentBalance = () => {

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


  return (<><span>${currentAmount}</span></>);
};

export default CurrentBalance;
