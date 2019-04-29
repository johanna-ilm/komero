import React from 'react';
import './ItemHeader.css';

import jacket from '../../images/jacket.png';

function ItemHeader(props) {
    return (
        <div className="itemheader">
            <div className="itemheader__container">
                <img src={jacket} alt="takki" className="itemheader__logo" />
            </div>
            <h2>Takit</h2>
        </div>
    );
}

export default ItemHeader;