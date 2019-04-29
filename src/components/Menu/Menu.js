import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

import ViewList from '@material-ui/icons/ViewList';
import BarChart from '@material-ui/icons/BarChart';
import Settings from '@material-ui/icons/Settings';


function Menu(props) {
  return (
    <div className="menu">
      <Link to="/"><div className="menu_nappi"><ViewList nativeColor="#fff" /></div></Link>
      <Link to="/stats"><div className="menu_nappi"><BarChart nativeColor="#fff" /></div></Link>
      <Link to="/settings"><div className="menu_nappi"><Settings nativeColor="#fff" /></div></Link>
    </div>
  );
}

export default Menu;