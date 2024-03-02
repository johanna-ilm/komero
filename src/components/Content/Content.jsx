import './Content.css'

import PropTypes from 'prop-types'

// Komponentti, toimii 'kehyksenä' kaikille sisältösivuille
const Content = ({ children }) => {
  return (
    <div className='content'>
      {children}
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.node
}

export default Content
