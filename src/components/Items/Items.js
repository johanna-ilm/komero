import React from 'react';
import { Link } from 'react-router-dom';

import Content from '../Content/Content';
import ItemCard from '../ItemCard/ItemCard';
import ItemHeader from '../ItemHeader/ItemHeader';

import { FloatingButton } from '../buttons';


function Items(props) {

  let rows = props.data.map(item => {
    return (
      <ItemCard data={item} key={item.id} />
    )
  });

  return (
    <Content>
      <ItemHeader />
      {rows}
      <Link to="/add"><FloatingButton secondary>+</FloatingButton></Link>
    </Content>

  );
}

export default Items;