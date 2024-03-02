import './ItemForm.css'

import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { withRouter } from 'react-router'
import { v4 as uuidv4 } from 'uuid'

import Button from '../buttons'
import CustomDialog from '../Dialog/Dialog'
import ItemFormHeader from '../ItemFormHeader/ItemFormHeader'
import { accessoriesSizes, categories, clothingSizes, shoeSizes } from './itemFormData'

// Komponentti, joka muodostaa lomakkeen /add ja /edit/-sivuille (AddItem- ja EditItem-komponentteihin)
const ItemForm = ({
  data: propsData,
  history,
  onFormSubmit,
  onDeleteItem,
  onDeleteImage
}) => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [data, setData] = useState(
    propsData || {
      kategoria: '',
      nimike: '',
      koko: '',
      vari: '#ffffff', // vaatteen/välineen oletusväri valkoinen
      kausi: '',
      ostohinta: 0,
      ostovuosi: new Date().getFullYear().toString(), // antaa oletuksena kuluvan vuoden
      ostopaikka: '',
      huomioita: '',
      imgUrl: '',
      tiedostonimi: ''
    })

  // Etsii valitun vaate/välinekategorian indeksin itemFormData-tiedoston listasta (käytetään urlin hakemiseen, kun lomake on lähetetty)
  const index = categories.findIndex(item => item.category === data.kategoria)

  // Jos valittu kategoria on asusteet, lomakkeessa käytetään asustekokoja. Kengät tai kausivälineet -> kenkäkokoja. Muuten vaatekokoja.
  const sizeOptionList = (data) => {
    if(data.kategoria === 'Asusteet') {
      return accessoriesSizes
    } else if(data.kategoria === 'Kengät' || data.kategoria === 'Kausivälineet') {
      return shoeSizes
    } else {
      return clothingSizes
    }
  }

  // Tallentaa lomakkeella tapahtuvat arvojen muutokset state-muuttujaan
  const handleInputChange = e => {
    if(e.target.id === 'kuvatiedosto') {
      if(e.target.files[0]) {
        setFile(e.target.files[0])
        setData({ ...data, tiedostonimi: e.target.files[0].name, imgUrl: '' })
      } else {
        setFile(null)
        setData({ ...data, tiedostonimi: '', imgUrl: '' })
      }
    } else {
      const { name, value } = e.target
      setData({ ...data, [name]: value })
    }
  }

  // Näytetään esikatselu, kun vaihdetaan valittu kuvatiedosto
  useEffect(() => {
    if(!file) {
      setPreview(null)
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    // Vapauta muisti
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  // Vie käyttäjän takaisin edelliselle sivulle
  const handleCancel = e => {
    e.preventDefault()
    history.goBack()
  }

  // Lisää/Tallenna-napista painamalla tallentaa state-muuttujan tiedot newData-muuttujaan. Antaa nimikkeelle id:n, jos sillä ei vielä sitä ole.
  // Vie käyttäjän kyseisen kategorian listaussivulle (Items-komponentti).
  const handleSubmit = async e => {
    e.preventDefault()
    if(submitting) {
      return
    }
    setSubmitting(true)
    const newData = { ...data }

    // Tarkasta, että kategoria on valittu
    if(!newData.kategoria) {
      toast.error('Valitse vaatekategoria!')
      return
    }

    newData.koko = parseInt(newData.koko)
    newData.ostohinta = parseFloat(newData.ostohinta)
    newData.id = newData.id ?? uuidv4()
    const dataSaved = await onFormSubmit(newData, file)
    if(dataSaved) {
      history.push('/list/' + categories[index].url)
    }
  }

  // Poistaa kyseisen nimikkeen tietokannasta id:n perusteella.
  // Vie käyttäjän kyseisen kategorian listaussivulle (Items-komponentti), jos poisto onnistui.
  const handleItemDelete = async() => {
    const itemDeleted = await onDeleteItem(data)
    if(itemDeleted) {
      history.push('/list/' + categories[index].url)
    }
  }

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDelete = (e) => {
    e.preventDefault()
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleConfirm = () => {
    handleItemDelete()
    setDialogOpen(false)
  }

  const handleImageDelete = async(e) => {
    e.preventDefault()
    const imageDeleted = await onDeleteImage(data)
    if(imageDeleted) {
      setData({ ...data, tiedostonimi: '', imgUrl: '' })
    }
  }

  const handleEmptyFileInput = (e) => {
    e.preventDefault()
    setFile(null)
    setData({ ...data, tiedostonimi: '', imgUrl: '' })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='itemform'>
        <ItemFormHeader data={data} preview={preview} onInputChange={handleInputChange} onDeleteImage={handleImageDelete} onEmptyFileInput={handleEmptyFileInput} />
        <div className='itemform__row'>
          <div>
            {/* PAKOLLINEN Input-kenttä vaatteen/kenkien/välineen nimikkeelle */}
            <label htmlFor='nimike'>Nimike:</label>
            <input
              type='text'
              name='nimike'
              spellCheck='false'
              className='itemform__div--bold'
              value={data.nimike}
              onChange={handleInputChange}
              required />
          </div>
          {/* Värivalitsin */}
          <div id='itemform__colorpicker'>
            <label htmlFor='vari'>Väri:</label>
            <input
              type='color'
              name='vari'
              value={data.vari}
              onChange={handleInputChange} />
          </div>
        </div>
        <div className='itemform__row'>
          <div className='itemform__row-2cells'>
            {/* PAKOLLINEN Koon valintalista */}
            <label htmlFor='koko'>Koko:</label>
            <select
              name='koko'
              value={data.koko}
              onChange={handleInputChange}
              required>
              {/* Jos valittu kategoria on asusteet, käytetään asustekokoja. Kengät tai kausivälineet -> kenkäkokoja. Muuten vaatekokoja.
                  Mäpätään kokolistat itemFormData-tiedostosta. */}
              <option value='' disabled>Valitse koko</option>
              {sizeOptionList(data).map(item =>
                <option value={item.optionValue} key={item.optionLabel}>{item.optionLabel}</option>
              )}
            </select>
          </div>
          <div className='itemform__row-2cells'>
            {/* PAKOLLINEN Kauden valintalista */}
            <label htmlFor='kausi'>Kausi:</label>
            <select
              name='kausi'
              value={data.kausi}
              onChange={handleInputChange}
              required>
              <option value='' disabled>Valitse kausi</option>
              <option value='Kesä'>Kesä</option>
              <option value='Välikausi'>Välikausi</option>
              <option value='Talvi'>Talvi</option>
            </select>
          </div>
        </div>

        <div className='itemform__row'>
          <div>
            {/* Input-kenttä ostohinnalle */}
            <label htmlFor='ostohinta'>Ostohinta (€):</label>
            <input
              type='number'
              name='ostohinta'
              step='0.01'
              value={data.ostohinta}
              onChange={handleInputChange} />
          </div>
          <div>
            {/* Input-kenttä ostovuodelle */}
            <label htmlFor='ostovuosi'>Ostovuosi:</label>
            <input
              type='text'
              name='ostovuosi'
              value={data.ostovuosi}
              onChange={handleInputChange} />
          </div>
        </div>

        <div className='itemform__row'>
          <div>
            {/* Input-kenttä ostopaikalle */}
            <label htmlFor='ostopaikka'>Ostopaikka:</label>
            <input
              type='text'
              name='ostopaikka'
              spellCheck='false'
              value={data.ostopaikka}
              onChange={handleInputChange} />
          </div>
        </div>

        <div className='itemform__row'>
          <div>
            {/* Tekstikenttä huomioille ja lisätiedoille */}
            <label htmlFor='huomioita'>Huomioita:</label>
            <textarea
              name='huomioita'
              rows='3'
              spellCheck='false'
              value={data.huomioita}
              onChange={handleInputChange} >
            </textarea>
          </div>
        </div>

        {/* Napit */}
        <div className='itemform__button-row'>
          {/* Peruuta-nappi */}
          <div><Button onClick={handleCancel} secondary disabled={submitting}>Peruuta</Button></div>
          {/* Lisää / Tallenna -nappi */}
          <div><Button type='submit' primary>Tallenna</Button></div>
          {/* Poista-nappi */}
          {onDeleteItem ? <div><Button onClick={handleDelete} secondary>Poista</Button></div> : ''}
          <CustomDialog
            open={dialogOpen}
            onClose={handleClose}
            onConfirm={handleConfirm}
            title='Vahvista poisto'
            content='Haluatko varmasti poistaa tämän nimikkeen Komerosta?'
          />
        </div>
      </div>
      <Toaster />
    </form>
  )
}

ItemForm.propTypes = {
  data: PropTypes.object,
  history: PropTypes.object,
  onFormSubmit: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onDeleteImage: PropTypes.func
}

export default withRouter(ItemForm)