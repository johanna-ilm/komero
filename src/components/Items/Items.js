import React from 'react';
import { Link } from 'react-router-dom';

import './Items.css';
import { categories, topCategory } from '../ItemForm/itemFormData';

import Content from '../Content/Content';
import ItemFilter from '../ItemFilter/ItemFilter';

import { FloatingButton } from '../buttons';


// Komponentti, joka näyttää tietokantaan tallennetun filtteröidyn datan Content- ja ItemFilter-komponenttien avulla
function Items(props) {

  // URLin kääntäminen sivun otsikoksi:

  // otetaan talteen etusivulla (Home-komponentissa) valittu url propseista
  const url = props.match.params.selectedCategory;

  // haetaan kyseisen url-osoitteen indeksi itemFormData.js-tiedoston oliosta (joko categories tai topCategory)
  const index = url === "koko_komero" ? topCategory.findIndex(item => item.url === url) : categories.findIndex(item => item.url === url);

  // haetaan valittu vaatekategoria otsikkoon
  const category = url === "koko_komero" ? topCategory[index].category : categories[index].category;


  return (
    <Content>
      <div className="items__header">
        {/* Sivun otsikkona valittu vaate/välinekategoria */}
        <h2 className="items__header-h2">{category}</h2>
      </div>
      {/* Tuodaan ItemFilter-komponentti. Annetaan propseiksi filtteröimätön data, 
        valittu vaate/välinekategoria ja url, jolla tälle sivulle on saavuttu */}
      <ItemFilter data={props.data} category={category} url={url} />

      {/* Floating Action Button - vie lisäyssivulle (AddItem-komponentti) */}
      <div className="items__wrapper">
        <div className="items__fab-wrapper">
          <Link to="/add"><FloatingButton>+</FloatingButton></Link>
        </div>
      </div>

    </Content >
  );
}

export default Items;