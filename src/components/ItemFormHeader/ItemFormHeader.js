import React, { useState } from 'react';
import './ItemFormHeader.css';
import '../ItemForm/ItemForm.css';
import { categories } from '../ItemForm/itemFormData';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ClearIcon from '@mui/icons-material/Clear';


export default function ItemFormHeader({kategoria, imgUrl, onInputChange, onDeleteImage}) {
  return(
    <div className="itemform__header-wrapper">
      <ItemFormCategory kategoria={kategoria} onInputChange={onInputChange}/> 
    {imgUrl &&
      <div className="itemform__nimikkeenKuva-wrapper">
          <img id="nimikkeenKuva" className='itemform__photo-wrapper--big' src={imgUrl} alt="Käyttäjän lisäämä kuva"></img>
          <div className='itemform__kuvaikoni-wrapper'>
            <div>
              <ClearIcon htmlColor='#fff' onClick={onDeleteImage} />
            </div>
          </div>
      </div>
    }
    {!imgUrl &&
        <div className="itemform__nimikkeenKuva-wrapper">
            <div className='itemform__photo-wrapper--small'>
                <input type="file" id="kuvatiedosto" className='itemform__fileInput' accept="image/*" onChange={onInputChange}/>
                <label htmlFor="kuvatiedosto" className='itemform__photo-icon'><PhotoCameraIcon htmlColor='#000'/></label>
            </div>
        </div>
    }
    </div> 
  );
}



function ItemFormCategory({kategoria, onInputChange}) {

  const [changeCategory, setChangeCategory] = useState(false);

  // Jos kategoriaa ei ole vielä valittu tai käyttäjä haluaa vaihtaa kategoriaa
  if(!kategoria || changeCategory) {
    return <ItemFormCategoryAll kategoria={kategoria} onInputChange={onInputChange} setChangeCategory={setChangeCategory}/>;
  } else {
    return <ItemFormCategorySelected kategoria={kategoria} setChangeCategory={setChangeCategory} />
  }
}

function ItemFormCategoryAll({kategoria, onInputChange, setChangeCategory}) {

  const handleInputChange = e => {
    onInputChange(e);
    setChangeCategory(false);
  }

  return (
    <div className='itemform__categories-wrapper'>
      {/* Valitaan kategoria (haalarit/housut/takit/kengät/asusteet/kausivälineet) */}
      <div className="itemform__category-bar">
      {/* Mäpätään categories-objektien arvot radio buttoneiksi ja kuviksi. Radio buttonit piilotettu tyylimääritteissä.*/}
      {categories.map(item =>
          <label key={item.category}>
              <div className="itemform__category-wrapper">
                  <input
                      type="radio"
                      name="kategoria"
                      value={item.category}
                      defaultChecked={kategoria === item.category}
                      onClick={handleInputChange} />
                  <div className="itemform__img-wrapper">
                      <img src={item.imgsrc} alt={item.category} title={item.category} />
                  </div>
              </div>
          </label>
      )}
      </div>
      {/* Teksti pyytää valitsemaan kategorian. Jos kategoria on jo valittu, kertoo valitun kategorian nimen.*/}
      <div className="itemform__category-legend">{kategoria ? "Vaatekategoria: " + kategoria : "Valitse vaatekategoria:"}</div>
    </div>
  );
}

function ItemFormCategorySelected({kategoria, setChangeCategory}) {
  
  const selectedCategoryInfo = categories.filter(item => item.category === kategoria)[0];
  
  return(
  <div className='itemform__category-wrapper--big' onClick={() => setChangeCategory(true)}>
    <input
        type="hidden"
        name="kategoria"
        value={kategoria} />
    <div className="itemform__img-wrapper itemform__img-wrapper--big">
      <img src={selectedCategoryInfo.imgsrc} alt={kategoria} title={kategoria} />
      <div className="itemform__category-legend itemform__category-legend--big">{kategoria}</div>
    </div>
  </div>
  );
}

