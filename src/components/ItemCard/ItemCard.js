import React from 'react';
import { Link } from 'react-router-dom';

import './ItemCard.css';

import ArrowRight from '@material-ui/icons/ArrowRight';

function ItemCard(props) {

  return (
    <div className="itemcard">
      <div className="itemcard__group">
        <div className="itemcard__row">
          <div className="itemcard__label">{props.data.selite}</div>
          <div className="itemcard__size">{props.data.koko} cm</div>
          <div className="itemcard__color" style={{ backgroundColor: props.data.vari }}>Väri</div>
        </div>
        <div className="itemcard__row">
          <div className="itemcard__notes">{props.data.huomioita}</div>
          <div className="itemcard__season">{props.data.kausi}</div>
        </div>
        <div className="itemcard__row">
          <div className="itemcard__year">{props.data.ostovuosi}</div>
          <div className="itemcard__price">{props.data.ostohinta} €</div>
          <div className="itemcard__place">{props.data.ostopaikka}</div>
        </div>
      </div>

      <div className="itemcard__link">
        <Link to={"/edit/" + props.data.id}><ArrowRight /></Link>
      </div>
    </div>
  );
}

export default ItemCard;