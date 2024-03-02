import './Logout.css'

import PropTypes from 'prop-types'

import Button from '../buttons'
import Content from '../Content/Content'

// Komponentti, joka näyttää kirjautuneen käyttäjän tiedot ja antaa mahdollisuuden kirjautua ulos
const Logout = ({ user, onLogout }) => {
  const { displayName, email, photoURL } = user
  return (
        <Content>
            <div className='logout__header'>
                <h2>Poistu Komerosta</h2>
            </div>
            <div className='logout__profile'>
                <div className='logout__userdata'>
                    <div><img src={photoURL} alt='userphoto' /></div>
                    <div>{displayName} <br /> {email}</div>
                </div>
                <div className='logout__button'>
                    <Button primary onClick={onLogout}>Kirjaudu ulos</Button>
                </div>
            </div>
        </Content>
  )
}

Logout.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func
}

export default Logout
