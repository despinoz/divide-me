import React from 'react';
import styled from 'styled-components';

const ListItem = styled.div`
  display: flex;
  justify-content: space-around;
`;

class BillDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // items: items,
    };
  }

  render() {
    const { items } = this.props;
    return (
      <div>
        {items.map(item => (
          <ListItem key={item._id}>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
            <p>{item.unitPrice / 100}</p>
            <p>{item.unitPrice * item.quantity / 100}</p>
          </ListItem>
        ))}
      </div>
    );
  }
}

export default BillDetail;
