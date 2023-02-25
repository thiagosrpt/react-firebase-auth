import React, { useState, useEffect   } from "react";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";




const BalanceHistory = () => {
    const [history, setHistory] = useState([]);
  
    useEffect(() => {
      const user = firebase.auth().currentUser;
  
      const historyRef = firebase.database().ref(`transactionHistory/${user.uid}`);
      historyRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const sortedHistory = Object.keys(data)
            .sort((a, b) => {
              // sort by timestamp in descending order
              const timeA = data[a].timeStamp;
              const timeB = data[b].timeStamp;
              return new Date(`1970/01/01 ${timeB}`).getTime() - new Date(`1970/01/01 ${timeA}`).getTime();
            })
            .map((key) => ({ ...data[key], id: key }));
  
          setHistory(sortedHistory);
        } else {
          setHistory([]);
        }
      });
  
      return () => {
        historyRef.off();
      };
    }, []);
  
    return (
      <div >
        <h3>Transaction History</h3>
        <div style={{maxHeight: 500, width: "100%", overflowY: "scroll"}}>
          {history.map((transaction) => (
            <div key={transaction.id} className={"transactions " + transaction.operation}>
                    <div style={{fontSize: 14}}>{transaction.date}</div>
                    <div style={{display: "flex", minWidth: 100, justifyContent: "flex-start"}}>$ {transaction.balance.toFixed(2)}</div>
            </div>
              ))}
        </div>
      </div>
    );
  };
  

export default BalanceHistory;
