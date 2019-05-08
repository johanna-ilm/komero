import React from 'react';
import { Link } from 'react-router-dom';

import './Items.css';
import { categories, topCategory } from '../ItemForm/itemFormData';

import Content from '../Content/Content';
import ItemFilter from '../ItemFilter/ItemFilter';

import { FloatingButton } from '../buttons';


function Items(props) {

  // tuodaan valittu url
  const url = props.match.params.selectedCategory;

  // haetaan kyseisen url-osoitteen indeksi itemFormData.js-tiedoston oliosta
  const index = url === "koko_komero" ? topCategory.findIndex(item => item.url === url) : categories.findIndex(item => item.url === url);

  // haetaan valittu vaatekategoria otsikkoon
  const category = url === "koko_komero" ? topCategory[index].category : categories[index].category;



  return (
    <div>
      <Content>

        <div className="items__header">
          <h2 className="items__header-h2">{category}</h2>
        </div>

        <ItemFilter data={props.data} category={category} url={url} />

        <div className="items__wrapper">
          <div className="items__fab-wrapper">
            <Link to="/add"><FloatingButton>+</FloatingButton></Link>
          </div>
        </div>

      </Content >
    </div>
  );
}

export default Items;