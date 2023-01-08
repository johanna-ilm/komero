import React from 'react';

import Content from '../Content/Content';
import ItemForm from '../ItemForm/ItemForm';

import './AddItem.css';

// Komponentti, jolla lisätään uusi nimike tietokantaan. Koostuu Content- ja ItemForm-komponenteista.
function AddItem(props) {
    return (
        <Content>
            <div className="additem">
                {/*<div className="additem__header">
                    <h2>Lisää<br/>Komeroon</h2>
                </div>*}
                {/* Tuodaaan ItemForm-komponentti, jolle annetaan propseiksi App.js:ssä 
                määritelty funktio lomakkeen lähettämiseksi*/}
                <ItemForm onFormSubmit={props.onFormSubmit} />
            </div>

        </Content >
    );
}

export default AddItem;