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
                <div className="home__boxes">
                    <div className="box__lamp"><img src={lamp} alt="valaisin" /></div>
                    <div className="box__grid">
                        <Link className="box box__snowsuit" to="/list/haalarit"><img src={snowsuit} alt="Haalarit" title="Haalarit" /></Link>
                        <Link className="box box__pants" to="/list/housut"><img src={pants} alt="Housut" title="Housut" /></Link>
                        <Link className="box box__jacket" to="/list/takit"><img src={jacket} alt="Takit" title="Takit" /></Link>
                        <Link className="box box__hat" to="/list/asusteet"><img src={hat} alt="Asusteet" title="Asusteet" /></Link>
                        <Link className="box box__shoe" to="/list/kengat"><img src={shoes} alt="Kengät" title="Kengät" /></Link>
                        <Link className="box box__iceskate" to="/list/kausivalineet"><img src={iceskate} alt="Kausivälineet" title="Kausivälineet" id="box__img-iceskate" />
                            <img src={skiis} alt="Kausivälineet" title="Kausivälineet" id="box__img-skiis" /></Link>
                    </div>
                </div>

                <div className="fab__wrapper">
                    <div className="fab__fab-wrapper">
                        <Link to="/add"><FloatingButton>+</FloatingButton></Link>
                    </div>
                </div>
            </div>
        </Content>

    );
}

export default Home;