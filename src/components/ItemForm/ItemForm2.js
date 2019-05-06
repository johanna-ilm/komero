import React, { useState } from 'react';
import { withRouter } from 'react-router';
import uuid from 'uuid';

import './ItemForm.css';
import categories, { clothingSizes, shoeSizes } from './itemFormData';

import Button from '../buttons';


function ItemForm(props) {

    const [data, setData] = useState(
        props.data ? props.data : {
            kategoria: "",
            nimike: "",
            koko: "",
            vari: "#ffffff",
            kausi: "",
            ostohinta: 0,
            ostovuosi: "",
            ostopaikka: "",
            huomioita: ""
        })


    // Jos valittu kategoria on kengät tai kausivälineet, koon valinnassa käytetään kenkäkokoja (muuten vaatekokoja)


    const handleInputChange = e => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleCancel = e => {
        e.preventDefault();
        props.history.goBack();
    }

    const handleSubmit = e => {
        e.preventDefault();
        let newData = Object.assign({}, data);
        newData.ostohinta = parseFloat(newData.ostohinta);
        newData.id = newData.id ? newData.id : uuid.v4();
        props.onFormSubmit(newData);
        props.history.push("/");
    }

    const handleItemDelete = e => {
        e.preventDefault();
        props.onDeleteItem(data.id);
        props.history.push("/");
    }



    return (
        <form onSubmit={handleSubmit}>
            <div className="itemform">

                <div className="itemform__categorybar">
                    {/* Mäpätään categories-objektien arvot radio buttoneiksi. Varsinaiset radio buttonit piilotettu tyylimääritteissä.*/}
                    {categories.map(item =>
                        <label key={item.category}>
                            <div className="itemform__categorywrapper">
                                <input
                                    type="radio"
                                    name="kategoria"
                                    value={item.category}
                                    checked={data.kategoria === item.category}
                                    onChange={handleInputChange}
                                />
                                <img src={item.imgsrc} alt={item.category} title={item.category} />
                            </div>
                        </label>)
                    }

                </div>
                {/* Pyytää valitsemaan kategorian. Jos kategoria on jo valittu, kertoo valitun kategorian nimen.*/}
                <div className="itemform__categorylegend">{data.kategoria ? "Valittu kategoria: " + data.kategoria : "Valitse kategoria:"}</div>

                <div className="itemform__row">
                    <div>
                        <label htmlFor="nimike">nimike:</label>
                        <input
                            type="text"
                            name="nimike"
                            value={data.nimike}
                            onChange={handleInputChange} />
                    </div>
                    <div id="itemform__colorpicker">
                        <label htmlFor="vari">Väri:</label>
                        <input
                            type="color"
                            name="vari"
                            value={data.vari}
                            onChange={handleInputChange} />
                    </div>
                </div>

                <div className="itemform__row">
                    <div className="itemform__row__2cells">
                        <label htmlFor="itemSize">Koko:</label>
                        <select
                            name="koko"
                            value={data.koko}
                            onChange={handleInputChange}
                            required>
                            <option value="" disabled>Valitse koko</option>
                            {(data.kategoria === "Kengät" || data.kategoria === "Kausivälineet" ? shoeSizes : clothingSizes).map(item =>
                                <option value={item} key={item}>{item}</option>
                            )
                            }
                        </select>
                    </div>
                    <div className="itemform__row__2cells">
                        <label htmlFor="kausi">Kausi:</label>
                        <select
                            name="kausi"
                            value={data.kausi}
                            onChange={handleInputChange}
                            required>
                            <option value="" disabled>Valitse kausi</option>
                            <option value="kesa">Kesä</option>
                            <option value="valikausi">Välikausi</option>
                            <option value="talvi">Talvi</option>
                        </select>
                    </div>
                </div>

                <div className="itemform__row">
                    <div>
                        <label htmlFor="ostohinta">Ostohinta</label>
                        <input
                            type="number"
                            name="ostohinta"
                            step="0.01"
                            value={data.ostohinta}
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="itemPurchaseYear">Ostovuosi</label>
                        <input
                            type="text"
                            name="ostovuosi"
                            value={data.ostovuosi}
                            onChange={handleInputChange} />
                    </div>
                </div>

                <div className="itemform__row">
                    <div>
                        <label htmlFor="ostopaikka">Ostopaikka:</label>
                        <input
                            type="text"
                            name="ostopaikka"
                            value={data.ostopaikka}
                            onChange={handleInputChange} />

                    </div>
                </div>

                <div className="itemform__row">
                    <div>
                        <label htmlFor="huomioita">Huomioita:</label>
                        <textarea
                            name="huomioita"
                            value={data.huomioita}
                            onChange={handleInputChange} >
                        </textarea>
                    </div>
                </div>

                <div className="itemform__row">
                    <div>
                        <Button onClick={handleCancel}>PERUUTA</Button>
                    </div>
                    <div>
                        <Button type="submit" primary>{data.id ? "TALLENNA" : "LISÄÄ"}</Button>
                    </div>
                </div>

                {props.onDeleteItem ?
                    <div className="itemform__row">
                        <div>
                            <Button onClick={handleItemDelete}>POISTA</Button>
                        </div>
                        <div></div>
                    </div>
                    : ""}


            </div>
        </form>

    );


}

export default withRouter(ItemForm);