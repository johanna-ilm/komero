import './ItemFormHeader.css'
import '../ItemForm/ItemForm.css'

import DeleteForever from '@mui/icons-material/DeleteForever'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import Avatar from '@mui/material/Avatar'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { categories } from '../ItemForm/itemFormData'

const ItemFormHeader = ({
  data,
  preview,
  onInputChange,
  onDeleteImage,
  onEmptyFileInput
}) => {
  const [changeCategory, setChangeCategory] = useState(false)
  const imgSrc = data.imgUrl || preview
  const categorySelectionOpen = !data.kategoria || changeCategory

  return (
    <div className='itemform__header-wrapper'>
      {(categorySelectionOpen)
        ? <ItemFormCategoryAll kategoria={data.kategoria} onInputChange={onInputChange} setChangeCategory={setChangeCategory} />
        : <ItemFormCategorySelected kategoria={data.kategoria} setChangeCategory={setChangeCategory} />}
      <input type='file' id='kuvatiedosto' className='itemform__fileInput' accept='image/*' onChange={onInputChange} />
      {imgSrc
        ? <ItemFormShowPhoto imgSrc={imgSrc} imgUrl={data.imgUrl} onDeleteImage={onDeleteImage} onEmptyFileInput={onEmptyFileInput} categorySelectionOpen={categorySelectionOpen} />
        : <ItemFormAddPhoto />}
    </div>
  )
}

ItemFormHeader.propTypes = {
  data: PropTypes.object,
  preview: PropTypes.string,
  onInputChange: PropTypes.func,
  onDeleteImage: PropTypes.func,
  onEmptyFileInput: PropTypes.func
}

export default ItemFormHeader

const ItemFormShowPhoto = ({
  imgSrc,
  imgUrl,
  onDeleteImage,
  onEmptyFileInput,
  categorySelectionOpen
}) => {
  const onEmptyOrDelete = imgUrl !== '' ? onDeleteImage : onEmptyFileInput

  const [modalOpen, setModalOpen] = useState(false)
  const avatarSize = categorySelectionOpen ? '100px' : '50vw'

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <div className='itemform__nimikkeenKuva-wrapper'>
      <div style={{ height: avatarSize, position: 'relative' }}>
        <Avatar
          alt='Käyttäjän lisäämä kuva'
          src={imgSrc}
          sx={{ maxWidth: '200px', maxHeight: '200px', width: avatarSize, height: avatarSize, cursor: 'pointer' }}
          onClick={handleOpenModal}
        />
        <div className={`itemform__kuvaikoni-wrapper ${categorySelectionOpen ? 'itemform__kuvaikoni-wrapper_no-margin' : ''}`}>
          <div>
            <DeleteForever htmlColor='#505050' onClick={onEmptyOrDelete} />
          </div>
        </div>
      </div>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
      >
        <div className='itemform__nimikkeenKuva-modaali'>
          <img
            src={imgSrc}
            alt='Nimikkeen kuva'
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      </Modal>
    </div>
  )
}

ItemFormShowPhoto.propTypes = {
  imgSrc: PropTypes.string,
  imgUrl: PropTypes.string,
  onDeleteImage: PropTypes.func,
  onEmptyFileInput: PropTypes.func,
  categorySelectionOpen: PropTypes.bool
}

const ItemFormAddPhoto = () => (
  <div className='itemform__nimikkeenKuva-wrapper'>
    <div className='itemform__photo-wrapper--small'>
      <label htmlFor='kuvatiedosto' className='itemform__photo-icon'><PhotoCameraIcon htmlColor='#000' /></label>
    </div>
  </div>
)

// Jos kategoriaa ei ole vielä valittu tai käyttäjä haluaa vaihtaa kategoriaa
const ItemFormCategoryAll = ({ kategoria, onInputChange, setChangeCategory }) => {
  const handleInputChange = e => {
    onInputChange(e)
    setChangeCategory(false)
  }

  return (
    <div className='itemform__categories-wrapper'>
      {/* Valitaan kategoria (haalarit/housut/takit/kengät/asusteet/kausivälineet) */}
      <div className='itemform__category-bar'>
        {/* Mäpätään categories-objektien arvot radio buttoneiksi ja kuviksi. Radio buttonit piilotettu tyylimääritteissä. */}
        {categories.map(item =>
          <label key={item.category}>
            <div className='itemform__category-wrapper'>
              <input
                type='radio'
                name='kategoria'
                value={item.category}
                defaultChecked={kategoria === item.category}
                onClick={handleInputChange} />
              <div className='itemform__img-wrapper'>
                <img src={item.imgsrc} alt={item.category} title={item.category} />
              </div>
            </div>
          </label>
        )}
      </div>
      {/* Teksti pyytää valitsemaan kategorian. Jos kategoria on jo valittu, kertoo valitun kategorian nimen. */}
      <div className='itemform__category-legend'>{kategoria ? 'Vaatekategoria: ' + kategoria : 'Valitse vaatekategoria'}</div>
    </div>
  )
}

ItemFormCategoryAll.propTypes = {
  kategoria: PropTypes.string,
  onInputChange: PropTypes.func,
  setChangeCategory: PropTypes.func
}

const ItemFormCategorySelected = ({ kategoria, setChangeCategory }) => {
  const selectedCategoryInfo = categories.filter(item => item.category === kategoria)[0]

  const handleOpenAllCategories = () => {
    setChangeCategory(true)
  }

  return (
    <div className='itemform__category-wrapper--big' onClick={handleOpenAllCategories}>
      <input
        type='hidden'
        name='kategoria'
        value={kategoria} />
      <div className='itemform__img-wrapper itemform__img-wrapper--big'>
        <img src={selectedCategoryInfo.imgsrc} alt={kategoria} title={kategoria} />
        <div className='itemform__category-legend itemform__category-legend--big'>{kategoria}</div>
      </div>
    </div>
  )
}

ItemFormCategorySelected.propTypes = {
  kategoria: PropTypes.string,
  setChangeCategory: PropTypes.func
}
