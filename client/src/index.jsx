/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import NewBill from './components/NewBill';

const Button = styled.button`
  border: none;
  font-family: none;
  font-size: 2em;
  font-weight: bold;
  padding: 0;
  margin: 10px;
`;


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      window: '',
    };
    // this.escFunction = this.escFunction.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  // handleClick(e) {
  //   console.log(e);
  //   this.setState({
  //     window: '',
  //   });
  // }

  render() {
    const { window } = this.state;
    return (
      <div>
        {window === '' && (
          <div>
            <Button type="button" onClick={() => this.setState({ window: 'New Bill' })}>New Bill</Button>
            <br />
            <Button type="button" onClick={() => this.setState({ window: 'Join Bill' })}>Join Bill</Button>
            {/* <h1 onClick={this.handleClick}>New Bill</h1> */}
            {/* <h1>Join Bill</h1> */}
          </div>
        )}
        {window === 'New Bill' && (
          <NewBill />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
