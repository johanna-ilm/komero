import React, { useState } from 'react';
import { withRouter } from 'react-router';
import uuid from 'uuid';

import './ItemForm.css';
import { categories, clothingSizes, shoeSizes, accessoriesSizes } from './itemFormData';

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
            ostovuosi: new Date().getFullYear().toString(),
            ostopaikka: "",
            huomioita: ""
        });

    // Etsii valitun kategorian indeksin itemFormData-tiedoston listasta (käytetään urlin hakemiseen, kun lomake on palautettu)
    const index = categories.findIndex(item => item.category === data.kategoria);

    // Jos valittu kategoria on asusteet, käytetään asustekokoja. Kengät tai kausivälineet -> kenkäkokoja. Muuten vaatekokoja.
    const sizeOptionList = (data) => {
        if (data.kategoria === "Asusteet") {
            return accessoriesSizes;
        } else if (data.kategoria === "Kengät" || data.kategoria === "Kausivälineet") {
            return shoeSizes;
        } else {
            return clothingSizes;
        }
    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleCancel = e => {
        e.preventDefault();
        props.history.goBack();
    }

    const handleSubmit = e => {
        e.preventDefault();
        let newData = Object.assign({}, data);
        newData.koko = parseInt(newData.koko);
        newData.ostohinta = parseFloat(newData.ostohinta);
        newData.id = newData.id ? newData.id : uuid.v4();
        props.onFormSubmit(newData);
        props.history.push("/list/" + categories[index].url);
    }

    const handleItemDelete = e => {
        e.preventDefault();
        props.onDeleteItem(data.id);
        props.history.push("/list/" + categories[index].url);
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
                        <label htmlFor="nimike">Nimike:</label>
                        <input
                            type="text"
                            name="nimike"
                            spellCheck="false"
                            className="itemform__div--bold"
                            value={data.nimike}
                            onChange={handleInputChange}
                            required />
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
                    <div className="itemform__row-2cells">
                        <label htmlFor="itemSize">Koko:</label>
                        <select
                            name="koko"
                            value={data.koko}
                            onChange={handleInputChange}
                            required>
                            {/* Jos valittu kategoria on asusteet, käytetään asustekokoja. Kengät tai kausivälineet -> kenkäkokoja. Muuten vaatekokoja. */}
                            <option value="" disabled>Valitse koko</option>
                            {sizeOptionList(data).map(item =>
                                <option value={item.optionValue} key={item.optionLabel}>{item.optionLabel}</option>
                            )
                            }
                        </select>
                    </div>
                    <div className="itemform__row-2cells">
                        <label htmlFor="kausi">Kausi:</label>
                        <select
                            name="kausi"
                            value={data.kausi}
                            onChange={handleInputChange}
                            required>
                            <option value="" disabled>Valitse kausi</option>
                            <option value="Kesä">Kesä</option>
                            <option value="Välikausi">Välikausi</option>
                            <option value="Talvi">Talvi</option>
                        </select>
                    </div>
                </div>

                <div className="itemform__row">
                    <div>
                        <label htmlFor="ostohinta">Ostohinta (€):</label>
                        <input
                            type="number"
                            name="ostohinta"
                            step="0.01"
                            value={data.ostohinta}
                            onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="itemPurchaseYear">Ostovuosi:</label>
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
                            spellCheck="false"
                            value={data.ostopaikka}
                            onChange={handleInputChange} />

                    </div>
                </div>

                <div className="itemform__row">
                    <div>
                        <label htmlFor="huomioita">Huomioita:</label>
                        <textarea
                            name="huomioita"
                            rows="3"
                            spellCheck="false"
                            value={data.huomioita}
                            onChange={handleInputChange} >
                        </textarea>
                    </div>
                </div>

                <div className="itemform__button-row">
                    <div>
                        <Button onClick={handleCancel} secondary>Peruuta</Button>
                    </div>
                    <div>
                        <Button type="submit" primary>{data.id ? "Tallenna" : "Lisää"}</Button>
                    </div>
                    {props.onDeleteItem ?
                        <div>
                            <Button onClick={handleItemDelete} secondary>Poista</Button>
                        </div>
                        : ""}
                </div>

            </div>
        </form>

    );


}

export default withRouter(ItemForm);