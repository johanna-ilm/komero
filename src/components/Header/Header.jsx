import './Header.css'

import { Link, useLocation } from 'react-router-dom'

import DdMenu from '../DdMenu/DdMenu'

// Sovelluksen header. Komero-sanaa klikkaamalla saa auki koko Komeron sisällön (Items-komponentti).
const Header = () => {
  const { pathname } = useLocation()
  const pathParts = pathname.split('/')

  let subHeaderText = ''

  if(pathParts.length > 1) {
    switch (pathParts[1]) {
      case 'add':
        subHeaderText = 'Lisää'
        break
      case 'edit':
        subHeaderText = 'Muokkaa'
        break
    }
  }

  return (
    <div className='header'>
      <div className='subHeader'>{subHeaderText}</div>
      <div className='mainHeader-wrapper'>
        <Link to='/list/koko_komero'><h1>Komero</h1></Link>
        <DdMenu />
      </div>
    </div>
  )
}

export default Header
