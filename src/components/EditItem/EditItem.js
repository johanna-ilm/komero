import React from 'react';

import Content from '../Content/Content';
import ItemForm from '../ItemForm/ItemForm';

import './EditItem.css';

function EditItem(props) {

    const index = props.data.findIndex(item => item.id === props.match.params.id);

    let itemData = props.data[index];

    return (
        <Content>
            <div className="edititem">
                <div className="edititem__header">
                    <h2>Muokkaa tietoja</h2>
                </div>
                <ItemForm
                    onFormSubmit={props.onFormSubmit}
                    data={itemData}
                    onDeleteItem={props.onDeleteItem} />
            </div>

        </Content >
    );
}

export default EditItem;