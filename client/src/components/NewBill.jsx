/* eslint-env browser */

import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';

const Input = styled.input`
  width: ${props => (props.itemName ? '140px' : '70px')}};
`;

class NewBill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billId: '',
      modalIsOpen: false,
      name: '',
      quantity: 1,
      unitPrice: '',
      bill: [],
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.post('/bill').then(({ data }) => {
      this.setState({
        billId: data,
      });
    });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleClick() {
    const {
      name,
      quantity,
      unitPrice,
      bill,
    } = this.state;
    bill.push(
      {
        id: bill.length,
        name,
        quantity,
        unitPrice,
      },
    );
    this.setState({
      name: '',
      quantity: 1,
      unitPrice: '',
      modalIsOpen: false,
    });
  }

  handleChange(event) {
    if (event.target.id === 'name') {
      this.setState({ name: event.target.value });
    } else if (event.target.id === 'quantity') {
      this.setState({ quantity: event.target.value });
    } else if (event.target.id === 'unitPrice') {
      this.setState({ unitPrice: event.target.value });
    }
  }

  render() {
    const {
      billId,
      bill,
      modalIsOpen,
      quantity,
    } = this.state;
    return (
      <div>
        <div>
          Share Code:
          {'  '}
          {billId}
        </div>
        {bill.length > 0 && (
          <div>{JSON.stringify(bill)}</div>
        )}
        <button onClick={this.openModal} type="button">+ Add an Item</button>
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={this.closeModal}
            style={{
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '75%',
              },
            }}
            shouldCloseOnOverlayClick={false}
          >
            <table>
              <tbody>
                <tr>
                  <td>
                    <Input itemName placeholder="Name" id="name" onChange={this.handleChange} />
                  </td>
                  <td>
                    <Input value={quantity} id="quantity" onChange={this.handleChange} />
                  </td>
                  <td>
                    <Input placeholder="0.00" id="unitPrice" onChange={this.handleChange} />
                  </td>
                </tr>
              </tbody>
            </table>
            <button onClick={this.closeModal} type="button">Cancel</button>
            <button onClick={this.handleClick} type="button">Save</button>
          </Modal>
        </div>
      </div>
    );
  }
}

export default NewBill;
Modal.setAppElement(document.getElementById('app'));
