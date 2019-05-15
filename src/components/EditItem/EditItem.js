import React from 'react';

import Content from '../Content/Content';
import ItemForm from '../ItemForm/ItemForm';

import './EditItem.css';

// Komponentti, jolla muokataan nimikkeen tietoja. Koostuu Content- ja ItemForm-komponenteista.
function EditItem(props) {

    // Tuodaan propsien kautta muokattavan nimikkeen id ja etsitään sen indeksi props.datasta
    const index = props.data.findIndex(item => item.id === props.match.params.id);
    // Käytetään datana vain kyseisen nimikkeen dataa
    let itemData = props.data[index];

    return (
        <Content>
            <div className="edititem">
                <div className="edititem__header">
                    <h2>Muokkaa tietoja</h2>
                </div>
                {/* Tuodaaan ItemForm-komponentti, jolle annetaan propseiksi kyseisen nimikkeen data sekä 
                App.js:ssä määritellyt funktiot lomakkeen lähettämiseen ja nimikkeen poistamiseen */}
                <ItemForm
                    onFormSubmit={props.onFormSubmit}
                    data={itemData}
                    onDeleteItem={props.onDeleteItem} />
            </div>

        </Content >
    );
}

export default EditItem;