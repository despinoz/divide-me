/* eslint-env browser */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
  border: none;
  font-family: none;
  font-size: 2em;
  font-weight: bold;
  padding: 0;
  margin: 10px;
`;

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      // window: '',
    };
  }

  render() {
    return (
      <div>
        <Link to="/newBill">
          <Button type="button">
            New Bill
          </Button>
        </Link>
        <br />
        <Link to="/joinBill">
          <Button type="button">
            Join Bill
          </Button>
        </Link>
      </div>
    );
  }
}

export default Home;
