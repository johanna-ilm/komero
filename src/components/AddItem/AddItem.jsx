import './AddItem.css'

import PropTypes from 'prop-types'

import Content from '../Content/Content'
import ItemForm from '../ItemForm/ItemForm'

// Komponentti, jolla lisätään uusi nimike tietokantaan. Koostuu Content- ja ItemForm-komponenteista.
const AddItem = ({ onFormSubmit }) => {
  return (
    <Content>
      <div className='additem'>
        {/* <div className='additem__header'>
            <h2>Lisää<br/>Komeroon</h2>
        </div>*}
        {/* Tuodaaan ItemForm-komponentti, jolle annetaan propseiksi App.js:ssä
        määritelty funktio lomakkeen lähettämiseksi */}
        <ItemForm onFormSubmit={onFormSubmit} />
      </div>

    </Content >
  )
}

AddItem.propTypes = {
  onFormSubmit: PropTypes.func
}

export default AddItem
