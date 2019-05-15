import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

// Sovelluksen header. Komero-sanaa klikkaamalla saa auki koko Komeron sisällön (Items-komponentti).
function Header() {
  return (
    <div className="header">
      <Link to="/list/koko_komero"><h1>Komero</h1></Link>
    </div>
  );
}

export default Header;