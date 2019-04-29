import React from 'react';
import { Link } from 'react-router-dom';

import Content from '../Content/Content';
import ItemCard from '../ItemCard/ItemCard';
import ItemHeader from '../ItemHeader/ItemHeader';

import { FloatingButton } from '../buttons';


function Items(props) {
  return (
    <Content>
      <ItemHeader />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <Link to="/add"><FloatingButton secondary>+</FloatingButton></Link>
    </Content>

  );
}

export default Items;