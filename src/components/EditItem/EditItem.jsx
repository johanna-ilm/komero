import './EditItem.css'

import PropTypes from 'prop-types'

import Content from '../Content/Content'
import ItemForm from '../ItemForm/ItemForm'

// Komponentti, jolla muokataan nimikkeen tietoja. Koostuu Content- ja ItemForm-komponenteista.
const EditItem = ({ data, onFormSubmit, onDeleteItem, onDeleteImage, match }) => {
  // Tuodaan propsien kautta muokattavan nimikkeen id ja etsitään sen indeksi props.datasta
  const index = data.findIndex(item => item.id === match.params.id)
  // Käytetään datana vain kyseisen nimikkeen dataa
  const itemData = data[index]

  return (
    <Content>
      <div className='edititem'>
        {/* <div className='edititem__header'>
              <h2>Muokkaa</h2>
          </div */}
        {/* Tuodaaan ItemForm-komponentti, jolle annetaan propseiksi kyseisen nimikkeen data sekä
                App.js:ssä määritellyt funktiot lomakkeen lähettämiseen ja nimikkeen poistamiseen */}
        <ItemForm
          onFormSubmit={onFormSubmit}
          data={itemData}
          onDeleteItem={onDeleteItem}
          onDeleteImage={onDeleteImage} />
      </div>

    </Content >
  )
}

EditItem.propTypes = {
  data: PropTypes.array.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  match: PropTypes.object
}

export default EditItem
