import React from 'react';
import { Link,  useLocation  } from 'react-router-dom';

import './Header.css';

// Sovelluksen header. Komero-sanaa klikkaamalla saa auki koko Komeron sisällön (Items-komponentti).
export default function Header() {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');

  let subHeaderText = "";

  if(pathParts.length > 1) {
    switch (pathParts[1]) {
      case 'add':
        subHeaderText = 'Lisää'
        break;
      case 'edit':
        subHeaderText = 'Muokkaa'
        break;
      default:
        subHeaderText = "";
        break;
    }
  }

  return (
    <div className="header">
      <div className='subHeader'>{subHeaderText}</div>
      <Link to="/list/koko_komero"><h1>Komero</h1></Link>
    </div>
  );
}