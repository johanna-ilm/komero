import React from 'react';
import './Content.css'

// Komponentti, toimii "kehyksenä" kaikille sisältösivuille
function Content(props) {
  return (
    <div className="content">
      {props.children}
    </div>
  );
}

export default Content;