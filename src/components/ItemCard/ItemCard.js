import React from 'react';
import { Link } from 'react-router-dom';

import './ItemCard.css';

import ArrowRight from '@material-ui/icons/ArrowRight';

function ItemCard(props) {

  // Jos vaatteelle/välineelle annettu väri on valkoinen (tai ei mikään), väripalluran ympärille tulee harmaa reunaviiva
  const colorDotClassName = props.data.vari === "#ffffff" ? "itemcard__color-dot itemcard__color-dot--border" : "itemcard__color-dot";

  // Huomioita-div tulee näkyviin vain, jos huomioita on
  const notes = props.data.huomioita ?
    <div className="itemcard__notes">{props.data.huomioita}</div> : "";


  return (
    <div className="itemcard">

      <div className="itemcard__color-div itemcard__flex">
        <div className="itemcard__color">
          <div className={colorDotClassName} style={{ backgroundColor: props.data.vari }}></div>
        </div>
      </div>

      <div className="itemcard__label-notes-div itemcard__flex">
        <div className="itemcard__label">{props.data.nimike}</div>
        {notes}
        <div className="itemcard__label-notes-div--margin"></div>
      </div>

      <div className="itemcard__size-div itemcard__flex">
        <div className="itemcard__size">{props.data.koko === 999 ? "Muu" : props.data.koko}</div>
      </div>

      <div className="itemcard__link itemcard__flex">
        <Link to={"/edit/" + props.data.id}><ArrowRight /></Link>
      </div>

    </div>
  );
}

export default ItemCard;