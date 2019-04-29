import React from 'react';

import Content from '../Content/Content';
import ItemForm from '../ItemForm/ItemForm';

import './AddItem.css';

function AddItem(props) {
    return (
        <Content>
            <div className="additem">
                <h2>Lisää Komeroon</h2>
                <ItemForm />
            </div>

        </Content >
    );
}

export default AddItem;