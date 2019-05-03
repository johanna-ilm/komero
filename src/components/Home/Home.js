import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

import Content from '../Content/Content';

import { FloatingButton } from '../buttons';

import jacket from '../../images/jacket.png';
import pants from '../../images/pants.png';
import snowsuit from '../../images/snowsuit.png';
import shoes from '../../images/sneakers.png';
import hat from '../../images/winter-hat.png';
import iceskate from '../../images/ice-skate.png';
import skiis from '../../images/ski-equiptment.png';
import lamp from '../../images/theatre-light.png';


function Home(props) {

    return (
        <Content>
            <div className="home">
                <div className="box__lamp"><img src={lamp} alt="valaisin" /></div>
                <div className="box__grid">
                    <div className="box box__snowsuit"><img src={snowsuit} alt="Haalarit" title="Haalarit" id="box__img-snowsuit" /></div>
                    <div className="box box__pants"><img src={pants} alt="Housut" title="Housut" id="box__img-pants" /></div>
                    <div className="box box__jacket"><img src={jacket} alt="Takit" title="Takit" id="box__img-jacket" /></div>
                    <div className="box box__hat"><img src={hat} alt="Asusteet" title="Asusteet" id="box__img-hat" /></div>
                    <div className="box box__shoe"><img src={shoes} alt="Kengät" title="Kengät" id="box__img-shoe" /></div>
                    <div className="box box__iceskate"><img src={iceskate} alt="Kausivälineet" title="Kausivälineet" id="box__img-iceskate" />
                        <img src={skiis} alt="Kausivälineet" title="Kausivälineet" id="box__img-skiis" /></div>
                </div>


                <Link to="/add"><FloatingButton secondary>+</FloatingButton></Link>
            </div>
        </Content>

    );
}

export default Home;