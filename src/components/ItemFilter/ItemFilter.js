import React, { useState } from 'react';

import ItemCard from '../ItemCard/ItemCard';

import './ItemFilter.css';
import { seasons, shoeSizes, clothingSizes } from '../ItemForm/itemFormData';

function ItemFilter(props) {

    const [filter, setFilter] = useState(
        {
            kausi: "",
            koko: ""
        }
    );

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    }

    const handleClearSizeFilter = e => {
        e.preventDefault();
        setFilter({ ...filter, koko: "" })
    }


    // filtteröidään näkyviin vain se data, joka edustaa valittua vaatekategoriaa (tai näytetään kaikki)
    let data = props.url === "koko_komero" ? props.data : props.data.filter(item => item.kategoria === props.category);

    // sortataan data koon mukaan nousevaan järjestykseen
    data = data.sort((a, b) => a.koko - b.koko);


    // filtteröidään vaatteet valitun kauden mukaan (tai näytetään kaikki)
    data = filter.kausi ? data.filter(item => item.kausi === filter.kausi) : data;

    // filtteröidään vaatteet valitun koon mukaan (tai näytetään kaikki)
    data = filter.koko ? data.filter(item => parseInt(item.koko) === parseInt(filter.koko)) : data;

    let rows = data.map(item => {
        return (
            <ItemCard data={item} key={item.id} />
        )
    });

    return (
        <div>
            <div className="items__filter-top-wrapper">

                <div className="items__filter-wrapper">
                    <div className="items__filter-legend">Suodata kausi:</div>
                    <div className="items__filter-bar">
                        {seasons.map(item =>
                            <label key={item.season}>
                                <div className={item.divClassName}>
                                    <input
                                        type="radio"
                                        name="kausi"
                                        value={item.season}
                                        checked={filter.kausi === item.season}
                                        onChange={handleInputChange}
                                    />
                                    <img src={item.imgsrc} alt={item.title} title={item.title} className={item.imgClassName} />
                                </div>
                            </label>
                        )}
                    </div>
                </div>

                <div className="items__filter-wrapper">
                    <div className="items__filter-legend">Suodata koko:</div>
                    <div className="items__filter-bar">
                        <select
                            name="koko"
                            value={filter.koko}
                            onChange={handleInputChange} >
                            <option value="" disabled>Valitse koko</option>
                            {(props.category === "Kengät" || props.category === "Kausivälineet" ? shoeSizes : clothingSizes).map(item =>
                                <option value={item} key={item}>{item}</option>
                            )
                            }
                        </select>
                        <button onClick={handleClearSizeFilter} className="items__filter-img-wrapper items__filter-img-wrapper--no-background items__button">
                            <img src={seasons[3].imgsrc} alt={seasons[3].title} title={seasons[3].title} className="items__filter-img" />
                        </button>
                    </div>
                </div>

                <div className="items__divider"></div>

                <div className="items__filter-wrapper items__filter-wrapper--left">
                    {filter.kausi || filter.koko ? "" : "Kaikki"}
                    {filter.kausi ? filter.kausi : ""}
                    {filter.kausi && filter.koko ? ", " : ""}
                    {filter.koko ? filter.koko + " cm" : ""}
                </div>

                <div className="items__divider"></div>

            </div>
            {rows}
        </div>
    );

}

export default ItemFilter;