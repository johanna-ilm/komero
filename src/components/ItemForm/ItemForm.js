import React, { Component } from 'react';

import './ItemForm.css';

import Button from '../buttons';

import jacket from '../../images/jacket.png';
import pants from '../../images/pants.png';
import snowsuit from '../../images/snowsuit.png';
import shoes from '../../images/sneakers.png';
import hat from '../../images/hat.png';
import iceskate from '../../images/ice-skate.png';


class ItemForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                tyyppi: "Vesi",
                summa: 0,
                maksupäivä: undefined,
                kaudenalku: undefined,
                kaudenloppu: undefined,
                saaja: ""

            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        });
    }

    render() {
        return (
            <form>
                <div className="itemform">
                    <div className="itemform__category">
                        <div className="itemform__categorycontainer">
                            <img src={jacket} alt="takki" className="itemform__categorylogo" />
                        </div>
                        <div className="itemform__categorycontainer">
                            <img src={pants} alt="housut" className="itemform__categorylogo" />
                        </div>
                        <div className="itemform__categorycontainer">
                            <img src={snowsuit} alt="haalari" className="itemform__categorylogo" />
                        </div>
                        <div className="itemform__categorycontainer">
                            <img src={shoes} alt="kengät" className="itemform__categorylogo" />
                        </div>
                        <div className="itemform__categorycontainer">
                            <img src={hat} alt="pipot, hanskat, kaulurit" className="itemform__categorylogo" />
                        </div>
                        <div className="itemform__categorycontainer">
                            <img src={iceskate} alt="varusteet" className="itemform__categorylogo" />
                        </div>
                    </div>
                    <div className="itemform__categorylabel">Valitse kategoria</div>
                    <div className="itemform__row">
                        <div>
                            <label for="tyyppi">Kulutyyppi</label>
                            <select name="tyyppi" value={this.state.data.tyyppi} onChange={this.handleInputChange}>
                                <option value="Puhelin">Puhelin</option>
                                <option value="Sähkö">Sähkö</option>
                                <option value="Vesi">Vesi</option>
                                <option value="Vero">Vero</option>
                            </select>
                        </div>
                    </div>

                    <div className="itemform__row">
                        <div>
                            <label for="summa">Summa</label>
                            <input type="number" name="summa" step="0.01" value={this.state.data.summa} onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <label for="maksupaiva">Maksupäivä</label>
                            <input type="date" name="maksupaiva" value={this.state.data.maksupaiva} onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="itemform__row">
                        <div>
                            <label for="kaudenalku">Laskutuskauden alku</label>
                            <input type="date" name="kaudenalku" size="10" value={this.state.data.kaudenalku} onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <label for="kaudenloppu">Laskutuskauden loppu</label>
                            <input type="date" name="kaudenloppu" size="10" value={this.state.data.kaudenloppu} onChange={this.handleInputChange} />
                        </div>
                    </div>

                    <div className="itemform__row">
                        <div>
                            <label for="saaja">Laskuttaja</label>
                            <input type="text" name="saaja" value={this.state.data.saaja} onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className="itemform__row">
                        <div>
                            <Button>PERUUTA</Button>
                        </div>
                        <div>
                            <Button primary>LISÄÄ</Button>
                        </div>
                    </div>

                </div>
            </form>

        );
    }

}

export default ItemForm;