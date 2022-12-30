import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

import Home from '@material-ui/icons/Home';
import BarChart from '@material-ui/icons/BarChart';
import logout from '../../images/logout_w.png';


// Sovelluksen alalaidassa oleva menu-palkki. Linkit etusivulle, tilastosivulle ja logout-sivulle. 
function Menu() {
  return (
    <div className="menu">
      <div className="menu__container">
        <Link to="/"><div><Home htmlColor="#fff" /></div></Link>
        <Link to="/stats"><div><BarChart htmlColor="#fff" /></div></Link>
        <Link to="/logout"><div className="menu__button"><img src={logout} alt="logout" /></div></Link>
      </div>
    </div>
  );
}

export default Menu;