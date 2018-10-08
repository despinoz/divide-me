/* eslint-env browser */
import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';
import BillDetail from './components/BillDetal';

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 7% 0;
`;

const Input = styled.input`
  width: ${props => (props.itemName ? '120px' : '40px')}};
`;

const ShareCode = styled.div`
  display: flex;
  justify-content: center;
`;

class NewBill extends React.Component {
  constructor() {
    super();
    this.state = {
      billId: '',
      itemModalIsOpen: false,
      name: '',
      quantity: 1,
      unitPrice: '',
      items: [],
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
    this.setState({ itemModalIsOpen: true });
  }

  closeModal() {
    this.setState({ itemModalIsOpen: false });
  }

  handleClick() {
    const {
      billId,
      name,
      quantity,
      unitPrice,
    } = this.state;
    if (name !== '' && unitPrice !== '') {
      axios.put(`/bill/${billId}`, {
        name,
        quantity,
        unitPrice,
      }).then(() => {
        this.setState({
          name: '',
          quantity: 1,
          unitPrice: '',
          itemModalIsOpen: false,
        });
        axios.get(`/bill/${billId}/items`).then(({ data }) => {
          this.setState({ items: data.items });
        });
      });
    }
  }

  handleChange(event) {
    if (event.target.id === 'name') {
      this.setState({ name: event.target.value });
    } else if (event.target.id === 'quantity') {
      this.setState({ quantity: event.target.value });
    } else if (event.target.id === 'unitPrice') {
      this.setState({ unitPrice: event.target.value * 100 });
    }
  }

  render() {
    const {
      billId,
      itemModalIsOpen,
      quantity,
      items,
    } = this.state;
    return (
      <div>
        <ShareCode>
          Share Code:
          {'  '}
          {billId}
        </ShareCode>
        <Modal
          isOpen={itemModalIsOpen}
          onRequestClose={this.closeModal}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              padding: '5px 20px',
            },
          }}
          shouldCloseOnOverlayClick={false}
        >
          <Flex>
            <Input itemName placeholder="Name" id="name" onChange={this.handleChange} />
            <Input value={quantity} id="quantity" onChange={this.handleChange} />
            <Input placeholder="0.00" id="unitPrice" onChange={this.handleChange} />
          </Flex>
          <Flex>
            <button onClick={this.closeModal} type="button">Cancel</button>
            <button onClick={this.handleClick} type="button">Save</button>
          </Flex>
        </Modal>
        <BillDetail items={items} />
        <button onClick={this.openModal} type="button">+ Add an Item</button>
      </div>
    );
  }
}

export default NewBill;
Modal.setAppElement(document.getElementById('app'));
