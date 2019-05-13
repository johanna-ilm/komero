import React from 'react';
import { Link } from 'react-router-dom';

import './ItemCard.css';

import ArrowRight from '@material-ui/icons/ArrowRight';
import { accessoriesSizes } from '../ItemForm/itemFormData';

function ItemCard(props) {

  // Jos vaatteelle/välineelle annettu väri on valkoinen (tai ei mikään), väripalluran ympärille tulee harmaa reunaviiva
  const colorDotClassName = props.data.vari === "#ffffff" ? "itemcard__color-dot itemcard__color-dot--border" : "itemcard__color-dot";

  // Huomioita-div tulee näkyviin vain, jos huomioita on
  const notes = props.data.huomioita ?
    <div className="itemcard__notes">{props.data.huomioita}</div> : "";

  // Haetaan asusteiden kokoja vastaavat näyttönimet itemFormData-tiedostosta (ja samalla kenkien ja vaatteiden koko "Muu" (9999)).
  let sizeLabel = props.data.koko;
  const indexOfSize = accessoriesSizes.findIndex(item => item.optionValue === parseInt(props.data.koko));
  if (indexOfSize > 0) {
    sizeLabel = accessoriesSizes[indexOfSize].optionLabel;
  };


  return (
    <div className="itemcard">

      <div className="itemcard__color-div itemcard__flex">
        <div className="itemcard__color">
          <div className={colorDotClassName} style={{ backgroundColor: props.data.vari }}></div>
        </div>
      </div>

      <div className="itemcard__label-notes-div itemcard__flex">
        <div className="itemcard__label">{props.data.nimike}</div>
        {/* Tähän väliin tulee tallennettuja huomioita, jos niitä on */}
        {notes}
        <div className="itemcard__label-notes-div--margin"></div>
      </div>

      <div className="itemcard__size-div itemcard__flex">
        <div className="itemcard__size">{sizeLabel}</div>
      </div>

      <div className="itemcard__link itemcard__flex">
        <Link to={"/edit/" + props.data.id}><ArrowRight /></Link>
      </div>

    </div>
  );
}

export default ItemCard;