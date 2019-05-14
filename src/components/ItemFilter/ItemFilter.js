import React, { useState } from 'react';

import ItemCard from '../ItemCard/ItemCard';

import './ItemFilter.css';
import { seasons, shoeSizes, clothingSizes, accessoriesSizes } from '../ItemForm/itemFormData';

function ItemFilter(props) {

    const [filter, setFilter] = useState(
        {
            kausi: "",
            koko: ""
        }
    );

    // Tallentaa muutokset state-muuttujaan
    const handleInputChange = e => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    }

    // Poistaa kokofiltterin käytöstä (tallentaa state-muuttujaan -> koko: "")
    const handleClearSizeFilter = e => {
        e.preventDefault();
        setFilter({ ...filter, koko: "" })
    }

    // filtteröidään näkyviin vain se data, joka edustaa valittua vaatekategoriaa (tai näytetään kaikki)
    let data = props.url === "koko_komero" ? props.data : props.data.filter(item => item.kategoria === props.category);

    // sortataan data koon mukaan nousevaan järjestykseen
    data = data.sort((a, b) => a.koko - b.koko);

    // Yhdistetään itemFormData-tiedoston kokotaulukot uudeksi taulukoksi koko komeron filtteröintiä ja näyttönimien etsimistä varten.
    // Poistetaan kokotaulukoista ylimääräiset "Muu"-arvot, näytetään vain yksi.
    const sizeLists = clothingSizes.concat(shoeSizes, accessoriesSizes);
    const sizeListsUnique = Array.from(new Set(sizeLists.map(a => a.optionLabel)))
        .map(optionLabel => {
            return sizeLists.find(a => a.optionLabel === optionLabel);
        });

    // Käytettävä kokolista. Koko komero -> yhdistetty kokolista. Asusteet -> asustekoot. Kengät tai kausivälineet -> kenkäkoot. Muuten vaatekoot.
    const sizeOptionList = (props) => {
        if (props.category === "Koko Komero") {
            return sizeListsUnique;
        } else if (props.category === "Asusteet") {
            return accessoriesSizes;
        } else if (props.category === "Kengät" || props.category === "Kausivälineet") {
            return shoeSizes;
        } else {
            return clothingSizes;
        }
    }

    // Haetaan kokojen näyttönimet yhdistetystä kokotaulukukosta (tietokantaan tallennetut arvot ovat sorttauksen takia pelkästään numeroita)  
    let selectedSizeLabel = "";
    const indexOfSize = sizeListsUnique.findIndex(item => item.optionValue === parseInt(filter.koko));
    if (indexOfSize > 0) {
        selectedSizeLabel = sizeListsUnique[indexOfSize].optionLabel;
    };


    // filtteröidään vaatteet valitun kauden mukaan (tai näytetään kaikki)
    data = filter.kausi ? data.filter(item => item.kausi === filter.kausi) : data;

    // filtteröidään vaatteet valitun koon mukaan (tai näytetään kaikki)
    data = filter.koko ? data.filter(item => parseInt(item.koko) === parseInt(filter.koko)) : data;

    // näytetään valittujen filttereiden nimet alaotsakkeessa
    const filterName = () => {
        return (
            <div className="items__filter-wrapper items__filter-wrapper--left">
                {filter.kausi || filter.koko ? "" : "Kaikki"}{/* Jos filttereitä ei ole valittu, näytetään teksti "Kaikki" */}
                {filter.kausi ? filter.kausi : ""}{/* Jos kausifiltteri on valittu, näytetään valitun kauden nimi */}
                {filter.kausi && filter.koko ? ", " : ""}{/* Jos sekä kausifiltteri että kokofiltteri on valittu, laitetaan niiden nimien väliin pilkku */}
                {filter.koko ? selectedSizeLabel : ""}{/* Jos kokofiltteri on valittu, näytetään valitun koon näyttönimi */}
            </div>
        );
    }

    // tuodaan filtteröity/filtteröimätön data nimikelistaksi ItemCard-komponentin avulla
    let rows = data.map(item => {
        return (
            <ItemCard data={item} key={item.id} />
        )
    });


    return (
        <div className="items">
            <div className="items__filter-top-wrapper">

                {/* Suodata kauden mukaan */}
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
                                    <div className={item.imgDivClassName}>
                                        <img src={item.imgsrc} alt={item.title} title={item.title} className={item.imgClassName} />
                                    </div>
                                </div>
                            </label>
                        )}
                    </div>
                </div>

                {/* Suodata koon mukaan */}
                <div className="items__filter-wrapper">
                    <label htmlFor="koko" className="items__filter-legend">Suodata koko:</label>
                    <div className="items__filter-bar">
                        <select
                            name="koko"
                            value={filter.koko}
                            onChange={handleInputChange} >
                            <option value="" disabled>Valitse koko</option>
                            {(sizeOptionList(props)).map(item =>
                                <option value={item.optionValue} key={item.optionLabel}>{item.optionLabel}</option>
                            )
                            }
                        </select>
                        {/* ruksinappi, joka poistaa kokofiltterin käytöstä */}
                        <button onClick={handleClearSizeFilter} className="items__filter-img-wrapper items__filter-img-wrapper--no-background items__button">
                            <img src={seasons[3].imgsrc} alt={seasons[3].title} title={seasons[3].title} className="items__filter-img" />
                        </button>
                    </div>
                </div>

                <div className="items__divider"></div>

                {/* Alaotsake, joka kertoo valitut filtterit */}
                {filterName()}

                <div className="items__divider"></div>

            </div>
            {rows}
        </div>
    );

}

export default ItemFilter;