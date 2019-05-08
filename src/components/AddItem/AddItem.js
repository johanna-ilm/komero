import React from 'react';

import Content from '../Content/Content';
import ItemForm from '../ItemForm/ItemForm';

import './AddItem.css';

function AddItem(props) {
    return (
        <Content>
            <div className="additem">
                <div className="additem__header">
                    <h2>Lisää Komeroon</h2>
                </div>
                <ItemForm onFormSubmit={props.onFormSubmit} />
            </div>

        </Content >
    );
}

export default AddItem;