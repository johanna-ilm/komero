import React from 'react';
import './ItemCard.css';

function ItemCard(props) {
  return (
    <div className="itemcard">
      <div className="itemcard__row">
        <div className="itemcard__label">Reima toppatakki</div>
        <div className="itemcard__size">116 cm</div>
      </div>
      <div className="itemcard__row">
        <div className="itemcard__notes">-</div>
        <div className="itemcard__season">talvi</div>
      </div>
      <div className="itemcard__row">
        <div className="itemcard__year">2017</div>
        <div className="itemcard__price">110 €</div>
      </div>
    </div>
  );
}

export default ItemCard;