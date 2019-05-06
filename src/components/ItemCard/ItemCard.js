import React from 'react';
import { Link } from 'react-router-dom';

import './ItemCard.css';
import { seasons } from '../ItemForm/itemFormData';

import ArrowRight from '@material-ui/icons/ArrowRight';

function ItemCard(props) {

  const indexSeasons = seasons.findIndex(item => item.season === props.data.kausi);
  const imgsrcSeason = seasons[indexSeasons].imgsrc;

  return (
    <div className="itemcard">
      <div className="itemcard__color-size-div itemcard__flex">
        <div className="itemcard__color"><div style={{ backgroundColor: props.data.vari }}></div></div>
        <div className="itemcard__size">{props.data.koko}</div>
      </div>
      <div className="itemcard__label-notes-div itemcard__flex">
        <div className="itemcard__label">{props.data.nimike}</div>
        <div className="itemcard__notes">{props.data.huomioita}</div>
      </div>
      <div className="itemcard__symbols  itemcard__flex">
        <div className="itemcard__symbols-img-wrapper">
          <img src={imgsrcSeason}
            alt={props.data.kausi}
            title={props.data.kausi}
            className="itemcard__symbols-img" /></div>
      </div>
      <div className="itemcard__link  itemcard__flex">
        <Link to={"/edit/" + props.data.id}><ArrowRight /></Link>
      </div>
    </div>
  );
}

export default ItemCard;