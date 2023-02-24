import React, { useContext } from "react";
import { UserContext } from "./UserContext";
import CurrentBalance from "./CurrentBalance"

import "firebase/database";
import "firebase/auth";

//boostrap
import Card from 'react-bootstrap/Card';

const Home = () => {
  
  const userContext = useContext(UserContext)

  return (
  <>
    {userContext && (
      <div>
          <Card style={{ width: '32rem'}}>
            <Card.Body>
              <Card.Title>Capstone Bank</Card.Title>
              <Card.Text>
                  Welcome <strong>{ userContext.name }</strong>! Your current balance is <b><CurrentBalance /></b>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="https://media.istockphoto.com/id/1280155654/photo/financial-planning-family-mother-father-and-children-with-piggy-bank-at-home.jpg?s=612x612&w=0&k=20&c=3qAf4qjUeF2e4OOT5qlSGPgmop0_8OjzndeZ29BR8zc=" />
          </Card>
      </div>
      )}
</>
  );
};

export default Home;
