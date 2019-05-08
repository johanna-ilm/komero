import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

import Home from '@material-ui/icons/Home';
import BarChart from '@material-ui/icons/BarChart';


function Menu(props) {
  return (
    <div className="menu">
      <Link to="/"><div className="menu__button"><Home nativeColor="#fff" /></div></Link>
      <Link to="/stats"><div className="menu__button"><BarChart nativeColor="#fff" /></div></Link>
      <div className="menu__button menu__button--empty"></div>
    </div>
  );
}

export default Menu;