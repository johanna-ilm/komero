import React from 'react';

import Content from '../Content/Content';
import Button from '../buttons';

import './Logout.css';

// Komponentti, joka näyttää kirjautuneen käyttäjän tiedot ja antaa mahdollisuuden kirjautua ulos
function Logout(props) {
    return (
        <Content>
            <div className="logout__header">
                <h2>Poistu Komerosta</h2>
            </div>
            <div className="logout__profile">
                <div className="logout__userdata">
                    <div><img src={props.user.photoURL} alt="userphoto" /></div>
                    <div>{props.user.displayName} <br /> {props.user.email}</div>
                </div>
                <div className="logout__button">
                    <Button primary onClick={props.onLogout}>Kirjaudu ulos</Button>
                </div>
            </div>
        </Content>
    );
}

export default Logout;