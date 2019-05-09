import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

function Header(props) {
  return (
    <div className="header">
      <Link to="/list/koko_komero"><h1>Komero</h1></Link>
    </div>
  );
}

export default Header;