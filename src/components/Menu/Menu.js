import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

import Home from '@material-ui/icons/Home';
import BarChart from '@material-ui/icons/BarChart';
import Settings from '@material-ui/icons/Settings';


function Menu(props) {
  return (
    <div className="menu">
      <Link to="/"><div className="menu_nappi"><Home nativeColor="#fff" /></div></Link>
      <Link to="/stats"><div className="menu_nappi"><BarChart nativeColor="#fff" /></div></Link>
      <Link to="/settings"><div className="menu_nappi"><Settings nativeColor="#fff" /></div></Link>
    </div>
  );
}

export default Menu;